import { redirect } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db'; // Tu conexión a Turso
import { users } from '@/lib/db/schema';

export default function RegistroPage() {
  
  async function registrarUsuario(formData: FormData) {
    'use server';

    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validaciones básicas
    if (!fullName || !email || !password) return;

    try {
      // Insertamos el usuario en Turso
      // NOTA: Para producción usarías algo como 'bcrypt' o 'argon2' para encriptar la contraseña,
      // pero para pruebas rápidas guardaremos el texto directo (password_hash).
      await db.insert(users).values({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        passwordHash: password, // Almacenado directo para pruebas rápidas
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(fullName)}`, // Un avatar automático cool
        createdAt: new Date(), // usar Date para coincidir con el schema de Drizzle
      } as any);

      // Si todo sale bien, lo mandamos al foro para que estrene su cuenta
      redirect('/foro');
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      // Aquí podrías manejar si el correo ya existe, por el índice UNIQUE
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-card rounded-3xl p-6 sm:p-8 border border-stone-100 dark:border-card-border shadow-sm">
        <h1 className="text-2xl font-serif text-stone-800 dark:text-white mb-2 text-center">
          Crear Cuenta Comunidad
        </h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm mb-6 text-center">
          Regístrate para poder publicar y responder en el foro de GreenPath.
        </p>

        <form action={registrarUsuario} className="space-y-4">
          {/* Nombre Completo */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              placeholder="Ej. Pedro Eli"
              className="w-full bg-white dark:bg-background rounded-xl p-3 text-stone-800 dark:text-white border border-stone-200 dark:border-card-border focus:outline-none focus:border-green-600 dark:focus:border-green-500 text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="pedro@ejemplo.com"
              className="w-full bg-white dark:bg-background rounded-xl p-3 text-stone-800 dark:text-white border border-stone-200 dark:border-card-border focus:outline-none focus:border-green-600 dark:focus:border-green-500 text-sm"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full bg-white dark:bg-background rounded-xl p-3 text-stone-800 dark:text-white border border-stone-200 dark:border-card-border focus:outline-none focus:border-green-600 dark:focus:border-green-500 text-sm"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-3 rounded-full text-sm transition-colors mt-2 shadow-sm"
          >
            Registrarse
          </button>
        </form>

        <p className="text-xs text-center text-stone-400 dark:text-stone-500 mt-4">
          ¿Ya tienes cuenta? <Link href="/foro" className="text-green-700 dark:text-green-400 underline">Volver al foro</Link>
        </p>
      </div>
    </div>
  );
}