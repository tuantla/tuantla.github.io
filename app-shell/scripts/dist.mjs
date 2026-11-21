// Publish the built site (dist/) to the repository root for GitHub Pages.
import { cpSync, existsSync, readdirSync, rmSync } from 'node:fs'
import { join, resolve } from 'node:path'

const appDir = resolve(import.meta.dirname, '..')
const dist = join(appDir, 'dist')
const root = resolve(appDir, '..')

if (!existsSync(join(dist, 'index.html'))) throw new Error('dist/ is empty - run `yarn build` first')

// Remove previously published hashed bundles (main.<hash>.js|css) from the root
for (const f of readdirSync(root)) {
  if (/^main\..+\.(js|css)$/.test(f)) rmSync(join(root, f))
}

for (const f of readdirSync(dist)) {
  cpSync(join(dist, f), join(root, f), { recursive: true })
  console.log(`published ${f}`)
}
