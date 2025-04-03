import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateMisinformationClaim, verifySourceUrl } from "./openai";
import { VerifySourceRequest } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate a random misinformation claim
  app.get("/api/claims/generate", async (req: Request, res: Response) => {
    try {
      // Generate a claim using OpenAI
      const claimText = await generateMisinformationClaim();
      
      // Store the claim in our database
      const claim = await storage.createClaim({
        text: claimText,
        category: "general",
        createdAt: new Date().toISOString(),
      });
      
      res.json({
        id: claim.id,
        text: claim.text,
        category: claim.category,
      });
    } catch (error) {
      console.error("Error generating claim:", error);
      res.status(500).json({ message: "Failed to generate misinformation claim" });
    }
  });

  // Verify if a source URL effectively counters a claim
  app.post("/api/verify", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const verifySchema = z.object({
        claimId: z.number(),
        sourceUrl: z.string().url(),
        explanation: z.string().optional(),
      });
      
      const validatedData = verifySchema.parse(req.body) as VerifySourceRequest;
      
      // Get the claim from storage
      const claim = await storage.getClaim(validatedData.claimId);
      if (!claim) {
        return res.status(404).json({ message: "Claim not found" });
      }
      
      // Verify the source using OpenAI
      const { isValid, feedback } = await verifySourceUrl(
        claim.text, 
        validatedData.sourceUrl,
        validatedData.explanation
      );
      
      // Create verification record
      await storage.createVerification({
        claimId: validatedData.claimId,
        sourceUrl: validatedData.sourceUrl,
        explanation: validatedData.explanation,
        isValid,
        feedback,
        createdAt: new Date().toISOString(),
      });
      
      // Update stats
      const stats = await storage.updateStats(isValid);
      
      // Calculate accuracy
      const accuracy = stats.correct + stats.incorrect > 0
        ? Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100) + '%'
        : '0%';
      
      res.json({
        isValid,
        feedback,
        stats: {
          ...stats,
          accuracy,
        },
      });
    } catch (error) {
      console.error("Error verifying source:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid request data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to verify source" });
    }
  });

  // Get user statistics
  app.get("/api/stats", async (req: Request, res: Response) => {
    try {
      const stats = await storage.getStats();
      
      // Calculate accuracy
      const accuracy = stats.correct + stats.incorrect > 0
        ? Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100) + '%'
        : '0%';
      
      res.json({
        ...stats,
        accuracy,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
