import { useState } from 'react';
import useTextSelection from '../hooks/useTextSelection';
import { Copy, Share2 } from 'lucide-react';

export function InputDemo() {
  const [text, setText] = useState(
    'Try selecting some text in this input!'
  );

  const selection = useTextSelection();

  return (
    <section className="relative">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-serif">
       Input Demo
      </h2>
      <div className="relative">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none"
          placeholder="Try selecting some text..."
        />
        {selection.isSelected && selection.position && (
          <div
            className="fixed bg-white shadow-lg rounded-lg p-1.5 flex gap-1.5 transform -translate-y-full animate-fade-in"
            style={{
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
        )}
      </div>
    </section>
  );
}
