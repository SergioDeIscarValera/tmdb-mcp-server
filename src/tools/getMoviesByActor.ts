import { z } from "zod";
import { type InferSchema } from "xmcp";
import { discoverMoviesByActor } from "../services/tmdbService";
import MovieCarouselResource from "../resources/(movies)/[query]/carousel";

export const schema = {
  actorId: z
    .number()
    .describe(
      "The ID of the actor to discover movies for. Use search_actors_ids first to get the actor ID (e.g., 6193 for 'Leonardo DiCaprio')."
    ),
  page: z
    .number()
    .optional()
    .default(1)
    .describe("The page number of results (default: 1)"),
};

export const metadata = {
  name: "get_movies_by_actor",
  description:
    "Discover movies featuring a specific actor using TMDB API and return a carousel UI with movie titles, overviews, and posters. Use search_actors_ids first to get the actor ID.",
  annotations: {
    title: "Movies by Actor",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function getMoviesByActor({
  actorId,
  page,
}: InferSchema<typeof schema>) {
  try {
    const data = await discoverMoviesByActor({ actorId, page });
    const uiContent = await MovieCarouselResource({
      query: `actor-${actorId}`,
      moviesDataPromise: Promise.resolve(data),
    });
    return {
      content: [uiContent],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error generating movies by actor: ${(error as Error).message}`,
        },
      ],
    };
  }
}
