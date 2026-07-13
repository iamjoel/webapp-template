import { env } from "@app/env/server";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";
import type { Database } from "./types";

if (!env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is required outside local development. Connect the Vercel project to Neon or set a Neon PostgreSQL connection string.",
  );
}

export const db: Database = drizzle(env.DATABASE_URL, { schema });
export type { Database } from "./types";
