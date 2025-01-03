import { Github, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Marina Marques
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/shvvffle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:scale-125"
            >
              <Github size={20} />
            </a>
            <a
              href="https://marinamarques.pt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:scale-125"
            >
              <Globe size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
