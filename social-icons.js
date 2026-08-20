// =====================================================================
// Conjunto de ícones de redes sociais — usado na página pública (index.html)
// e no painel admin (admin.html). Ícones em estilo de linha, um único
// arquivo para manter os dois lugares sempre visualmente iguais.
// =====================================================================
const SOCIAL_PLATFORMS = {
  instagram: {
    label: "Instagram",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/></svg>`
  },
  facebook: {
    label: "Facebook",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M13.6 21v-6.8h2.2l.35-2.6h-2.55v-1.5c0-.75.2-1.26 1.28-1.26H16V6.14c-.2-.03-.9-.09-1.72-.09-1.7 0-2.86 1.04-2.86 2.94v1.65H9.2v2.6h2.22V21"/></svg>`
  },
  whatsapp: {
    label: "WhatsApp",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 0 0-7.75 13.55L3 21l4.6-1.2A9 9 0 1 0 12 3z"/><path d="M8.3 8.4c.15-.4.3-.55.6-.55.2 0 .35 0 .5.01.15.01.35-.02.55.44.2.5.7 1.7.75 1.83.06.13.1.28.01.44-.09.16-.14.26-.27.4-.13.14-.28.31-.4.42-.13.13-.27.27-.12.53.15.26.68 1.15 1.48 1.87 1.02.93 1.87 1.22 2.13 1.36.26.14.42.12.58-.06.16-.18.68-.77.87-1.03.18-.26.36-.22.6-.13.24.09 1.55.75 1.82.89.26.13.44.2.5.32.06.13.06.72-.17 1.4-.23.68-1.34 1.26-1.86 1.34-.5.09-1.14.13-1.85-.11-.42-.14-.97-.33-1.68-.64-2.95-1.28-4.87-4.24-5.02-4.44-.15-.2-1.2-1.6-1.2-3.05 0-1.45.75-2.15 1.02-2.44z" fill="currentColor" stroke="none"/></svg>`
  },
  youtube: {
    label: "YouTube",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10.3 9.3v5.4l4.9-2.7z" fill="currentColor" stroke="none"/></svg>`
  },
  tiktok: {
    label: "TikTok",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.2a2.8 2.8 0 1 1-2.2-2.74"/><path d="M14 4c.4 2.2 2 3.8 4.2 4.1"/></svg>`
  },
  x: {
    label: "X (Twitter)",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg>`
  },
  telegram: {
    label: "Telegram",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M6.5 12.2l10.8-4.3-2.2 10.6-3.4-2.6-1.9 1.9-.4-3.3z"/></svg>`
  },
  linkedin: {
    label: "LinkedIn",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8" cy="8.5" r=".9" fill="currentColor" stroke="none"/><path d="M8 11.5v6M12 17.5v-3.7c0-1.4 1-2.3 2.2-2.3 1.2 0 2 .9 2 2.3v3.7"/></svg>`
  },
  email: {
    label: "E-mail",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7l8 6 8-6"/></svg>`
  },
  site: {
    label: "Site / Website",
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.4 2.5 3.6 5.6 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.6-3.6-9s1.2-6.5 3.6-9z"/></svg>`
  }
};
