import Link from 'next/link';
import { iniciarSesion } from '../registro/actions';

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-card rounded-3xl p-6 sm:p-8 border border-stone-100 dark:border-card-border shadow-sm">
        <h1 className="text-2xl font-serif text-stone-800 dark:text-white mb-2 text-center">
          Iniciar Sesión
        </h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm mb-6 text-center">
          Entra a tu cuenta de GreenPath para participar en el foro.
        </p>

        <form action={iniciarSesion} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-1">Correo</label>
            <input type="email" name="email" required placeholder="tu@correo.com" className="w-full bg-white dark:bg-background rounded-xl p-3 text-stone-800 dark:text-white border border-stone-200 dark:border-card-border focus:outline-none focus:border-green-600 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-1">Contraseña</label>
            <input type="password" name="password" required placeholder="••••••••" className="w-full bg-white dark:bg-background rounded-xl p-3 text-stone-800 dark:text-white border border-stone-200 dark:border-card-border focus:outline-none focus:border-green-600 text-sm" />
          </div>
          <button type="submit" className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-3 rounded-full text-sm transition-colors mt-2 shadow-sm">
            Entrar
          </button>
        </form>

        <p className="text-xs text-center text-stone-400 dark:text-stone-500 mt-4">
          ¿No tienes cuenta? <Link href="/registro" className="text-green-700 dark:text-green-400 underline">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}