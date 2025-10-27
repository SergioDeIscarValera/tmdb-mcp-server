import { z } from "zod";
import { type InferSchema, type PromptMetadata } from "xmcp";

export const schema = {
  movieId: z.number().describe("The ID of the movie to summarize reviews for"),
  reviews: z.array(z.string()).describe("Array of review texts to summarize"),
};

export const metadata: PromptMetadata = {
  name: "summarize-reviews",
  title: "Summarize Movie Reviews",
  description:
    "Generate a concise summary of movie reviews for the AI to present.",
  role: "user",
};

export default function summarizeReviews({
  movieId,
  reviews,
}: InferSchema<typeof schema>) {
  return `Summarize the following reviews for movie ID ${movieId} in 2-3 sentences, highlighting the main sentiments and key points:

Reviews:
${reviews
  .map((review: string, index: number) => `${index + 1}. ${review}`)
  .join("\n")}`;
}
