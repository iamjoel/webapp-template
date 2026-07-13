import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";

import { getPgliteDataDir } from "./pglite-path";
import * as schema from "./schema";
import type { Database } from "./types";

type PgliteGlobal = typeof globalThis & {
  __appPglite?: PGlite;
};

const dataDir = getPgliteDataDir();
const globalForPglite = globalThis as PgliteGlobal;

const client = globalForPglite.__appPglite ?? new PGlite(dataDir);

globalForPglite.__appPglite = client;

export const db: Database = drizzle(client, { schema });
export type { Database } from "./types";
