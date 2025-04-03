import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Stats } from "@/lib/types";

interface GameStatsProps {
  stats: Stats;
  isLoading: boolean;
}

export default function GameStats({ stats, isLoading }: GameStatsProps) {
  return (
    <Card className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-neutral">Your Progress</h2>
      </div>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {isLoading ? (
            <>
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
              <Skeleton className="h-24 rounded-lg" />
            </>
          ) : (
            <>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500 mb-1">Correct</p>
                <p className="text-xl font-bold text-secondary">{stats.correct}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500 mb-1">Incorrect</p>
                <p className="text-xl font-bold text-accent">{stats.incorrect}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500 mb-1">Accuracy</p>
                <p className="text-xl font-bold text-primary">{stats.accuracy}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-sm text-gray-500 mb-1">Streak</p>
                <p className="text-xl font-bold text-yellow-500">{stats.streak}</p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
