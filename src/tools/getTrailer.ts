import { z } from "zod";
import { type InferSchema } from "xmcp";
import { getMovieTrailer } from "../services/tmdbService";
import MovieTrailerResource from "../resources/(movies)/[movieId]/trailer";

export const schema = {
  movieId: z
    .number()
    .describe(
      "The ID of the movie to fetch the trailer for (e.g., 550 for 'Fight Club'). Use get_movie_id_by_title to find the ID."
    ),
  language: z
    .string()
    .default("en-US")
    .describe("The language of the trailer (e.g., 'en-US', 'es-ES')"),
};

export const metadata = {
  name: "get_trailer",
  description:
    "Fetch a YouTube trailer for a specific movie using TMDB API and return an embedded video UI. Use get_movie_id_by_title first to get the movie ID.",
  annotations: {
    title: "Movie Trailer",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function getTrailer({
  movieId,
  language,
}: InferSchema<typeof schema>) {
  try {
    const trailer = await getMovieTrailer({ movieId, language });
    if (!trailer) {
      return {
        content: [
          {
            type: "text",
            text: "No YouTube trailer found for this movie.",
          },
        ],
      };
    }
    const uiContent = await MovieTrailerResource({
      movieId: String(movieId),
      trailerKey: trailer.key,
    });
    return {
      content: [uiContent],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error fetching movie trailer: ${(error as Error).message}`,
        },
      ],
    };
  }
}
