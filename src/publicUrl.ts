/**
 * Resolves a path served from `public/` (root-relative, e.g. `/gallery/01.webp`)
 * for the current Vite `base` (required on GitHub Pages project URLs).
 */
export function publicUrl(rootRelativePath: string): string {
  const base = import.meta.env.BASE_URL
  const path = rootRelativePath.startsWith('/')
    ? rootRelativePath.slice(1)
    : rootRelativePath
  return `${base}${path}`
}
