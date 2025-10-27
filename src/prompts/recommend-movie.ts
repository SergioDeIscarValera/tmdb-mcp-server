import { z } from "zod";
import { type InferSchema, type PromptMetadata } from "xmcp";

export const schema = {
  movieTitle: z
    .string()
    .describe("The title of the movie to base recommendations on"),
  recommendations: z
    .array(z.string())
    .describe("Array of recommended movie titles"),
};

export const metadata: PromptMetadata = {
  name: "recommend-movie",
  title: "Recommend Movie",
  description:
    "Generate a recommendation prompt based on a movie and its similar titles.",
  role: "user",
};

export default function recommendMovie({
  movieTitle,
  recommendations,
}: InferSchema<typeof schema>) {
  return `Based on your interest in "${movieTitle}", here are some similar movies you might enjoy: ${recommendations.join(
    ", "
  )}. Which one would you like to explore?`;
}
