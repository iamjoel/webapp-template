import type { PgDatabase } from "drizzle-orm/pg-core";
import type { PgQueryResultHKT } from "drizzle-orm/pg-core/session";

import type * as schema from "./schema";

/**
 * API shared by the local PGlite and hosted Neon HTTP drivers.
 *
 * Interactive transactions and driver-specific clients are intentionally not
 * exposed because Neon HTTP does not support them.
 */
export type Database = Omit<PgDatabase<PgQueryResultHKT, typeof schema>, "transaction">;
