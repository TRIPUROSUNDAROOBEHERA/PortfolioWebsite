/**
 * Safely resolves an asset URL relative to Vite's base path (e.g., /PortfolioWebsite/ on GitHub Pages).
 * Works seamlessly in both local development ('/') and GitHub Pages ('/PortfolioWebsite/').
 */
export function assetUrl(path) {
  if (!path || typeof path !== 'string') return '';
  if (/^(https?:|data:|blob:)/i.test(path)) return path;

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${cleanBase}${cleanPath}`;
}

export default assetUrl;
