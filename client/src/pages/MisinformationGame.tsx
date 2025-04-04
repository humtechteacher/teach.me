import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, XCircle, Loader2, ArrowLeft, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { 
  Tweet, 
  EvaluationResult,
  GameState
} from "@/lib/types";

// Misinformation Game component - the main activity
const MisinformationGame = () => {
  // State for game management
  const [gameState, setGameState] = useState<GameState>("playing");
  const [currentRound, setCurrentRound] = useState(1);
  const [totalRounds] = useState(5);
  const [currentScore, setCurrentScore] = useState(0);
  const [sourceUrl, setSourceUrl] = useState("");
  const [feedback, setFeedback] = useState<EvaluationResult | null>(null);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  // Get a new tweet using React Query
  const { 
    data: currentTweet,
    isLoading: tweetLoading,
    isError: tweetError,
    refetch: refetchTweet
  } = useQuery<Tweet>({ 
    queryKey: ['/api/misinformation/tweet'],
    refetchOnWindowFocus: false,
    enabled: gameState !== "completed" // Only fetch when game is active
  });

  // Mutation for evaluating the source
  const evaluateSourceMutation = useMutation({
    mutationFn: async (url: string) => {
      const res = await apiRequest('POST', '/api/misinformation/evaluate', {
        tweetId: currentTweet?.id,
        sourceUrl: url
      });
      return res.json() as Promise<EvaluationResult>;
    },
    onSuccess: (data) => {
      setFeedback(data);
      setGameState(data.isCorrect ? "correct" : "incorrect");
      
      // Update score if correct
      if (data.isCorrect) {
        setCurrentScore(prev => prev + 1);
      }
    },
    onError: (error) => {
      toast({
        title: "Error evaluating source",
        description: error.message || "An error occurred while evaluating your source. Please try again.",
        variant: "destructive"
      });
      setGameState("playing");
    }
  });

  // Reset game to initial state
  const resetGame = () => {
    setCurrentRound(1);
    setCurrentScore(0);
    setSourceUrl("");
    setFeedback(null);
    setGameState("playing");
    refetchTweet();
  };

  // Handle source URL submission
  const handleSubmitSource = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!sourceUrl.trim()) {
      toast({
        title: "Missing URL",
        description: "Please enter a valid URL to a source.",
        variant: "destructive"
      });
      return;
    }
    
    // Check for valid URL format
    try {
      new URL(sourceUrl);
    } catch (err) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL format (e.g., https://example.com).",
        variant: "destructive"
      });
      return;
    }
    
    // Set evaluation state and submit for checking
    setGameState("evaluating");
    evaluateSourceMutation.mutate(sourceUrl);
  };

  // Move to next round or end game
  const handleNextRound = () => {
    if (currentRound >= totalRounds) {
      // End game
      setGameState("completed");
    } else {
      // Move to next round
      setCurrentRound(prev => prev + 1);
      setSourceUrl("");
      setFeedback(null);
      setGameState("playing");
      refetchTweet();
    }
  };

  // Allow retrying with a different source
  const handleTryAgain = () => {
    setSourceUrl("");
    setGameState("playing");
  };

  // Calculate the progress percentage
  const progressPercentage = (currentRound / totalRounds) * 100;

  // Score message based on final score
  const getScoreMessage = () => {
    const percentage = (currentScore / totalRounds) * 100;
    if (percentage >= 80) return "Excellent job! You're a skilled fact-checker!";
    if (percentage >= 60) return "Good work! You're getting better at spotting misinformation.";
    if (percentage >= 40) return "Not bad! Keep practicing your fact-checking skills.";
    return "Keep practicing! Identifying misinformation takes practice.";
  };

  return (
    <div className="container-app">
      <div className="max-w-3xl mx-auto">
        {/* Activity Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Misinformation Game</h1>
            <p className="text-gray-600 mt-1">Find credible sources to counter misinformation in social media posts.</p>
          </div>
          <Link href="/">
            <button className="text-primary hover:text-blue-700 font-medium flex items-center">
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Home
            </button>
          </Link>
        </div>

        {/* Instructions Panel */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h2 className="font-semibold text-blue-800 mb-2 flex items-center">
            <Info className="h-5 w-5 mr-2" />
            How to Play
          </h2>
          <ol className="list-decimal list-inside text-blue-800 space-y-1 ml-5">
            <li>Read the AI-generated social media post below</li>
            <li>Identify the potential misinformation in the post</li>
            <li>Search the web for a credible source that counters this claim</li>
            <li>Submit the URL and AI will evaluate if it effectively disproves the misinformation</li>
          </ol>
        </div>

        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Round {currentRound} of {totalRounds}</span>
            <span className="text-sm font-medium text-gray-700">Score: {currentScore}</span>
          </div>
          <Progress value={progressPercentage} className="h-2.5" />
        </div>

        {/* Show loading state while fetching tweet */}
        {tweetLoading ? (
          <Card className="mb-8 flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <p className="ml-2 text-gray-600">Loading challenge...</p>
          </Card>
        ) : tweetError ? (
          <Card className="mb-8 p-6 bg-red-50">
            <CardContent className="flex items-start pt-6">
              <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
              <div className="ml-3">
                <h3 className="font-medium text-red-800">Error loading challenge</h3>
                <p className="text-red-700 text-sm mt-1">
                  We couldn't load a new challenge. Please try refreshing the page.
                </p>
                <Button 
                  variant="destructive" 
                  className="mt-4"
                  onClick={() => refetchTweet()}
                >
                  Retry
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : currentTweet ? (
          /* Tweet Card */
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm mb-8 max-w-2xl mx-auto">
            <CardContent className="p-5">
              {/* Tweet Header */}
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">{currentTweet.author}</p>
                  <p className="text-gray-500 text-sm">@{currentTweet.username}</p>
                </div>
              </div>
              
              {/* Tweet Content */}
              <div className="mb-4 text-gray-800 text-lg">
                {currentTweet.content}
              </div>
              
              {/* Tweet Footer */}
              <div className="text-gray-500 text-sm">
                {new Date(currentTweet.date).toLocaleTimeString()} · {new Date(currentTweet.date).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ) : null}

        {/* Game state dependent components */}
        {gameState === "playing" && (
          <div id="submission-form" className="mb-8">
            <h3 className="font-semibold text-gray-800 mb-3">Submit a credible source that counters this claim:</h3>
            <form onSubmit={handleSubmitSource}>
              <div className="mb-4">
                <Input
                  type="url"
                  id="source-url"
                  placeholder="Paste URL to a credible source (e.g., news article, scientific publication)"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  required
                  className="w-full px-4 py-3"
                />
              </div>
              <div>
                <Button type="submit" className="w-full">
                  Verify Source
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Feedback Panels */}
        {gameState === "evaluating" && (
          <Card className="rounded-lg border p-5 mb-8">
            <CardContent className="pt-5 text-center">
              <div className="flex justify-center mb-2">
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
              </div>
              <h3 className="font-medium text-gray-800 mb-1">Analyzing your source...</h3>
              <p className="text-gray-600 text-sm">We're using AI to check if your source effectively counters the misinformation.</p>
            </CardContent>
          </Card>
        )}

        {gameState === "correct" && feedback && (
          <Card className="rounded-lg border p-5 mb-8 bg-green-50 border-green-200">
            <CardContent className="pt-0 p-0">
              <div className="flex items-start p-4">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <div className="ml-3">
                  <h3 className="font-medium text-green-800">Great job!</h3>
                  <div className="mt-2 text-green-700 text-sm">
                    <p>{feedback.explanation}</p>
                  </div>
                  <div className="mt-4">
                    <Button
                      onClick={handleNextRound}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {currentRound >= totalRounds ? "See Results" : "Continue"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {gameState === "incorrect" && feedback && (
          <Card className="rounded-lg border p-5 mb-8 bg-red-50 border-red-200">
            <CardContent className="pt-0 p-0">
              <div className="flex items-start p-4">
                <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                <div className="ml-3">
                  <h3 className="font-medium text-red-800">Not quite right</h3>
                  <div className="mt-2 text-red-700 text-sm">
                    <p>{feedback.explanation}</p>
                  </div>
                  <div className="mt-4">
                    <Button
                      onClick={handleTryAgain}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Game Completion Summary */}
        {gameState === "completed" && (
          <Card className="rounded-lg bg-blue-50 border border-blue-200 p-6 text-center mb-8">
            <CardContent className="pt-0 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Game Complete!</h2>
              <p className="text-lg mb-4">Your final score: <span className="font-bold">{currentScore}</span> out of <span>{totalRounds}</span></p>
              
              <div className="mb-6">
                <div className="inline-block bg-white rounded-full px-5 py-2 text-sm font-medium">
                  {getScoreMessage()}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  onClick={resetGame}
                  className="bg-primary hover:bg-blue-600"
                >
                  Play Again
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300"
                >
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MisinformationGame;
