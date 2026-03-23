# moreih29-blog Architecture

<!-- tags: architecture, stack, structure, build, deploy -->

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Runtime & PM | Bun | 1.3.9 |
| Framework | Next.js (Static Export) | 16.x |
| Language | TypeScript | 5.x |
| Content | MDX + Velite | velite 0.3.x |
| Styling | Tailwind CSS (CSS-first) | 4.x |
| Code Highlighting | rehype-pretty-code + Shiki | - |
| Linter | ESLint (flat config) + typescript-eslint | 10.x |
| Formatter | Prettier + prettier-plugin-tailwindcss | 3.x |
| CI/CD | GitHub Actions | - |
| Hosting | GitHub Pages (moreih29.github.io) | - |

## Directory Structure

```
moreih29-blog/
├── .github/workflows/deploy.yml   # GitHub Actions: bun install → bun run build → deploy-pages
├── content/posts/*.mdx            # 블로그 콘텐츠 (Velite가 빌드 타임에 처리)
├── public/images/                 # 정적 에셋
├── scripts/patch-velite.mjs       # Velite Import Attributes 패치 (Turbopack 호환)
├── src/
│   ├── app/
│   │   ├── layout.tsx             # RootLayout + Header + Footer
│   │   ├── page.tsx               # 홈 (포스트 목록)
│   │   ├── globals.css            # Tailwind v4 CSS-first 설정
│   │   └── posts/[slug]/page.tsx  # 포스트 상세 (generateStaticParams)
│   └── components/
│       └── mdx-content.tsx        # MDX 렌더러 (react/jsx-runtime)
├── .velite/                       # Velite 빌드 출력 (gitignored)
├── out/                           # Next.js static export 출력 (gitignored)
├── velite.config.ts               # Velite 콘텐츠 스키마 + rehype 플러그인
├── next.config.ts                 # output: 'export', Velite dev 통합
├── postcss.config.mjs             # @tailwindcss/postcss
└── tsconfig.json                  # paths: @/* → ./src/*, #content → ./.velite
```

## Key Dependencies

### Content Pipeline
- **Velite**: 빌드 타임 MDX 컴파일, Zod 기반 스키마 검증, `.velite/` 에 JSON 출력
- **patch-velite.mjs**: Velite가 생성하는 `import ... with { type: 'json' }` 구문을 `createRequire` 방식으로 패치 (Next.js Turbopack이 Import Attributes 미지원)
- **rehype-pretty-code + Shiki**: 듀얼 테마 코드 하이라이팅 (github-dark-dimmed / github-light)

### Build Flow
```
prebuild: bun velite build → node scripts/patch-velite.mjs
build:    next build (output: 'export') → out/
dev:      next dev --turbopack (next.config.ts에서 velite watch 자동 실행)
```

## Entry Points

| Entry | File | Purpose |
|-------|------|---------|
| 홈 | `src/app/page.tsx` | `#content`에서 posts 가져와 목록 표시 |
| 포스트 상세 | `src/app/posts/[slug]/page.tsx` | `generateStaticParams`로 정적 경로 생성 |
| 레이아웃 | `src/app/layout.tsx` | Header, Footer, 전역 스타일 |
| 콘텐츠 | `content/posts/*.mdx` | frontmatter + MDX 본문 |

## Deploy Pipeline

1. `main` 브랜치 push → GitHub Actions 트리거
2. `oven-sh/setup-bun@v2` → `bun install --frozen-lockfile` → `bun run build`
3. `actions/upload-pages-artifact@v3` → `actions/deploy-pages@v4`
4. GitHub Pages Settings에서 Source = "GitHub Actions" 필수
