import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface TweetCardProps {
  claim?: string;
  isLoading: boolean;
  onGenerateNew: () => void;
}

export default function TweetCard({ claim, isLoading, onGenerateNew }: TweetCardProps) {
  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-neutral mb-1">Generated Misinformation Claim</h2>
        <p className="text-sm text-gray-500">Analyze this claim and find evidence to counter it</p>
      </div>
      <CardContent className="p-5">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start mb-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                <User size={20} />
              </div>
            </div>
            <div className="ml-3">
              <p className="font-semibold text-neutral">Random User</p>
              <p className="text-gray-500 text-sm">@user123</p>
            </div>
          </div>
          <div className="tweet-content mb-3">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <p className="text-neutral text-lg">{claim || "Loading claim..."}</p>
            )}
          </div>
          <div className="flex text-gray-500 text-sm justify-between">
            <span><i className="far fa-clock"></i> {new Date().toLocaleTimeString()} · {new Date().toLocaleDateString()}</span>
            <div className="flex space-x-4">
              <span><i className="far fa-heart"></i> 1.2K</span>
              <span><i className="fas fa-retweet"></i> 342</span>
              <span><i className="far fa-comment"></i> 48</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full text-primary border-primary hover:bg-blue-50"
            onClick={onGenerateNew}
            disabled={isLoading}
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Generate New Claim
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
