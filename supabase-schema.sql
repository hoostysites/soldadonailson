-- =====================================================================
-- Schema para o Link na Bio do Soldado Nailson
-- Rode este script inteiro em: Supabase > SQL Editor > New query > Run
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------- TABELA: links (botões de link da página) ----------
create table if not exists public.links (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null,
  icon text,                          -- emoji ou texto curto, ex: "📸"
  position integer not null default 0, -- ordem de exibição (menor aparece primeiro)
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- TABELA: socials (ícones de redes sociais) ----------
create table if not exists public.socials (
  id uuid primary key default gen_random_uuid(),
  platform text not null,             -- instagram | facebook | whatsapp | youtube | tiktok | x | telegram | linkedin | email | site
  url text not null,
  position integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------- SEGURANÇA (Row Level Security) ----------
alter table public.links enable row level security;
alter table public.socials enable row level security;

-- Qualquer visitante (anônimo) só enxerga itens marcados como ativos
create policy "public_select_active_links" on public.links
  for select using (active = true);

create policy "public_select_active_socials" on public.socials
  for select using (active = true);

-- Usuário logado (o admin) enxerga tudo, inclusive itens inativos
create policy "auth_select_all_links" on public.links
  for select using (auth.role() = 'authenticated');

create policy "auth_select_all_socials" on public.socials
  for select using (auth.role() = 'authenticated');

-- Usuário logado pode criar, editar e apagar
create policy "auth_insert_links" on public.links
  for insert with check (auth.role() = 'authenticated');
create policy "auth_update_links" on public.links
  for update using (auth.role() = 'authenticated');
create policy "auth_delete_links" on public.links
  for delete using (auth.role() = 'authenticated');

create policy "auth_insert_socials" on public.socials
  for insert with check (auth.role() = 'authenticated');
create policy "auth_update_socials" on public.socials
  for update using (auth.role() = 'authenticated');
create policy "auth_delete_socials" on public.socials
  for delete using (auth.role() = 'authenticated');

-- ---------- DADOS DE EXEMPLO (edite/apague pelo painel admin depois) ----------
insert into public.links (title, url, icon, position) values
  ('Site oficial da campanha', 'https://soldadonailson.br', '🌐', 1),
  ('Fale comigo no WhatsApp', 'https://wa.me/5500000000000', '💬', 2);

insert into public.socials (platform, url, position) values
  ('instagram', 'https://www.instagram.com/soldadonailson', 1),
  ('whatsapp', 'https://wa.me/5500000000000', 2),
  ('site', 'https://soldadonailson.br', 3);

-- =====================================================================
-- JÁ TINHA INSTALADO A VERSÃO ANTERIOR (com a tabela "updates")?
-- Rode o bloco abaixo separadamente, só se quiser remover de vez a
-- funcionalidade de Atualizações e apagar os dados que já existem lá.
-- =====================================================================
-- drop table if exists public.updates;
