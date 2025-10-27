import { z } from "zod";
import { type InferSchema } from "xmcp";
import { searchMovies } from "../services/tmdbService";

export const schema = {
  title: z
    .string()
    .describe("The title of the movie to search for (e.g., 'Inception')"),
};

export const metadata = {
  name: "get_movie_id_by_title",
  description:
    "Search for a movie by its title using TMDB API and return the ID of the first matching movie as plain text.",
  annotations: {
    title: "Get Movie ID by Title",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function getMovieIdByTitle({
  title,
}: InferSchema<typeof schema>) {
  try {
    const data = await searchMovies({ query: title, page: 1 });
    if (data.results.length === 0) {
      return {
        content: [
          { type: "text", text: `No movie found with title "${title}"` },
        ],
      };
    }
    const movieId = data.results[0].id;
    return {
      content: [{ type: "text", text: `${movieId}` }],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error searching for movie ID by title: ${
            (error as Error).message
          }`,
        },
      ],
    };
  }
}
