import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { posts, comments, users } from '@/lib/db/schema';
import { getSessionUser } from '@/app/registro/actions'; // Función para obtener el ID del usuario logueado
export const revalidate = 0;

interface PostDetalleProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetallePage(props: PostDetalleProps) {
  const { id: idParam } = await props.params;
  const postId = parseInt(idParam);
  if (isNaN(postId)) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-xl font-bold mb-4">ID inválido</h2>
        <p>El parámetro proporcionado no es un número: {String(idParam)}</p>
      </div>
    );
  }

  // Intentamos obtener la publicación y capturamos cualquier error para depuración
  let post: any = null;
  let debugError: any = null;
  let fallback: any = null;

  try {
    const [p] = await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        imageUrl: posts.imageUrl,
        createdAt: posts.createdAt,
        authorName: users.fullName,
      })
      .from(posts)
      .leftJoin(users, eq(posts.userId, users.id))
      .where(eq(posts.id, postId));

    post = p || null;
  } catch (err) {
    debugError = err;
  }

  // Si no encontramos post, intentar una consulta simple por id para comparar resultados
  if (!post && !debugError) {
    try {
      const [f] = await db.select({ id: posts.id }).from(posts).where(eq(posts.id, postId));
      fallback = f || null;
    } catch (err) {
      // si falla también aquí, lo recogemos en debugError
      debugError = err;
    }
  }

  if (!post) {
    // Renderizar información de depuración en lugar de lanzar notFound(), para investigar
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-xl font-bold mb-4">Depuración: publicación no encontrada</h2>
        <p className="mb-2">ID solicitado: <strong>{postId}</strong></p>
        <div className="mb-4">
          <h3 className="font-semibold">Resultado de la consulta principal:</h3>
          <pre className="whitespace-pre-wrap text-xs bg-stone-50 dark:bg-background p-3 rounded">{JSON.stringify(post, null, 2)}</pre>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Fallback (consulta simple por id):</h3>
          <pre className="whitespace-pre-wrap text-xs bg-stone-50 dark:bg-background p-3 rounded">{JSON.stringify(fallback, null, 2)}</pre>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Error (si ocurrió):</h3>
          <pre className="whitespace-pre-wrap text-xs bg-stone-50 dark:bg-background p-3 rounded">{String(debugError)}</pre>
        </div>
        <p className="text-sm text-stone-500">Si el registro existe en la base de datos pero aparece vacío aquí, puede deberse a diferencias en el cliente de DB usado en runtime o a que la página se está renderizando en otro entorno sin acceso a las credenciales.</p>
        <div className="mt-4">
          <Link href="/foro" className="text-green-700 underline">Volver al foro</Link>
        </div>
      </div>
    );
  }

  // 2. Obtener los comentarios asociados
  const listaComentarios = await db
    .select({
      id: comments.id,
      content: comments.content,
      createdAt: comments.createdAt,
      authorName: users.fullName,
    })
    .from(comments)
    .leftJoin(users, eq(comments.userId, users.id))
    .where(eq(comments.postId, postId))
    .orderBy(comments.createdAt);

  // 3. Server Action para guardar un nuevo comentario
  async function agregarComentario(formData: FormData) {
    'use server';
    const content = formData.get('content') as string;
    
    if (!content || content.trim() === '') return;

    // TODO: Reemplazar con el ID del usuario logueado real de tu sistema de sesión.
    // Usamos temporalmente el ID 1 para pruebas.
    const usuario = await getSessionUser();
    if(!usuario) {
            redirect('/registro');
            return;
        }

    await db.insert(comments).values({
      postId: postId,
      userId: usuario.id,
      content: content.trim(),
    });

    redirect(`/foro/${postId}`);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Botón de regreso */}
      <Link href="/foro" className="text-green-700 dark:text-green-400 font-bold text-sm hover:underline flex items-center gap-1 mb-6 transition-colors">
        ← Volver al foro
      </Link>

      {/* Post Principal */}
      <article className="bg-card rounded-3xl p-6 sm:p-8 border border-stone-100 dark:border-card-border shadow-sm mb-8">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-800 dark:text-white mb-3 transition-colors">
          {post.title}
        </h1>
        <div className="flex items-center justify-between text-xs text-stone-400 dark:text-stone-500 pb-6 border-b dark:border-card-border mb-6">
          <span>Publicado por <strong className="text-stone-600 dark:text-stone-300">{post.authorName || 'Usuario Verde'}</strong></span>
          <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString('es-CO') : ''}</span>
        </div>

        {/* 🪟 EL HUECO DE LA VENTANA: Si en el futuro guardas una URL de foto, se pintará sola aquí */}
        {post.imageUrl && (
          <div className="relative w-full h-80 rounded-2xl overflow-hidden mb-6 bg-stone-100 dark:bg-background">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <p className="text-stone-700 dark:text-stone-200 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </article>

      {/* Sección de Respuestas */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-stone-800 dark:text-white flex items-center gap-2">
          <span>Respuestas</span>
          <span className="bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-400 text-xs px-2.5 py-0.5 rounded-full font-sans">
            {listaComentarios.length}
          </span>
        </h2>

        {/* Lista de Comentarios */}
        <div className="space-y-4">
          {listaComentarios.map((comentario) => (
            <div key={comentario.id} className="bg-card rounded-2xl p-5 border border-stone-100 dark:border-card-border shadow-sm">
              <div className="flex items-center justify-between text-xs text-stone-400 dark:text-stone-500 mb-2">
                <span className="font-bold text-stone-600 dark:text-stone-300">{comentario.authorName || 'Usuario Verde'}</span>
                <span>{comentario.createdAt ? new Date(comentario.createdAt).toLocaleDateString('es-CO') : ''}</span>
              </div>
              <p className="text-stone-600 dark:text-stone-200 text-sm leading-relaxed whitespace-pre-wrap">
                {comentario.content}
              </p>
            </div>
          ))}
        </div>

        {/* Formulario para comentar */}
        <form action={agregarComentario} className="bg-card rounded-2xl p-5 border border-stone-100 dark:border-card-border shadow-sm mt-6">
          <label htmlFor="content" className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2">
            Participa en la conversación
          </label>
          <textarea
            id="content"
            name="content"
            rows={4}
            required
            placeholder="Escribe tu consejo o respuesta aquí..."
            className="w-full bg-white dark:bg-background rounded-xl p-4 text-stone-800 dark:text-white border border-stone-200 dark:border-card-border focus:outline-none focus:border-green-600 dark:focus:border-green-500 text-sm transition-colors resize-none"
          />
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-600 text-white font-bold px-5 py-2.5 rounded-full text-xs transition-colors"
            >
              Responder
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}