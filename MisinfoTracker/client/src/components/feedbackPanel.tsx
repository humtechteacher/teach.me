import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import type { Feedback } from "@/lib/types";

interface FeedbackPanelProps {
  feedback: Feedback;
  onTryAgain: () => void;
  onNextClaim: () => void;
}

export default function FeedbackPanel({ feedback, onTryAgain, onNextClaim }: FeedbackPanelProps) {
  const isValid = feedback.title.includes("Great job") || feedback.title.includes("Correct");
  
  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className={`p-4 border-b border-gray-100 ${isValid ? "text-secondary" : "text-accent"}`}>
        <h2 className="text-lg font-semibold">{feedback.title}</h2>
      </div>
      <CardContent className="p-5">
        <div className="text-center mb-4">
          {isValid ? (
            <CheckCircle className="h-12 w-12 text-secondary mx-auto" />
          ) : (
            <XCircle className="h-12 w-12 text-accent mx-auto" />
          )}
        </div>
        <p className={`text-center text-lg mb-4 ${isValid ? "text-secondary" : "text-accent"}`}>
          {feedback.message}
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm">
          <p className="font-medium">Source Analysis:</p>
          <ul className="mt-2 space-y-1">
            {feedback.details.items.map((item, index) => (
              <li key={index} className="flex items-start">
                <span 
                  className={`mt-1 mr-2 ${item.iconColor}`} 
                  dangerouslySetInnerHTML={{ __html: item.icon }} 
                />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
          {feedback.details.summary && (
            <p className="mt-2">{feedback.details.summary}</p>
          )}
        </div>
        <div className="mt-4 flex space-x-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={onTryAgain}
          >
            Try Again
          </Button>
          <Button 
            className="flex-1"
            onClick={onNextClaim}
          >
            Next Claim
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
