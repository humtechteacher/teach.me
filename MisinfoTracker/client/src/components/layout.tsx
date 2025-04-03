import { ReactNode } from "react";
import { Trophy, HelpCircle } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  score: number;
  onHelpClick: () => void;
}

export default function Layout({ children, score, onHelpClick }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-primary text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold md:text-3xl">MisInfo Detector</h1>
            <div className="flex items-center space-x-4">
              <span className="hidden md:flex items-center gap-2 bg-white text-primary px-3 py-1 rounded-full font-medium">
                <Trophy size={16} /> Score: <span>{score}</span>
              </span>
              <button 
                onClick={onHelpClick} 
                className="bg-white text-primary p-2 rounded-full"
                aria-label="Help"
              >
                <HelpCircle size={16} />
              </button>
            </div>
          </div>
          <p className="mt-2 text-sm md:text-base opacity-90">Learn to identify and counter misinformation online</p>
        </div>
      </header>

      {/* Mobile Score (visible only on mobile) */}
      <div className="md:hidden bg-white p-3 shadow-sm">
        <div className="flex justify-center items-center gap-2 text-primary font-medium">
          <Trophy size={16} /> Score: <span>{score}</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6 md:py-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-neutral text-white py-6">
        <div className="container mx-auto px-4">
          <div className="md:flex md:justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg font-bold mb-2">MisInfo Detector</h2>
              <p className="text-sm text-gray-300">An educational tool to help people identify and counter misinformation</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">Powered By</h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">OpenAI's ChatGPT API</span>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-sm text-gray-400 text-center">
            <p>&copy; {new Date().getFullYear()} MisInfo Detector. For educational purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
