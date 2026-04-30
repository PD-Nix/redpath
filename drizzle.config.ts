import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite", // o 'sqlite' dependiendo de tu versión
  dbCredentials: {
    url: "data/database.db", // Esto lo creará en la raíz del proyecto
  },
});