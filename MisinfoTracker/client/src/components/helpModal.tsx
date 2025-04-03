import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface HelpModalProps {
  onClose: () => void;
}

export default function HelpModal({ onClose }: HelpModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 md:mx-0 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-neutral">How This Works</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X />
          </button>
        </div>
        <div className="p-5 max-h-[70vh] overflow-y-auto">
          <h3 className="font-semibold text-lg mb-2">About this Tool</h3>
          <p className="mb-4">MisInfo Detector is an educational tool designed to help you practice identifying and responding to misinformation online.</p>
          
          <h3 className="font-semibold text-lg mb-2">How to Play</h3>
          <ol className="list-decimal pl-5 space-y-2 mb-4">
            <li>The system generates a realistic-looking social media post containing misinformation</li>
            <li>Research the claim to determine if it's true or false</li>
            <li>Find a credible website that debunks or disproves the claim</li>
            <li>Submit the URL of that website</li>
            <li>Our system will evaluate if your source effectively counters the misinformation</li>
            <li>You'll receive feedback and points for correct answers</li>
          </ol>
          
          <h3 className="font-semibold text-lg mb-2">Tips for Finding Reliable Sources</h3>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Use established fact-checking websites</li>
            <li>Check academic sources and scientific journals</li>
            <li>Rely on government agencies for official information</li>
            <li>Look for articles with cited sources</li>
            <li>Cross-check information across multiple reliable sources</li>
          </ul>
          
          <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-800 mb-4">
            <p><strong>Important:</strong> This is a learning tool. The misinformation presented is artificially generated for educational purposes.</p>
          </div>
          
          <Button onClick={onClose} className="w-full">
            Got it!
          </Button>
        </div>
      </div>
    </div>
  );
}
