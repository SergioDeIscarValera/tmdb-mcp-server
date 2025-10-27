import { z } from "zod";
import { type InferSchema } from "xmcp";
import { discoverMoviesByGenre } from "../services/tmdbService";
import MovieCarouselResource from "../resources/(movies)/[query]/carousel";

export const schema = {
  genreId: z
    .number()
    .describe(
      "The ID of the genre to discover movies for. Use get_movie_genres first to get available genre IDs."
    ),
  page: z
    .number()
    .optional()
    .default(1)
    .describe("The page number of results (default: 1)"),
};

export const metadata = {
  name: "get_movies_by_genre",
  description:
    "Discover movies by a specific genre using TMDB API and return a carousel UI. Use get_movie_genres first to get available genre IDs.",
  annotations: {
    title: "Movies by Genre",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function getMoviesByGenre({
  genreId,
  page,
}: InferSchema<typeof schema>) {
  try {
    const data = await discoverMoviesByGenre({ genreId, page });
    const uiContent = await MovieCarouselResource({
      query: `genre-${genreId}`,
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
          text: `Error generating movies by genre: ${(error as Error).message}`,
        },
      ],
    };
  }
}
