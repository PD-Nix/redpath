// app/page.tsx
import { getFeaturedProducts } from '@/lib/db/queries';

export default async function HomePage() {
  const { allPlants } = await getFeaturedProducts();

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section con cuadro semitranslúcido */}
      <section className="relative h-[60vh] flex items-center justify-center p-6">
        {/* Este es el cuadro central del que hablaba tu plan */}
        <div className="z-10 bg-white/70 backdrop-blur-md p-10 rounded-3xl border border-white/20 shadow-2xl max-w-2xl text-center">
          <h2 className="text-4xl md:text-6xl font-serif text-green-900 mb-4">
            Tu camino hacia un hogar vivo
          </h2>
          <p className="text-lg text-stone-700 mb-6">
            No solo vendemos plantas, te enseñamos a que prosperen contigo. 
            Acompañamiento real en cada brote.
          </p>
          <button className="bg-green-800 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-colors">
            Explorar Catálogo
          </button>
        </div>
        
        {/* Decoración simple de fondo (simulando lianas o formas orgánicas) */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-emerald-200/20 rounded-full blur-3xl"></div>
      </section>

      {/* Sección de Productos Destacados */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-green-700 font-bold uppercase tracking-widest text-xs">Selección del mes</span>
            <h3 className="text-3xl font-serif text-stone-800">Plantas para empezar</h3>
          </div>
          <a href="#" className="text-green-800 font-medium border-b border-green-800">Ver todas</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {allPlants.map((plant) => (
            <div key={plant.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-3xl mb-4 aspect-[4/5]">
                <img 
                  src={plant.url_photo} 
                  alt={plant.name} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-green-900">
                  {plant.difficulty || 'Fácil'}
                </div>
              </div>
              <h4 className="text-xl font-bold text-stone-800">{plant.name}</h4>
              <p className="text-stone-500 text-sm line-clamp-2">{plant.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Banner de Soporte Directo (Cumpliendo el MVP: WhatsApp) */}
      <section className="bg-stone-900 text-stone-100 py-16 px-6 text-center">
        <h3 className="text-2xl font-serif mb-4 text-green-400">¿Dudas sobre cuál elegir?</h3>
        <p className="mb-8 opacity-80">Escríbenos y un experto botánico te asesorará en minutos.</p>
        <a 
          href="https://wa.me/tu_numero" 
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-xl font-bold transition-all"
        >
          Hablar con un experto
        </a>
      </section>
    </div>
  );
}