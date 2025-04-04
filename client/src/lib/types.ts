import { ReactNode } from "react";

// Interface for activity objects displayed on the home page
export interface Activity {
  title: string;
  description: string;
  path: string;
  icon: ReactNode;
  category: string;
  available: boolean;
}

// Interface for the tweet objects in the misinformation game
export interface Tweet {
  id: string;
  content: string;
  author: string;
  username: string;
  date: string;
  misinformationDetails?: string; // Hidden from users, used by API
}

// Interface for the result of evaluating a source against a tweet
export interface EvaluationResult {
  isCorrect: boolean;
  explanation: string;
}

// All possible game states in the misinformation game
export type GameState = "playing" | "evaluating" | "correct" | "incorrect" | "completed";
