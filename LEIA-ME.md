# Link na Bio — Soldado Nailson

Site de "link na bio" com painel administrativo, para você atualizar links e postar novidades sem precisar mexer em código. Banco de dados: Supabase. Hospedagem: Netlify, com a URL e a chave do Supabase configuradas como **variáveis de ambiente** (não ficam escritas no código).

## Estrutura
```
index.html            → Página pública (o link na bio em si)
admin.html             → Painel administrativo (login + gerenciar links e redes sociais)
social-icons.js         → Ícones das redes sociais (usado pela página pública e pelo admin)
config.js               → Gerado automaticamente pelo build.js -- não edite direto
build.js                → Script que lê as variáveis de ambiente e gera o config.js
netlify.toml             → Diz ao Netlify para rodar o build.js antes de publicar
supabase-schema.sql     → Script para criar as tabelas no Supabase
images/                  → Logo, foto e selo de CNPJ (mesmos arquivos do site principal)
```

## Já tinha configurado o Supabase antes desta atualização?
Se você já rodou o `supabase-schema.sql` anteriormente (antes de existir a tabela `socials`), não precisa recriar tudo — só rode este trecho a mais no SQL Editor:
```sql
create table if not exists public.socials (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  url text not null,
  position integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.socials enable row level security;

create policy "public_select_active_socials" on public.socials
  for select using (active = true);
create policy "auth_select_all_socials" on public.socials
  for select using (auth.role() = 'authenticated');
create policy "auth_insert_socials" on public.socials
  for insert with check (auth.role() = 'authenticated');
create policy "auth_update_socials" on public.socials
  for update using (auth.role() = 'authenticated');
create policy "auth_delete_socials" on public.socials
  for delete using (auth.role() = 'authenticated');

insert into public.socials (platform, url, position) values
  ('instagram', 'https://www.instagram.com/soldadonailson', 1),
  ('whatsapp', 'https://wa.me/5500000000000', 2),
  ('site', 'https://soldadonailson.br', 3);
```
(Esse mesmo trecho já está incluído no `supabase-schema.sql` completo, então se for uma instalação nova, é só rodar o arquivo inteiro normalmente.)

## Passo 1 — Criar o projeto no Supabase
1. Entre em [supabase.com](https://supabase.com) e crie uma conta (ou faça login).
2. Clique em **New Project**. Escolha um nome (ex: `soldado-nailson-linkbio`) e uma senha de banco (guarde essa senha em local seguro — não é a mesma senha do painel admin).
3. Aguarde o projeto ser criado (leva cerca de 1-2 minutos).

## Passo 2 — Criar as tabelas
1. No menu lateral do Supabase, vá em **SQL Editor**.
2. Clique em **New query**.
3. Abra o arquivo `supabase-schema.sql` (está aqui no pacote), copie todo o conteúdo e cole no editor.
4. Clique em **Run**. Isso cria as tabelas `links` e `updates`, configura a segurança (RLS) e já deixa 3 links e 1 atualização de exemplo cadastrados.

## Passo 3 — Pegar sua URL e chave pública
1. No menu lateral, vá em **Project Settings** (ícone de engrenagem) → **API**.
2. Copie o valor de **Project URL**.
3. Copie o valor de **anon public** (a chave pública/anônima — não é a `service_role`, essa nunca deve ser usada aqui).
4. Guarde os dois valores — você vai colar eles no Netlify no Passo 5, não em um arquivo.

   > A chave `anon` é pública por natureza — ela continua visível no navegador mesmo vindo de uma variável de ambiente (isso é normal em qualquer app que usa Supabase no front-end). Quem protege os dados é a regra de segurança (RLS) que o script já configurou, não o sigilo da chave. Usar variável de ambiente aqui é mais por organização/boas práticas do que por segurança extra.

## Passo 4 — Criar seu usuário de admin
Por segurança, este painel **não tem tela de cadastro pública** — só quem você criar manualmente consegue logar.
1. No Supabase, vá em **Authentication** → **Users**.
2. Clique em **Add user** → **Create new user**.
3. Preencha e-mail e senha (essa é a senha que você vai usar para logar em `/admin.html`).
4. Marque a opção **Auto Confirm User** (ou confirme o e-mail depois, se preferir).
5. Salve.

Você pode criar mais de um usuário aqui se outra pessoa da equipe também for administrar o conteúdo.

## Passo 5 — Subir no Netlify com variáveis de ambiente

Diferente do site principal, aqui o Netlify precisa **rodar um build** (o `build.js`) antes de publicar, porque é ele quem gera o `config.js` a partir das variáveis de ambiente. Isso só funciona conectando um repositório Git — **não dá pra usar o drag-and-drop de pasta** (esse método não roda build).

1. Crie um repositório no GitHub e suba esta pasta inteira nele (incluindo `netlify.toml` e `build.js`).
2. No Netlify, clique em **Add new site** → **Import an existing project** → conecte com o GitHub e escolha o repositório.
3. Na tela de configuração do build, o Netlify já deve detectar o `netlify.toml` automaticamente (comando `node build.js`, publicar `.`). Confirme.
4. **Antes de finalizar o primeiro deploy** (ou logo depois, em Site settings), vá em **Site settings → Environment variables** → **Add a variable** e cadastre:
   - `SUPABASE_URL` → cole a Project URL do Passo 3
   - `SUPABASE_ANON_KEY` → cole a anon public key do Passo 3
5. Clique em **Deploy site** (ou **Trigger deploy** se já tinha feito o deploy antes de configurar as variáveis).
6. O Netlify roda `node build.js`, que gera o `config.js` real e publica o site.

A partir de agora, todo `git push` no repositório dispara um novo deploy automático — não precisa mais me pedir zip e subir manualmente toda vez.

Se quiser um subdomínio tipo `links.soldadonailson.br`, configure isso em **Domain settings** no próprio Netlify.

## Como usar no dia a dia
- **Adicionar/editar/remover links**: entre em `/admin.html`, faça login, aba **Links**.
- **Adicionar redes sociais**: mesma tela, aba **Redes Sociais** — escolha a rede num menu (Instagram, Facebook, WhatsApp, YouTube, TikTok, X, Telegram, LinkedIn, E-mail ou Site), cole o link, e ela aparece como um ícone circular no topo da página pública, ao lado dos outros. Não precisa colar emoji nem ícone manualmente — o ícone certo já vem junto.
- **Ativar/desativar** algo sem apagar: use a chavinha ao lado de cada item — itens inativos somem da página pública mas continuam salvos.
- **Reordenar**: mude o número em "Posição" — quanto menor, mais no topo (ou mais à esquerda, no caso das redes sociais) aparece.

## Redes sociais disponíveis
Instagram, Facebook, WhatsApp, YouTube, TikTok, X (Twitter), Telegram, LinkedIn, E-mail e Site/Website. Se precisar de uma rede que não está nessa lista, me avise que eu adiciono o ícone.

## Testando localmente antes de subir (opcional)
Se quiser testar no seu computador antes de mandar pro Git, rode no terminal, dentro da pasta do projeto:
```
SUPABASE_URL="sua-url" SUPABASE_ANON_KEY="sua-chave" node build.js
```
Isso gera um `config.js` real localmente. Depois é só abrir o `index.html`. Não suba esse `config.js` preenchido pro Git por engano — ele será sobrescrito pelo build do Netlify de qualquer forma, mas é mais organizado deixar o build cuidar disso.

## Meta Pixel
A página pública (`index.html`) já tem o Meta Pixel instalado, o mesmo usado no site principal — assim as duas páginas contam pro mesmo Ads Manager. Não instalei no `admin.html` (painel), já que rastrear acessos administrativos não tem utilidade nenhuma pra campanha.

## Atualização — Redes sociais e remoção de "Atualizações"
A funcionalidade de "Atualizações" (feed de novidades) foi removida a pedido — tanto da página pública quanto do painel admin. No lugar, foi adicionada uma linha de ícones de redes sociais no topo da página, totalmente editável pelo painel (aba **Redes Sociais**).

Se você já tinha rodado a versão anterior do `supabase-schema.sql` (com a tabela `updates`), ela continua existindo no seu banco, só não é mais usada por este site. Para remover de vez, rode no SQL Editor do Supabase:
```sql
drop table if exists public.updates;
```
Isso é opcional — não afeta o funcionamento do site deixar a tabela órfã lá.

## Limitações e pontos de atenção
- O painel não tem "esqueci minha senha" configurado — se perder a senha, redefina pelo próprio painel do Supabase (Authentication → Users → ⋯ → Send password recovery, ou apague e recrie o usuário).
- Não há limite de tamanho para o texto de atualizações, mas o design foi pensado para textos curtos (tipo post de rede social) — para conteúdo mais longo, prefira linkar para o site oficial.
- Este projeto não reaproveita o formulário de contato do site principal — são independentes.
- Se em algum momento quiser voltar ao método simples (sem Git, sem variável de ambiente), é só editar o `config.js` manualmente com os valores reais e voltar a fazer deploy manual arrastando a pasta — o `netlify.toml`/`build.js` só entram em ação se você conectar via Git.

