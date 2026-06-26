-- ── Portfolio items ─────────────────────────────────────────────────
create table if not exists public.portfolio_items (
  id            uuid primary key default gen_random_uuid(),
  category      text not null check (category in ('photo','graphic','motion','film','marketing')),
  title         text not null default '',
  media_type    text not null check (media_type in ('image','youtube','vimeo','mp4','local_video')),
  url           text not null,
  poster_url    text,
  display_order integer not null default 0,
  visible       boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── Site settings (singleton) ────────────────────────────────────────
create table if not exists public.site_settings (
  id            integer primary key default 1,
  hero_line_1   text not null default 'Christian',
  hero_line_2   text not null default 'Del Pilar',
  hero_line_3   text not null default 'media & marketing.',
  hero_lede     text not null default 'Photographer. Motion designer. Marketer. Based in Florida.',
  about_lede    text not null default 'I help brands and people communicate clearly through visual media.',
  about_p1      text not null default '',
  about_p2      text not null default '',
  email         text not null default 'hello@chrisdotmedia.com',
  linkedin      text not null default '',
  instagram     text not null default '',
  updated_at    timestamptz not null default now(),
  -- Enforce singleton
  constraint site_settings_single_row check (id = 1)
);

-- Seed the singleton row if it doesn't exist
insert into public.site_settings (id) values (1) on conflict do nothing;

-- ── updated_at trigger ──────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger portfolio_items_updated_at
  before update on public.portfolio_items
  for each row execute function public.set_updated_at();

create or replace trigger site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- ── Row Level Security ──────────────────────────────────────────────
alter table public.portfolio_items enable row level security;
alter table public.site_settings   enable row level security;

-- portfolio_items: public read
create policy "Public can read visible portfolio items"
  on public.portfolio_items for select
  using (visible = true);

-- portfolio_items: authenticated full access
create policy "Authenticated users have full access to portfolio items"
  on public.portfolio_items for all
  to authenticated
  using (true)
  with check (true);

-- site_settings: public read
create policy "Public can read site settings"
  on public.site_settings for select
  using (true);

-- site_settings: authenticated update
create policy "Authenticated users can update site settings"
  on public.site_settings for update
  to authenticated
  using (true)
  with check (true);

-- ── Supabase Storage bucket ─────────────────────────────────────────
-- Run this in the Supabase dashboard Storage tab or via the API:
-- Create bucket "portfolio-uploads" with public access enabled
-- insert into storage.buckets (id, name, public) values ('portfolio-uploads', 'portfolio-uploads', true)
-- on conflict do nothing;
