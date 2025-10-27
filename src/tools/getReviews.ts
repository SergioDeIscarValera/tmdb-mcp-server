import { z } from "zod";
import { type InferSchema } from "xmcp";
import { getMovieReviews } from "../services/tmdbService";

export const schema = {
  movieId: z
    .number()
    .describe(
      "The ID of the movie to fetch reviews for (e.g., 550 for 'Fight Club'). Use get_movie_id_by_title to find the ID."
    ),
  language: z
    .string()
    .default("en-US")
    .describe("The language of the reviews (e.g., 'en-US', 'es-ES')"),
  page: z
    .number()
    .optional()
    .default(1)
    .describe("The page number of results (default: 1)"),
};

export const metadata = {
  name: "get_reviews",
  description:
    "Fetch movie reviews for a specific movie using TMDB API and return them as plain text JSON. Use get_movie_id_by_title first to get the movie ID.",
  annotations: {
    title: "Movie Reviews",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function getReviews({
  movieId,
  language,
  page,
}: InferSchema<typeof schema>) {
  try {
    const data = await getMovieReviews({ movieId, language, page });
    const simplifiedReviews = data.results.slice(0, 5).map((review) => ({
      author: review.author,
      content: review.content,
      created_at: review.created_at,
      rating: review.author_details?.rating || null,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(simplifiedReviews) }],
    };
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error fetching movie reviews: ${(error as Error).message}`,
        },
      ],
    };
  }
}
