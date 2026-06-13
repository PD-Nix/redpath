import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// ---------- 1. Usuarios ----------
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  fullName: text('full_name'),
  avatarUrl: text('avatar_url'),
  isAdmin: integer('is_admin', { mode: 'boolean' }).default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  lastLogin: integer('last_login', { mode: 'timestamp' }),
  // Preferencias (para club)
  lightPreference: text('light_preference'), // 'baja', 'media', 'alta'
  experienceLevel: text('experience_level'), // 'principiante', 'intermedio', 'avanzado'
  activeSubscription: integer('active_subscription', { mode: 'boolean' }).default(false),
});

// ---------- 2. Tabla base: productos ----------
export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  price: integer('price').notNull(), // en centavos
  urlPhoto: text('url_photo').notNull(),
  stock: integer('stock').default(0),
  productType: text('product_type').notNull(), // 'plant', 'kit', 'course', 'tool'
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// ---------- 3. Tablas específicas (1:1 con products) ----------

// Plantas
export const plants = sqliteTable('plants', {
  productId: integer('product_id')
    .primaryKey()
    .references(() => products.id, { onDelete: 'cascade' }),
  species: text('species'),
  lightNeeds: text('light_needs'), // 'baja', 'media', 'alta', 'exterior'
  wateringFrequency: text('watering_frequency'),
  humidity: text('humidity'),
  temperatureMin: integer('temperature_min'),
  difficulty: text('difficulty'), // 'fácil', 'media', 'experto'
});

// Kits
export const kits = sqliteTable('kits', {
  productId: integer('product_id')
    .primaryKey()
    .references(() => products.id, { onDelete: 'cascade' }),
  includesPlant: integer('includes_plant', { mode: 'boolean' }).default(false),
  includesTool: integer('includes_tool', { mode: 'boolean' }).default(false),
  includesSubstrate: integer('includes_substrate', { mode: 'boolean' }).default(false),
  // Para MVP, puedes guardar los IDs de componentes como texto separado por comas
  componentIds: text('component_ids'), // ej. "1,5,8"
});

// Cursos
export const courses = sqliteTable('courses', {
  productId: integer('product_id')
    .primaryKey()
    .references(() => products.id, { onDelete: 'cascade' }),
  teacher: text('teacher').notNull(),
  difficulty: text('difficulty').notNull(),
  duration: text('duration'), // '2h', '6 lecciones'
  videoUrl: text('video_url'),
  contentType: text('content_type'), // 'video', 'pdf', 'interactivo'
});

// Herramientas
export const tools = sqliteTable('tools', {
  productId: integer('product_id')
    .primaryKey()
    .references(() => products.id, { onDelete: 'cascade' }),
  brand: text('brand'),
  material: text('material'),
  warrantyMonths: integer('warranty_months').default(0),
});

// ---------- 4. Órdenes y pagos ----------
export const orders = sqliteTable('orders', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'restrict' }),
  orderDate: integer('order_date', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  status: text('status').default('pending'), // pending, paid, shipped, delivered, cancelled
  totalAmount: integer('total_amount').notNull(), // centavos
  shippingAddress: text('shipping_address'),
  paymentMethod: text('payment_method'),
  paymentId: text('payment_id'),
  trackingNumber: text('tracking_number'),
  warrantyClaimed: integer('warranty_claimed', { mode: 'boolean' }).default(false),
  warrantyResolved: integer('warranty_resolved', { mode: 'boolean' }).default(false),
});

export const orderItems = sqliteTable('order_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orderId: integer('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  productId: integer('product_id')
    .notNull()
    .references(() => products.id),
  quantity: integer('quantity').notNull(),
  unitPrice: integer('unit_price').notNull(), // precio al momento de la compra
  isCourseAccess: integer('is_course_access', { mode: 'boolean' }).default(false), // compra individual de curso
});

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  content: text('content').notNull(),
  // 🪟 El "hueco de la ventana": opcional, no lleva .notNull()
  imageUrl: text('image_url'), 
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(new Date()),
});

// Tabla para las Respuestas/Comentarios
export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  postId: integer('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(new Date()),
});

// ---------- RELACIONES ----------
export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  plant: one(plants, { fields: [products.id], references: [plants.productId] }),
  kit: one(kits, { fields: [products.id], references: [kits.productId] }),
  course: one(courses, { fields: [products.id], references: [courses.productId] }),
  tool: one(tools, { fields: [products.id], references: [tools.productId] }),
  orderItems: many(orderItems),
}));

export const plantsRelations = relations(plants, ({ one }) => ({
  product: one(products, { fields: [plants.productId], references: [products.id] }),
}));

export const kitsRelations = relations(kits, ({ one }) => ({
  product: one(products, { fields: [kits.productId], references: [products.id] }),
}));

export const coursesRelations = relations(courses, ({ one }) => ({
  product: one(products, { fields: [courses.productId], references: [products.id] }),
}));

export const toolsRelations = relations(tools, ({ one }) => ({
  product: one(products, { fields: [tools.productId], references: [products.id] }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, { fields: [orders.userId], references: [users.id] }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, { fields: [orderItems.productId], references: [products.id] }),
}));