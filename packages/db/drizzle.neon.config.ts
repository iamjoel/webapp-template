import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({
  path: "../../apps/server/.env",
});

const databaseUrl = (process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL)?.trim();

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is required for Neon migrations. Run this command through `vercel env run` or provide a Neon PostgreSQL connection string.",
  );
}

if (!/^postgres(?:ql)?:\/\//i.test(databaseUrl)) {
  throw new Error("The Neon migration URL must use the postgres:// or postgresql:// protocol.");
}

export default defineConfig({
  schema: "./src/schema",
  out: "./src/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
