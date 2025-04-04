import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model for authentication (from original schema)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Activity results table to store user progress (optional - for future implementation)
export const activityResults = pgTable("activity_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  activityType: text("activity_type").notNull(),
  score: integer("score").notNull(),
  maxScore: integer("max_score").notNull(),
  completed: boolean("completed").notNull().default(true),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

export const insertActivityResultSchema = createInsertSchema(activityResults).pick({
  userId: true,
  activityType: true,
  score: true,
  maxScore: true,
  completed: true,
});

export type InsertActivityResult = z.infer<typeof insertActivityResultSchema>;
export type ActivityResult = typeof activityResults.$inferSelect;
