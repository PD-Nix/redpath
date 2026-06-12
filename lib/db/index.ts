import fs from 'fs';
import path from 'path';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

// Cargar variables de entorno desde .env cuando se ejecuta un script Node.
// Esto es necesario para `npm run seed`, porque `tsx` no carga .env automáticamente.
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  for (const line of envFile.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const equalIndex = trimmed.indexOf('=');
    if (equalIndex === -1) continue;

    const key = trimmed.slice(0, equalIndex).trim();
    let value = trimmed.slice(equalIndex + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

// Crear el cliente libsql para Turso usando las variables de entorno.
// - DATABASE_URL apunta al host de Turso.
// - NEXT_DATABASE_TOKEN es el token de acceso remoto.
const client = createClient({
  url: process.env.DATABASE_URL ?? '',
  authToken: process.env.NEXT_DATABASE_TOKEN ?? '',
});

// `drizzle` usa el cliente remoto de Turso en lugar de SQLite local.
export const db = drizzle(client, { schema });