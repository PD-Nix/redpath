'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';

const TYPES = [
  { value: '', label: 'Todos' },
  { value: 'plant', label: '🌿 Plantas' },
  { value: 'kit', label: '📦 Kits' },
  { value: 'course', label: '🎓 Cursos' },
  { value: 'tool', label: '🔧 Herramientas' },
];

const DIFFICULTIES = [
  { value: '', label: 'Cualquier nivel' },
  { value: 'fácil', label: 'Fácil' },
  { value: 'media', label: 'Media' },
  { value: 'experto', label: 'Experto' },
];

export function CatalogFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      // Reset to page 1 when changing filters
      next.delete('pagina');
      router.replace(`${pathname}?${next.toString()}`);
    },
    [params, pathname, router]
  );

  const current = {
    tipo: params.get('tipo') ?? '',
    dificultad: params.get('dificultad') ?? '',
    q: params.get('q') ?? '',
  };

  return (
    <aside className="flex flex-col gap-6 bg-white rounded-3xl border border-stone-200 p-4 shadow-sm sm:p-6">
      {/* Search */}
      <div>
        <label htmlFor="search-input" className="block text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">
          Buscar
        </label>
        <input
          id="search-input"
          type="search"
          placeholder="Nombre o descripción…"
          defaultValue={current.q}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setParam('q', (e.target as HTMLInputElement).value.trim());
            }
          }}
          onBlur={(e) => setParam('q', e.target.value.trim())}
          className="w-full rounded-xl border border-stone-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      {/* Type */}
      <div>
        <p className="block text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">
          Tipo
        </p>
        <ul className="flex flex-col gap-1">
          {TYPES.map((t) => (
            <li key={t.value}>
              <button
                onClick={() => setParam('tipo', t.value)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  current.tipo === t.value
                    ? 'bg-green-800 text-white'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                {t.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Difficulty (only relevant when type = plant or all) */}
      {(current.tipo === '' || current.tipo === 'plant') && (
        <div>
          <p className="block text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">
            Dificultad
          </p>
          <ul className="flex flex-col gap-1">
            {DIFFICULTIES.map((d) => (
              <li key={d.value}>
                <button
                  onClick={() => setParam('dificultad', d.value)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    current.dificultad === d.value
                      ? 'bg-green-800 text-white'
                      : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {d.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Clear */}
      {(current.tipo || current.dificultad || current.q) && (
        <button
          onClick={() => router.replace(pathname)}
          className="text-sm text-red-600 hover:underline text-left"
        >
          Limpiar filtros
        </button>
      )}
    </aside>
  );
}
