<!-- tags: ui, components, dark-mode, styling, client, server -->
# UI Patterns

<!-- tags: ui, components, styling, dark-mode, client -->

## 컴포넌트 구조

```
RootLayout (layout.tsx)
├── ThemeProvider (Context)
├── Header (nav: Posts, Series, Tags + ThemeToggle)
├── Main
│   ├── Home: HeroSlider + CategoryFilter
│   ├── PostPage: 카테고리 뱃지 + 태그 링크 + SeriesToc + MDXContent + SeriesPrevNext
│   ├── SeriesPage: SeriesView (카테고리 필터 + SeriesCard/StandaloneCard)
│   ├── TagsPage: 태그 클라우드 + 알파벳 목록
│   └── TagPage: PostCard 그리드
└── Footer
```

## Client vs Server

| Component | Directive | 이유 |
|-----------|-----------|------|
| CategoryFilter | `'use client'` | useState 필터링 + 페이지네이션 |
| HeroSlider | `'use client'` | useState 슬라이드 + useEffect 자동 전환 |
| SeriesView | `'use client'` | useState 카테고리 필터 + 페이지네이션 |
| Pagination | `'use client'` | onClick 이벤트 |
| ThemeProvider | `'use client'` | localStorage + Context |
| ThemeToggle | `'use client'` | useTheme hook |
| PostPage | Server | generateStaticParams, 정적 |
| TagsPage | Server | 정적 |

## 다크모드

- **3단계**: light / dark / system (OS 연동)
- **FOUC 방지**: `layout.tsx` `<head>`에 인라인 스크립트로 localStorage 읽어 `.dark` 클래스 즉시 적용
- **ThemeProvider**: Context로 theme/resolvedTheme 관리, `matchMedia` change 이벤트 리스너
- **CSS**: `globals.css`의 `.dark { ... }` 블록에서 커스텀 프로퍼티 오버라이드

## 디자인 패턴

- **카드 기반**: PostCard, SeriesCard — 둥근 모서리 (`rounded-xl`), 보더, hover shadow
- **카테고리 뱃지**: 둥근 pill (`rounded-full`), 카테고리별 고유 색상
- **태그 칩**: 작은 pill (`rounded-md`), 중립 색상 (`tag-bg`, `tag-text`)
- **필터 UI**: checkbox 숨기고 label로 토글, 선택 시 `primary` 색상 하이라이트
- **페이지네이션**: 9개/페이지, 번호 버튼 + 이전/다음
- **반응형 그리드**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

## PostCard 재사용

`category-filter.tsx`에서 `PostCard` export → `tags/[tag]/page.tsx`에서 import하여 재사용.
