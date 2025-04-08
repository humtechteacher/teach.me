import type { Express } from "express";
import { createServer, type Server } from "http";
import { getTweet, evaluateUserSource } from "./controllers/misinformationController";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create HTTP server
  const httpServer = createServer(app);

  // API status check endpoint
  app.get("/api/status", (req, res) => {
    const apiKeyExists = !!process.env.OPENAI_API_KEY;
    
    res.json({
      status: "online",
      apiKeyConfigured: apiKeyExists,
      timestamp: new Date().toISOString()
    });
  });

  // API routes for the misinformation game
  
  /**
   * GET /api/misinformation/tweet
   * 
   * Generates and returns a new tweet containing misinformation
   * The tweet contains a factual inaccuracy or misleading claim
   * 
   * Returns: Tweet object with content, author, username, and date
   * (misinformationDetails is kept server-side)
   */
  app.get("/api/misinformation/tweet", getTweet);

  /**
   * POST /api/misinformation/evaluate
   * 
   * Evaluates a user-submitted URL to see if it effectively
   * counters the misinformation in a specific tweet
   * 
   * Request body: { tweetId: string, sourceUrl: string }
   * Returns: { isCorrect: boolean, explanation: string }
   */
  app.post("/api/misinformation/evaluate", evaluateUserSource);

  return httpServer;
}
