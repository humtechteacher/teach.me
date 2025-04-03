import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout";
import InstructionsAccordion from "@/components/instructionsAccordion";
import TweetCard from "@/components/tweetCard";
import GameStats from "@/components/gameStats";
import VerificationForm from "@/components/verificationForm";
import FeedbackPanel from "@/components/feedbackPanel";
import HelpTips from "@/components/helpTips";
import HelpModal from "@/components/helpModal";
import type { GameStats as GameStatsType, GenerateClaimResponse, VerifySourceResponse } from "@shared/schema";
import type { Feedback, Stats } from "@/lib/types";

export default function Home() {
  const { toast } = useToast();
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [stats, setStats] = useState<Stats>({
    correct: 0,
    incorrect: 0,
    accuracy: "0%",
    streak: 0,
    score: 0,
  });

  // Fetch initial claim
  const {
    data: currentClaim,
    isLoading: isClaimLoading,
    error: claimError,
    refetch: refetchClaim,
  } = useQuery<GenerateClaimResponse>({
    queryKey: ["/api/claims/generate"],
  });

  // Get initial stats
  const {
    data: initialStats,
    isLoading: isStatsLoading,
  } = useQuery<GameStatsType>({
    queryKey: ["/api/stats"],
    retry: false,
  });

  // Update stats when initialStats loads
  useEffect(() => {
    if (initialStats) {
      setStats({
        correct: initialStats.correct,
        incorrect: initialStats.incorrect,
        accuracy: initialStats.correct + initialStats.incorrect > 0 
          ? `${Math.round((initialStats.correct / (initialStats.correct + initialStats.incorrect)) * 100)}%` 
          : "0%",
        streak: initialStats.streak,
        score: initialStats.score,
      });
    }
  }, [initialStats]);

  // Generate new claim mutation
  const generateClaimMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("GET", "/api/claims/generate", undefined);
      return await res.json() as GenerateClaimResponse;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/claims/generate"], data);
      setShowFeedback(false);
    },
    onError: (error) => {
      toast({
        title: "Error generating claim",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    },
  });

  // Verify source mutation
  const verifySourceMutation = useMutation({
    mutationFn: async ({ claimId, sourceUrl, explanation }: { claimId: number, sourceUrl: string, explanation?: string }) => {
      const res = await apiRequest("POST", "/api/verify", {
        claimId,
        sourceUrl,
        explanation,
      });
      return await res.json() as VerifySourceResponse;
    },
    onSuccess: (data) => {
      setFeedback(data.feedback);
      setStats(data.stats);
      setShowFeedback(true);
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
    onError: (error) => {
      toast({
        title: "Error verifying source",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const handleGenerateNewClaim = () => {
    generateClaimMutation.mutate();
  };

  const handleVerifySource = (sourceUrl: string, explanation?: string) => {
    if (!currentClaim) return;
    
    verifySourceMutation.mutate({
      claimId: currentClaim.id,
      sourceUrl,
      explanation,
    });
  };

  const handleTryAgain = () => {
    setShowFeedback(false);
  };

  const handleNextClaim = () => {
    setShowFeedback(false);
    handleGenerateNewClaim();
  };

  // If there's an error fetching the initial claim, display an error message
  if (claimError) {
    return (
      <Layout 
        score={stats.score} 
        onHelpClick={() => setShowHelpModal(true)}
      >
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Claim</h2>
          <p className="text-gray-700 mb-6">There was a problem generating a misinformation claim.</p>
          <button
            onClick={() => refetchClaim()}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
        
        {showHelpModal && <HelpModal onClose={() => setShowHelpModal(false)} />}
      </Layout>
    );
  }

  return (
    <Layout 
      score={stats.score} 
      onHelpClick={() => setShowHelpModal(true)}
    >
      <InstructionsAccordion />
      
      <div className="md:flex md:space-x-6">
        <div className="md:w-1/2">
          <TweetCard 
            claim={currentClaim?.text} 
            isLoading={isClaimLoading || generateClaimMutation.isPending} 
            onGenerateNew={handleGenerateNewClaim} 
          />
          <GameStats stats={stats} isLoading={isStatsLoading} />
        </div>
        
        <div className="md:w-1/2">
          {showFeedback && feedback ? (
            <FeedbackPanel 
              feedback={feedback} 
              onTryAgain={handleTryAgain} 
              onNextClaim={handleNextClaim} 
            />
          ) : (
            <VerificationForm 
              isLoading={verifySourceMutation.isPending} 
              onSubmit={handleVerifySource}
              disabled={isClaimLoading || !currentClaim}
            />
          )}
          <HelpTips />
        </div>
      </div>
      
      {showHelpModal && <HelpModal onClose={() => setShowHelpModal(false)} />}
    </Layout>
  );
}
