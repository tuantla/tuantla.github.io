// Publish the built site (dist/) to /(root)/lunar-calendar for GitHub Pages.
import { cpSync, existsSync, rmSync } from 'node:fs'
import { join, resolve } from 'node:path'

const appDir = resolve(import.meta.dirname, '..')
const dist = join(appDir, 'dist')
const target = resolve(appDir, '..', 'lunar-calendar')

if (!existsSync(join(dist, 'index.html'))) throw new Error('dist/ is empty - run the build first')

rmSync(target, { recursive: true, force: true })
cpSync(dist, target, { recursive: true })
console.log(`published dist/ -> ${target}`)
