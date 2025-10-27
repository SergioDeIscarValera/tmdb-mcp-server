# TMDB MCP Server

A **Model Context Protocol (MCP)** server that seamlessly integrates the [The Movie Database (TMDB) API](https://developer.themoviedb.org/docs) with the [OpenAI Apps SDK](https://developers.openai.com/apps-sdk). This project enables AI agents (like those in ChatGPT or Claude) to call tools for movie-related queries, rendering interactive visual components (e.g., carousels, details cards, and trailer thumbnails) while adhering to OpenAI's design guidelines for a native, conversational experience.

Built for developers experimenting with MCP, this server powers AI-driven movie discovery, recommendations, and media browsing. It's designed to be modular, extensible, and production-ready, with a focus on clean architecture and reusability.

> **Note**: This project requires a [TMDB API key](https://www.themoviedb.org/settings/api) (free tier available). Set it in `.env` as `TMDB_API_KEY=your_key_here`.

## Purpose

The core goal of this project is to bridge TMDB's rich movie data with MCP, allowing AI models to:

- **Query and Discover**: Search movies, actors, genres, and trends.
- **Visualize Results**: Render UI components like carousels for search results, detail views, and clickable trailer thumbnails.
- **Chain Actions**: Tools return structured data (e.g., JSON IDs) for the AI to chain calls (e.g., search → get details → show trailer).
- **Enhance AI Workflows**: Non-visual tools provide raw data for reasoning, while visual ones create engaging, inline experiences in AI chats.

This setup demonstrates how MCP can extend AI agents with external APIs, following OpenAI's [design guidelines](https://developers.openai.com/apps-sdk/concepts/design-guidelines) for seamless integration—conversational, simple, and accessible.

Tested with [MCPJam Inspector](https://github.com/MCPJam/inspector) (a Postman-like tool for MCP servers) for local debugging, tool execution, and LLM playground simulations. MCPJam supports STDIO/SSE/HTTP transports and multi-model testing (e.g., Claude, GPT).

## Features

- **Core Tools**:

  - `getMovieIdByTitle`: Get movie ID from title (text output for chaining).
  - `getMovieGenres`: List available genres for filtering (JSON).
  - `searchActorsIds`: Search actors and return IDs/names (JSON).
  - `getReviews`: Fetch movie reviews in specified language (JSON).

- **Visual Tools (with UI Components)**:

  - `getMovieCarousel`: Search movies and render a responsive carousel.
  - `getMovieDetails`: Show detailed movie info (poster, cast, genres).
  - `getRecommendations`: Carousel of similar movies.
  - `getMoviesByGenre`: Genre-based movie discovery carousel (use `getMovieGenres` first).
  - `getMoviesByActor`: Actor filmography carousel (use `searchActorsIds` first).
  - `getTrending`: Trending movies carousel (daily/weekly).
  - `getUpcoming`: Upcoming releases carousel.
  - `getTrailer`: Clickable trailer thumbnail (opens YouTube in new tab).

- **Design Compliance**: All UI uses a custom OpenAI-inspired CSS system with light/dark mode, spacing scales, and accessibility (WCAG 2.1).

- **Testing & Debugging**: Compatible with MCPJam Inspector for visual tool testing and LLM simulations.

## Tech Stack

| Category            | Technologies                                                                                  |
| ------------------- | --------------------------------------------------------------------------------------------- |
| **Framework**       | [xMCP](https://xmcp.dev/) (MCP server scaffolding, auto-registration of tools/resources)      |
| **API Integration** | [TMDB API](https://developer.themoviedb.org/docs) (v3, with Zod validation)                   |
| **UI Rendering**    | [MCP UI](https://mcpui.dev/) (`@mcp-ui/server` for rawHtml resources)                         |
| **Design System**   | Custom OpenAI Apps SDK CSS (variables for colors, spacing, typography, shadows)               |
| **Validation**      | [Zod](https://zod.dev/) (schemas for inputs/outputs)                                          |
| **Environment**     | TypeScript, Node.js 20+, HTTP transport (configurable for STDIO)                              |
| **Testing**         | [MCPJam Inspector](https://github.com/MCPJam/inspector) (local MCP debugging, LLM playground) |
| **Deployment**      | Vercel/Next.js compatible (via xMCP adapters)                                                 |

## Project Structure

```
.
├── package.json          # Dependencies and scripts
├── package-lock.json     # Lockfile
├── README.md            # You are here
├── src/
│   ├── prompts/         # MCP prompts (e.g., review-code.ts)
│   ├── resources/       # UI widgets (rawHtml components)
│   │   └── (movies)/
│   │       ├── [query]/     # Dynamic: carousel.ts (reusable for searches)
│   │       └── [movieId]/  # Dynamic: details.ts, trailer.ts
│   ├── services/        # API logic (tmdbService.ts with Zod schemas)
│   ├── styles/          # Design system (openaiDesing.ts)
│   └── tools/           # MCP tools (endpoints, e.g., getMovieCarousel.ts)
├── tsconfig.json        # TypeScript config
├── xmcp.config.ts       # xMCP configuration (HTTP transport, paths)
└── xmcp-env.d.ts        # Type declarations
```

## Quick Start

### Prerequisites

- Node.js 20+.
- TMDB API key (set in `.env`).

### Installation

1. Clone the repo:

   ```
   git clone https://github.com/SergioDeIscarValera/tmdb-mcp-server.git
   cd tmdb-mcp-server
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up `.env`:

   ```
   TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. Run in development:
   ```
   npm run dev
   ```
   - Server starts at `http://localhost:3001/mcp`.

### Testing with MCPJam Inspector

1. Install MCPJam Inspector:

   ```
   npx @mcpjam/inspector@beta
   ```

   - Opens in your browser for visual testing.

2. Connect your server:
   - Add HTTP server: `http://localhost:3001/mcp`.
   - Test tools (e.g., `getMovieCarousel`), resources, and prompts.
   - Use the LLM playground to simulate AI calls.

### Usage Example

Connect to Cursor/Claude Desktop via `mcp.json`:

```json
{
  "mcpServers": {
    "tmdb-mcp-server": {
      "url": "http://localhost:3001/mcp"
    }
  }
}
```

Prompt: "Show a carousel of Inception movies."

- AI calls `getMovieCarousel` → Renders visual carousel.

## API Endpoints & Tools

All tools are auto-registered via xMCP. Key examples:

| Tool                 | Description                      | Input                               | Output                           |
| -------------------- | -------------------------------- | ----------------------------------- | -------------------------------- |
| `getMovieCarousel`   | Search movies → Carousel UI      | `query: string`                     | Visual carousel                  |
| `getMovieDetails`    | Movie details → Card UI          | `movieId: number`                   | Visual details                   |
| `getRecommendations` | Similar movies → Carousel        | `movieId: number`                   | Visual carousel                  |
| `getMovieIdByTitle`  | Title → ID                       | `title: string`                     | Text ID (e.g., "27205")          |
| `getReviews`         | Reviews → JSON                   | `movieId: number, language: string` | Text JSON                        |
| `getTrailer`         | Trailer thumbnail → Clickable UI | `movieId: number`                   | Visual thumbnail (opens YouTube) |

Full list in `src/tools/`.

## Deployment

- **Vercel**: Use xMCP's Next.js adapter (`npx init-xmcp@latest` with Next.js).
- **Build**: `npm run build` → Deploy `dist/http.js`.
- **Env Vars**: Set `TMDB_API_KEY` in production.

## License

This project is open-source and free to use, modify, and distribute without any restrictions. You are welcome to copy, adapt, or build upon it for any purpose. A mention or credit to the original author, **Sergio de Iscar Valera**, is greatly appreciated but not required.

## Acknowledgments

- **Author**: [Sergio de Iscar Valera](https://www.linkedin.com/in/sergio-de-iscar-valera/)
- **Technologies**: xMCP, TMDB API, OpenAI Apps SDK, MCP UI, Zod, MCPJam Inspector
- **Inspiration**: OpenAI's MCP design guidelines and TMDB's developer community

Feel free to contribute, report issues, or suggest improvements via GitHub! 🚀
