-- ==========================================================
-- VYP FPV — Schema Supabase (PostgreSQL)
-- A executer dans Supabase Dashboard > SQL Editor > New query
-- ==========================================================

-- Extension utile pour les UUID
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------
-- PROFILES (etend auth.users, qui est gere par Supabase Auth)
-- ----------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  address_line1 text,
  address_line2 text,
  postal_code text,
  city text,
  country text default 'France',
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------
-- CATEGORIES
-- ----------------------------------------------------------
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  icon text,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------
-- PRODUCTS
-- ----------------------------------------------------------
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  short_description text,
  description text,
  price numeric(10, 2) not null check (price >= 0),
  compare_at_price numeric(10, 2),
  stock integer not null default 0 check (stock >= 0),
  weight_g integer,
  sku text unique,
  images text[] not null default '{}',
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists products_category_id_idx on public.products(category_id);
create index if not exists products_slug_idx on public.products(slug);
create index if not exists products_featured_idx on public.products(featured);

-- ----------------------------------------------------------
-- ORDERS
-- ----------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  total numeric(10, 2) not null default 0,
  stripe_session_id text unique,
  shipping_address jsonb,
  created_at timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders(user_id);

-- ----------------------------------------------------------
-- ORDER_ITEMS
-- ----------------------------------------------------------
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10, 2) not null
);

create index if not exists order_items_order_id_idx on public.order_items(order_id);

-- ----------------------------------------------------------
-- REVIEWS
-- ----------------------------------------------------------
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  author_name text not null,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

create index if not exists reviews_product_id_idx on public.reviews(product_id);

-- ----------------------------------------------------------
-- WISHLIST
-- ----------------------------------------------------------
create table if not exists public.wishlist (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

-- ==========================================================
-- ROW LEVEL SECURITY
-- ==========================================================
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.reviews enable row level security;
alter table public.wishlist enable row level security;

-- Profiles: chacun lit/modifie uniquement le sien
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

-- Categories & Products: lecture publique (boutique visible sans compte)
create policy "categories_public_read" on public.categories
  for select using (true);
create policy "products_public_read" on public.products
  for select using (true);
-- Les ecritures (insert/update/delete) sur products/categories passent
-- par les routes serveur avec la cle service_role (voir lib/supabase/admin.ts),
-- qui contourne la RLS. Aucune policy d'ecriture cote client n'est ouverte.

-- Orders: chacun voit/insere uniquement ses commandes
create policy "orders_select_own" on public.orders
  for select using (auth.uid() = user_id);
create policy "orders_insert_own" on public.orders
  for insert with check (auth.uid() = user_id);

-- Order items: visibles si la commande parente appartient a l'utilisateur
create policy "order_items_select_own" on public.order_items
  for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id and o.user_id = auth.uid()
    )
  );

-- Reviews: lecture publique, ecriture par utilisateurs connectes
create policy "reviews_public_read" on public.reviews
  for select using (true);
create policy "reviews_insert_own" on public.reviews
  for insert with check (auth.uid() = user_id);
create policy "reviews_delete_own" on public.reviews
  for delete using (auth.uid() = user_id);

-- Wishlist: strictement privee
create policy "wishlist_all_own" on public.wishlist
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ==========================================================
-- STORAGE (images produits)
-- Va dans Dashboard > Storage > New bucket "product-images" (public)
-- puis relance uniquement la policy ci-dessous si besoin.
-- ==========================================================
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "product_images_public_read" on storage.objects
  for select using (bucket_id = 'product-images');
