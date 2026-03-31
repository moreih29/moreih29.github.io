<!-- tags: tech-stack, dependencies -->
# Tech Stack

## Core

| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js | 16.x | App Router, Static Export |
| React | 19.x | UI |
| TypeScript | 5.x | 타입 시스템 |
| Bun | 1.3.9 | 런타임, 패키지 매니저 |

## 콘텐츠

| 기술 | 용도 |
|------|------|
| Velite | MDX → typed JSON 빌드 |
| remark-gfm | GitHub Flavored Markdown |
| rehype-slug | 헤딩 앵커 생성 |
| rehype-pretty-code (Shiki) | 코드 구문 하이라이팅 |

## 스타일링

| 기술 | 용도 |
|------|------|
| Tailwind CSS 4 | 유틸리티 CSS |
| @tailwindcss/typography | prose 스타일 |
| PostCSS | Tailwind 통합 |

## 개발 도구

| 기술 | 용도 |
|------|------|
| ESLint 10 + typescript-eslint | 린팅 |
| Prettier + prettier-plugin-tailwindcss | 포매팅 |
| Turbopack | 개발 서버 번들러 |

## 배포

- GitHub Actions → GitHub Pages
- 완전 정적 사이트 (서버리스)