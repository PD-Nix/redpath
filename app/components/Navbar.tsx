'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from './CartContext';
import { useTheme } from './ThemeContext';

const NAV_LINKS = [
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/catalogo?tipo=course', label: 'Cursos' },
  { href: '/catalogo?tipo=kit', label: 'Kits' },
  { href: '/sobre-nosotros', label: 'Sobre nosotros' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getThemeLabel = () => {
    if (theme === 'light') return 'Claro';
    if (theme === 'dark') return 'Oscuro';
    return 'Sistema';
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0f1411]/95 backdrop-blur-sm border-b border-stone-100 dark:border-card-border shadow-sm transition-colors">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-green-900 dark:text-green-100 text-xl tracking-tight transition-colors"
          onClick={() => setOpen(false)}
        >
          <span className="text-2xl leading-none">🌿</span>
          GreenPath
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-700 dark:text-stone-400">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="hover:text-green-800 dark:hover:text-green-300 transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Cambiar a modo ${theme === 'light' ? 'oscuro' : 'claro'}`}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
            title={`Tema: ${getThemeLabel()}`}
          >
            {theme === 'light' ? (
              // Sol (modo claro activo)
              <svg
                className="w-5 h-5 text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0-2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-13a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1zm0 20a1 1 0 0 1-1-1v-6a1 1 0 1 1 2 0v6a1 1 0 0 1-1 1zM4.22 4.22a1 1 0 0 1 1.415 0l4.243 4.243a1 1 0 1 1-1.415 1.414L4.22 5.636a1 1 0 0 1 0-1.414zm12.728 12.728a1 1 0 0 1 1.414 0l4.243 4.243a1 1 0 1 1-1.414 1.414l-4.243-4.243a1 1 0 0 1 0-1.414zm-16.97 0a1 1 0 0 1 0-1.414l4.243-4.243a1 1 0 0 1 1.414 1.415L1.393 15.95a1 1 0 0 1-1.414 0zm16.97-12.728a1 1 0 0 1 0-1.414L15.95 1.393a1 1 0 1 1 1.414 1.414l-4.243 4.243a1 1 0 0 1-1.414 0z" />
              </svg>
            ) : theme === 'dark' ? (
              // Luna (modo oscuro activo)
              <svg
                className="w-5 h-5 text-slate-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 7c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 14c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6zm8-6a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0v10a1 1 0 0 1-1 1zm0 4a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1z" />
              </svg>
            ) : (
              // Engranaje (sistema)
              <svg
                className="w-5 h-5 text-stone-600 dark:text-stone-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.592c.55 0 1.02.398 1.11.94m-.213 9.932a.5.5 0 0 0-1 0 .5.5 0 0 0 1 0zm-.5 7v-3m0 3v-3m0 0h-3m3 0h3m-6-3.5h3m-3 0h-3m6 0h3"
                />
              </svg>
            )}
          </button>

          {/* Cart */}
          <Link
            href="/carrito"
            aria-label={`Carrito, ${count} productos`}
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-stone-700 dark:text-stone-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 bg-green-700 text-white text-[10px] font-bold rounded-full">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>

          {/* Hamburger (mobile) */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg className="w-5 h-5 text-stone-700 dark:text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-stone-700 dark:text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-stone-100 dark:border-card-border bg-white dark:bg-card transition-colors">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block text-base font-medium text-stone-700 dark:text-stone-300 hover:text-green-800 dark:hover:text-green-300 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            
            {/* Theme selector in mobile menu */}
            <li className="pt-2 border-t border-stone-100 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-stone-600 dark:text-stone-400">Tema</span>
                <div className="flex gap-2">
                  {(['light', 'dark', 'system'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        theme === t
                          ? 'bg-green-700 text-white'
                          : 'bg-stone-100 dark:bg-slate-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {t === 'light' && '☀️'}
                      {t === 'dark' && '🌙'}
                      {t === 'system' && '⚙️'}
                    </button>
                  ))}
                </div>
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
