<!-- tags: architecture, data-flow, modules -->
# Architecture Overview

## 데이터 흐름

```
content/posts/*.mdx
  → [prebuild] fix-mdx-bold.mjs (한글 볼드 패턴 교정)
  → [prebuild] velite build (MDX → JSON, .velite/)
  → [prebuild] patch-velite.mjs (import attributes → createRequire 패치)
  → [build] Next.js static export (out/)
  → [deploy] GitHub Actions → GitHub Pages
```

## 모듈 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── layout.tsx          # 루트 레이아웃 (Header, Footer, ThemeProvider)
│   ├── page.tsx            # 홈 — HeroSlider + CategoryFilter
│   ├── posts/[slug]/       # 개별 포스트 페이지
│   ├── series/             # 시리즈 목록
│   └── tags/               # 태그 목록 + [tag] 필터
├── components/             # React 컴포넌트
│   ├── mdx-content.tsx     # MDX 런타임 렌더러
│   ├── hero-slider.tsx     # 히어로 슬라이더
│   ├── category-filter.tsx # 카테고리 필터링
│   ├── series-nav.tsx      # 시리즈 TOC + 이전/다음
│   ├── series-view.tsx     # 시리즈 목록 뷰
│   ├── toc.tsx             # 목차 (인라인 + 플로팅)
│   ├── image-modal.tsx     # 이미지 확대 모달
│   ├── pagination.tsx      # 페이지네이션
│   ├── theme-provider.tsx  # 다크/라이트 테마 컨텍스트
│   └── theme-toggle.tsx    # 테마 토글 버튼
└── lib/
    ├── constants.ts        # 카테고리 컬러맵
    ├── types.ts            # Post 인터페이스
    └── utils.ts            # formatDate, getCategoryColor
```

## 콘텐츠 접근

- `#content` path alias → `.velite/` 디렉토리
- `import { posts } from '#content'`로 타입드 Post[] 배열 접근
- Velite 스키마: title, slug, date, description, tags, series, seriesOrder, category, toc, body 등