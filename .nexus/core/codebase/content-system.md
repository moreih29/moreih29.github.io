<!-- tags: content, mdx, velite, series -->
<!-- tags: content, mdx, velite, series -->
# Content System

## 콘텐츠 구조

- 위치: `content/posts/*.mdx`
- 현재 25개 포스트, 4개 시리즈 + 단독 포스트

## 시리즈 목록

| 시리즈 | 접두사 | 편수 |
|--------|--------|------|
| LLM 해부학 | `llm-anatomy-*` | 9편 |
| LLM 엔지니어링 | `llm-eng-*` | 5편 |
| 공장에 심은 지능 (제조업 AI) | `mfg-ai-*` | 4편 |
| NLP 여정 | `nlp-journey-*` | 2편+ |

## 단독 포스트

- `google-turboquant.mdx` — TurboQuant (Google)

## MDX 스키마 (velite.config.ts)

```typescript
{
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
  toc: s.toc(),
  metadata: s.metadata(),
  excerpt: s.excerpt(),
  body: s.mdx(),
}
```

## 카테고리

`src/lib/constants.ts`에 정의된 카테고리: Web, AI, MLOps, DevOps, General (각각 라이트/다크 컬러 매핑, WCAG AA 보정)

## MDX 처리

- GFM 지원 (`remark-gfm`, singleTilde: false)
- 코드 하이라이팅: `rehype-pretty-code` (Shiki, github-dark-dimmed / github-light)
- 헤딩 앵커: `rehype-slug`
- 커스텀 컴포넌트: jsx 런타임 인터셉트로 `img` → `ClickableImage` (이미지 확대 모달)
