import { z } from "zod";
import { type InferSchema, type PromptMetadata } from "xmcp";

export const schema = {
  movieTitle: z.string().describe("The title of the movie"),
  details: z
    .string()
    .describe(
      "Key details about the movie (e.g., cast, director, plot points)"
    ),
};

export const metadata: PromptMetadata = {
  name: "movie-trivia",
  title: "Movie Trivia",
  description: "Generate trivia questions based on movie details.",
  role: "user",
};

export default function movieTrivia({
  movieTitle,
  details,
}: InferSchema<typeof schema>) {
  return `Create three trivia questions about "${movieTitle}" based on these details: ${details}. Make them engaging and suitable for movie fans.`;
}
