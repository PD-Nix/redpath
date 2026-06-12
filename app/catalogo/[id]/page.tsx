import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductById, getRelatedProducts } from '@/lib/db/queries';
import { productWhatsAppUrl } from '@/lib/whatsapp';
import { Badge } from '@/app/components/Badge';
import { ProductCard } from '@/app/components/ProductCard';
import { AddToCartButton } from './AddToCartButton';

// ─── Metadata ────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(Number(id));
  if (!product) return { title: 'Producto no encontrado' };

  return {
    title: product.name,
    description: product.description ?? undefined,
    openGraph: {
      title: product.name,
      description: product.description ?? undefined,
      images: [{ url: product.urlPhoto }],
    },
  };
}

// ─── Type-specific detail sections ──────────────────────────────────────────
function PlantDetails({ plant }: { plant: NonNullable<Awaited<ReturnType<typeof getProductById>>>['plant'] }) {
  if (!plant) return null;
  const rows = [
    { label: 'Especie', value: plant.species },
    { label: 'Luz necesaria', value: plant.lightNeeds },
    { label: 'Frecuencia de riego', value: plant.wateringFrequency },
    { label: 'Humedad', value: plant.humidity },
    { label: 'Temperatura mínima', value: plant.temperatureMin != null ? `${plant.temperatureMin} °C` : null },
    { label: 'Dificultad', value: plant.difficulty },
  ].filter((r) => r.value);

  return (
    <div>
      <h2 className="font-bold text-stone-800 mb-3">Información de la planta</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {rows.map((r) => (
          <div key={r.label}>
            <dt className="text-stone-400 font-medium">{r.label}</dt>
            <dd className="text-stone-700 font-semibold capitalize">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function KitDetails({ kit }: { kit: NonNullable<Awaited<ReturnType<typeof getProductById>>>['kit'] }) {
  if (!kit) return null;
  const includes = [
    kit.includesPlant && '🌿 Planta',
    kit.includesTool && '🔧 Herramienta',
    kit.includesSubstrate && '🪨 Sustrato',
  ].filter(Boolean);

  return (
    <div>
      <h2 className="font-bold text-stone-800 mb-3">¿Qué incluye?</h2>
      <ul className="flex flex-wrap gap-2">
        {includes.map((item) => (
          <li key={String(item)}>
            <span className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {String(item)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CourseDetails({ course }: { course: NonNullable<Awaited<ReturnType<typeof getProductById>>>['course'] }) {
  if (!course) return null;
  const rows = [
    { label: 'Instructor', value: course.teacher },
    { label: 'Duración', value: course.duration },
    { label: 'Nivel', value: course.difficulty },
    { label: 'Formato', value: course.contentType },
  ].filter((r) => r.value);

  return (
    <div>
      <h2 className="font-bold text-stone-800 mb-3">Detalles del curso</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {rows.map((r) => (
          <div key={r.label}>
            <dt className="text-stone-400 font-medium">{r.label}</dt>
            <dd className="text-stone-700 font-semibold capitalize">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ToolDetails({ tool }: { tool: NonNullable<Awaited<ReturnType<typeof getProductById>>>['tool'] }) {
  if (!tool) return null;
  const rows = [
    { label: 'Marca', value: tool.brand },
    { label: 'Material', value: tool.material },
    { label: 'Garantía', value: tool.warrantyMonths ? `${tool.warrantyMonths} meses` : null },
  ].filter((r) => r.value);

  return (
    <div>
      <h2 className="font-bold text-stone-800 mb-3">Especificaciones</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {rows.map((r) => (
          <div key={r.label}>
            <dt className="text-stone-400 font-medium">{r.label}</dt>
            <dd className="text-stone-700 font-semibold">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);

  if (isNaN(numId)) notFound();

  const product = await getProductById(numId);
  if (!product) notFound();

  const related = await getRelatedProducts(numId, product.productType);
  const waUrl = productWhatsAppUrl(product.name);

  const formattedPrice = product.price.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  });

  const TYPE_LABELS: Record<string, string> = {
    plant: 'Planta',
    kit: 'Kit',
    course: 'Curso',
    tool: 'Herramienta',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-stone-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-stone-600">Inicio</Link>
        <span>/</span>
        <Link href="/catalogo" className="hover:text-stone-600">Catálogo</Link>
        <span>/</span>
        <span className="text-stone-600">{product.name}</span>
      </nav>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-start">
        {/* Image */}
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-stone-100 w-full">
          <Image
            src={product.urlPhoto}
            alt={product.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge label={TYPE_LABELS[product.productType] ?? product.productType} variant={product.productType} />
            {product.plant?.difficulty && (
              <Badge label={product.plant.difficulty} variant={product.plant.difficulty} />
            )}
            {(product.stock ?? 0) <= 5 && (product.stock ?? 0) > 0 && (
              <Badge label={`Solo ${product.stock} en stock`} variant="default" />
            )}
            {(product.stock ?? 0) === 0 && (
              <Badge label="Agotado" variant="default" />
            )}
          </div>

          <div>
            <h1 className="text-3xl font-serif font-bold text-stone-900">{product.name}</h1>
            <p className="text-3xl font-bold text-green-800 mt-2">{formattedPrice}</p>
          </div>

          {product.description && (
            <p className="text-stone-600 leading-relaxed">{product.description}</p>
          )}

          {/* Type-specific info */}
          <PlantDetails plant={product.plant ?? null} />
          <KitDetails kit={product.kit ?? null} />
          <CourseDetails course={product.course ?? null} />
          <ToolDetails tool={product.tool ?? null} />

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-2">
            <AddToCartButton
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                urlPhoto: product.urlPhoto,
                productType: product.productType,
              }}
            />
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-base border-2 border-green-800 text-green-800 hover:bg-green-50 transition-colors"
            >
              <span>💬</span> Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-serif text-stone-800 mb-6">También te puede interesar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <ProductCard
                key={r.id}
                id={r.id}
                name={r.name}
                description={r.description}
                urlPhoto={r.urlPhoto}
                price={r.price}
                difficulty={r.difficulty}
                productType={r.productType}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
