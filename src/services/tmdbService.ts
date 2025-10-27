import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;

if (!API_KEY) {
  throw new Error("TMDB_API_KEY is not set in .env");
}

// Schema para validar respuestas de búsqueda de películas, recomendaciones, descubrimiento, trending y upcoming
export const MovieSearchResultSchema = z.object({
  page: z.number(),
  results: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      release_date: z.string().optional(),
      overview: z.string(),
      poster_path: z.string().nullable().optional(),
    })
  ),
  total_pages: z.number(),
  total_results: z.number(),
});

// Schema para validar detalles de una película
export const MovieDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  release_date: z.string().optional(),
  poster_path: z.string().nullable().optional(),
  runtime: z.number().nullable().optional(),
  vote_average: z.number().optional(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })).optional(),
  credits: z
    .object({
      cast: z
        .array(
          z.object({
            name: z.string(),
            character: z.string().optional(),
          })
        )
        .optional(),
      crew: z
        .array(
          z.object({
            name: z.string(),
            job: z.string().optional(),
          })
        )
        .optional(),
    })
    .optional(),
});

// Schema para validar lista de géneros
export const MovieGenresSchema = z.object({
  genres: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
});

// Schema para validar búsqueda de actores
export const ActorSearchResultSchema = z.object({
  page: z.number(),
  results: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  total_pages: z.number(),
  total_results: z.number(),
});

// Schema para validar reseñas de películas
export const MovieReviewsSchema = z.object({
  id: z.number(),
  page: z.number(),
  results: z.array(
    z.object({
      author: z.string(),
      content: z.string(),
      created_at: z.string(),
      id: z.string(),
      updated_at: z.string(),
      url: z.string(),
      author_details: z
        .object({
          name: z.string().optional(),
          username: z.string(),
          avatar_path: z.string().nullable().optional(),
          rating: z.number().nullable().optional(),
        })
        .optional(),
    })
  ),
  total_pages: z.number(),
  total_results: z.number(),
});

// Schema para validar videos de películas
export const MovieVideosSchema = z.object({
  id: z.number(),
  results: z.array(
    z.object({
      iso_639_1: z.string(),
      iso_3166_1: z.string(),
      name: z.string(),
      key: z.string(),
      site: z.string(),
      size: z.number(),
      type: z.string(),
      official: z.boolean(),
      published_at: z.string(),
      id: z.string(),
    })
  ),
});

export interface SearchMoviesParams {
  query: string;
  page?: number;
}

export async function searchMovies(
  params: SearchMoviesParams
): Promise<z.infer<typeof MovieSearchResultSchema>> {
  const { query, page = 1 } = params;
  const url = `${TMDB_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}&page=${page}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `TMDB API error: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();
    return MovieSearchResultSchema.parse(data);
  } catch (error) {
    console.error("Error in TMDB service:", error);
    throw new Error(`Failed to fetch movies: ${(error as Error).message}`);
  }
}

export interface GetMovieDetailsParams {
  movieId: number;
}

export async function getMovieDetails(
  params: GetMovieDetailsParams
): Promise<z.infer<typeof MovieDetailsSchema>> {
  const { movieId } = params;
  const url = `${TMDB_BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `TMDB API error: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();
    return MovieDetailsSchema.parse(data);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw new Error(
      `Failed to fetch movie details: ${(error as Error).message}`
    );
  }
}

export interface GetMovieRecommendationsParams {
  movieId: number;
  page?: number;
}

export async function getMovieRecommendations(
  params: GetMovieRecommendationsParams
): Promise<z.infer<typeof MovieSearchResultSchema>> {
  const { movieId, page = 1 } = params;
  const url = `${TMDB_BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}&page=${page}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `TMDB API error: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();
    return MovieSearchResultSchema.parse(data);
  } catch (error) {
    console.error("Error fetching movie recommendations:", error);
    throw new Error(
      `Failed to fetch movie recommendations: ${(error as Error).message}`
    );
  }
}

export async function getMovieGenres(): Promise<
  z.infer<typeof MovieGenresSchema>
> {
  const url = `${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `TMDB API error: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();
    return MovieGenresSchema.parse(data);
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    throw new Error(
      `Failed to fetch movie genres: ${(error as Error).message}`
    );
  }
}

export interface SearchActorsParams {
  query: string;
  page?: number;
}

export async function searchActors(
  params: SearchActorsParams
): Promise<z.infer<typeof ActorSearchResultSchema>> {
  const { query, page = 1 } = params;
  const url = `${TMDB_BASE_URL}/search/person?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}&page=${page}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `TMDB API error: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();
    return ActorSearchResultSchema.parse(data);
  } catch (error) {
    console.error("Error searching actors:", error);
    throw new Error(`Failed to search actors: ${(error as Error).message}`);
  }
}

export interface DiscoverMoviesByGenreParams {
  genreId: number;
  page?: number;
}

export async function discoverMoviesByGenre(
  params: DiscoverMoviesByGenreParams
): Promise<z.infer<typeof MovieSearchResultSchema>> {
  const { genreId, page = 1 } = params;
  const url = `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `TMDB API error: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();
    return MovieSearchResultSchema.parse(data);
  } catch (error) {
    console.error("Error discovering movies by genre:", error);
    throw new Error(
      `Failed to discover movies by genre: ${(error as Error).message}`
    );
  }
}

export interface DiscoverMoviesByActorParams {
  actorId: number;
  page?: number;
}

export async function discoverMoviesByActor(
  params: DiscoverMoviesByActorParams
): Promise<z.infer<typeof MovieSearchResultSchema>> {
  const { actorId, page = 1 } = params;
  const url = `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_people=${actorId}&page=${page}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `TMDB API error: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();
    return MovieSearchResultSchema.parse(data);
  } catch (error) {
    console.error("Error discovering movies by actor:", error);
    throw new Error(
      `Failed to discover movies by actor: ${(error as Error).message}`
    );
  }
}

export interface GetTrendingMoviesParams {
  timeWindow: "day" | "week";
  page?: number;
}

export async function getTrendingMovies(
  params: GetTrendingMoviesParams
): Promise<z.infer<typeof MovieSearchResultSchema>> {
  const { timeWindow, page = 1 } = params;
  const url = `${TMDB_BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}&page=${page}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `TMDB API error: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();
    return MovieSearchResultSchema.parse(data);
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw new Error(
      `Failed to fetch trending movies: ${(error as Error).message}`
    );
  }
}

export interface GetUpcomingMoviesParams {
  page?: number;
}

export async function getUpcomingMovies(
  params: GetUpcomingMoviesParams
): Promise<z.infer<typeof MovieSearchResultSchema>> {
  const { page = 1 } = params;
  const url = `${TMDB_BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `TMDB API error: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();
    return MovieSearchResultSchema.parse(data);
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw new Error(
      `Failed to fetch upcoming movies: ${(error as Error).message}`
    );
  }
}

export interface GetMovieReviewsParams {
  movieId: number;
  language?: string;
  page?: number;
}

export async function getMovieReviews(
  params: GetMovieReviewsParams
): Promise<z.infer<typeof MovieReviewsSchema>> {
  const { movieId, language = "en-US", page = 1 } = params;
  const url = `${TMDB_BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=${encodeURIComponent(
    language
  )}&page=${page}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `TMDB API error: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();
    return MovieReviewsSchema.parse(data);
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    throw new Error(
      `Failed to fetch movie reviews: ${(error as Error).message}`
    );
  }
}

export interface GetMovieTrailerParams {
  movieId: number;
  language?: string;
}

export async function getMovieTrailer(
  params: GetMovieTrailerParams
): Promise<z.infer<typeof MovieVideosSchema>["results"][0] | null> {
  const { movieId, language = "en-US" } = params;
  const url = `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=${encodeURIComponent(
    language
  )}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `TMDB API error: ${response.status} - ${response.statusText}`
      );
    }
    const data = await response.json();
    const videos = MovieVideosSchema.parse(data).results;
    const trailer = videos.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );
    return trailer || null;
  } catch (error) {
    console.error("Error fetching movie trailer:", error);
    throw new Error(
      `Failed to fetch movie trailer: ${(error as Error).message}`
    );
  }
}
