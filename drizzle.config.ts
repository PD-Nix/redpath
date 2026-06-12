import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials: {
    // Usamos la URL del entorno Turso.
    // Asegúrate de cargar las variables de entorno antes de ejecutar drizzle-kit.
    url: process.env.DATABASE_URL ?? '',
    // El token se lee en runtime desde NEXT_DATABASE_TOKEN.
  },
});