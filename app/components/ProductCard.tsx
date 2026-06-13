import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './Badge';

const TYPE_LABELS: Record<string, string> = {
  plant: 'Planta',
  kit: 'Kit',
  course: 'Curso',
  tool: 'Herramienta',
};

export interface ProductCardProps {
  id: number;
  name: string;
  description: string | null;
  urlPhoto: string;
  price: number;
  difficulty?: string | null;
  productType: string;
}

export function ProductCard({
  id,
  name,
  description,
  urlPhoto,
  price,
  difficulty,
  productType,
}: ProductCardProps) {
  const formattedPrice = price.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  });

  return (
  <Link href={`/catalogo/${id}`} className="group block">
    <article className="rounded-3xl overflow-hidden bg-card border border-stone-100 dark:border-card-border shadow-sm hover:shadow-lg dark:shadow-none transition-all duration-300">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={urlPhoto}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge label={TYPE_LABELS[productType] ?? productType} variant={productType} />
          {difficulty && <Badge label={difficulty} variant={difficulty} />}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-white-800 dark:text-white-100 text-lg leading-snug mb-1">{name}</h3>
        {description && (
          <p className="text-stone-500 dark:text-stone-200 text-sm line-clamp-2 mb-3">{description}</p>
        )}
        <p className="font-bold text-green-800 dark:text-green-400 text-base">{formattedPrice}</p>
      </div>
    </article>
  </Link>
);
}
