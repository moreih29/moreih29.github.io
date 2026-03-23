import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const indexPath = resolve('.velite/index.js')

try {
  let content = readFileSync(indexPath, 'utf-8')
  // Replace import attributes syntax with createRequire for JSON files
  // from: export { default as posts } from './posts.json' with { type: 'json' }
  // to:   import { createRequire } from 'module'; const _require = createRequire(import.meta.url); export const posts = _require('./posts.json');
  if (content.includes("with { type: 'json' }")) {
    const lines = content.split('\n')
    const patched = []
    let needsRequire = false
    for (const line of lines) {
      const match = line.match(/^export \{ default as (\w+) \} from '(.+\.json)' with \{ type: 'json' \}/)
      if (match) {
        const [, name, path] = match
        needsRequire = true
        patched.push(`export const ${name} = _require('${path}')`)
      } else {
        patched.push(line)
      }
    }
    if (needsRequire) {
      patched.unshift("const _require = createRequire(import.meta.url)")
      patched.unshift("import { createRequire } from 'module'")
    }
    writeFileSync(indexPath, patched.join('\n'))
    console.log('[patch-velite] Patched .velite/index.js successfully')
  } else {
    console.log('[patch-velite] No patching needed')
  }
} catch (e) {
  console.error('[patch-velite] Error:', e.message)
  process.exit(1)
}
