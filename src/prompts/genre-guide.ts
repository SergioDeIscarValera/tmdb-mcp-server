import { z } from "zod";
import { type InferSchema, type PromptMetadata } from "xmcp";

export const schema = {
  genre: z
    .string()
    .describe("The movie genre to describe (e.g., Action, Drama)"),
};

export const metadata: PromptMetadata = {
  name: "genre-guide",
  title: "Genre Guide",
  description: "Generate a description of a movie genre for the user.",
  role: "assistant",
};

export default function genreGuide({ genre }: InferSchema<typeof schema>) {
  return `The ${genre} genre typically features ${
    genre.toLowerCase() === "action"
      ? "fast-paced sequences, high stakes, and physical conflicts"
      : genre.toLowerCase() === "drama"
      ? "emotional narratives and deep character development"
      : "unique themes and storytelling styles"
  }. Would you like to see ${genre} movies?`;
}
