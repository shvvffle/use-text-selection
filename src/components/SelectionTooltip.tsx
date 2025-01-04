import React from 'react';
import { Copy, Share2 } from 'lucide-react';
import { TextSelection } from '../hooks/useTextSelection';

interface SelectionTooltipProps {
  selection: TextSelection;
}

export function SelectionTooltip({ selection }: SelectionTooltipProps) {
  if (!selection.isSelected || !selection.position) {
    return null;
  }

  return (
    <div className="flex items-center">
      <div
        className="bg-white shadow-lg rounded-lg p-1.5 flex gap-1.5 animate-fade-in"
        style={{
          position: 'absolute',
          top: `${selection.position.top}px`,
          left: `${selection.position.left}px`,
        }}
      >
        <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
          <Copy size={16} />
        </button>
        <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
          <Share2 size={16} />
        </button>
      </div>
    </div>
  );
}