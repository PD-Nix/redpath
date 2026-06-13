import Link from 'next/link';
import { getSessionUser, cerrarSesion } from '../registro/actions';
import { desc, eq } from 'drizzle-orm';
import { db } from '@/lib/db';

import { posts, users } from '@/lib/db/schema'; // Ajusta la ruta a tu esquema

export const revalidate = 0; // Para que el foro siempre esté actualizado

export default async function ForoPage() {
  const usuarioLogueado = await getSessionUser();
  // Traemos los posts con la info del usuario que los creó
  const listaPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      createdAt: posts.createdAt,
      authorName: users.fullName,
    })
    .from(posts)
    .leftJoin(users, eq(posts.userId, users.id))
    .orderBy(desc(posts.createdAt));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Barra de estado del usuario */}
      <div className="flex justify-end mb-4 text-sm">
        {usuarioLogueado ? (
          <div className="flex items-center gap-3">
            <span className="text-stone-600 dark:text-stone-300">Hola, <strong>{usuarioLogueado.fullName}</strong> 👋</span>
            <form action={cerrarSesion}>
              <button type="submit" className="text-red-500 hover:underline font-medium text-xs">Cerrar sesión</button>
            </form>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/login" className="text-green-700 dark:text-green-400 font-bold hover:underline">Iniciar Sesión</Link>
            <span className="text-stone-300">|</span>
            <Link href="/registro" className="text-green-700 dark:text-green-400 font-bold hover:underline">Registrarse</Link>
          </div>
        )}
      </div>
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 border-b dark:border-card-border pb-6">
        <div>
          <span className="text-green-700 dark:text-green-400 font-bold uppercase tracking-widest text-xs">
            Comunidad GreenPath
          </span>
          <h1 className="text-3xl font-serif text-stone-800 dark:text-white mt-1">
            Foro de Naturaleza
          </h1>
          <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">
            Comparte tus dudas, consejos y experiencias sobre plantas del Caribe.
          </p>
        </div>
        
        <Link
          href={usuarioLogueado ? '/foro/nuevo' : '/login'}
          className="bg-green-700 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-full text-center text-sm transition-colors self-start sm:self-center"
        >
          + Crear publicación
        </Link>
      </div>

      {/* Lista de Publicaciones */}
      {listaPosts.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-3xl border border-stone-100 dark:border-card-border">
          <p className="text-stone-500 dark:text-stone-400">
            Aún no hay publicaciones. ¡Sé el primero en abrir un tema!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {listaPosts.map((post) => (
            <Link
              key={post.id}
              href={`/foro/${post.id}`}
              className="block bg-card rounded-2xl p-6 border border-stone-100 dark:border-card-border hover:border-green-600 dark:hover:border-green-500 transition-all shadow-sm"
            >
              <h2 className="text-xl font-bold text-stone-800 dark:text-white mb-2">
                {post.title}
              </h2>
              <p className="text-stone-600 dark:text-stone-300 text-sm line-clamp-2 mb-4 leading-relaxed">
                {post.content}
              </p>
              <div className="flex items-center justify-between text-xs text-stone-400 dark:text-stone-500">
                <span>Por <strong className="text-stone-600 dark:text-stone-300">{post.authorName || 'Usuario Verde'}</strong></span>
                <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString('es-CO') : ''}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}