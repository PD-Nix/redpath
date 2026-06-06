CREATE TABLE `courses` (
	`product_id` integer PRIMARY KEY NOT NULL,
	`teacher` text NOT NULL,
	`difficulty` text NOT NULL,
	`duration` text,
	`video_url` text,
	`content_type` text,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `kits` (
	`product_id` integer PRIMARY KEY NOT NULL,
	`includes_plant` integer DEFAULT false,
	`includes_tool` integer DEFAULT false,
	`includes_substrate` integer DEFAULT false,
	`component_ids` text,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `order_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order_id` integer NOT NULL,
	`product_id` integer NOT NULL,
	`quantity` integer NOT NULL,
	`unit_price` integer NOT NULL,
	`is_course_access` integer DEFAULT false,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`order_date` integer,
	`status` text DEFAULT 'pending',
	`total_amount` integer NOT NULL,
	`shipping_address` text,
	`payment_method` text,
	`payment_id` text,
	`tracking_number` text,
	`warranty_claimed` integer DEFAULT false,
	`warranty_resolved` integer DEFAULT false,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE TABLE `plants` (
	`product_id` integer PRIMARY KEY NOT NULL,
	`species` text,
	`light_needs` text,
	`watering_frequency` text,
	`humidity` text,
	`temperature_min` integer,
	`difficulty` text,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` integer NOT NULL,
	`url_photo` text NOT NULL,
	`stock` integer DEFAULT 0,
	`product_type` text NOT NULL,
	`is_active` integer DEFAULT true,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `tools` (
	`product_id` integer PRIMARY KEY NOT NULL,
	`brand` text,
	`material` text,
	`warranty_months` integer DEFAULT 0,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`full_name` text,
	`avatar_url` text,
	`is_admin` integer DEFAULT false,
	`created_at` integer,
	`last_login` integer,
	`light_preference` text,
	`experience_level` text,
	`active_subscription` integer DEFAULT false
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);