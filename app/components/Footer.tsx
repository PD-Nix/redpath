import Link from 'next/link';
import { generalWhatsAppUrl } from '@/lib/whatsapp';

export function Footer() {
  const waUrl = generalWhatsAppUrl();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 dark:bg-slate-950 text-stone-300 dark:text-stone-400 mt-auto transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-2">
          <p className="text-white dark:text-stone-50 font-bold text-xl flex items-center gap-2 mb-3">
            <span>🌿</span> GreenPath
          </p>
          <p className="text-sm leading-relaxed max-w-xs">
            Plantas tropicales del Caribe colombiano, kits de inicio, cursos y asesoría
            personalizada. Tu hogar merece vida.
          </p>
          {/* Social placeholders */}
          <div className="flex gap-3 mt-5">
            {['Instagram', 'TikTok', 'Facebook'].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="text-xs px-3 py-1.5 rounded-full border border-stone-700 dark:border-slate-700 hover:border-green-500 dark:hover:border-green-400 hover:text-green-400 dark:hover:text-green-300 transition-colors"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white dark:text-stone-50 font-semibold mb-3 text-sm uppercase tracking-widest">
            Explorar
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              { href: '/catalogo', label: 'Catálogo' },
              { href: '/catalogo?tipo=plant', label: 'Plantas' },
              { href: '/catalogo?tipo=kit', label: 'Kits' },
              { href: '/catalogo?tipo=course', label: 'Cursos' },
              { href: '/catalogo?tipo=tool', label: 'Herramientas' },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-green-400 dark:hover:text-green-300 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white dark:text-stone-50 font-semibold mb-3 text-sm uppercase tracking-widest">
            Contacto
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 dark:hover:text-green-300 transition-colors flex items-center gap-1.5"
              >
                <span>💬</span> WhatsApp
              </a>
            </li>
            <li>
              <Link href="/sobre-nosotros" className="hover:text-green-400 dark:hover:text-green-300 transition-colors">
                Sobre nosotros
              </Link>
            </li>
            <li>
              <Link href="/carrito" className="hover:text-green-400 dark:hover:text-green-300 transition-colors">
                Mi carrito
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-800 dark:border-slate-800 py-5 px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500 dark:text-stone-600">
        <p>© {year} GreenPath · Todos los derechos reservados</p>
        <p>Hecho con 🌱 en Colombia</p>
      </div>
    </footer>
  );
}
