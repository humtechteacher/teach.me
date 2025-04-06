import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();

// Initialize the OpenAI client
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

/**
 * Generates a social media post containing misinformation
 * 
 * @returns A tweet with misinformation and hidden details about what is incorrect
 */
export async function generateMisinformationTweet() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: 
            "You are a generator of realistic social media posts containing misinformation for an educational game. " +
            "Create a tweet-like post that contains a factual inaccuracy or misleading claim in fields like science, health, " +
            "history, or current events. The misinformation should be subtle enough to seem plausible " +
            "to someone without domain expertise, but clearly incorrect to experts or when fact-checked. " +
            "The post should seem like something someone might genuinely share. " +
            "Respond in JSON format with the following fields: " +
            "content (the text of the post), author (a fictional name), username (a fictional username), " +
            "and misinformationDetails (an explanation of what is factually incorrect in the post)."
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      id: crypto.randomUUID(),
      content: result.content,
      author: result.author || "Random User",
      username: result.username || "random_user",
      date: new Date().toISOString(),
      misinformationDetails: result.misinformationDetails
    };
  } catch (error) {
    console.error("Error generating misinformation tweet:", error);
    throw new Error("Failed to generate misinformation content");
  }
}

/**
 * Evaluates a source URL against a tweet containing misinformation
 * 
 * @param tweetContent The content of the tweet with misinformation
 * @param misinformationDetails The explanation of what's incorrect in the tweet
 * @param sourceUrl The URL provided by the user to counter the misinformation
 * @returns An evaluation result with verdict and explanation
 */
export async function evaluateSource(tweetContent: string, misinformationDetails: string, sourceUrl: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: 
            "You are an expert fact-checker evaluating whether a source effectively counters a piece of misinformation. " +
            "Analyze whether the provided URL contains information that directly contradicts or corrects the misinformation " +
            "in the tweet. Consider source credibility, relevance, and specificity in addressing the exact misinformation. " +
            "Do not analyze the text content itself - assume you've already reviewed the source at the URL and know what it contains. " +
            "The URL itself might give clues about its content, publisher, and credibility. " +
            "Respond in JSON format with: isCorrect (boolean - true if the source effectively counters the misinformation), " +
            "and explanation (detailed reasoning for your verdict, including educational feedback for the user)."
        },
        {
          role: "user",
          content: JSON.stringify({
            tweet: tweetContent,
            misinformationDetails: misinformationDetails,
            sourceUrl: sourceUrl
          })
        }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      isCorrect: result.isCorrect,
      explanation: result.explanation
    };
  } catch (error) {
    console.error("Error evaluating source:", error);
    throw new Error("Failed to evaluate the source");
  }
}
