// lib/db/queries.ts
import { db } from './index';
import { products, plants } from './schema';
import { eq, and } from 'drizzle-orm';

export async function getFeaturedProducts() {
  const allPlants = await db
    .select({
      id: products.id,
      name: products.name,
      description: products.description,
      url_photo: products.urlPhoto,
      price: products.price,
      difficulty: plants.difficulty,
    })
    .from(products)
    .innerJoin(plants, eq(products.id, plants.productId))
    .where(
      and(
        eq(products.productType, 'plant'),
        eq(products.isActive, true)
      )
    )
    .limit(3);

  return { allPlants };
}
