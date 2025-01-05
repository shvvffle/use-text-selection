import React, { useState } from 'react';
import useTextSelection from '../hooks/useTextSelection';
import { SelectionTooltip } from './SelectionTooltip';

export function InputDemo() {
  const [text, setText] = useState(
    'Try selecting some text in this input!'
  );

  const selection = useTextSelection();

  return (
      <div className="relative w-full min-h-[20px]">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none"
          placeholder="Try selecting some text..."
        />
       <SelectionTooltip selection={selection} />
      </div>
  );
}
