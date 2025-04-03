import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, CheckCircle } from "lucide-react";

interface VerificationFormProps {
  onSubmit: (sourceUrl: string, explanation?: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

export default function VerificationForm({ onSubmit, isLoading, disabled }: VerificationFormProps) {
  const [sourceUrl, setSourceUrl] = useState("");
  const [explanation, setExplanation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sourceUrl.trim()) {
      onSubmit(sourceUrl, explanation);
    }
  };

  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-neutral mb-1">Find Counter Evidence</h2>
        <p className="text-sm text-gray-500">Submit a URL that disproves the claim</p>
      </div>
      <CardContent className="p-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="source-url" className="block text-sm font-medium text-gray-700 mb-1">
              Fact-checking Source URL
            </Label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link className="text-gray-400" size={16} />
              </div>
              <Input 
                type="url" 
                id="source-url" 
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                className="pl-10" 
                placeholder="https://reliable-source.org/fact-check"
                required
                disabled={disabled || isLoading}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Must be a valid URL to a credible source</p>
          </div>
          
          <div className="mb-4">
            <Label htmlFor="explanation" className="block text-sm font-medium text-gray-700 mb-1">
              Explain how this source refutes the claim (optional)
            </Label>
            <Textarea 
              id="explanation" 
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              rows={3}
              disabled={disabled || isLoading} 
            />
          </div>
          
          <div className="mt-6">
            <Button 
              type="submit" 
              className="w-full py-3"
              disabled={disabled || isLoading || !sourceUrl.trim()}
            >
              {isLoading ? (
                <>
                  <span className="inline-block h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></span>
                  Analyzing...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" /> Verify My Source
                </>
              )}
            </Button>
          </div>
        </form>

        {isLoading && (
          <div className="mt-4 text-center p-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
            <p className="mt-2 text-sm text-gray-600">Analyzing your submission...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
