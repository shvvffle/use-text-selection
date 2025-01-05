import { useState, useEffect, useCallback, useRef } from 'react';

interface Position {
  left: number;
  top: number;
}

export interface TextSelection {
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
    ): Position | null => {
      const elementRect = element.getBoundingClientRect();
      
      // Create measurement div
      const div = document.createElement('div');
      const styles = window.getComputedStyle(element);
      
      // Copy styles to ensure text layout matches
      [
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
      ].forEach((style) => {
        div.style[style as any] = styles[style as any];
      });

      // Position the div
      div.style.position = 'absolute';
      div.style.top = '0';
      div.style.left = '0';
      div.style.visibility = 'hidden';
      div.style.whiteSpace = 'pre-wrap';
      div.style.width = `${elementRect.width}px`;
      div.style.height = 'auto';

      // Add text content
      const beforeText = element.value.substring(0, selectionStart);
      const selectedText = element.value.substring(selectionStart, selectionEnd);

      div.textContent = beforeText;
      const span = document.createElement('span');
      span.textContent = selectedText;
      div.appendChild(span);

      // Add to DOM temporarily and measure
      element.parentElement?.appendChild(div);
      const spanRect = span.getBoundingClientRect();
      const spanTop = spanRect.top - elementRect.top + element.scrollTop;
      const spanLeft = spanRect.left - elementRect.left;
      element.parentElement?.removeChild(div);

      // Calculate position relative to textarea
      return {
        left: spanLeft + spanRect.width / 2 - (options?.offsetLeft ?? 2),
        top: spanTop - (options?.offsetTop ?? 8),
      };
    },
    [options?.offsetLeft, options?.offsetTop]
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

    const inputElement = activeElement as HTMLInputElement | HTMLTextAreaElement;
    const start = inputElement.selectionStart;
    const end = inputElement.selectionEnd;

    if (start === null || end === null || start === end) {
      clearSelection();
      return;
    }

    const selectedText = inputElement.value.substring(start, end);
    const position = getCaretPosition(inputElement, start, end);

    if (!position) {
      clearSelection();
      return;
    }

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
    if (scrollTimeoutRef.current !== null) {
      window.clearTimeout(scrollTimeoutRef.current);
    }

    setSelection((prev) => ({
      ...prev,
      position: null,
    }));

    scrollTimeoutRef.current = window.setTimeout(() => {
      scrollTimeoutRef.current = null;
      if (selectionRef.current.text) {
        updateSelection();
      }
    }, 100);
  }, [updateSelection]);

  const handleResize = useCallback(() => {
    if (scrollTimeoutRef.current !== null) {
      window.clearTimeout(scrollTimeoutRef.current);
    }

    setSelection((prev) => ({
      ...prev,
      position: null,
    }));

    scrollTimeoutRef.current = window.setTimeout(() => {
      scrollTimeoutRef.current = null;
      if (selectionRef.current.text) {
        updateSelection();
      }
    }, 100);
  }, [updateSelection]);

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelection);
    document.addEventListener('mousedown', clearSelection);
    document.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);

    return () => {
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      document.removeEventListener('selectionchange', handleSelection);
      document.removeEventListener('mousedown', clearSelection);
      document.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleSelection, clearSelection, handleScroll, handleResize]);

  return selection;
};

export default useTextSelection;