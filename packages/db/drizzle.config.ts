import { defineConfig } from "drizzle-kit";

import { getPgliteDataDir } from "./src/pglite-path";

export default defineConfig({
  schema: "./src/schema",
  out: "./src/migrations",
  dialect: "postgresql",
  driver: "pglite",
  dbCredentials: {
    url: getPgliteDataDir(),
  },
});
