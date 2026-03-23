# Project Context

<!-- tags: project, context, decisions -->

## Purpose

개인 기술 블로그. 코드 스니펫, 기술 문서, 개발 경험 공유 중심.
별도 서버 없이 GitHub Pages 정적 호스팅으로 운영.

## Current State

- 초기 셋업 완료 (2026-03-23)
- 샘플 포스트 1건 (`hello-world.mdx`)
- 빌드/lint 검증 통과
- 아직 첫 커밋 및 배포 전

## Key Decisions

### Velite + patch-velite.mjs
Velite가 생성하는 `.velite/index.js`에서 `import ... with { type: 'json' }` (Import Attributes) 구문을 사용하는데, Next.js의 Turbopack이 이를 지원하지 않음. `scripts/patch-velite.mjs`로 `createRequire` 방식으로 후처리 패치.

### next.config.ts Velite 통합
VeliteWebpackPlugin 대신 next.config.ts에서 직접 `import('velite')` 호출. Turbopack 호환을 위한 결정. dev 모드에서만 watch, build는 `prebuild` 스크립트에서 별도 실행.

### Tailwind CSS v4 CSS-first
`tailwind.config.js` 없이 `globals.css`의 `@theme` 블록에서 직접 설정. `@tailwindcss/postcss` 사용.

### ESLint flat config
`eslint-config-next`가 ESLint 10과 호환 문제 → `@eslint/js` + `typescript-eslint` 조합으로 교체.

### Fallback 전략
Velite에 문제 발생 시 `gray-matter` + `next-mdx-remote/rsc`로 전환 가능. `content/posts/` 구조와 frontmatter가 동일하므로 전환 비용 낮음.
