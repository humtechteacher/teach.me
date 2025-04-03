import { 
  type User, 
  type InsertUser, 
  type Claim, 
  type InsertClaim,
  type Verification,
  type InsertVerification,
  type GameStats
} from "@shared/schema";
import type { Feedback } from "../client/src/lib/types";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getClaim(id: number): Promise<Claim | undefined>;
  createClaim(claim: InsertClaim): Promise<Claim>;
  createVerification(verification: InsertVerification & { isValid: boolean, feedback: Feedback }): Promise<Verification>;
  getStats(): Promise<GameStats>;
  updateStats(isCorrect: boolean): Promise<GameStats>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private claims: Map<number, Claim>;
  private verifications: Map<number, Verification>;
  private stats: GameStats;
  private userIdCounter: number;
  private claimIdCounter: number;
  private verificationIdCounter: number;

  constructor() {
    this.users = new Map();
    this.claims = new Map();
    this.verifications = new Map();
    this.userIdCounter = 1;
    this.claimIdCounter = 1;
    this.verificationIdCounter = 1;
    this.stats = {
      id: 1,
      userId: null,
      correct: 0,
      incorrect: 0,
      streak: 0,
      score: 0
    };
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getClaim(id: number): Promise<Claim | undefined> {
    return this.claims.get(id);
  }

  async createClaim(insertClaim: InsertClaim): Promise<Claim> {
    const id = this.claimIdCounter++;
    const claim: Claim = { ...insertClaim, id };
    this.claims.set(id, claim);
    return claim;
  }

  async createVerification(
    verification: InsertVerification & { isValid: boolean, feedback: Feedback }
  ): Promise<Verification> {
    const id = this.verificationIdCounter++;
    const newVerification = {
      ...verification,
      id,
      userId: null,
      feedback: verification.feedback as any
    };
    this.verifications.set(id, newVerification);
    return newVerification;
  }

  async getStats(): Promise<GameStats> {
    return this.stats;
  }

  async updateStats(isCorrect: boolean): Promise<GameStats> {
    if (isCorrect) {
      this.stats.correct += 1;
      this.stats.streak += 1;
      this.stats.score += 10;
    } else {
      this.stats.incorrect += 1;
      this.stats.streak = 0;
    }
    return this.stats;
  }
}

export const storage = new MemStorage();
