import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertTriangle } from "lucide-react";

export default function HelpTips() {
  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-neutral">Helpful Resources</h2>
      </div>
      <CardContent className="p-4">
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <CheckCircle className="h-4 w-4 text-secondary mt-1 mr-2" />
            <span>Use fact-checking websites like Snopes, FactCheck.org, or Reuters Fact Check</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-4 w-4 text-secondary mt-1 mr-2" />
            <span>Look for scientific journals or government health agencies for medical claims</span>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-4 w-4 text-secondary mt-1 mr-2" />
            <span>Check multiple sources to verify information</span>
          </li>
          <li className="flex items-start">
            <AlertTriangle className="h-4 w-4 text-yellow-500 mt-1 mr-2" />
            <span>Watch out for websites with political bias or questionable credibility</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}
