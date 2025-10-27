import { z } from "zod";
import { type InferSchema, type PromptMetadata } from "xmcp";

export const schema = {
  movie1: z
    .object({
      title: z.string().describe("Title of the first movie"),
      genres: z.array(z.string()).describe("Genres of the first movie"),
    })
    .describe("Details of the first movie"),
  movie2: z
    .object({
      title: z.string().describe("Title of the second movie"),
      genres: z.array(z.string()).describe("Genres of the second movie"),
    })
    .describe("Details of the second movie"),
};

export const metadata: PromptMetadata = {
  name: "movie-comparison",
  title: "Compare Movies",
  description:
    "Generate a comparison between two movies based on their genres and titles.",
  role: "user",
};

export default function movieComparison({
  movie1,
  movie2,
}: InferSchema<typeof schema>) {
  return `Compare "${movie1.title}" (${movie1.genres.join(", ")}) with "${
    movie2.title
  }" (${movie2.genres.join(
    ", "
  )}) in terms of themes, style, and audience appeal.`;
}
