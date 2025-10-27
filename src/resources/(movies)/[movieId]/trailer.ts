import { z } from "zod";
import { type ResourceMetadata, type InferSchema } from "xmcp";
import { createUIResource } from "@mcp-ui/server";
import { openAIDesingCSS } from "../../../styles/openaiDesing";

export const schema = {
  movieId: z.string().describe("The ID of the movie (e.g., '550')"),
  trailerKey: z
    .string()
    .describe("The YouTube video ID of the trailer (e.g., 'O-b2VfmmbyA')"),
};

export const metadata: ResourceMetadata = {
  name: "movie-trailer",
  title: "Movie Trailer",
  description:
    "Displays a clickable thumbnail for a YouTube trailer video that opens in a new tab.",
  mimeType: "text/html",
};

export default async function MovieTrailer({
  movieId,
  trailerKey,
}: InferSchema<typeof schema>) {
  const htmlString = `
    <style>
      ${openAIDesingCSS}

      .trailer-container {
        max-width: 800px;
        margin: 0 auto;
        padding: var(--spacing-md);
        background-color: var(--background);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-md);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .trailer-link {
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        max-width: 100%;
      }

      .trailer-image {
        width: 100%;
        max-width: 800px;
        aspect-ratio: 16 / 9;
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
        display: block;
        margin: 0 auto;
      }

      .trailer-link:hover .trailer-image {
        transform: scale(1.05);
        opacity: 0.9;
      }

      @media (max-width: 600px) {
        .trailer-container {
          max-width: 90%;
        }
        .trailer-image {
          max-width: 100%;
        }
      }
    </style>
    <div class="trailer-container">
      <a href="https://www.youtube.com/watch?v=${trailerKey}" target="_blank" rel="noopener noreferrer" class="trailer-link" style="display: flex; justify-content: center; align-items: center; margin: 16px;">
        <img src="https://img.youtube.com/vi/${trailerKey}/hqdefault.jpg" alt="Movie Trailer Thumbnail" class="trailer-image" style="border-radius: 16px"/>
      </a>
    </div>
  `;

  return createUIResource({
    uri: `ui://movies/${movieId}/trailer`,
    content: { type: "rawHtml", htmlString },
    encoding: "text",
  });
}
