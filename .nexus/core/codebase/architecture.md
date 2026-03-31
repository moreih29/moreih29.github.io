<!-- tags: architecture, data-flow, modules -->
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
│   ├── layout.tsx          # 루트 레이아웃 (Header, Footer, ThemeProvider, SearchTrigger, ProgressBar)
│   ├── page.tsx            # 홈 — FeaturePost + 최신글 + 시리즈 프리뷰 + 인기 태그
│   ├── posts/              # 포스트 목록 (리스트형 목차 뷰)
│   ├── posts/[slug]/       # 개별 포스트 페이지 (본문 65ch, CodeCopyButton)
│   ├── series/             # 시리즈 목록
│   └── tags/               # 태그 목록 + [tag] 필터
├── components/             # React 컴포넌트
│   ├── mdx-content.tsx     # MDX 런타임 렌더러 (jsx 런타임 인터셉트: img → ClickableImage)
│   ├── feature-post.tsx    # 정적 피처 포스트 (히어로 슬라이더 대체)
│   ├── search-modal.tsx    # Cmd+K 검색 모달 (Fuse.js)
│   ├── search-trigger.tsx  # 검색 트리거 + OS별 단축키 힌트
│   ├── code-copy-button.tsx # 코드 블록 복사 버튼
│   ├── progress-bar.tsx    # NProgress 스타일 프로그레스 바
│   ├── post-list.tsx       # Posts 페이지 리스트 컴포넌트
│   ├── category-filter.tsx # 카테고리 필터링 (card-interactive 클래스)
│   ├── series-nav.tsx      # 시리즈 TOC + 이전/다음
│   ├── series-view.tsx     # 시리즈 목록 뷰
│   ├── toc.tsx             # 목차 (인라인 + 플로팅)
│   ├── image-modal.tsx     # 이미지 확대 모달 (aria, 포커스 트래핑, X 버튼)
│   ├── pagination.tsx      # 페이지네이션 (말줄임 로직)
│   ├── theme-provider.tsx  # 다크/라이트 테마 컨텍스트
│   └── theme-toggle.tsx    # 테마 토글 버튼
├── fonts/                  # 로컬 폰트 파일 (Pretendard, JetBrains Mono woff2)
└── lib/
    ├── constants.ts        # 카테고리 컬러맵 (WCAG AA 보정)
    ├── types.ts            # Post 인터페이스
    └── utils.ts            # formatDate, getCategoryColor
```

## 콘텐츠 접근

- `#content` path alias → `.velite/` 디렉토리
- `import { posts } from '#content'`로 타입드 Post[] 배열 접근
- Velite 스키마: title, slug, date, description, tags, series, seriesOrder, category, toc, body 등
