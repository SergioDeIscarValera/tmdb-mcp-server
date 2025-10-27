import { createUIResource, UIResource } from "@mcp-ui/server";
import { openAIDesingCSS } from "../../../styles/openaiDesing";
import { z } from "zod";
import { MovieSearchResultSchema } from "../../../services/tmdbService";
import { InferSchema } from "xmcp";

export const schema = {
  query: z.string().describe("The search query for movies (e.g., 'Inception')"),
  moviesDataPromise: z
    .promise(MovieSearchResultSchema)
    .describe("The promise of the movies data"),
};

export default async function MovieCarouselResource({
  query,
  moviesDataPromise,
}: InferSchema<typeof schema>): Promise<UIResource> {
  const moviesData = await moviesDataPromise;
  const html = `
      <style>
        ${openAIDesingCSS}

        /* Carousel-specific styles */
        .carousel-container {
          padding: var(--space-12);
          max-width: var(--container-xl);
          margin-left: auto;
          margin-right: auto;
        }
        .carousel {
          display: flex;
          overflow-x: auto;
          gap: var(--space-8);
          scroll-behavior: smooth;
          padding-bottom: var(--space-8);
          background-color: var(--bg-secondary);
          border-radius: var(--radius-lg);
        }
        .carousel::-webkit-scrollbar {
          height: var(--space-4);
        }
        .carousel::-webkit-scrollbar-track {
          background: var(--bg-tertiary);
          border-radius: var(--radius-sm);
        }
        .carousel::-webkit-scrollbar-thumb {
          background: var(--accent-blue);
          border-radius: var(--radius-sm);
        }
        .movie-card {
          flex: 0 0 240px;
          background-color: var(--bg-tertiary);
          border: 1px solid var(--text-tertiary);
          border-radius: var(--radius-lg);
          padding: var(--space-8);
          box-shadow: var(--shadow-md);
          transition: transform var(--transition-base);
        }
        .movie-card:hover {
          transform: translateY(calc(-1 * var(--space-2)));
        }
        .movie-card img {
          max-width: 100%;
          border-radius: var(--radius-base);
          object-fit: cover;
          height: 360px;
        }
        .movie-card .no-poster {
          height: 360px;
          background-color: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-base);
          color: var(--text-secondary);
          font-size: var(--font-size-sm);
          text-align: center;
        }
        .movie-card h3 {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          margin: var(--space-6) 0 var(--space-4);
          line-height: var(--line-height-tight);
        }
        .movie-card p {
          font-size: var(--font-size-sm);
          color: var(--text-secondary);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      </style>
      <div class="carousel-container">
        <div class="carousel" id="carousel">
          ${moviesData.results
            .slice(0, 5)
            .map(
              (movie) => `
              <div class="movie-card">
                ${
                  movie.poster_path
                    ? `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" loading="lazy">`
                    : `<div class="no-poster">No Poster Available</div>`
                }
                <h3>${movie.title}</h3>
                <p>${movie.overview}</p>
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    `;
  return createUIResource({
    uri: `ui://movies/${encodeURIComponent(query)}/carousel`,
    content: { type: "rawHtml", htmlString: html },
    encoding: "text",
  });
}
