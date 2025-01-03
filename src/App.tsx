import React from 'react';
import { Hero } from './components/Hero';
import { Demo } from './components/Demo';
import { ApiReference } from './components/ApiReference';
import { CodeExample } from './components/CodeExample';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Hero />
      <main className="max-w-4xl mx-auto px-4 py-12 space-y-16">
        <Demo />
        <CodeExample />
        <ApiReference />
      </main>
      <Footer />
    </div>
  );
}

export default App;