import { z } from "zod";
import { type InferSchema } from "xmcp";
import { getMovieDetails as getMovieDetailsService } from "../services/tmdbService";
import MovieDetailsResource from "../resources/(movies)/[movieId]/details";

export const schema = {
  movieId: z
    .number()
    .describe(
      "The ID of the movie to fetch details for (e.g., 27205 for 'Inception')"
    ),
};

export const metadata = {
  name: "get_movie_details",
  description:
    "Fetch detailed information about a specific movie using TMDB API and return a UI widget with title, overview, genres, runtime, rating, and cast.",
  annotations: {
    title: "Movie Details",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function getMovieDetails({
  movieId,
}: InferSchema<typeof schema>) {
  try {
    const data = await getMovieDetailsService({ movieId });
    const uiContent = await MovieDetailsResource({
      movieId,
      movieDataPromise: Promise.resolve(data),
    });
    return {
      content: [uiContent],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error generating movie details: ${(error as Error).message}`,
        },
      ],
    };
  }
}
