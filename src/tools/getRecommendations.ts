import { z } from "zod";
import { type InferSchema } from "xmcp";
import { getMovieRecommendations } from "../services/tmdbService";
import MovieCarouselResource from "../resources/(movies)/[query]/carousel";

export const schema = {
  movieId: z
    .number()
    .describe(
      "The ID of the movie to fetch recommendations for (e.g., 27205 for 'Inception')"
    ),
  page: z
    .number()
    .optional()
    .default(1)
    .describe("The page number of results (default: 1)"),
};

export const metadata = {
  name: "get_movie_recommendations",
  description:
    "Fetch movie recommendations based on a specific movie using TMDB API and return a carousel UI with recommended movie titles, overviews, and posters.",
  annotations: {
    title: "Movie Recommendations",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function getRecommendations({
  movieId,
  page,
}: InferSchema<typeof schema>) {
  try {
    const data = await getMovieRecommendations({ movieId, page });
    const uiContent = await MovieCarouselResource({
      query: `recommendations-${movieId}`,
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
          text: `Error generating movie recommendations: ${
            (error as Error).message
          }`,
        },
      ],
    };
  }
}
