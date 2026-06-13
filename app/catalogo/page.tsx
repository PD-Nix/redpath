import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getAllProducts } from '@/lib/db/queries';
import { ProductCard } from '@/app/components/ProductCard';
import { CatalogFilters } from './CatalogFilters';

export const metadata: Metadata = {
  title: 'Catálogo',
  description:
    'Explora nuestra colección de plantas tropicales del Caribe colombiano, kits, cursos y herramientas de jardinería.',
};

interface SearchParams {
  tipo?: string;
  dificultad?: string;
  q?: string;
}

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  const products = await getAllProducts({
    productType: sp.tipo || undefined,
    difficulty: sp.dificultad || undefined,
    search: sp.q || undefined,
  });

  const hasFilters = !!(sp.tipo || sp.dificultad || sp.q);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <span className="text-green-700 dark:text-green-400 font-bold uppercase tracking-widest text-xs transition-colors">
          GreenPath
        </span>
        <h1 className="text-3xl font-serif text-white-100 dark:text-stone-100 mt-1 transition-colors">Catálogo</h1>
        <p className="text-stone-500 dark:text-stone-300 mt-1 transition-colors">
          {products.length} {products.length === 1 ? 'producto' : 'productos'}
          {hasFilters ? ' encontrados' : ' disponibles'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="w-full lg:w-72 shrink-0">
          <Suspense>
            <CatalogFilters />
          </Suspense>
        </div>

        {/* Product grid */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="text-5xl mb-4">🌵</span>
              <h2 className="text-xl font-semibold text-stone-700 dark:text-stone-200 mb-2 transition-colors">
                Sin resultados
              </h2>
              <p className="text-stone-400 dark:text-stone-400 text-sm transition-colors">
                Prueba con otros filtros o{' '}
                <a href="/catalogo" className="text-green-700 dark:text-green-400 underline transition-colors">
                  ver todo el catálogo
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  urlPhoto={product.urlPhoto}
                  price={product.price}
                  difficulty={product.difficulty}
                  productType={product.productType}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
