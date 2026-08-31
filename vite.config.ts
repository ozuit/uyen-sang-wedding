import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { buildShareMetaTags } from './src/content/shareMeta'

// https://vite.dev/config/
// In GitHub Actions, GITHUB_REPOSITORY is "owner/repo" so base matches the repo name.
const repoName =
  process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'uyen-sang-wedding'

// CI sets PAGES_BASE: `repository` → /repo/ (username.github.io/repo/), `root` → / (custom domain).
const productionBase =
  process.env.PAGES_BASE === 'root' ? '/' : `/${repoName}/`

const defaultSiteUrl = 'https://uyen-sang-wedding.online'

function injectShareMetaPlugin(base: string): Plugin {
  const siteUrl = (process.env.SITE_URL ?? defaultSiteUrl).replace(/\/$/, '')

  return {
    name: 'inject-share-meta',
    transformIndexHtml(html) {
      const metaTags = buildShareMetaTags(siteUrl, base)
      return html.replace('<!-- share-meta -->', metaTags)
    },
  }
}

export default defineConfig(({ mode }) => {
  const base = mode === 'production' ? productionBase : '/'

  return {
    base,
    plugins: [react(), injectShareMetaPlugin(base)],
  }
})
