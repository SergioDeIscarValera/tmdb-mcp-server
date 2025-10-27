import { z } from "zod";
import { type InferSchema } from "xmcp";
import { getUpcomingMovies } from "../services/tmdbService";
import MovieCarouselResource from "../resources/(movies)/[query]/carousel";

export const schema = {
  page: z
    .number()
    .optional()
    .default(1)
    .describe("The page number of results (default: 1)"),
};

export const metadata = {
  name: "get_upcoming",
  description:
    "Fetch upcoming movies using TMDB API and return a carousel UI with movie titles, overviews, and posters.",
  annotations: {
    title: "Upcoming Movies",
    readOnlyHint: true,
    destructiveHint: false,
    idempotentHint: true,
  },
};

export default async function getUpcoming({
  page,
}: InferSchema<typeof schema>) {
  try {
    const data = await getUpcomingMovies({ page });
    const uiContent = await MovieCarouselResource({
      query: `upcoming`,
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
          text: `Error generating upcoming movies: ${(error as Error).message}`,
        },
      ],
    };
  }
}
