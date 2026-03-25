<!-- tags: architecture, directory, routing, data-flow, velite, next.js -->
# Architecture

<!-- tags: architecture, directory, data-flow, routing -->

## Directory Structure

```
moreih29-blog/
├── content/posts/*.mdx     # MDX 콘텐츠 (velite가 처리)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx      # RootLayout (Header, Footer, ThemeProvider)
│   │   ├── page.tsx        # 메인: HeroSlider + CategoryFilter
│   │   ├── globals.css     # Tailwind v4 테마 변수 (light/dark)
│   │   ├── posts/[slug]/   # 개별 포스트 (generateStaticParams)
│   │   ├── series/         # 시리즈 목록
│   │   └── tags/           # 태그 클라우드 + /tags/[tag] 개별 페이지
│   ├── components/
│   │   ├── category-filter.tsx  # 카테고리+태그 다중 필터 (PostCard 포함)
│   │   ├── hero-slider.tsx      # 최신 3개 포스트 슬라이더
│   │   ├── mdx-content.tsx      # MDX → React 렌더러
│   │   ├── pagination.tsx       # 클라이언트 페이지네이션
│   │   ├── series-nav.tsx       # SeriesToc + SeriesPrevNext
│   │   ├── series-view.tsx      # 시리즈 목록 (SeriesCard + StandaloneCard)
│   │   ├── theme-provider.tsx   # Context 기반 테마 (light/dark/system)
│   │   └── theme-toggle.tsx     # 테마 토글 버튼
│   └── lib/
│       ├── constants.ts    # categoryColors (Web/AI/MLOps/DevOps/General)
│       ├── types.ts        # Post 인터페이스
│       └── utils.ts        # formatDate, getCategoryColor
├── scripts/patch-velite.mjs  # velite 빌드 후 JSON import 패치
├── public/                   # 정적 에셋 (images/, static/)
├── .velite/                  # velite 빌드 출력 (posts.json 등)
└── out/                      # next build 정적 출력 (GitHub Pages 배포)
```

## Data Flow

```
content/posts/*.mdx
  → velite build (스키마 검증, MDX 컴파일)
  → .velite/posts.json + .velite/index.js
  → patch-velite.mjs (JSON import 호환 패치)
  → import { posts } from '#content' (tsconfig paths alias)
  → Next.js 페이지에서 사용
  → next build --output export → out/
  → GitHub Pages 배포
```

## Routing

| Route | File | 렌더링 |
|-------|------|--------|
| `/` | `app/page.tsx` | SSG — HeroSlider + CategoryFilter |
| `/posts/[slug]` | `app/posts/[slug]/page.tsx` | SSG — generateStaticParams |
| `/series` | `app/series/page.tsx` | SSG — SeriesView |
| `/tags` | `app/tags/page.tsx` | SSG — 태그 클라우드 + 알파벳 리스트 |
| `/tags/[tag]` | `app/tags/[tag]/page.tsx` | SSG — generateStaticParams |

모든 페이지가 정적 생성(SSG). `output: 'export'`로 완전 정적 사이트.

## 핵심 설계 결정

- **Velite + patch**: Velite가 MDX를 처리하지만 `.velite/index.js`의 JSON import 구문이 Next.js와 호환되지 않아 `patch-velite.mjs`로 `createRequire` 방식으로 변환
- **`#content` alias**: `.velite/` 디렉토리를 `#content`로 매핑하여 빌드 산출물과 소스를 분리
- **클라이언트 필터링**: 정적 사이트이므로 카테고리/태그 필터링은 `'use client'` 컴포넌트에서 useState로 처리
- **다크모드 FOUC 방지**: `layout.tsx`의 `<head>`에 인라인 스크립트로 localStorage 읽어서 초기 클래스 적용
