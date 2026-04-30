import { db } from './index';
import { plants } from './schema';

export async function getFeaturedProducts() {
  try {
    const allPlants = await db.select().from(plants).limit(4);
    return { allPlants };
  } catch (error) {
    console.error("Error cargando productos:", error);
    return { allPlants: [] };
  }
}
