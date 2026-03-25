# moreih29-blog

Next.js 16 + Bun + Velite 기반 기술 블로그. GitHub Pages 정적 호스팅.

## Commands

- `bun run dev` — 개발 서버 (Turbopack)
- `bun run build` — 정적 빌드 (prebuild: velite + patch → next build → out/)
- `bun run lint` — ESLint
- `bun run format` — Prettier

## Key Paths

- 콘텐츠: `content/posts/*.mdx`
- 앱: `src/app/`
- 컴포넌트: `src/components/`
- 콘텐츠 import: `#content` (→ `.velite/`)
- 연구 규칙: `.claude/nexus/knowledge/research-rules.md`