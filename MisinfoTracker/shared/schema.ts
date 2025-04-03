import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const claims = pgTable("claims", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  category: text("category"),
  createdAt: text("created_at").notNull(),
});

export const verifications = pgTable("verifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  claimId: integer("claim_id").notNull(),
  sourceUrl: text("source_url").notNull(),
  explanation: text("explanation"),
  isValid: boolean("is_valid"),
  feedback: jsonb("feedback"),
  createdAt: text("created_at").notNull(),
});

export const gameStats = pgTable("game_stats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  correct: integer("correct").notNull().default(0),
  incorrect: integer("incorrect").notNull().default(0),
  streak: integer("streak").notNull().default(0),
  score: integer("score").notNull().default(0),
});

// Zod schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertClaimSchema = createInsertSchema(claims).pick({
  text: true,
  category: true,
}).extend({
  createdAt: z.string().default(() => new Date().toISOString()),
});

export const insertVerificationSchema = createInsertSchema(verifications).pick({
  claimId: true,
  sourceUrl: true,
  explanation: true,
}).extend({
  createdAt: z.string().default(() => new Date().toISOString()),
});

export const insertGameStatsSchema = createInsertSchema(gameStats).pick({
  userId: true,
  correct: true,
  incorrect: true,
  streak: true,
  score: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Claim = typeof claims.$inferSelect;
export type InsertClaim = z.infer<typeof insertClaimSchema>;
export type Verification = typeof verifications.$inferSelect;
export type InsertVerification = z.infer<typeof insertVerificationSchema>;
export type GameStats = typeof gameStats.$inferSelect;
export type InsertGameStats = z.infer<typeof insertGameStatsSchema>;

// Request/Response types
export type GenerateClaimResponse = {
  id: number;
  text: string;
  category?: string;
};

export type VerifySourceRequest = {
  claimId: number;
  sourceUrl: string;
  explanation?: string;
};

export type VerifySourceResponse = {
  isValid: boolean;
  feedback: {
    title: string;
    message: string;
    details: {
      items: {
        icon: string;
        iconColor: string;
        text: string;
      }[];
      summary?: string;
    };
  };
  stats: {
    correct: number;
    incorrect: number;
    accuracy: string;
    streak: number;
    score: number;
  };
};

export type GetStatsResponse = {
  correct: number;
  incorrect: number;
  accuracy: string;
  streak: number;
  score: number;
};
