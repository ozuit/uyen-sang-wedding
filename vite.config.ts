import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import {
  buildShareMetaTags,
  patchShareMetaPageUrl,
  type ShareRoutePath,
} from './src/content/shareMeta'

// https://vite.dev/config/
// In GitHub Actions, GITHUB_REPOSITORY is "owner/repo" so base matches the repo name.
const repoName =
  process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'uyen-sang-wedding'

// CI sets PAGES_BASE: `repository` → /repo/ (username.github.io/repo/), `root` → / (custom domain).
const productionBase =
  process.env.PAGES_BASE === 'root' ? '/' : `/${repoName}/`

const defaultSiteUrl = 'https://uyen-sang-wedding.online'

const shareRoutes: ShareRoutePath[] = ['/nha-trai', '/nha-gai']

function injectShareMetaPlugin(base: string): Plugin {
  const siteUrl = (process.env.SITE_URL ?? defaultSiteUrl).replace(/\/$/, '')
  let outDir = 'dist'

  return {
    name: 'inject-share-meta',
    configResolved(config) {
      outDir = config.build.outDir
    },
    transformIndexHtml(html) {
      const metaTags = buildShareMetaTags(siteUrl, base, '/')
      return html.replace('<!-- share-meta -->', metaTags)
    },
    closeBundle() {
      const indexPath = path.join(outDir, 'index.html')
      if (!fs.existsSync(indexPath)) return

      const indexHtml = fs.readFileSync(indexPath, 'utf8')

      for (const routePath of shareRoutes) {
        const folderName = routePath.slice(1)
        const routeDir = path.join(outDir, folderName)
        fs.mkdirSync(routeDir, { recursive: true })

        const routeHtml = patchShareMetaPageUrl(indexHtml, siteUrl, base, routePath)
        fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml)
      }
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
