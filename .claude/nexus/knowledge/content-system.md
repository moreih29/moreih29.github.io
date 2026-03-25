<!-- tags: content, velite, mdx, frontmatter, series, category, tag, schema -->
# Content System

<!-- tags: content, velite, mdx, frontmatter, series, category, tag -->

## Velite Schema (`velite.config.ts`)

```typescript
s.object({
  title: s.string().max(100),
  slug: s.slug('posts'),
  date: s.isodate(),
  description: s.string().max(200),
  updated: s.isodate().optional(),
  tags: s.array(s.string()).default([]),
  published: s.boolean().default(true),
  series: s.string().optional(),
  seriesOrder: s.number().optional(),
  category: s.string().default('General'),
  cover: s.string().optional(),
  metadata: s.metadata(),
  excerpt: s.excerpt(),
  body: s.mdx(),
})
```

## Frontmatter 예시

```yaml
---
title: "포스트 제목"
slug: my-post-slug
date: 2026-03-24
description: "200자 이내 설명"
tags: ["tag1", "tag2"]
published: true
series: "시리즈 이름"      # optional
seriesOrder: 1             # optional (시리즈 내 순서)
category: "AI"             # Web | AI | MLOps | DevOps | General
cover: "/images/cover.jpg" # optional
---
```

## 카테고리 체계

5개 대분류. `src/lib/constants.ts`에 색상 정의.

| Category | 영역 | 색상 |
|----------|------|------|
| Web | 프론트엔드 + 백엔드 통합 | blue |
| AI | 인공지능, NLP, LLM | purple |
| MLOps | ML 파이프라인, 모델 운영 | amber |
| DevOps | 인프라, CI/CD | orange |
| General | 기타 | gray |

## 태그 시스템

- 태그는 frontmatter `tags` 배열로 자유 추가 (코드 변경 불필요)
- 메인 페이지: 카테고리 필터 + 태그 필터 (빈도순 상위 10개 + "더보기" 토글)
- `/tags`: 태그 클라우드 (빈도 기반 폰트 사이즈) + 알파벳순 전체 목록
- `/tags/[tag]`: 개별 태그 페이지 (generateStaticParams로 정적 생성)
- 포스트 상세: 각 태그가 `/tags/[tag]`로 링크

## 시리즈

- `series` + `seriesOrder` frontmatter 필드로 구성
- 포스트 상세: `SeriesToc` (목차) + `SeriesPrevNext` (이전/다음 네비게이션)
- `/series` 페이지: SeriesCard (시리즈별 그룹) + StandaloneCard (독립 글)

## 현재 콘텐츠

| 시리즈 | 편수 | 카테고리 |
|--------|------|----------|
| 언어를 이해하는 기계의 여정 | 6편 | AI |
| LLM 해부학 | 5편 | AI |

## MDX 주의사항

Velite의 MDX 컴파일러는 내부적으로 JSX 파서를 사용한다. 다음 문법은 에러를 유발한다:

- `{}`는 JSX 표현식으로 파싱됨 → 수식은 **코드 블록**으로 감쌀 것 (`` ``` `` 사용)
- `<`는 JSX 태그로 파싱됨 → `≪`, `&lt;` 등 유니코드/HTML 엔티티로 대체
- 마크다운 이미지 `![alt](src)`는 Velite가 제거함 → `<img src="..." alt="..." />` 사용
- `$...$`, `$$...$$` LaTeX 문법은 지원하지 않음 → 코드 블록으로 대체

## 파일 네이밍 컨벤션

- 파일명: `{series-prefix}-{order}-{topic}.mdx`
- slug: 파일명과 동일 (확장자 제외)
- 예: `nlp-journey-1-rule-based.mdx`, `llm-anatomy-3-reasoning.mdx`
