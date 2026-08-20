-- =====================================================================
-- Schema para o Link na Bio do Soldado Nailson
-- Rode este script inteiro em: Supabase > SQL Editor > New query > Run
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------- TABELA: links (botões da página) ----------
create table if not exists public.links (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null,
  icon text,                          -- emoji ou texto curto, ex: "📸"
  position integer not null default 0, -- ordem de exibição (menor aparece primeiro)
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- TABELA: updates (feed de novidades/atualizações) ----------
create table if not exists public.updates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  link_url text,                       -- link opcional de "saiba mais"
  published_at timestamptz not null default now(),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- SEGURANÇA (Row Level Security) ----------
alter table public.links enable row level security;
alter table public.updates enable row level security;

-- Qualquer visitante (anônimo) só enxerga itens marcados como ativos
create policy "public_select_active_links" on public.links
  for select using (active = true);

create policy "public_select_active_updates" on public.updates
  for select using (active = true);

-- Usuário logado (o admin) enxerga tudo, inclusive itens inativos
create policy "auth_select_all_links" on public.links
  for select using (auth.role() = 'authenticated');

create policy "auth_select_all_updates" on public.updates
  for select using (auth.role() = 'authenticated');

-- Usuário logado pode criar, editar e apagar
create policy "auth_insert_links" on public.links
  for insert with check (auth.role() = 'authenticated');
create policy "auth_update_links" on public.links
  for update using (auth.role() = 'authenticated');
create policy "auth_delete_links" on public.links
  for delete using (auth.role() = 'authenticated');

create policy "auth_insert_updates" on public.updates
  for insert with check (auth.role() = 'authenticated');
create policy "auth_update_updates" on public.updates
  for update using (auth.role() = 'authenticated');
create policy "auth_delete_updates" on public.updates
  for delete using (auth.role() = 'authenticated');

-- ---------- DADOS DE EXEMPLO (edite/apague pelo painel admin depois) ----------
insert into public.links (title, url, icon, position) values
  ('Site oficial da campanha', 'https://soldadonailson.br', '🌐', 1),
  ('Instagram', 'https://www.instagram.com/soldadonailson', '📸', 2),
  ('Fale comigo no WhatsApp', 'https://wa.me/5500000000000', '💬', 3);

insert into public.updates (title, content) values
  ('Bem-vindo!', 'Acompanhe por aqui as novidades do mandato e da candidatura a Deputado Federal pela Bahia.');
