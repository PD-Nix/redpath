import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="text-6xl mb-4">🌿</div>
      <h1 className="text-5xl font-bold text-green-800 mb-2">404</h1>
      <h2 className="text-2xl font-serif text-stone-800 mb-4">
        Esta página no existe
      </h2>
      <p className="text-stone-500 mb-8 max-w-sm">
        Parece que esta planta no está en nuestro jardín. Vuelve al catálogo para encontrar lo que buscas.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="bg-green-800 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-colors"
        >
          Ir al inicio
        </Link>
        <Link
          href="/catalogo"
          className="border-2 border-green-800 text-green-800 px-8 py-3 rounded-full font-bold hover:bg-green-50 transition-colors"
        >
          Ver catálogo
        </Link>
      </div>
    </div>
  );
}
