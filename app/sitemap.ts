import type { MetadataRoute } from 'next';
import { getAllActiveProductIds } from '@/lib/db/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), priority: 1 },
    { url: `${siteUrl}/catalogo`, lastModified: new Date(), priority: 0.9 },
    { url: `${siteUrl}/sobre-nosotros`, lastModified: new Date(), priority: 0.6 },
  ];

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const ids = await getAllActiveProductIds();
    productRoutes = ids.map((id) => ({
      url: `${siteUrl}/catalogo/${id}`,
      lastModified: new Date(),
      priority: 0.7,
    }));
  } catch {
    // DB might not be ready yet during build
  }

  return [...staticRoutes, ...productRoutes];
}
