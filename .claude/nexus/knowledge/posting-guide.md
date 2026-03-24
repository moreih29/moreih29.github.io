<!-- tags: posting, content, mdx, frontmatter, series -->
# 포스팅 가이드

## 파일 위치

`content/posts/` 디렉토리에 `.mdx` 파일 생성

## 파일 네이밍

`{slug}.mdx` — slug은 URL 경로가 됨 (`/posts/{slug}`)

시리즈물: `{시리즈약어}-{순서}-{주제}.mdx`
- 예: `llm-1-transformer.mdx`, `llm-2-prompt-engineering.mdx`

## Frontmatter 스키마

`velite.config.ts` 기준 전체 필드:

```yaml
---
title: "포스트 제목"              # 필수, max 100자
slug: post-slug                   # 필수, URL 경로
date: 2026-03-24                  # 필수, ISO date
description: "포스트 요약"        # 필수, max 200자
updated: 2026-03-25               # 선택, 수정일
tags: ["tag1", "tag2"]            # 선택, 기본 []
published: true                   # 선택, 기본 true (false면 비공개)
series: "시리즈명"                # 선택, 같은 시리즈는 동일 문자열
seriesOrder: 1                    # 선택, 시리즈 내 순서 (1부터)
category: "AI"                    # 선택, 기본 "General"
cover: "/images/cover.png"        # 선택, 커버 이미지 경로
---
```

## 시리즈 작성법

1. `series` 필드에 동일한 시리즈명 사용 (예: `"LLM 완전 정복"`)
2. `seriesOrder`로 순서 지정 (1, 2, 3...)
3. 블로그 UI에서 자동으로 시리즈 네비게이션 생성

## 본문 작성 (MDX)

- 마크다운 + JSX 컴포넌트 사용 가능
- 코드 블록: rehype-pretty-code로 하이라이팅 (테마: github-dark-dimmed / github-light)
- 코드 블록 옵션: `title`, 라인 하이라이팅 `{3}`, `{1-5}`

```mdx
\```typescript title="example.ts" {3}
function hello() {
  console.log('highlighted line')
  return true
}
\```
```

## 카테고리/태그 체계

현재 사용 중:
- 카테고리: `Frontend`, `General` (신규 추가 가능)
- 태그: 자유 형식

## 빌드 & 확인

- `bun run dev` — 로컬에서 확인
- `bun run build` — 정적 빌드 (velite → next build → out/)
- `published: false`로 초안 작성 가능
