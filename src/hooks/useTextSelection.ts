import { useState, useEffect, useCallback, useRef } from 'react';

interface Position {
  left: number;
  top: number;
}

interface TextSelection {
  selectedText: string | null;
  position: Position | null;
  selectionStart: number | null;
  selectionEnd: number | null;
  isSelected: boolean;
  element: HTMLElement | null;
}

interface UseTextSelectionOptions {
  onSelectionChange?: (selection: TextSelection) => void;
  offsetLeft?: number;
  offsetTop?: number;
}

const useTextSelection = (options?: UseTextSelectionOptions): TextSelection => {
  const [selection, setSelection] = useState<TextSelection>({
    selectedText: null,
    position: null,
    selectionStart: null,
    selectionEnd: null,
    isSelected: false,
    element: null,
  });

  const scrollTimeoutRef = useRef<number | null>(null);
  const selectionRef = useRef<{
    start: number | null;
    end: number | null;
    text: string | null;
    element: HTMLElement | null;
  }>({
    start: null,
    end: null,
    text: null,
    element: null,
  });

  const getCaretPosition = useCallback(
    (
      element: HTMLTextAreaElement | HTMLInputElement,
      selectionStart: number,
      selectionEnd: number
    ): Position => {
      const div = document.createElement('div');
      const styles = window.getComputedStyle(element);
      const copyStyles = [
        'font',
        'letterSpacing',
        'lineHeight',
        'textTransform',
        'wordSpacing',
        'textIndent',
        'whiteSpace',
        'wordBreak',
        'overflowWrap',
        'padding',
        'border',
        'boxSizing',
      ];

      copyStyles.forEach((style) => {
        div.style[style as any] = styles[style as any];
      });

      div.style.position = 'absolute';
      div.style.visibility = 'hidden';
      div.style.whiteSpace = 'pre-wrap';
      div.style.width = `${element.offsetWidth}px`;
      div.style.height = `${element.offsetHeight}px`;
      div.style.overflowY = 'auto';
      div.scrollTop = element.scrollTop;

      const beforeText = element.value.substring(0, selectionStart);
      const selectedText = element.value.substring(
        selectionStart,
        selectionEnd
      );

      div.textContent = beforeText;
      const startMarker = document.createElement('span');
      startMarker.textContent = selectedText || '.';
      div.appendChild(startMarker);

      document.body.appendChild(div);

      const elementRect = element.getBoundingClientRect();
      const markerRect = startMarker.getBoundingClientRect();
      const divRect = div.getBoundingClientRect();

      document.body.removeChild(div);

      const left =
        elementRect.left +
        (markerRect.left - divRect.left) +
        markerRect.width / 2;
      const relativeTop = markerRect.top - divRect.top;
      const visibleTop = elementRect.top;
      const visibleHeight = element.clientHeight;
      const visibleBottom = visibleTop + visibleHeight;

      let top = visibleTop + relativeTop - element.scrollTop;

      if (top < visibleTop) {
        top = visibleTop + 10;
      } else if (top > visibleBottom) {
        top = visibleBottom - 10;
      }

      return {
        left: left + window.scrollX - (options?.offsetLeft ?? 4),
        top: top + window.scrollY - (options?.offsetTop ?? 8),
      };
    },
    []
  );

  const clearSelection = useCallback(() => {
    const newSelection: TextSelection = {
      selectedText: null,
      position: null,
      selectionStart: null,
      selectionEnd: null,
      isSelected: false,
      element: null,
    };
    setSelection(newSelection);
    selectionRef.current = {
      start: null,
      end: null,
      text: null,
      element: null,
    };
    options?.onSelectionChange?.(newSelection);
  }, [options?.onSelectionChange]);

  const updateSelection = useCallback(() => {
    const activeElement = document.activeElement as HTMLElement;
    if (!activeElement) {
      clearSelection();
      return;
    }

    const isInput =
      activeElement instanceof HTMLInputElement ||
      activeElement instanceof HTMLTextAreaElement;
    if (!isInput) {
      clearSelection();
      return;
    }

    const inputElement = activeElement as
      | HTMLInputElement
      | HTMLTextAreaElement;
    const start = inputElement.selectionStart;
    const end = inputElement.selectionEnd;

    if (start === null || end === null || start === end) {
      clearSelection();
      return;
    }

    const selectedText = inputElement.value.substring(start, end);
    const position = getCaretPosition(inputElement, start, end);

    // Store the current selection
    selectionRef.current = {
      start,
      end,
      text: selectedText,
      element: activeElement,
    };

    const newSelection: TextSelection = {
      selectedText,
      position,
      selectionStart: start,
      selectionEnd: end,
      isSelected: true,
      element: activeElement,
    };

    setSelection(newSelection);
    options?.onSelectionChange?.(newSelection);
  }, [getCaretPosition, clearSelection, options?.onSelectionChange]);

  const handleSelection = useCallback(() => {
    requestAnimationFrame(updateSelection);
  }, [updateSelection]);

  const handleScroll = useCallback(() => {
    setSelection((prev) => ({ ...prev, position: null }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!selectionRef.current.element || !selectionRef.current.text) return;

      const element = selectionRef.current.element;
      if (
        !(
          element instanceof HTMLTextAreaElement ||
          element instanceof HTMLInputElement
        )
      )
        return;

      const rect = element.getBoundingClientRect();
      const isHovering =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isHovering && element === document.activeElement) {
        const currentText = element.value.substring(
          selectionRef.current.start!,
          selectionRef.current.end!
        );

        if (currentText === selectionRef.current.text) {
          updateSelection();
        }
      }
    };

    document.addEventListener('selectionchange', handleSelection);
    document.addEventListener('mousedown', clearSelection);
    document.addEventListener('scroll', handleScroll, true);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      document.removeEventListener('selectionchange', handleSelection);
      document.removeEventListener('mousedown', clearSelection);
      document.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleSelection, clearSelection, handleScroll, updateSelection]);

  return selection;
};

export default useTextSelection;
