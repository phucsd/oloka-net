-- Migration: 20261010_030721_update_schema_seo_redirects_search
-- Supports Cloudflare D1 and SQLite for Payload CMS 3

CREATE TABLE IF NOT EXISTS `redirects` (
	`id` integer PRIMARY KEY NOT NULL,
	`from` text NOT NULL,
	`to_type` text DEFAULT 'reference',
	`to_url` text,
	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS `redirects_from_idx` ON `redirects` (`from`);
CREATE INDEX IF NOT EXISTS `redirects_updated_at_idx` ON `redirects` (`updated_at`);
CREATE INDEX IF NOT EXISTS `redirects_created_at_idx` ON `redirects` (`created_at`);

CREATE TABLE IF NOT EXISTS `redirects_rels` (
	`id` integer PRIMARY KEY NOT NULL,
	`order` integer,
	`parent_id` integer NOT NULL,
	`path` text NOT NULL,
	`articles_id` integer,
	FOREIGN KEY (`parent_id`) REFERENCES `redirects`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`articles_id`) REFERENCES `articles`(`id`) ON UPDATE no action ON DELETE cascade
);
CREATE INDEX IF NOT EXISTS `redirects_rels_order_idx` ON `redirects_rels` (`order`);
CREATE INDEX IF NOT EXISTS `redirects_rels_parent_idx` ON `redirects_rels` (`parent_id`);
CREATE INDEX IF NOT EXISTS `redirects_rels_path_idx` ON `redirects_rels` (`path`);
CREATE INDEX IF NOT EXISTS `redirects_rels_articles_id_idx` ON `redirects_rels` (`articles_id`);

CREATE TABLE IF NOT EXISTS `search` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`priority` numeric,
	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
);
CREATE INDEX IF NOT EXISTS `search_updated_at_idx` ON `search` (`updated_at`);
CREATE INDEX IF NOT EXISTS `search_created_at_idx` ON `search` (`created_at`);

CREATE TABLE IF NOT EXISTS `search_rels` (
	`id` integer PRIMARY KEY NOT NULL,
	`order` integer,
	`parent_id` integer NOT NULL,
	`path` text NOT NULL,
	`articles_id` integer,
	FOREIGN KEY (`parent_id`) REFERENCES `search`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`articles_id`) REFERENCES `articles`(`id`) ON UPDATE no action ON DELETE cascade
);
CREATE INDEX IF NOT EXISTS `search_rels_order_idx` ON `search_rels` (`order`);
CREATE INDEX IF NOT EXISTS `search_rels_parent_idx` ON `search_rels` (`parent_id`);
CREATE INDEX IF NOT EXISTS `search_rels_path_idx` ON `search_rels` (`path`);
CREATE INDEX IF NOT EXISTS `search_rels_articles_id_idx` ON `search_rels` (`articles_id`);

ALTER TABLE `articles` ADD `image_url` text;
ALTER TABLE `articles` ADD `canonical_url` text;
ALTER TABLE `articles` ADD `target_region` text DEFAULT 'VN';
ALTER TABLE `articles` ADD `geo_place` text DEFAULT 'Việt Nam';
ALTER TABLE `articles` ADD `geo_coordinates` text DEFAULT '21.0285, 105.8542';
ALTER TABLE `articles` ADD `meta_title` text;
ALTER TABLE `articles` ADD `meta_description` text;
ALTER TABLE `articles` ADD `meta_image_id` integer REFERENCES media(id);
CREATE INDEX IF NOT EXISTS `articles_meta_meta_image_idx` ON `articles` (`meta_image_id`);

ALTER TABLE `payload_locked_documents_rels` ADD `redirects_id` integer REFERENCES redirects(id);
ALTER TABLE `payload_locked_documents_rels` ADD `search_id` integer REFERENCES search(id);
CREATE INDEX IF NOT EXISTS `payload_locked_documents_rels_redirects_id_idx` ON `payload_locked_documents_rels` (`redirects_id`);
CREATE INDEX IF NOT EXISTS `payload_locked_documents_rels_search_id_idx` ON `payload_locked_documents_rels` (`search_id`);
