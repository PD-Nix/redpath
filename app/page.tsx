import { getFeaturedProducts } from '@/lib/db/queries';
import { generalWhatsAppUrl } from '@/lib/whatsapp';
import Link from 'next/link';
import Image from 'next/image';

export default async function HomePage() {
  const { allPlants } = await getFeaturedProducts();
  const waUrl = generalWhatsAppUrl();

  return (
    <div className="min-h-screen font-sans">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center p-6 bg-gradient-to-b from-green-50 to-stone-50">
        <div className="z-10 bg-white/80 backdrop-blur-md p-10 rounded-3xl border border-white/30 shadow-2xl max-w-2xl text-center">
          <span className="inline-block text-green-700 font-bold uppercase tracking-widest text-xs mb-4">
            Caribe colombiano · Plantas nativas
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-green-900 mb-4 leading-tight">
            Tu camino hacia un hogar vivo
          </h1>
          <p className="text-lg text-stone-600 mb-8">
            No solo vendemos plantas, te enseñamos a que prosperen contigo.
            Acompañamiento real en cada brote.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/catalogo"
              className="inline-block bg-green-800 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-colors"
            >
              Explorar Catálogo
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-green-800 text-green-800 px-8 py-3 rounded-full font-medium hover:bg-green-50 transition-colors"
            >
              Hablar con un experto
            </a>
          </div>
        </div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-200/40 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-emerald-200/30 rounded-full blur-3xl" aria-hidden="true" />
      </section>

      {/* Value props */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {[
          { icon: '🌴', title: 'Plantas nativas', desc: 'Especies del Caribe colombiano adaptadas al hogar.' },
          { icon: '👨‍🌾', title: 'Asesoría botánica', desc: 'Un experto te acompaña desde la primera hoja.' },
          { icon: '📦', title: 'Kits completos', desc: 'Todo lo que necesitas en una sola caja.' },
        ].map((item) => (
          <div key={item.title} className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h2 className="font-bold text-stone-800 mb-1">{item.title}</h2>
            <p className="text-stone-500 text-sm">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Featured plants */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-green-700 font-bold uppercase tracking-widest text-xs">
              Selección del mes
            </span>
            <h2 className="text-3xl font-serif text-stone-800">Plantas para empezar</h2>
          </div>
          <Link href="/catalogo" className="text-green-800 font-medium border-b border-green-800 text-sm">
            Ver todas
          </Link>
        </div>

        {allPlants.length === 0 ? (
          <p className="text-stone-500 text-center py-10">
            Ejecuta <code className="font-mono bg-stone-100 px-2 py-0.5 rounded">npm run seed</code> para cargar los datos.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allPlants.map((plant) => (
              <Link href={`/catalogo/${plant.id}`} key={plant.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-3xl mb-4 aspect-[4/5]">
                  <Image
                    src={plant.urlPhoto}
                    alt={plant.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {plant.difficulty && (
                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-green-900">
                      {plant.difficulty}
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-stone-800">{plant.name}</h3>
                <p className="text-stone-500 text-sm line-clamp-2">{plant.description}</p>
                <p className="text-green-800 font-bold mt-1">
                  {plant.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* WhatsApp CTA */}
      <section className="bg-stone-900 text-stone-100 py-16 px-6 text-center">
        <h2 className="text-2xl font-serif mb-3 text-green-400">¿Dudas sobre cuál elegir?</h2>
        <p className="mb-8 opacity-80 max-w-md mx-auto">
          Escríbenos y un experto botánico te asesorará en minutos. Gratis, sin compromisos.
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black px-8 py-3 rounded-xl font-bold transition-all"
        >
          <span>💬</span> Hablar con un experto
        </a>
      </section>
    </div>
  );
}
