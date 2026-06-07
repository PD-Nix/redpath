# Resumen de implementacion - GreenPath

## Estado general

GreenPath quedo como un MVP funcional de catalogo para venta y asesoria de plantas tropicales del Caribe colombiano. El proyecto usa Next.js 16 con App Router, React 19, Tailwind CSS, SQLite, Drizzle ORM y un carrito client-side persistido en `localStorage`.

La aplicacion ya permite:

- Poblar una base de datos local SQLite con productos de prueba.
- Mostrar productos destacados en la pagina principal.
- Navegar un catalogo con filtros.
- Ver el detalle completo de cada producto.
- Agregar productos a un carrito visual.
- Generar mensajes de WhatsApp para consultas y pedidos.
- Tener metadata basica, sitemap, robots, loading states y paginas de error.

## Que se implemento

### 1. Seed y base de datos

Se creo `scripts/seed.ts` para poblar `data/database.db`.

El seed:

- Crea la carpeta `data/` si no existe.
- Ejecuta las migraciones de Drizzle antes de insertar datos.
- Inserta 7 plantas, 2 kits, 2 cursos y 2 herramientas.
- Inserta datos especificos en las tablas `plants`, `kits`, `courses` y `tools`.
- Usa URLs remotas de Unsplash para las imagenes.

Script disponible en `package.json`:

```bash
npm run seed
```

Nota: si aparece un error de `better-sqlite3` por version de Node, ejecutar:

```bash
npm rebuild better-sqlite3
```

### 2. Configuracion general

Se actualizaron:

- `next.config.ts`: permite imagenes remotas desde `images.unsplash.com` y `plus.unsplash.com`.
- `app/layout.tsx`: metadata real del negocio, `lang="es"`, Navbar, Footer y Providers globales.
- `.env.local`: variables locales para WhatsApp y URL del sitio.
- `lib/db/index.ts`: ruta estable para la base de datos en `data/database.db`.

Variables usadas:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER="+573001234567"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Para produccion, cambiar `NEXT_PUBLIC_SITE_URL` por el dominio real y `NEXT_PUBLIC_WHATSAPP_NUMBER` por el numero definitivo.

### 3. Queries de datos

Se amplio `lib/db/queries.ts` con:

- `getFeaturedProducts()`: productos destacados para home.
- `getAllProducts(filters?)`: catalogo con filtros por tipo, dificultad, precio y busqueda.
- `getProductById(id)`: producto completo con datos especificos segun tipo.
- `getProductsByType(type)`: productos por categoria.
- `searchProducts(query)`: busqueda por nombre o descripcion.
- `getRelatedProducts(productId, type)`: productos relacionados.
- `getAllActiveProductIds()`: usado para sitemap dinamico.

### 4. Componentes compartidos

Se creo la carpeta `app/components/` con:

- `Navbar.tsx`: navegacion principal, enlaces, contador de carrito y menu movil.
- `Footer.tsx`: descripcion del negocio, enlaces rapidos, WhatsApp y redes placeholder.
- `ProductCard.tsx`: tarjeta reutilizable para home, catalogo y relacionados.
- `Badge.tsx`: etiquetas para dificultad, tipo y estado.
- `CartContext.tsx`: estado del carrito con `localStorage`.
- `Providers.tsx`: provider global del carrito.

### 5. Paginas principales

Se implementaron:

- `app/page.tsx`: home con hero, propuesta de valor, productos destacados y CTA a WhatsApp.
- `app/catalogo/page.tsx`: catalogo con filtros por URL y grid responsive.
- `app/catalogo/[id]/page.tsx`: detalle de producto con metadata dinamica, datos especificos y productos relacionados.
- `app/sobre-nosotros/page.tsx`: historia, valores, equipo y CTA.
- `app/carrito/page.tsx`: resumen de carrito, cantidades, total y pedido por WhatsApp.
- `app/not-found.tsx`: pagina 404 personalizada.

### 6. WhatsApp

Se creo `lib/whatsapp.ts` para centralizar los links:

- Consulta general.
- Consulta por producto.
- Pedido del carrito con productos, cantidades y total.

Esto evita repetir links manuales y permite cambiar el numero desde variables de entorno.

### 7. SEO y estados de carga/error

Se agregaron:

- `app/sitemap.ts`: sitemap con rutas estaticas y productos activos.
- `app/robots.ts`: reglas basicas de indexacion.
- `app/catalogo/loading.tsx`: skeleton del catalogo.
- `app/catalogo/error.tsx`: error boundary del catalogo.
- `app/catalogo/[id]/loading.tsx`: skeleton del detalle.
- `app/catalogo/[id]/error.tsx`: error boundary del detalle.

## Como funciona el flujo principal

1. `npm run seed` crea y llena `data/database.db`.
2. Las paginas server-side consultan Drizzle desde `lib/db/queries.ts`.
3. La home muestra productos destacados con `getFeaturedProducts()`.
4. El catalogo lee filtros desde `searchParams` y llama `getAllProducts()`.
5. El detalle usa `getProductById()` y muestra informacion segun `productType`.
6. El carrito funciona del lado cliente con `CartContext.tsx` y persiste en `localStorage`.
7. WhatsApp recibe mensajes preformateados desde `lib/whatsapp.ts`.

## Como ejecutar localmente

Instalar dependencias:

```bash
npm install
```

Si `better-sqlite3` falla por version de Node:

```bash
npm rebuild better-sqlite3
```

Poblar la base de datos:

```bash
npm run seed
```

Levantar el servidor:

```bash
npm run dev
```

Abrir:

```text
http://localhost:3000
```

Validar calidad antes de subir:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Que falta por terminar

### Funcionalidad

- Implementar pagina `/contacto` con formulario de asesoria.
- Conectar formulario a WhatsApp, Formspree, Resend u otro servicio real.
- Agregar sistema de autenticacion si se construye el panel admin.
- Construir panel `/admin` para gestionar productos sin tocar codigo.
- Crear CRUD de productos con Server Actions.
- Definir flujo real de pago, envio y confirmacion de pedido.
- Agregar control real de stock al confirmar compras.

### Datos y contenido

- Reemplazar placeholders de redes sociales por URLs reales.
- Revisar imagenes de Unsplash y cambiar cualquier URL que no cargue.
- Confirmar precios, descripciones y especies reales.
- Cambiar `NEXT_PUBLIC_WHATSAPP_NUMBER` por el numero oficial.
- Cambiar `NEXT_PUBLIC_SITE_URL` por el dominio final.

### Calidad

- Agregar pruebas unitarias o de integracion para queries y carrito.
- Revisar responsive final en 375px, 768px y 1280px.
- Auditar accesibilidad con teclado y lector de pantalla.
- Revisar contraste visual en botones, badges y textos secundarios.
- Validar que todas las imagenes tengan `alt` correcto.
- Ejecutar `npm run build` antes de desplegar.

## Sugerencias para despliegue

### Hosting recomendado

Para un MVP con Next.js, Vercel es la opcion mas directa. Sin embargo, hay que considerar que este proyecto usa SQLite local con `better-sqlite3`.

SQLite local funciona bien en desarrollo, pero en plataformas serverless puede tener limitaciones porque el filesystem no siempre es persistente. Para produccion hay tres caminos recomendados:

1. Mantener SQLite solo si se despliega en un servidor persistente, VPS o entorno Node con disco estable.
2. Migrar a Turso/libSQL si se quiere mantener una experiencia similar a SQLite pero apta para produccion.
3. Migrar a Postgres si se necesita crecimiento, panel admin, ordenes reales y multiples usuarios.

### Checklist antes de produccion

- Definir dominio final.
- Configurar `NEXT_PUBLIC_SITE_URL` con el dominio real.
- Configurar `NEXT_PUBLIC_WHATSAPP_NUMBER` con el numero oficial.
- Revisar `next.config.ts` para todos los dominios de imagenes usados.
- Ejecutar:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

- Ejecutar `npm run seed` solo en entornos donde se necesiten datos iniciales.
- No subir `.env.local` si el repositorio es publico.
- Confirmar que `data/database.db` no se suba si contiene datos locales o privados.
- Configurar backups si se mantiene SQLite en produccion.
- Revisar sitemap generado en `/sitemap.xml`.
- Revisar robots en `/robots.txt`.

## Como pushear todo al repositorio en main

Primero revisar el estado:

```bash
git status
```

Ver los cambios antes de commitear:

```bash
git diff
```

Agregar los archivos del proyecto:

```bash
git add .
```

Si no quieres subir `.env.local` o `data/database.db`, verifica que esten ignorados por `.gitignore`. Si aparecen en `git status`, no los agregues o quitalos del stage:

```bash
git restore --staged .env.local data/database.db
```

Crear el commit:

```bash
git commit -m "Implement GreenPath MVP catalog and cart"
```

Cambiar a `main` si no estas ahi:

```bash
git branch --show-current
git switch main
```

Si ya estas en `main`, pushear:

```bash
git push origin main
```

Si `main` no existe en remoto o no esta trackeando origin:

```bash
git push -u origin main
```

## Mensaje de commit recomendado

Recomendado:

```text
Implement GreenPath MVP catalog and cart
```

Alternativa en español:

```text
Implementar MVP de catalogo y carrito para GreenPath
```

La primera opcion es mas consistente con convenciones comunes de Git en ingles y resume bien el cambio: se implemento el MVP funcional con catalogo, detalle de producto, carrito, seed, componentes compartidos, WhatsApp y SEO base.
