import fs from 'node:fs/promises'
import path from 'node:path'

const SOURCE = '/Users/tantd2/.cursor/projects/Users-tantd2-My-nhung-triet-wedding-v2/agent-tools/9181dada-c1a9-4899-8962-01827751d2f8.txt'

const OUT_DIR = new URL('../public/figma/', import.meta.url)

function safeFileName(name) {
  return name.replace(/[^a-zA-Z0-9_-]+/g, '_').replace(/^_+|_+$/g, '')
}

async function main() {
  const text = await fs.readFile(SOURCE, 'utf8')
  const re = /^const\s+(img[A-Za-z0-9_]+)\s*=\s*"([^"]+)";\s*$/gm
  const entries = []
  let m
  while ((m = re.exec(text))) entries.push({ key: m[1], url: m[2] })

  if (!entries.length) {
    console.error('No assets found in source file:', SOURCE)
    process.exit(1)
  }

  await fs.mkdir(OUT_DIR, { recursive: true })

  const manifest = {}
  for (const { key, url } of entries) {
    const extMatch = url.match(/\.([a-zA-Z0-9]+)(?:\?|$)/)
    const ext = extMatch ? extMatch[1].toLowerCase() : 'png'
    const filename = `${safeFileName(key)}.${ext}`
    const outPath = new URL(filename, OUT_DIR)

    // Download via node fetch so it works cross-platform.
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed ${res.status} for ${url}`)
    const buf = Buffer.from(await res.arrayBuffer())
    await fs.writeFile(outPath, buf)
    manifest[key] = `/figma/${filename}`
    process.stdout.write('.')
  }

  process.stdout.write('\n')
  const manifestPath = new URL('manifest.json', OUT_DIR)
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8')
  console.log('Wrote manifest:', manifestPath.pathname)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

