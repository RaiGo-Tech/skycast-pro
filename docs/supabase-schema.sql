create extension if not exists pgcrypto;

create table if not exists public.weather_search_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  searched_city text not null,
  country text default '',
  source_query text default '',
  weather_summary jsonb not null default '{}'::jsonb,
  weather_payload jsonb not null default '{}'::jsonb,
  searched_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists weather_search_history_user_time_idx
  on public.weather_search_history (user_id, searched_at desc);

create index if not exists weather_search_history_user_city_idx
  on public.weather_search_history (user_id, (lower(searched_city)));

alter table public.weather_search_history enable row level security;

grant select, insert, delete on public.weather_search_history to authenticated;

drop policy if exists "Users can read own weather history" on public.weather_search_history;
create policy "Users can read own weather history"
  on public.weather_search_history
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own weather history" on public.weather_search_history;
create policy "Users can insert own weather history"
  on public.weather_search_history
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete own weather history" on public.weather_search_history;
create policy "Users can delete own weather history"
  on public.weather_search_history
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);
