# app

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines React, TanStack Router, Hono, TRPC, and more.

> New to programming or running a project locally? Follow the [beginner's local setup guide](docs/local-setup-guide-for-beginners.md) to install the required tools and start the app.

## Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Router** - File-based routing with full type safety
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **Shared UI package** - shadcn/ui primitives live in `packages/ui`
- **Hono** - Lightweight, performant server framework
- **tRPC** - End-to-end type-safe APIs
- **Node.js** - Runtime environment
- **Drizzle** - TypeScript-first ORM
- **PostgreSQL** - PGlite locally and Neon in production
- **Vite+** - Unified Vite toolchain, workspace task runner, linting, and formatting

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

## Database Setup

This project uses one Drizzle `pg-core` schema and one set of PostgreSQL migrations with two separate data stores:

| Environment                   | Database                                            | Data location                                   |
| ----------------------------- | --------------------------------------------------- | ----------------------------------------------- |
| Local development             | [PGlite](https://pglite.dev/)                       | `packages/db/.data/pglite` on your computer     |
| Vercel preview and production | [Neon Postgres](https://neon.com/docs/introduction) | A remote Neon database connected through Vercel |

The schemas stay compatible, but the local and hosted databases do not share data. PGlite runs inside the application, so local development does not require PostgreSQL, Docker, or a separate database service.

The shared database API covers Drizzle's portable PostgreSQL query builders. Driver-specific clients and interactive transactions are intentionally not exposed because the production Neon HTTP driver does not support the same transaction API as PGlite.

1. Create `apps/server/.env` for the API:

```dotenv
CORS_ORIGIN=http://localhost:3001
```

2. Create `apps/web/.env` for the web app:

```dotenv
VITE_SERVER_URL=http://localhost:3000
```

3. Apply the schema to the local PGlite database:

```bash
pnpm run db:push
```

PGlite supports one local process at a time. Stop `pnpm run dev` before running `db:push`, `db:migrate`, or `db:studio`, and do not run those database commands concurrently.

4. Run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the web application.
The API is running at [http://localhost:3000](http://localhost:3000).

## UI Customization

React web apps in this stack share shadcn/ui primitives through `packages/ui`.

- Change design tokens and global styles in `packages/ui/src/styles/globals.css`
- Update shared primitives in `packages/ui/src/components/*`
- Adjust shadcn aliases or style config in `packages/ui/components.json` and `apps/web/components.json`

### Add more shared components

Run this from the project root to add more primitives to the shared UI package:

```bash
npx shadcn@latest add accordion dialog popover sheet table -c packages/ui
```

Import shared components like this:

```tsx
import { Button } from "@app/ui/components/button";
```

### Add app-specific blocks

If you want to add app-specific blocks instead of shared primitives, run the shadcn CLI from `apps/web`.

## Deployment

### Vercel Services

- Target: one Vercel Services project containing web + server
- Config: `vercel.json`
- Project framework: Services (the project root must be the repository root)
- Database: create or select a Neon database through the Vercel Neon integration, then connect it to the same Vercel project for the preview and production environments.
- Neon manages `DATABASE_URL` in Vercel. The environment sync commands intentionally do not upload or replace it with a local value.
- Link the project first: pnpm run deploy:setup
- Local Vercel dev with PGlite: pnpm run dev:vercel
- Sync preview env: pnpm run env:preview
- Sync production env: pnpm run env:production
- Apply committed migrations using the linked project's production Neon environment: pnpm run db:migrate:neon
- Dry-run check (no upload): pnpm run deploy:check
- Preview deploy: pnpm run deploy
- Production deploy: pnpm run deploy:prod
- Web requests under `/api/*` route to the server service and are rewritten before reaching the backend.
  Vercel Services share project environment variables, but deploys do not upload local `.env` files automatically. Link the repository root to the single Services project with `vercel link`, then run the env sync command before your first deploy, or pass one-off envs with `vercel deploy -e KEY=value`.
  Pass Vercel CLI flags to the env sync command directly, for example: `pnpm run env:production --scope your-team`.

Before running `pnpm run db:migrate:neon`, verify that the linked Vercel project and its production `DATABASE_URL` point to the intended Neon database. The command downloads that environment in memory and then runs Drizzle; it does not copy the URL into the local `.env`. Production migrations change remote data and should not be run against an unverified connection. Do not copy the local PGlite data directory or add a local database path to Vercel.

For more details, see the guide on [Deploying to Vercel](https://www.better-t-stack.dev/docs/guides/vercel).

## Git Hooks and Formatting

- Optional native Vite+ hooks: `pnpm run hooks:setup`
- Docs: [Vite+ commit hooks](https://viteplus.dev/guide/commit-hooks)
- Run checks: `pnpm run check`

## Project Structure

```
app/
├── apps/
│   ├── web/         # Frontend application (React + TanStack Router)
│   └── server/      # Backend API (Hono, TRPC)
├── packages/
│   ├── ui/          # Shared shadcn/ui components and styles
│   ├── api/         # API layer / business logic
│   └── db/          # Database schema & queries
```

## Available Scripts

- `pnpm run dev`: Start all applications in development mode
- `pnpm run build`: Build all applications
- `pnpm run dev:web`: Start only the web application
- `pnpm run dev:server`: Start only the server
- `pnpm run check-types`: Check TypeScript types across all apps
- `pnpm run db:push`: Apply the current schema to the local PGlite database
- `pnpm run db:generate`: Generate PostgreSQL migrations from schema changes
- `pnpm run db:migrate`: Apply generated migrations to the local PGlite database
- `pnpm run db:migrate:neon`: Load production env from the linked Vercel project and apply generated migrations to Neon
- `pnpm run db:studio`: Open Drizzle Studio for the local PGlite database
- `pnpm run check`: Run Vite+ format/lint checks and workspace TypeScript checks
- `pnpm run lint`: Run Vite+ lint checks
- `pnpm run format`: Run Vite+ formatting
- `pnpm run staged`: Run Vite+ checks against staged files
- `pnpm run hooks:setup`: Install Vite+ native Git hooks with `vp config`
- `pnpm run deploy:setup`: Link this repo to a Vercel project (first-time setup)
- `pnpm run dev:vercel`: Run the Vercel Services dev environment locally
- `pnpm run env:preview`: Sync non-database local env values to the Vercel preview environment
- `pnpm run env:production`: Sync non-database local env values to the Vercel production environment
- `pnpm run deploy`: Create a Vercel preview deployment
- `pnpm run deploy:prod`: Deploy to Vercel production
- `pnpm run deploy:check`: Dry-run a deploy to preview framework detection and included files without uploading
