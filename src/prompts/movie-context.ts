import { z } from "zod";
import { type InferSchema, type PromptMetadata } from "xmcp";

export const schema = {
  movieTitle: z.string().describe("The title of the movie"),
  director: z.string().optional().describe("The director of the movie"),
  cast: z.array(z.string()).describe("Array of main actors"),
};

export const metadata: PromptMetadata = {
  name: "movie-context",
  title: "Movie Context",
  description:
    "Provide additional context about a movie for richer AI responses.",
  role: "assistant",
};

export default function movieContext({
  movieTitle,
  director,
  cast,
}: InferSchema<typeof schema>) {
  return `**${movieTitle}** features ${cast.join(", ")}${
    director ? ` and is directed by ${director}` : ""
  }. Use this context to answer questions about the movie.`;
}
