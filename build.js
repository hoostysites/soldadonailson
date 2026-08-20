// Roda automaticamente durante o build do Netlify.
// Lê as variáveis de ambiente configuradas em Site settings > Environment
// variables e gera o config.js que a página realmente usa no navegador.
//
// Não precisa rodar isso manualmente -- o Netlify executa sozinho a cada
// deploy, conforme o comando definido em netlify.toml.

const fs = require('fs');

const url = process.env.SUPABASE_URL || '';
const key = process.env.SUPABASE_ANON_KEY || '';

if (!url || !key) {
  console.error('\n❌ Variáveis de ambiente ausentes.');
  console.error('   Configure SUPABASE_URL e SUPABASE_ANON_KEY em:');
  console.error('   Site settings > Environment variables, no painel do Netlify.\n');
  process.exit(1);
}

const content = `// -----------------------------------------------------------------
// Gerado automaticamente pelo build do Netlify (build.js) a partir das
// variáveis de ambiente do site. NÃO edite este arquivo manualmente --
// qualquer alteração aqui é sobrescrita no próximo deploy.
// Para mudar a URL/chave, edite em: Site settings > Environment variables.
// -----------------------------------------------------------------
const SUPABASE_URL = ${JSON.stringify(url)};
const SUPABASE_ANON_KEY = ${JSON.stringify(key)};
`;

fs.writeFileSync('config.js', content);
console.log('✅ config.js gerado a partir das variáveis de ambiente do Netlify.');
