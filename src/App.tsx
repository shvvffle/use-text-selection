import React from 'react';
import { Hero } from './components/Hero';
import { TextAreaDemo } from './components/TextAreaDemo';
import { ApiReference } from './components/ApiReference';
import { CodeExample } from './components/CodeExample';
import { Footer } from './components/Footer';
import { InputDemo } from './components/InputDemo';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Hero />
      <main className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        <TextAreaDemo/>
        <InputDemo />
        <CodeExample />
        <ApiReference />
      </main>
      <Footer />
    </div>
  );
}

export default App;