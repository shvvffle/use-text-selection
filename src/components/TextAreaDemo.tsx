import React, { useState } from 'react';
import useTextSelection from '../hooks/useTextSelection';
import { SelectionTooltip } from './SelectionTooltip';

export function TextAreaDemo() {
  const [text, setText] = useState(
    'Try selecting some text in this textarea! A tooltip will appear above your selection.\n\nThis demo showcases the useTextSelection hook in action.'
  );

  const selection = useTextSelection();

  return (
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-40 p-4 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none"
          placeholder="Try selecting some text..."
        />
        <SelectionTooltip selection={selection} />
      </div>
  );
}
