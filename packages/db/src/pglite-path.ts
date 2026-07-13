import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const defaultDataDir = fileURLToPath(new URL("../.data/pglite", import.meta.url));

/** Resolve the fixed local PGlite directory for the app and Drizzle Kit. */
export function getPgliteDataDir() {
  // PGlite creates its own data directory, but its parent must already exist.
  mkdirSync(dirname(defaultDataDir), { recursive: true });

  return defaultDataDir;
}
