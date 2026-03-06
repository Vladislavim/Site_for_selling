import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { semanticCore } from '../src/data/semanticCore.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const publicDir = path.join(projectRoot, 'public')

const toAbsoluteUrl = (value) => {
  const raw = String(value || '').trim()

  if (!raw) {
    return ''
  }

  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
}

const resolveSiteUrl = () => {
  const candidates = [
    process.env.VITE_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
    'https://exestination.dev',
  ]

  const match = candidates.map(toAbsoluteUrl).find(Boolean)

  return new URL(match).origin
}

const formatRobots = (baseUrl) => `User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap.xml', baseUrl).toString()}
`

const formatSitemap = (baseUrl) => {
  const seen = new Set()
  const urls = semanticCore
    .map((entry) => entry.path)
    .filter((route) => {
      if (!route || seen.has(route)) {
        return false
      }

      seen.add(route)
      return true
    })
    .map(
      (route) => `  <url>
    <loc>${new URL(route, `${baseUrl}/`).toString()}</loc>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

const main = async () => {
  const baseUrl = resolveSiteUrl()

  await fs.mkdir(publicDir, { recursive: true })
  await fs.writeFile(path.join(publicDir, 'robots.txt'), formatRobots(baseUrl), 'utf8')
  await fs.writeFile(path.join(publicDir, 'sitemap.xml'), formatSitemap(baseUrl), 'utf8')
}

main().catch((error) => {
  console.error('[generate-seo-assets]', error)
  process.exitCode = 1
})
