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
- 규칙: `.nexus/rules/` (researcher-rules, writer-rules, dev-rules)

## Agent Roles (콘텐츠)

- **포닥**: 리서치 방향 설계 및 총괄
- **리서처**: 외부 자료 조사
- **라이터**: 포스트 작성 및 SVG 제작
- **리뷰어**: 콘텐츠 감사 및 품질 검증