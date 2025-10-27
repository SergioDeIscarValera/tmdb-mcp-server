import { z } from "zod";
import { type InferSchema, type PromptMetadata } from "xmcp";

export const schema = {
  title: z.string().describe("The title of the movie"),
  overview: z.string().describe("The movie's overview or synopsis"),
  genres: z.array(z.string()).describe("Array of genre names"),
  releaseDate: z.string().describe("Release date of the movie"),
};

export const metadata: PromptMetadata = {
  name: "describe-movie",
  title: "Describe Movie",
  description:
    "Generate a user-friendly description of a movie based on its details.",
  role: "assistant",
};

export default function describeMovie({
  title,
  overview,
  genres,
  releaseDate,
}: InferSchema<typeof schema>) {
  return `**${title}** (${releaseDate}) is a ${genres.join(
    ", "
  )} movie. ${overview}`;
}
