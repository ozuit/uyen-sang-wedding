import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// In GitHub Actions, GITHUB_REPOSITORY is "owner/repo" so base matches the repo name.
const repoName =
  process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'uyen-sang-wedding'

// CI sets PAGES_BASE: `repository` → /repo/ (username.github.io/repo/), `root` → / (custom domain).
const productionBase =
  process.env.PAGES_BASE === 'root' ? '/' : `/${repoName}/`

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? productionBase : '/',
  plugins: [react()],
}))
