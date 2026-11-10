// Theme plumbing shared by the root layout's head script and components/site/ThemeToggle.tsx.
// The page follows the system setting until the visitor picks a theme; the pick is stored under this key and
// applied as data-theme on <html>, which app/styles/tokens.css reads.
export const THEME_STORAGE_KEY = 'ad-theme';
export const THEME_ATTRIBUTE = 'data-theme';

export type Theme = 'light' | 'dark';

// Runs in <head> before first paint, so a stored choice never flashes the other theme. Storage can be unavailable
// (private windows, blocked site data), so every access sits in try/catch and the page falls back to the system.
export const themeInitScript = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark')document.documentElement.setAttribute('${THEME_ATTRIBUTE}',t)}catch(e){}`;
