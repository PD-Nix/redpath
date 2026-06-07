// scripts/seed.ts
// Uso: npx tsx scripts/seed.ts  (o "npm run seed")

import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import * as schema from '../lib/db/schema';
import * as fs from 'fs';
import * as path from 'path';

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const dbPath = path.join(dataDir, 'database.db');
const sqlite = new Database(dbPath);
const db = drizzle(sqlite, { schema });

// Ejecutar migraciones antes de insertar datos
migrate(db, { migrationsFolder: path.join(process.cwd(), 'drizzle') });

async function seed() {
  console.log('🌿 Iniciando seed de GreenPath...\n');

  // ──────────────────────────────────────────────
  // PLANTAS
  // ──────────────────────────────────────────────
  const plantProducts = db
    .insert(schema.products)
    .values([
      {
        name: 'Palma de Vino',
        description:
          'Ícono del paisaje caribeño colombiano. Sus hojas arqueadas de hasta 5 metros adornan patios y jardines tropicales. Resistente al calor intenso y a los suelos arenosos de la costa. Perfecta como planta focal en espacios amplios.',
        price: 8500,
        urlPhoto:
          'https://images.unsplash.com/photo-1598335982183-d15ec54ca3d1?w=800&q=80',
        stock: 12,
        productType: 'plant',
        isActive: true,
      },
      {
        name: 'Heliconia Caribea',
        description:
          'Flor tropical de brácteas rojas y amarillas que evoca los mercados de Barranquilla. Crece vigorosa en suelos húmedos con sombra parcial. Sus flores duran semanas cortadas y son muy apreciadas en arreglos florales.',
        price: 3200,
        urlPhoto:
          'https://images.unsplash.com/photo-1596438459194-f275f413d6ff?w=800&q=80',
        stock: 25,
        productType: 'plant',
        isActive: true,
      },
      {
        name: 'Mangle Rojo',
        description:
          'Guardián de las ciénagas del Caribe. En maceta grande desarrolla un porte único con raíces aéreas que lo hacen visualmente espectacular. Tolera suelos salinos y riegos irregulares. Una pieza de colección.',
        price: 12000,
        urlPhoto:
          'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=800&q=80',
        stock: 5,
        productType: 'plant',
        isActive: true,
      },
      {
        name: 'Trupillo',
        description:
          'El árbol del desierto de La Guajira. En interiores se cultiva en bonsái o maceta profunda. Extremadamente resistente a la sequía, puede pasar semanas sin riego. Sus pequeñas flores amarillas perfuman suavemente el espacio.',
        price: 4700,
        urlPhoto:
          'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=800&q=80',
        stock: 18,
        productType: 'plant',
        isActive: true,
      },
      {
        name: 'Bromelia de Sabana',
        description:
          'Planta de roseta nativa de las sabanas de Córdoba y Sucre. Acumula agua en su centro formando un pequeño estanque natural. Sus colores rojizos y verdes se intensifican con la luz solar directa. Casi no necesita cuidados.',
        price: 2800,
        urlPhoto:
          'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80',
        stock: 30,
        productType: 'plant',
        isActive: true,
      },
      {
        name: 'Matarratón',
        description:
          'Árbol medicinal de la tradición costeña, conocido por sus flores lilas que brotan en época seca sin una sola hoja. En jardín o maceta grande es una maravilla visual. Sus hojas tienen propiedades repelentes naturales reconocidas.',
        price: 3900,
        urlPhoto:
          'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
        stock: 14,
        productType: 'plant',
        isActive: true,
      },
      {
        name: 'Cactus Cardón',
        description:
          'El gigante del desierto wayuu. Columnar, imponente y absolutamente de bajo mantenimiento. Crece lento pero puede vivir décadas. Símbolo de la resistencia y la identidad de La Guajira. Ideal para espacios modernos con mucha luz.',
        price: 6200,
        urlPhoto:
          'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80',
        stock: 9,
        productType: 'plant',
        isActive: true,
      },
    ])
    .returning({ id: schema.products.id, name: schema.products.name })
    .prepare()
    .all();

  const plantasData = [
    { species: 'Attalea butyracea', lightNeeds: 'alta', wateringFrequency: 'Cada 5–7 días', humidity: 'media', temperatureMin: 18, difficulty: 'media' },
    { species: 'Heliconia caribaea', lightNeeds: 'media', wateringFrequency: 'Cada 2–3 días', humidity: 'alta', temperatureMin: 16, difficulty: 'fácil' },
    { species: 'Rhizophora mangle', lightNeeds: 'alta', wateringFrequency: 'Cada 3–4 días', humidity: 'alta', temperatureMin: 20, difficulty: 'experto' },
    { species: 'Prosopis juliflora', lightNeeds: 'alta', wateringFrequency: 'Cada 15–20 días', humidity: 'baja', temperatureMin: 15, difficulty: 'fácil' },
    { species: 'Bromelia pinguin', lightNeeds: 'alta', wateringFrequency: 'Rellenar el centro cada 10 días', humidity: 'media', temperatureMin: 17, difficulty: 'fácil' },
    { species: 'Gliricidia sepium', lightNeeds: 'alta', wateringFrequency: 'Cada 7–10 días', humidity: 'baja', temperatureMin: 16, difficulty: 'media' },
    { species: 'Stenocereus griseus', lightNeeds: 'alta', wateringFrequency: 'Cada 20–30 días', humidity: 'baja', temperatureMin: 12, difficulty: 'fácil' },
  ];

  db.insert(schema.plants)
    .values(plantProducts.map((p, i) => ({ productId: p.id, ...plantasData[i] })))
    .run();

  // ──────────────────────────────────────────────
  // KITS
  // ──────────────────────────────────────────────
  const kitProducts = db
    .insert(schema.products)
    .values([
      {
        name: 'Kit Inicio Caribe',
        description:
          'Todo lo que necesitas para empezar tu jardín tropical en casa. Incluye una Bromelia de Sabana, sustrato especial para trópico y herramientas básicas de trasplante. La combinación perfecta para principiantes.',
        price: 9500,
        urlPhoto:
          'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=800&q=80',
        stock: 8,
        productType: 'kit',
        isActive: true,
      },
      {
        name: 'Kit Desierto Guajiro',
        description:
          'Colección de xerófitas para espacios con mucha luz y poco tiempo. Incluye Cactus Cardón joven, Trupillo en maceta y substrato desértico premium con perlita. Cero riego por semanas.',
        price: 14800,
        urlPhoto:
          'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800&q=80',
        stock: 6,
        productType: 'kit',
        isActive: true,
      },
    ])
    .returning({ id: schema.products.id, name: schema.products.name })
    .prepare()
    .all();

  db.insert(schema.kits)
    .values([
      { productId: kitProducts[0].id, includesPlant: true, includesTool: true, includesSubstrate: true, componentIds: '' },
      { productId: kitProducts[1].id, includesPlant: true, includesTool: false, includesSubstrate: true, componentIds: '' },
    ])
    .run();

  // ──────────────────────────────────────────────
  // CURSOS
  // ──────────────────────────────────────────────
  const courseProducts = db
    .insert(schema.products)
    .values([
      {
        name: 'Plantas Tropicales en Casa',
        description:
          'Aprende a cultivar y mantener plantas tropicales del Caribe colombiano en espacios interiores. Desde la selección hasta el diagnóstico de enfermedades. Incluye guía PDF descargable y comunidad de estudiantes.',
        price: 3500,
        urlPhoto:
          'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=800&q=80',
        stock: 999,
        productType: 'course',
        isActive: true,
      },
      {
        name: 'Jardín Vertical Caribeño',
        description:
          'Diseña y construye tu propio jardín vertical con especies nativas de la costa. Curso práctico con proyectos reales. Ideal para balcones, terrazas y paredes interiores. Certificado de finalización incluido.',
        price: 5200,
        urlPhoto:
          'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
        stock: 999,
        productType: 'course',
        isActive: true,
      },
    ])
    .returning({ id: schema.products.id, name: schema.products.name })
    .prepare()
    .all();

  db.insert(schema.courses)
    .values([
      { productId: courseProducts[0].id, teacher: 'Dra. Valentina Ospina', difficulty: 'principiante', duration: '4h 30min', contentType: 'video', videoUrl: null },
      { productId: courseProducts[1].id, teacher: 'Arq. Mauricio Palomino', difficulty: 'intermedio', duration: '6h', contentType: 'video', videoUrl: null },
    ])
    .run();

  // ──────────────────────────────────────────────
  // HERRAMIENTAS
  // ──────────────────────────────────────────────
  const toolProducts = db
    .insert(schema.products)
    .values([
      {
        name: 'Set Trasplante Profesional',
        description:
          'Juego de 5 herramientas de acero inoxidable para trasplante y jardinería fina. Mango ergonómico de madera de teca. Incluye palita, transplantador, rastrillo mini, podadora y regadera de precisión.',
        price: 4200,
        urlPhoto:
          'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
        stock: 20,
        productType: 'tool',
        isActive: true,
      },
      {
        name: 'Regadera de Cuello de Cisne',
        description:
          'Regadera de 1.5L con boquilla de cuello largo para riego de precisión en macetas interiores. Acero inoxidable mate, flujo controlado. Ideal para heliconias, bromelias y plantas de hoja sensible.',
        price: 2900,
        urlPhoto:
          'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=800&q=80',
        stock: 15,
        productType: 'tool',
        isActive: true,
      },
    ])
    .returning({ id: schema.products.id, name: schema.products.name })
    .prepare()
    .all();

  db.insert(schema.tools)
    .values([
      { productId: toolProducts[0].id, brand: 'GreenPath Pro', material: 'Acero inoxidable + teca', warrantyMonths: 24 },
      { productId: toolProducts[1].id, brand: 'GreenPath Pro', material: 'Acero inoxidable', warrantyMonths: 12 },
    ])
    .run();

  // ──────────────────────────────────────────────
  // LOG
  // ──────────────────────────────────────────────
  console.log('🌴 Plantas (7):');
  plantProducts.forEach((p, i) => {
    const d = plantasData[i];
    console.log(`   ${i + 1}. ${p.name} — ${d.difficulty} — ${d.species}`);
  });

  console.log('\n📦 Kits (2):');
  kitProducts.forEach((p) => console.log(`   • ${p.name}`));

  console.log('\n🎓 Cursos (2):');
  courseProducts.forEach((p) => console.log(`   • ${p.name}`));

  console.log('\n🔧 Herramientas (2):');
  toolProducts.forEach((p) => console.log(`   • ${p.name}`));

  console.log('\n✅ Seed completado. Ejecuta "npm run dev" para ver los datos.\n');
}

seed().catch((err) => {
  console.error('❌ Error en el seed:', err);
  process.exit(1);
});
