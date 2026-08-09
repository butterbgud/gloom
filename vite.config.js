import { execSync } from 'node:child_process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const buildVersion = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || execSync('git rev-parse --short HEAD').toString().trim() || 'dev'

export default defineConfig({
  plugins: [react()],
  define: { __BUILD_VERSION__: JSON.stringify(buildVersion) },
})
