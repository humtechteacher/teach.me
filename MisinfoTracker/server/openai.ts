import OpenAI from "openai";
import type { Feedback } from "../client/src/lib/types";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const OPENAI_MODEL = "gpt-4o";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || "sk-" // Will be replaced with real API key from environment
});

/**
 * Generate a misinformation claim using OpenAI
 */
export async function generateMisinformationClaim(): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: 
            "You are an expert at generating realistic but false claims that appear on social media. " +
            "Generate ONE random misinformation tweet that sounds believable but contains false information. " +
            "The tweet should be on topics like health, science, politics, or current events. " +
            "Make it realistic - something someone might actually post and believe. " +
            "Do not make it extremely outlandish or easily identifiable as false. " +
            "Format it like a social media post with hashtags if appropriate. " +
            "Only return the tweet text itself, no additional commentary or explanations."
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    return response.choices[0].message.content?.trim() || 
      "Scientists discovered that drinking coffee mixed with lemon juice can boost your metabolism by 500% and melt away fat overnight. Big pharma doesn't want you to know this simple trick! #WeightLossTruth";
  } catch (error) {
    console.error("Error generating misinformation claim:", error);
    throw new Error("Failed to generate misinformation claim");
  }
}

/**
 * Verify if a source URL effectively counters a misinformation claim
 */
export async function verifySourceUrl(
  claim: string, 
  sourceUrl: string, 
  explanation?: string
): Promise<{ isValid: boolean; feedback: Feedback }> {
  try {
    const response = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: 
            "You are an expert fact-checker that evaluates if a given source effectively debunks a misinformation claim. " +
            "Analyze whether the provided URL contains information that directly addresses and counters the claim. " +
            "Consider the credibility of the source, relevance to the specific claim, and quality of evidence. " +
            "You'll be given a misinformation claim, a URL that supposedly counters it, and optionally an explanation from the user about why they think it's effective. " +
            "Provide your analysis in a JSON format with the following structure: " +
            "{ " +
            "  \"isValid\": boolean, " +
            "  \"feedback\": { " +
            "    \"title\": string, " +
            "    \"message\": string, " +
            "    \"details\": { " +
            "      \"items\": [ " +
            "        { \"icon\": string, \"iconColor\": string, \"text\": string } " +
            "      ], " +
            "      \"summary\": string " +
            "    } " +
            "  } " +
            "} " +
            "For icons and iconColors, use this key: " +
            "- If source is valid: icon should be \"<i class=\\\"fas fa-check\\\"></i>\" and iconColor should be \"text-secondary\" " +
            "- If source is invalid: icon should be \"<i class=\\\"fas fa-times\\\"></i>\" and iconColor should be \"text-accent\" " +
            "- For warnings: icon should be \"<i class=\\\"fas fa-exclamation-triangle\\\"></i>\" and iconColor should be \"text-yellow-500\" " +
            "The title should indicate success or failure, the message should provide a brief overall assessment, " +
            "and details should include specific points about the source's relevance and effectiveness."
        },
        {
          role: "user",
          content:
            `Misinformation Claim: ${claim}\n\n` +
            `Source URL: ${sourceUrl}\n\n` +
            (explanation ? `User Explanation: ${explanation}` : "")
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    // Ensure required structure is present or provide fallback
    if (!result.isValid || !result.feedback) {
      console.warn("OpenAI response missing expected structure, using fallback");
      return createFallbackResponse(false);
    }
    
    return {
      isValid: result.isValid,
      feedback: result.feedback
    };
  } catch (error) {
    console.error("Error verifying source URL:", error);
    return createFallbackResponse(false);
  }
}

/**
 * Create a fallback response in case of API failure
 */
function createFallbackResponse(isValid: boolean): { isValid: boolean; feedback: Feedback } {
  if (isValid) {
    return {
      isValid: true,
      feedback: {
        title: "Great job!",
        message: "Your source effectively counters the misinformation!",
        details: {
          items: [
            {
              icon: "<i class=\"fas fa-check\"></i>",
              iconColor: "text-secondary",
              text: "Source credibility: High"
            },
            {
              icon: "<i class=\"fas fa-check\"></i>",
              iconColor: "text-secondary",
              text: "Relevant counter-evidence provided"
            },
            {
              icon: "<i class=\"fas fa-check\"></i>",
              iconColor: "text-secondary",
              text: "Source directly addresses the false claim"
            }
          ],
          summary: "+10 points added to your score!"
        }
      }
    };
  } else {
    return {
      isValid: false,
      feedback: {
        title: "Not quite right",
        message: "Your source doesn't effectively counter the misinformation.",
        details: {
          items: [
            {
              icon: "<i class=\"fas fa-times\"></i>",
              iconColor: "text-accent",
              text: "Source doesn't directly address the specific claim"
            },
            {
              icon: "<i class=\"fas fa-times\"></i>",
              iconColor: "text-accent",
              text: "Source credibility issues detected"
            },
            {
              icon: "<i class=\"fas fa-exclamation-triangle\"></i>",
              iconColor: "text-yellow-500",
              text: "Try finding a more specific fact-check on this topic"
            }
          ],
          summary: "Try again with a different source."
        }
      }
    };
  }
}
