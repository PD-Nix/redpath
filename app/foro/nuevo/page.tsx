import { redirect } from 'next/navigation';
import Link from 'next/link';
// IMPORTANTE: Asegúrate de que esta ruta apunte a tu archivo de Turso que me acabas de mostrar
import { db } from '@/lib/db'; 
import { posts } from '@/lib/db/schema';
import { getSessionUser } from '@/app/registro/actions'; // Función para obtener el ID del usuario logueado
export default function NuevoPostPage() {
  
  // Server Action para procesar el formulario de forma segura
  async function crearPublicacion(formData: FormData) {
    'use server';

    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    // Validaciones básicas antes de enviar a Turso
    if (!title || title.trim() === '' || !content || content.trim() === '') {
      return;
    }
    const usuario = await getSessionUser();
    if(!usuario) {
      redirect('/registro');
      return;
    }

    // Insertamos directamente en Turso. 'image_url' no se envía, quedando como NULL (el hueco listo)
    await db.insert(posts).values({
      title: title.trim(),
      content: content.trim(),
      userId: usuario?.id,
    });

    // Una vez creado con éxito, redirigimos al usuario a la lista del foro
    redirect('/foro');
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      {/* Botón de regreso */}
      <Link href="/foro" className="text-green-700 dark:text-green-400 font-bold text-sm hover:underline flex items-center gap-1 mb-6">
        ← Cancelar y volver
      </Link>

      <div className="bg-card rounded-3xl p-6 sm:p-8 border border-stone-100 dark:border-card-border shadow-sm">
        <span className="text-green-700 dark:text-green-400 font-bold uppercase tracking-widest text-xs transition-colors">
          Comunidad GreenPath
        </span>
        <h1 className="text-3xl font-serif text-stone-800 dark:text-white mb-2 transition-colors">
          Crear nueva publicación
        </h1>
        <p className="text-stone-500 dark:text-stone-400 text-sm mb-6 transition-colors">
          Comparte tus preguntas o saberes con la comunidad de GreenPath.
        </p>

        <form action={crearPublicacion} className="space-y-5">
          {/* Campo: Título */}
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2">
              Título del tema
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              placeholder="Ej. ¿Cómo cuidar mi Anturio Rojo en Barranquilla?"
              className="w-full bg-white dark:bg-background rounded-xl p-4 text-stone-800 dark:text-white border border-stone-200 dark:border-card-border focus:outline-none focus:border-green-600 dark:focus:border-green-500 text-sm transition-colors"
            />
          </div>

          {/* Campo: Contenido */}
          <div>
            <label htmlFor="content" className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-2">
              ¿Qué quieres contar o preguntar?
            </label>
            <textarea
              id="content"
              name="content"
              rows={6}
              required
              placeholder="Escribe detalladamente tu experiencia o duda aquí..."
              className="w-full bg-white dark:bg-background rounded-xl p-4 text-stone-800 dark:text-white border border-stone-200 dark:border-card-border focus:outline-none focus:border-green-600 dark:focus:border-green-500 text-sm transition-colors resize-none"
            />
          </div>

          {/* Nota informativa sobre el "hueco de la ventana" */}
          <div className="p-4 bg-stone-50 dark:bg-background/50 border border-dashed border-stone-200 dark:border-card-border rounded-xl">
            <p className="text-xs text-stone-400 dark:text-stone-500 leading-relaxed">
              📷 La opción de adjuntar imágenes tropicales estará disponible próximamente en una futura actualización de la comunidad.
            </p>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-3 pt-2">
            <Link
              href="/foro"
              className="px-5 py-2.5 rounded-full text-xs font-bold text-stone-500 hover:bg-stone-100 dark:hover:bg-background transition-colors text-center"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-600 text-white font-bold px-6 py-2.5 rounded-full text-xs transition-colors shadow-sm"
            >
              Publicar tema
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}