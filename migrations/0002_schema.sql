-- TKU Zen Club schema. Idempotent. Public content is unowned (world-readable);
-- admin writes are gated in server functions, not by user_id on the rows.

create table if not exists profiles (
  user_id text primary key,
  role text not null default 'viewer' check (role in ('admin', 'editor', 'viewer')),
  display_name text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists event_categories (
  id text primary key,
  name_zh text not null,
  sort_order int not null default 0
);

create table if not exists events (
  id text primary key,
  slug text not null unique,
  title text not null,
  subtitle text,
  cover_image text,
  category_id text not null references event_categories(id),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  timezone text not null default 'Asia/Taipei',
  location_name text not null,
  location_detail text,
  map_url text,
  summary text not null default '',
  body text not null default '',
  audience text,
  registration_mode text not null default 'closed'
    check (registration_mode in ('google_form', 'internal', 'external', 'instagram_dm', 'closed')),
  registration_url text,
  registration_note text,
  capacity int,
  registered_count int,
  status_override text
    check (status_override in ('upcoming', 'open', 'filling', 'full', 'ended')),
  ig_url text,
  canva_url text,
  faq jsonb not null default '[]'::jsonb,
  published_at timestamptz,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  is_demo boolean not null default false,
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists events_starts_at_idx on events (starts_at);
create index if not exists events_status_idx on events (status);
create index if not exists events_category_idx on events (category_id);

create table if not exists event_assets (
  id text primary key,
  event_id text not null references events(id) on delete cascade,
  kind text not null check (kind in ('photo', 'video', 'poster', 'canva', 'ig', 'drive')),
  url text not null,
  preview_url text,
  caption text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists stories (
  id text primary key,
  slug text not null unique,
  quote text not null,
  body text not null,
  display_name text not null,
  role_label text,
  photo_url text,
  joined_label text,
  related_event_id text references events(id),
  instagram_url text,
  consent boolean not null default false,
  published_at timestamptz,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  is_demo boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists faq (
  id text primary key,
  question text not null,
  answer text not null,
  icon text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists instagram_posts (
  id text primary key,
  post_url text not null,
  thumbnail_url text,
  caption text,
  post_type text not null default 'image' check (post_type in ('image', 'reel', 'carousel')),
  published_on date,
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists assets (
  id text primary key,
  title text,
  url text not null,
  preview_url text,
  asset_type text not null default 'image'
    check (asset_type in ('image', 'video', 'canva', 'drive', 'poster', 'other')),
  canva_url text,
  drive_url text,
  event_id text references events(id),
  tags text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists content_blocks (
  id text primary key,
  page text not null,
  block_key text not null,
  title text,
  body text,
  sort_order int not null default 0,
  visible boolean not null default true,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique (page, block_key)
);

create table if not exists analytics_events (
  id text primary key,
  event_name text not null,
  path text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  landing_page text,
  event_id text,
  created_at timestamptz not null default now()
);

create index if not exists analytics_events_name_idx on analytics_events (event_name, created_at desc);

create table if not exists event_registrations (
  id text primary key,
  event_id text not null references events(id) on delete cascade,
  status text not null default 'clicked',
  source text,
  created_at timestamptz not null default now()
);

create table if not exists announcements (
  id text primary key,
  title text not null,
  body text,
  href text,
  visible boolean not null default false,
  created_at timestamptz not null default now()
);
