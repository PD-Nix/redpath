# Resumen del proyecto

## Estructura general

- `app/`
  - Contiene la aplicación principal de Next.js usando el nuevo sistema `app router`.
  - Archivos clave:
    - `app/page.tsx`
    - `app/layout.tsx`
    - `app/globals.css`
- `lib/db/`
  - Contiene la lógica de base de datos: `index.ts`, `queries.ts` y `schema.ts`.
- `drizzle/`
  - Contiene migraciones, SQL y metadatos de la base de datos.
- `data/`
  - Almacena el archivo SQLite `database.db` u otros datos relacionados.

---

## `app/`

### `app/page.tsx`

Esta es la página principal (`HomePage`) de la aplicación. La estructura de la página es:

- Hero principal
  - Contenedor centrado con fondo semitransparente y blur.
  - Título grande: "Tu camino hacia un hogar vivo".
  - Texto descriptivo: "No solo vendemos plantas, te enseñamos a que prosperen contigo. Acompañamiento real en cada brote."
  - Botón/Link a `/catalogo` con estilo de botón verde.
- Fondos decorativos
  - Dos círculos borrosos con colores verdes claros posicionados como elementos visuales.
- Sección de Productos Destacados
  - Título de bloque: "Selección del mes" y subtítulo "Plantas para empezar".
  - Link a `/catalogo` con estilo subrayado.
  - Grid responsive de 1 a 3 columnas.
  - Cada tarjeta de producto incluye:
    - Imagen del producto (`Image` de Next.js)
    - Etiqueta de dificultad en la esquina
    - Nombre de la planta
    - Descripción corta con `line-clamp-2`
- Banner de WhatsApp
  - Fondo oscuro con texto claro.
  - Llamada a la acción para asesoría.
  - Enlace directo a WhatsApp con número placeholder `1234567890`.

Funcionalidad principal:

- Llama a `getFeaturedProducts()` para obtener `allPlants`.
- Renderiza las plantas destacadas dentro de las tarjetas.
- Filtra productos de tipo `plant` activos.

### `app/layout.tsx`

Define el layout raíz de la aplicación:

- Importa fuentes de `next/font/google`: `Geist` y `Geist Mono`.
- Exporta metadata genérica para el sitio (`title`, `description`).
- Envuelve la aplicación en HTML y `body`:
  - `lang="en"`
  - Clases globales de fuente y estilo.
  - `body` con `min-h-full flex flex-col`.

### `app/globals.css`

- Archivo de estilos globales compartidos por toda la aplicación.
- No se leyó su contenido completo, pero se sabe que está importado desde `layout.tsx`.

---

## `components/`

- Carpeta actualmente vacía.
- Recomendación: si deseas una estructura más clara, mueve los componentes compartidos a `app/components/` o a una subcarpeta dentro de `app/`.
- En un proyecto Next.js con `app router`, `components/` puede usarse, pero no está integrada actualmente.

---

## `lib/db/index.ts`

Función principal:

- Importa `drizzle` de `drizzle-orm/better-sqlite3`.
- Crea una instancia SQLite con `better-sqlite3` apuntando a `data/database.db`.
- Exporta `db` con el esquema completo importado desde `./schema`.

Uso:

- Es la conexión central para consultar la base de datos.
- `queries.ts` importa `db` desde aquí.

---

## `lib/db/queries.ts`

Funcionalidad actual:

- Exporta la función `getFeaturedProducts()`.
- Construye una consulta Drizzle para obtener productos de tipo `plant` activos.
- Selecciona campos:
  - `id`, `name`, `description`, `url_photo`, `price` desde `products`
  - `difficulty` desde `plants`
- Une `products` con `plants` usando `innerJoin`.
- Limita el resultado a 3 elementos.
- Devuelve `{ allPlants }`.

Significado:

- Esta query alimenta la página principal con las plantas destacadas.
- Solo muestra productos que son plantas y están activos.

---

## `lib/db/schema.ts`

Define el modelo de datos y las relaciones de la base de datos con Drizzle.

### Tablas principales

- `users`
  - Campos: `id`, `email`, `passwordHash`, `fullName`, `avatarUrl`, `isAdmin`, `createdAt`, `lastLogin`, `lightPreference`, `experienceLevel`, `activeSubscription`.
- `products`
  - Campos: `id`, `name`, `description`, `price`, `urlPhoto`, `stock`, `productType`, `isActive`, `createdAt`, `updatedAt`.
  - `productType` distingue entre `plant`, `kit`, `course`, `tool`.

### Tablas específicas por tipo de producto

- `plants`
  - Relación 1:1 con `products`.
  - Campos: `species`, `lightNeeds`, `wateringFrequency`, `humidity`, `temperatureMin`, `difficulty`.
- `kits`
  - Relación 1:1 con `products`.
  - Campos bool: `includesPlant`, `includesTool`, `includesSubstrate`.
  - `componentIds` como texto separado por comas para MVP.
- `courses`
  - Campos: `teacher`, `difficulty`, `duration`, `videoUrl`, `contentType`.
- `tools`
  - Campos: `brand`, `material`, `warrantyMonths`.

### Órdenes y pagos

- `orders`
  - Campos: `id`, `userId`, `orderDate`, `status`, `totalAmount`, `shippingAddress`, `paymentMethod`, `paymentId`, `trackingNumber`, `warrantyClaimed`, `warrantyResolved`.
- `orderItems`
  - Campos: `id`, `orderId`, `productId`, `quantity`, `unitPrice`, `isCourseAccess`.

### Relaciones definidas

- `usersRelations`: un usuario puede tener muchas órdenes.
- `productsRelations`: un producto puede tener un `plant`, `kit`, `course`, `tool`, y muchos `orderItems`.
- `plantsRelations`, `kitsRelations`, `coursesRelations`, `toolsRelations`: cada tabla específica se relaciona con su producto.
- `ordersRelations`: cada orden se relaciona con un usuario y muchos items.
- `orderItemsRelations`: cada item pertenece a una orden y a un producto.

---

## Observaciones adicionales

- El proyecto está en base a Next.js con `app router` y Drizzle ORM + SQLite.
- La estructura de carpetas puede mejorar si `components/` se mueve dentro de `app/` o se usa como subcarpeta de UI compartida.
- La página `app/page.tsx` es la única página actual visible aquí; no hay más `page.tsx` en otras rutas dentro del árbol mostrado.

---

## Recomendaciones rápidas

- Si quieres que todo el front esté agrupado, mueve `components/` a `app/components/`.
- Ajusta `app/layout.tsx` metadata para un título y descripción reales del proyecto.
- Actualiza el enlace de WhatsApp en `app/page.tsx` con el número real.
- Añade más queries en `lib/db/queries.ts` para otras páginas de catálogo o detalles si el proyecto crece.
