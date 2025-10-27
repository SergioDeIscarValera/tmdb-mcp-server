import { z } from "zod";
import { type InferSchema, type PromptMetadata } from "xmcp";

export const schema = {
  preferences: z
    .string()
    .describe(
      "User's movie preferences (e.g., 'action movies with strong female leads')"
    ),
};

export const metadata: PromptMetadata = {
  name: "movie-recommendation-query",
  title: "Movie Recommendation Query",
  description: "Generate a query to find movies based on user preferences.",
  role: "user",
};

export default function movieRecommendationQuery({
  preferences,
}: InferSchema<typeof schema>) {
  return `Find movies that match these preferences: ${preferences}. Suggest 3-5 titles with a brief explanation of why they fit.`;
}
