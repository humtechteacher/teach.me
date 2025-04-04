import { Request, Response } from "express";
import { generateMisinformationTweet, evaluateSource } from "../services/openai";

// Cache to store tweet data so we don't lose the misinformation details
// when sending tweets to the client
const tweetCache = new Map();

/**
 * Controller function to generate and return a new misinformation tweet
 */
export async function getTweet(req: Request, res: Response) {
  try {
    const tweet = await generateMisinformationTweet();
    
    // Store the tweet in our cache so we can access it later
    // when evaluating the source
    tweetCache.set(tweet.id, tweet);
    
    // Send back everything except the misinformationDetails
    // which should be hidden from the user
    const { misinformationDetails, ...tweetForClient } = tweet;
    
    res.json(tweetForClient);
  } catch (error) {
    console.error("Error in getTweet controller:", error);
    res.status(500).json({ 
      message: "Failed to generate misinformation tweet" 
    });
  }
}

/**
 * Controller function to evaluate a submitted source against a tweet
 */
export async function evaluateUserSource(req: Request, res: Response) {
  try {
    const { tweetId, sourceUrl } = req.body;
    
    // Validate request body
    if (!tweetId || !sourceUrl) {
      return res.status(400).json({ 
        message: "Missing required fields: tweetId and sourceUrl" 
      });
    }
    
    // Get the tweet from cache
    const tweet = tweetCache.get(tweetId);
    if (!tweet) {
      return res.status(404).json({ 
        message: "Tweet not found. Please get a new tweet." 
      });
    }
    
    // Evaluate the source against the tweet
    const result = await evaluateSource(
      tweet.content,
      tweet.misinformationDetails,
      sourceUrl
    );
    
    res.json(result);
  } catch (error) {
    console.error("Error in evaluateUserSource controller:", error);
    res.status(500).json({ 
      message: "Failed to evaluate source" 
    });
  }
}
