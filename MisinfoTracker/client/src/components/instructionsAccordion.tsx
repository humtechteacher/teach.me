import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function InstructionsAccordion() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-semibold text-neutral">How to Play</h2>
        <button className="text-gray-500 focus:outline-none">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      {isOpen && (
        <CardContent className="p-4 border-t border-gray-100">
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>You will be shown a tweet containing potential misinformation</li>
            <li>Your task is to find a credible source that disproves the claim</li>
            <li>Paste the URL of the reliable source in the form below</li>
            <li>The system will analyze if your source effectively counters the misinformation</li>
            <li>You'll receive feedback and points for correct answers</li>
          </ol>
          <div className="mt-4 p-3 bg-blue-50 text-sm rounded-md text-blue-800">
            <p><strong>Tip:</strong> Look for fact-checking websites, scientific studies, or official government sources.</p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
