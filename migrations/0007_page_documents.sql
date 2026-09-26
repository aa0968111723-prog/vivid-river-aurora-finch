-- Page documents live in site_settings.key = 'page_documents'.
-- Legacy site_settings.key = 'layout' is merged in application code.
-- This statement only makes sure the settings table exists.
create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
