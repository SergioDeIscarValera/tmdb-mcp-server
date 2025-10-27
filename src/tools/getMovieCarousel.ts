import { z } from "zod";
import { type InferSchema } from "xmcp";
import { searchMovies } from "../services/tmdbService";
import MovieCarouselResource from "../resources/(movies)/[query]/carousel";

export const schema = {
  query: z.string().describe("The search query for movies (e.g., 'Inception')"),
  page: z
    .number()
    .optional()
    .default(1)
    .describe("The page number of results (default: 1)"),
};

export const metadata = {
  name: "get_movie_carousel",
  description:
    "Search for movies using TMDB API and return a carousel UI with movie titles, overviews, and posters.",
  annotations: {
    title: "Movie Carousel",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function getMovieCarousel({
  query,
  page,
}: InferSchema<typeof schema>) {
  try {
    const data = await searchMovies({ query, page });
    const uiContent = await MovieCarouselResource({
      query,
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
          text: `Error generating movie carousel: ${(error as Error).message}`,
        },
      ],
    };
  }
}
