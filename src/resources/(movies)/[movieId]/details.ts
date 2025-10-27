import { createUIResource, type UIResource } from "@mcp-ui/server";
import { z } from "zod";
import { openAIDesingCSS } from "../../../styles/openaiDesing";
import { MovieDetailsSchema } from "../../../services/tmdbService";
import { type InferSchema } from "xmcp";

export const schema = {
  movieId: z
    .number()
    .describe(
      "The ID of the movie to fetch details for (e.g., 27205 for 'Inception')"
    ),
  movieDataPromise: z
    .promise(MovieDetailsSchema)
    .describe("The promise of the movie details data"),
};

export default async function MovieDetailsResource({
  movieId,
  movieDataPromise,
}: InferSchema<typeof schema>): Promise<UIResource> {
  const movie = await movieDataPromise;
  const html = `
    <style>
      ${openAIDesingCSS}

      /* Movie details specific styles */
      .movie-details-container {
        padding: var(--space-12);
        max-width: var(--container-xl);
        margin-left: auto;
        margin-right: auto;
        background-color: var(--bg-primary);
      }
      .movie-details {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-12);
        background-color: var(--bg-secondary);
        border-radius: var(--radius-lg);
        padding: var(--space-12);
        box-shadow: var(--shadow-md);
      }
      .movie-poster {
        flex: 0 0 300px;
        max-width: 100%;
      }
      .movie-poster img {
        max-width: 100%;
        border-radius: var(--radius-base);
        object-fit: cover;
        height: 450px;
      }
      .movie-poster .no-poster {
        height: 450px;
        background-color: var(--bg-tertiary);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: var(--radius-base);
        color: var(--text-secondary);
        font-size: var(--font-size-base);
        text-align: center;
      }
      .movie-info {
        flex: 1;
        min-width: 300px;
      }
      .movie-info h2 {
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-semibold);
        color: var(--text-primary);
        margin-bottom: var(--space-6);
        line-height: var(--line-height-tight);
      }
      .movie-info p {
        font-size: var(--font-size-base);
        color: var(--text-secondary);
        margin-bottom: var(--space-8);
        line-height: var(--line-height-normal);
      }
      .movie-info .genres,
      .movie-info .cast {
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
        margin-bottom: var(--space-8);
      }
      .movie-info .genres span,
      .movie-info .cast span {
        display: inline-block;
        background-color: var(--bg-tertiary);
        padding: var(--space-2) var(--space-4);
        border-radius: var(--radius-sm);
        margin-right: var(--space-4);
        margin-bottom: var(--space-4);
      }
      .movie-info .rating,
      .movie-info .runtime {
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
        margin-bottom: var(--space-8);
      }
    </style>
    <div class="movie-details-container">
      <div class="movie-details">
        <div class="movie-poster">
          ${
            movie.poster_path
              ? `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" loading="lazy">`
              : `<div class="no-poster">No Poster Available</div>`
          }
        </div>
        <div class="movie-info">
          <h2>${movie.title}</h2>
          <p>${movie.overview || "No overview available."}</p>
          <div class="genres">
            ${
              movie.genres
                ?.map((genre) => `<span>${genre.name}</span>`)
                .join("") || "No genres available."
            }
          </div>
          <div class="rating">Rating: ${
            movie.vote_average?.toFixed(1) || "N/A"
          }/10</div>
          <div class="runtime">Runtime: ${
            movie.runtime ? `${movie.runtime} minutes` : "N/A"
          }</div>
          <div class="cast">
            Cast: ${
              movie.credits?.cast
                ?.slice(0, 5)
                .map(
                  (actor) =>
                    `<span>${actor.name} as ${actor.character || "N/A"}</span>`
                )
                .join("") || "No cast information available."
            }
          </div>
        </div>
      </div>
    </div>
  `;
  return createUIResource({
    uri: `ui://movies/${movieId}/details`,
    content: { type: "rawHtml", htmlString: html },
    encoding: "text",
  });
}
