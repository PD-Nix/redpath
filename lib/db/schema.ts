import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Tabla de cursos
export const courses = sqliteTable('courses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description').notNull(),
  url_photo: text('url_photo').notNull(),
  teacher: text('teacher').notNull(),
  difficulty: text('difficulty').notNull(),
  type: text('type').notNull(),
  duration: text('duration').notNull(),
  price: integer('price').notNull(), // Precio agregado
});

// Tabla de kits
export const kits = sqliteTable('kits', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description').notNull(),
  url_photo: text('url_photo').notNull(),
  price: integer('price').notNull(), // Precio (cambié a NOT NULL)
});

// Tabla de plantas
export const plants = sqliteTable('plants', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description').notNull(),
  url_photo: text('url_photo').notNull(),
  type: text('type'),
  difficulty: text('difficulty'),
  price: integer('price').notNull(), // Precio agregado
});

// Tabla de herramientas
export const tools = sqliteTable('tools', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description').notNull(),
  url_photo: text('url_photo').notNull(),
  price: integer('price').notNull(), // Precio agregado
});