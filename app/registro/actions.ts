'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { eq, and } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';

// 1. REGISTRO
export async function registrarUsuario(formData: FormData) {
  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!fullName || !email || !password) return;

  try {
    // Insertamos el usuario (usar Date para createdAt para coincidir con el schema)
    await db.insert(users).values({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      passwordHash: password, // En pruebas se guarda plano
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(fullName)}`,
      createdAt: new Date(),
    });

    // Recuperamos el usuario insertado por email para obtener su id
    const [nuevoUsuario] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email.trim().toLowerCase()));

    if (nuevoUsuario) {
      const cookieStore = await cookies();
      cookieStore.set('user_id', nuevoUsuario.id.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
    }
  } catch (error) {
    return;
  }

  redirect('/foro');
}

// 2. INICIAR SESIÓN (LOGIN)
export async function iniciarSesion(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) return;

  // Buscamos al usuario en Turso
  const [usuario] = await db
    .select()
    .from(users)
    .where(and(eq(users.email, email.trim().toLowerCase()), eq(users.passwordHash, password)));

  if (!usuario) {
    return;
  }

  // Guardamos la cookie de sesión
  const cookieStore = await cookies();
  cookieStore.set('user_id', usuario.id.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  redirect('/foro');
}

// 3. CERRAR SESIÓN (LOGOUT)
export async function cerrarSesion() {
  const cookieStore = await cookies();
  cookieStore.delete('user_id');
  redirect('/foro');
}

// 4. OBTENER USUARIO ACTUAL (Para usar en las páginas)
export async function getSessionUser() {
  const cookieStore = await cookies();
  const userIdCookie = cookieStore.get('user_id')?.value;
  if (!userIdCookie) return null;

  const [usuario] = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
    })
    .from(users)
    .where(eq(users.id, parseInt(userIdCookie)));

  return usuario || null;
}