import { z } from "zod";
import { type InferSchema } from "xmcp";
import { searchActors } from "../services/tmdbService";

export const schema = {
  query: z
    .string()
    .describe(
      "The name of the actor to search for (e.g., 'Leonardo DiCaprio')"
    ),
  page: z
    .number()
    .optional()
    .default(1)
    .describe("The page number of results (default: 1)"),
};

export const metadata = {
  name: "search_actors_ids",
  description:
    "Search for actors by name using TMDB API and return a list of actor IDs and names as plain text JSON.",
  annotations: {
    title: "Search Actors IDs",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function searchActorsIds({
  query,
  page,
}: InferSchema<typeof schema>) {
  try {
    const data = await searchActors({ query, page });
    const results = data.results.slice(0, 5).map((actor) => ({
      id: actor.id,
      name: actor.name,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(results) }],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error searching actors IDs: ${(error as Error).message}`,
        },
      ],
    };
  }
}
