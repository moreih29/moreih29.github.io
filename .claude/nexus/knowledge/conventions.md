# Coding Conventions

<!-- tags: conventions, style, content, naming -->

## Code Style

- **Formatter:** Prettier (semi: false, singleQuote: true, tabWidth: 2, trailingComma: all, printWidth: 100)
- **Tailwind 클래스 정렬:** prettier-plugin-tailwindcss 자동 정렬
- **Linter:** ESLint flat config + typescript-eslint + eslint-config-prettier
  - `@typescript-eslint/no-explicit-any`: warn
  - `@typescript-eslint/no-unused-vars`: warn (argsIgnorePattern: `^_`)

## Naming Patterns

- **컴포넌트:** PascalCase (`MDXContent`, `PostPage`)
- **파일:** kebab-case (`mdx-content.tsx`, `hello-world.mdx`)
- **경로 별칭:** `@/*` → `src/*`, `#content` → `.velite/`

## Content (MDX) Convention

### Frontmatter Schema

```yaml
title: string (max 100)        # 필수
slug: string                    # 필수, URL 경로
date: ISO date (YYYY-MM-DD)     # 필수
description: string (max 200)   # 필수
updated: ISO date               # 선택
tags: string[]                  # 기본값 []
published: boolean              # 기본값 true
```

### Content Location
- 콘텐츠 경로: `content/posts/*.mdx`
- Velite pattern: `posts/**/*.mdx`
- `published: false`인 글은 빌드에서 제외

### Code Blocks
- rehype-pretty-code 지원: `title`, 줄 하이라이팅 (`{3}`)
- 듀얼 테마: light (github-light), dark (github-dark-dimmed)

## Git Convention

- Feature 브랜치: `feat/`, `fix/` 접두사
- main 브랜치 push 시 자동 배포
