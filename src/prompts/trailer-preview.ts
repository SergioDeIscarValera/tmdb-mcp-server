import { z } from "zod";
import { type InferSchema, type PromptMetadata } from "xmcp";

export const schema = {
  movieTitle: z.string().describe("The title of the movie"),
  overview: z.string().describe("The movie's overview or synopsis"),
};

export const metadata: PromptMetadata = {
  name: "trailer-preview",
  title: "Trailer Preview",
  description:
    "Generate a description of what to expect from a movie's trailer.",
  role: "assistant",
};

export default function trailerPreview({
  movieTitle,
  overview,
}: InferSchema<typeof schema>) {
  return `The trailer for "${movieTitle}" likely showcases: ${overview}. Expect visuals and music that highlight the movie's key themes.`;
}
