import { type InferSchema } from "xmcp";
import { getMovieGenres as getMovieGenresService } from "../services/tmdbService";

export const schema = {};

export const metadata = {
  name: "get_movie_genres",
  description:
    "Fetch the list of available movie genres from TMDB API and return them as plain text JSON. Use this before filtering movies by genre.",
  annotations: {
    title: "Get Movie Genres",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function getMovieGenres({}: InferSchema<typeof schema>) {
  try {
    const data = await getMovieGenresService();
    return {
      content: [{ type: "text", text: JSON.stringify(data.genres) }],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error fetching movie genres: ${(error as Error).message}`,
        },
      ],
    };
  }
}
