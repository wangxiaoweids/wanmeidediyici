/*
# Create products table for e-commerce store (single-tenant, no auth)

1. New Tables
- `products`
  - `id` (uuid, primary key)
  - `name` (text, not null) — product name
  - `description` (text, not null) — product description
  - `price` (numeric, not null) — price in USD
  - `image_url` (text) — product image URL
  - `category` (text, not null) — product category
  - `rating` (numeric, default 0) — average rating 0-5
  - `stock` (integer, default 0) — available inventory
  - `featured` (boolean, default false) — show in hero/featured section
  - `created_at` (timestamptz) — creation timestamp
2. Security
- Enable RLS on `products`.
- Allow anon + authenticated read access (public catalog).
- Allow anon + authenticated insert/update/delete (admin management).
3. Notes
- Single-tenant app with no sign-in. Products are intentionally public/shared.
- Cart state is managed client-side (localStorage) — no orders table needed for MVP.
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric(10, 2) NOT NULL,
  image_url text,
  category text NOT NULL,
  rating numeric(2, 1) DEFAULT 0,
  stock integer NOT NULL DEFAULT 0,
  featured boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_products" ON products;
CREATE POLICY "anon_insert_products" ON products FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_products" ON products;
CREATE POLICY "anon_update_products" ON products FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_products" ON products;
CREATE POLICY "anon_delete_products" ON products FOR DELETE
  TO anon, authenticated USING (true);
