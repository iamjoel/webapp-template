# AGENTS.md

This file applies to the entire repository. A more deeply nested `AGENTS.md`, if added later, overrides these instructions for its subtree.

## Project overview

This repository is a TypeScript ESM monorepo managed with pnpm workspaces and Vite+.

- `apps/web`: React 19 frontend using TanStack Router, TanStack Query, tRPC, Tailwind CSS v4, and Vite.
- `apps/server`: Node.js/Hono HTTP entrypoint. Keep this layer focused on transport concerns such as middleware, CORS, and mounting tRPC.
- `packages/api`: tRPC context, procedures, routers, and server-side business logic.
- `packages/db`: Drizzle PostgreSQL schema and migrations. Local development uses PGlite; deployed environments use Neon.
- `packages/env`: Zod-based server and browser environment validation.
- `packages/ui`: Shared shadcn/Base UI components, styles, and design tokens.
- `packages/config`: Shared strict TypeScript configuration.

Keep dependencies flowing through package boundaries: web consumes `api`, `ui`, and `env`; server consumes `api` and `env`; API code consumes `db` and `env`. Do not import source files across apps or bypass a package's public exports.

## Package management

- Use `pnpm` for all dependency installs and package scripts. Do not use npm or Yarn, and do not create another lockfile.
- Use the repository's pinned pnpm version from the root `package.json`.
- Get explicit user confirmation before adding any new production dependency.
- Add dependencies to the workspace that uses them, for example `pnpm --filter web add <package>`.
- Use `pnpm exec` or `pnpm dlx` for one-off CLIs instead of `npx`.
- Keep internal package dependencies on `workspace:*`. Prefer the workspace catalog in `pnpm-workspace.yaml` for third-party versions shared by multiple packages.
- Commit `pnpm-lock.yaml` changes only when dependency metadata actually changes.

## Code organization and conventions

- Keep the codebase in strict TypeScript and ESM. Do not weaken compiler settings or use `any` merely to bypass a type error.
- Follow the Vite+ formatter: double quotes, semicolons, and formatter-managed import/package ordering.
- Use type-only imports where appropriate. Remove unused code and handle indexed access safely.
- Use kebab-case filenames, PascalCase for components and types, camelCase for functions and variables, and UPPER_SNAKE_CASE for module constants.
- Within `apps/web`, use the `@/` alias. Across workspaces, use `@app/*` public exports instead of long relative imports.
- Put file-based routes in `apps/web/src/routes` and preserve TanStack Router's named `Route` export conventions.
- Do not edit `apps/web/src/routeTree.gen.ts`; TanStack Router generates it.
- Put app-specific components in `apps/web/src/components`. Put genuinely reusable primitives in `packages/ui/src/components`.
- Reuse the semantic colors and tokens in `packages/ui/src/styles/globals.css`; avoid hard-coded theme colors when a token exists.
- Reuse existing UI primitives and the `cn()` helper before creating parallel abstractions. This project uses Base UI conventions; do not assume Radix-only APIs such as `asChild` are available.
- Put tRPC routers and business rules in `packages/api`, not in the Hono entrypoint.
- Put database schema changes in `packages/db/src/schema`. Preserve the shared database abstraction: do not expose driver-specific clients or interactive transactions that are unavailable through the Neon HTTP driver.
- Do not modify `skills/`, `skills-lock.json`, or `.claude/skills` unless the task explicitly concerns agent skills.

## Environment variables and secrets

- Local backend configuration belongs in `apps/server/.env`; local frontend configuration belongs in `apps/web/.env`.
- Declare and validate new server variables in `packages/env/src/server.ts`.
- Declare browser variables in `packages/env/src/web.ts`; they must use the `VITE_` prefix. Every `VITE_` value is public to the browser, so never place a secret there.
- Never commit, print, paste, or overwrite secret values from `.env` files. Do not use `SKIP_ENV_VALIDATION` to conceal a configuration problem.
- Do not commit local state such as `.env*`, `.vercel`, `dist`, `.tanstack`, or `packages/db/.data`.

## Development and validation

Run commands from the repository root unless a command explicitly says otherwise.

- Install: `pnpm install`
- Start all workspaces: `pnpm run dev`
- Start only the frontend: `pnpm run dev:web`
- Start only the backend: `pnpm run dev:server`
- Required validation after code changes: `pnpm run check`
- Build all workspaces when build, routing, entrypoint, or deployment behavior changes: `pnpm run build`
- Optional focused checks: `pnpm run lint` and `pnpm run check-types`
- Apply formatting: `pnpm run format` (this command writes files)

The repository currently has no project test script or automated test suite. Do not run or claim `pnpm test`. For behavior changes, run `pnpm run check` and perform the smallest relevant manual verification; report what was and was not verified.

## Database workflow

- Local PGlite data lives under `packages/db/.data/pglite` and is not shared with Neon.
- PGlite permits only one local process. Stop `pnpm run dev` before `db:push`, `db:migrate`, or `db:studio`, and never run those database commands concurrently.
- After changing the schema, generate migrations with `pnpm run db:generate` and review the generated SQL and metadata. Do not hand-edit Drizzle journal or snapshot metadata.
- Use `pnpm run db:push` for local schema synchronization or `pnpm run db:migrate` to apply committed migrations locally.
- `pnpm run db:migrate:neon` changes the remote production database. Run it only with explicit user authorization and only after verifying the linked Vercel project and target database.

## Deployment and external state

- `pnpm run env:preview`, `pnpm run env:production`, `pnpm run deploy`, and `pnpm run deploy:prod` change remote state. Run them only when the user explicitly requests that operation.
- Before any production environment sync, deployment, or Neon migration, confirm the intended Vercel project and environment.
- Preserve the Vercel Services routing contract in `vercel.json`: public `/api/*` requests are routed to the server service, while the Hono app mounts tRPC at `/trpc/*` after the rewrite.

## Completion checklist

- Keep changes focused and preserve unrelated user work.
- Run `pnpm run check` after code changes; run `pnpm run build` when the affected surface warrants it.
- Review the diff for generated artifacts, secrets, accidental dependency changes, and edits outside the requested scope.
- If asked to commit, follow the repository's existing Conventional Commit style such as `feat:`, `fix:`, `docs:`, or `chore:`.
