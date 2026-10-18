import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

/**
 * Migrations use DATABASE_URL_UNPOOLED — the direct Neon connection.
 * Runtime queries in src/db/index.ts use DATABASE_URL, the pooled one.
 * `generate` does not connect. `migrate` refuses to run without the direct URL.
 */
const url = process.env.DATABASE_URL_UNPOOLED;

if (!url && process.argv.some((arg) => arg === "migrate")) {
  throw new Error(
    "DATABASE_URL_UNPOOLED is not set. Migrations need the direct Neon connection, not the pooled URL.",
  );
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url:
      url ??
      "postgresql://placeholder:placeholder@localhost:5432/placeholder",
  },
  strict: true,
  verbose: true,
});
