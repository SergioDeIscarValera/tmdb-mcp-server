import { z } from "zod";
import { type InferSchema } from "xmcp";
import { getTrendingMovies } from "../services/tmdbService";
import MovieCarouselResource from "../resources/(movies)/[query]/carousel";

export const schema = {
  timeWindow: z
    .enum(["day", "week"])
    .default("week")
    .describe(
      "The time window for trending movies: 'day' or 'week' (default: 'week')"
    ),
  page: z
    .number()
    .optional()
    .default(1)
    .describe("The page number of results (default: 1)"),
};

export const metadata = {
  name: "get_trending",
  description:
    "Fetch trending movies for a specific time window using TMDB API and return a carousel UI with movie titles, overviews, and posters.",
  annotations: {
    title: "Trending Movies",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function getTrending({
  timeWindow,
  page,
}: InferSchema<typeof schema>) {
  try {
    const data = await getTrendingMovies({ timeWindow, page });
    const uiContent = await MovieCarouselResource({
      query: `trending-${timeWindow}`,
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
          text: `Error generating trending movies: ${(error as Error).message}`,
        },
      ],
    };
  }
}
