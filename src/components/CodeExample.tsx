import React from 'react';

export function CodeExample() {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-serif">
        Usage
      </h2>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
        <code>{`import { useTextSelection } from 'use-text-selection';

function MyComponent() {
  const selection = useTextSelection({
    onSelectionChange: (newSelection) => {
      console.log('Selection changed:', newSelection);
    }
  });

  return (
    <div className="relative w-full min-h-[200px]">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-full min-h-[200px] p-4"
        placeholder="Try selecting some text..."
      />
      {selection.isSelected && selection.position && (
        <div
          style={{
            top: selection.position.top,
            left: selection.position.left
          }}
        >
          Your tooltip content
        </div>
      )}
    </div>
  );
}`}</code>
      </pre>
    </section>
  );
}
