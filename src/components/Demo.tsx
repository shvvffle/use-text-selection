import React, { useState } from 'react';
import { TextAreaDemo } from './TextAreaDemo';
import { InputDemo } from './InputDemo';
import { Switch } from './Switch';

export function Demo() {
  const [isInput, setIsInput] = useState(false);

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 font-serif">
          Live Demo
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Textarea</span>
          <Switch checked={isInput} onChange={setIsInput} />
          <span className="text-sm text-gray-600">Input</span>
        </div>
      </div>
      {isInput ? <InputDemo /> : <TextAreaDemo />}
    </section>
  );
}