<!-- tags: stack, build, velite, tailwind, deploy, bun, next.js -->
# Tech Stack & Build

<!-- tags: stack, build, dependencies, deploy -->

## Core Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Runtime | Bun | — |
| Framework | Next.js | 16.x |
| React | React | 19.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | v4 (PostCSS 플러그인) |
| Typography | @tailwindcss/typography | prose 클래스 |
| Content | Velite | 0.3.x |
| Code Highlight | rehype-pretty-code + Shiki | dual theme (github-light / github-dark-dimmed) |
| Lint | ESLint 10 + typescript-eslint + prettier | — |
| Deploy | GitHub Pages | 정적 export |

## Build Pipeline

```bash
bun run build
# 1. prebuild: bun velite build && node scripts/patch-velite.mjs
# 2. next build → output: 'export' → out/
```

### Velite Build
- `content/posts/**/*.mdx` → 스키마 검증 → `.velite/posts.json` + `.velite/index.js`
- rehype-pretty-code로 코드 블록 syntax highlighting (dual theme)

### Patch Script (`scripts/patch-velite.mjs`)
- `.velite/index.js`의 `export { default as X } from './X.json' with { type: 'json' }` 구문을
- `createRequire` 기반으로 변환 (Next.js 호환)

### Dev Server
```bash
bun run dev  # next dev --turbopack + velite watch
```
- `next.config.ts`에서 dev 모드 감지 시 `velite.build({ watch: true })` 자동 실행

## Tailwind v4 설정

- PostCSS 방식: `postcss.config.mjs`에 `@tailwindcss/postcss` 플러그인
- `globals.css`에서 `@theme` 블록으로 디자인 토큰 정의
- `@custom-variant dark` 으로 `.dark` 클래스 기반 다크모드
- 주요 커스텀 컬러: `--color-primary`, `--color-background`, `--color-foreground`, `--color-muted`, `--color-border`, `--color-card`, `--color-tag-bg` 등

## Deploy

GitHub Pages에 `out/` 디렉토리 정적 배포. `git push origin main` → GitHub Actions 트리거.
