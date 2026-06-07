'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function CatalogoError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-6 text-center">
      <div className="text-5xl mb-4">🌵</div>
      <h2 className="text-2xl font-serif text-stone-800 mb-3">
        Error al cargar el catálogo
      </h2>
      <p className="text-stone-500 mb-6 max-w-sm text-sm">
        Algo salió mal al obtener los productos. Intenta de nuevo o vuelve al inicio.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="bg-green-800 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-green-700 transition-colors"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="border border-stone-300 text-stone-700 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-stone-50 transition-colors"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
