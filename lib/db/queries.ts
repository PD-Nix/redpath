import { db } from './index';
import { products, plants, kits, courses, tools } from './schema';
import { eq, and, or, gte, lte, like } from 'drizzle-orm';

// ─── Shared projection ───────────────────────────────────────────────────────
const productListFields = {
  id: products.id,
  name: products.name,
  description: products.description,
  urlPhoto: products.urlPhoto,
  price: products.price,
  stock: products.stock,
  productType: products.productType,
  difficulty: plants.difficulty,
} as const;

// ─── Featured (home page) ─────────────────────────────────────────────────────
export async function getFeaturedProducts() {
  const allPlants = await db
    .select(productListFields)
    .from(products)
    .innerJoin(plants, eq(products.id, plants.productId))
    .where(and(eq(products.productType, 'plant'), eq(products.isActive, true)))
    .limit(3);

  return { allPlants };
}

// ─── Catalogue with optional filters ─────────────────────────────────────────
export interface ProductFilters {
  productType?: string;
  difficulty?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export async function getAllProducts(filters?: ProductFilters) {
  const conditions = [eq(products.isActive, true)];

  if (filters?.productType) {
    conditions.push(
      eq(products.productType, filters.productType as 'plant' | 'kit' | 'course' | 'tool')
    );
  }
  if (filters?.minPrice !== undefined) {
    conditions.push(gte(products.price, filters.minPrice));
  }
  if (filters?.maxPrice !== undefined) {
    conditions.push(lte(products.price, filters.maxPrice));
  }
  if (filters?.search) {
    conditions.push(
      or(
        like(products.name, `%${filters.search}%`),
        like(products.description, `%${filters.search}%`)
      )!
    );
  }

  const rows = await db
    .select(productListFields)
    .from(products)
    .leftJoin(plants, eq(products.id, plants.productId))
    .where(and(...conditions))
    .orderBy(products.id);

  // Post-filter by difficulty (only relevant for plants)
  if (filters?.difficulty) {
    return rows.filter((r) => r.difficulty === filters.difficulty);
  }

  return rows;
}

// ─── Products by type ─────────────────────────────────────────────────────────
export async function getProductsByType(type: 'plant' | 'kit' | 'course' | 'tool') {
  return getAllProducts({ productType: type });
}

// ─── Full product detail (with type-specific data) ───────────────────────────
export async function getProductById(id: number) {
  const product = await db.query.products.findFirst({
    where: eq(products.id, id),
    with: {
      plant: true,
      kit: true,
      course: true,
      tool: true,
    },
  });
  return product ?? null;
}

// ─── Related products (same type, excluding current) ─────────────────────────
export async function getRelatedProducts(productId: number, type: string, limit = 3) {
  const rows = await db
    .select(productListFields)
    .from(products)
    .leftJoin(plants, eq(products.id, plants.productId))
    .where(
      and(
        eq(products.isActive, true),
        eq(products.productType, type as 'plant' | 'kit' | 'course' | 'tool')
      )
    )
    .limit(limit + 1);

  return rows.filter((r) => r.id !== productId).slice(0, limit);
}

// ─── Search ───────────────────────────────────────────────────────────────────
export async function searchProducts(query: string) {
  return getAllProducts({ search: query });
}

// ─── Catalogue counts (for sitemap / stats) ──────────────────────────────────
export async function getAllActiveProductIds() {
  const rows = await db
    .select({ id: products.id })
    .from(products)
    .where(eq(products.isActive, true));
  return rows.map((r) => r.id);
}
