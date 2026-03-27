import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { resolve, join } from 'path'

const DRY_RUN = process.argv.includes('--dry-run')

// Matches **...punctuation** immediately followed by a Korean character.
// The content must not contain another * (avoids crossing bold boundaries).
const BOLD_PATTERN = /\*\*([^*]+[)%"'»」])\*\*([가-힣])/g

function splitOnCodeBlocks(text) {
  // Returns an array of { code: bool, content: string } segments.
  // Fenced code blocks (``` or ~~~) and inline code (`) are marked as code.
  const segments = []
  // Regex to match fenced code blocks or inline code spans
  const FENCE = /(`{3,}|~{3,})[^\n]*\n[\s\S]*?\1|`[^`\n]+`/g
  let last = 0
  let match
  while ((match = FENCE.exec(text)) !== null) {
    if (match.index > last) {
      segments.push({ code: false, content: text.slice(last, match.index) })
    }
    segments.push({ code: true, content: match[0] })
    last = match.index + match[0].length
  }
  if (last < text.length) {
    segments.push({ code: false, content: text.slice(last) })
  }
  return segments
}

function fixBold(text) {
  const segments = splitOnCodeBlocks(text)
  let count = 0
  const result = segments
    .map((seg) => {
      if (seg.code) return seg.content
      const replaced = seg.content.replace(BOLD_PATTERN, (_, inner, after) => {
        // Skip if already wrapped (shouldn't happen given the pattern, but guard anyway)
        count++
        return `<strong>${inner}</strong>${after}`
      })
      return replaced
    })
    .join('')
  return { result, count }
}

function processFile(filePath) {
  const original = readFileSync(filePath, 'utf-8')
  const { result, count } = fixBold(original)
  if (count === 0) return 0
  if (!DRY_RUN) {
    writeFileSync(filePath, result, 'utf-8')
  }
  return count
}

const root = resolve(process.cwd(), 'content/posts')
const files = readdirSync(root).filter((f) => f.endsWith('.mdx')).map((f) => join(root, f))

let totalFiles = 0
let totalReplacements = 0

for (const file of files) {
  const count = processFile(file)
  if (count > 0) {
    totalFiles++
    totalReplacements += count
    const rel = file.replace(process.cwd() + '/', '')
    console.log(`[fix-mdx-bold] ${rel}: ${count} replacement(s)${DRY_RUN ? ' (dry-run)' : ''}`)
  }
}

if (totalReplacements === 0) {
  console.log('[fix-mdx-bold] No replacements needed')
} else {
  console.log(
    `[fix-mdx-bold] Done — ${totalReplacements} replacement(s) in ${totalFiles} file(s)${DRY_RUN ? ' (dry-run)' : ''}`,
  )
}
