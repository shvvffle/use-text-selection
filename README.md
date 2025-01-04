# useTextSelection

A React hook for creating elegant text selection interactions in textareas and input fields, similar to Medium's selection experience.

## Features

- 🎯 Accurate tooltip positioning
- 🖱️ Smooth selection tracking
- 📱 Responsive and adaptive
- 🎨 Customizable offsets and styling
- 📦 Zero dependencies
- 💪 TypeScript support

## Quick Start

```tsx
import { useTextSelection } from 'use-text-selection';

function MyComponent() {
  const selection = useTextSelection({
    offsetLeft: 4,  // Optional: Adjust horizontal offset
    offsetTop: 8,   // Optional: Adjust vertical offset
  });

  return (
    <div className="relative">
      <textarea className="w-full p-4" />
      {selection.isSelected && selection.position && (
        <div
          style={{
            position: 'fixed',
            top: selection.position.top,
            left: selection.position.left,
            transform: 'translateX(-50%)',
          }}
        >
          Selection Menu
        </div>
      )}
    </div>
  );
}
```

## API Reference

### Options

- `onSelectionChange?: (selection: TextSelection) => void` - Callback when selection changes
- `offsetLeft?: number` - Horizontal offset for the tooltip (default: 35)
- `offsetTop?: number` - Vertical offset for the tooltip (default: 50)

### Return Value

- `selectedText: string | null` - Currently selected text
- `position: Position | null` - Coordinates for tooltip positioning
- `isSelected: boolean` - Whether text is currently selected
- `element: HTMLElement | null` - Element containing the selection

## License

MIT
