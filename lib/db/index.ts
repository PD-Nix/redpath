import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

// Usar una ruta absoluta o asegurar que apunte a la raíz
const sqlite = new Database('data/database.db'); 
export const db = drizzle(sqlite, { schema });