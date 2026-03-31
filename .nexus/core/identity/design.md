<!-- tags: design, architecture, tech-stack -->
<!-- tags: design, architecture, tech-stack -->
# Design

## 핵심 설계 결정

1. **Next.js 16 + Static Export** — App Router를 활용하되 `output: 'export'`로 완전 정적 사이트 생성. 서버 없이 GitHub Pages에서 호스팅.

2. **Velite + MDX 콘텐츠 파이프라인** — MDX 파일이 빌드 시 Velite를 통해 타입드 데이터로 변환되어 `#content`로 import. 시리즈/태그/TOC 등 메타데이터 자동 추출.

3. **Bun 런타임** — 빠른 설치/빌드 속도를 위해 Bun 사용. CI에서도 Bun 1.3.9 고정.

4. **Tailwind CSS 4 + Typography** — 유틸리티 우선 스타일링. Typography 플러그인으로 MDX 콘텐츠 렌더링.

5. **Shiki(rehype-pretty-code) 코드 하이라이팅** — 빌드 타임에 구문 하이라이팅 적용, 다크/라이트 두얼 테마.

6. **Slate/Steel 색상 체계** — 주요 강조색으로 `#94a3b8` (slate-400) 기반 Steel 톤 사용. 그라디언트 제거, Shadow Journal 비주얼(slate 톤 섀도) 적용.

7. **체계적 elevation 3단계** — CSS 변수로 elevation 0/1/2 정의. 카드/모달/오버레이 레이어 구분.

8. **next/font 로컬 호스팅** — Pretendard(본문), JetBrains Mono(코드)를 `src/fonts/`에 woff2로 내장. 외부 폰트 CDN 의존성 제거.

9. **글로벌 검색 (Cmd+K, Fuse.js)** — 클라이언트 사이드 퍼지 검색. SearchTrigger(헤더)에서 SearchModal 오픈. OS별 단축키 힌트(Mac: ⌘K, Windows/Linux: Ctrl+K).

10. **NProgress 프로그레스 바** — 페이지 전환 시 상단에 표시되는 ProgressBar 컴포넌트.

11. **코드 블록 복사 버튼** — CodeCopyButton 컴포넌트. 포스트 상세 페이지에서 코드 블록마다 클립보드 복사 제공.

12. **홈 원페이지 랜딩 재설계** — 히어로 슬라이더 제거 → 정적 FeaturePost + 최신글 + 시리즈 프리뷰 + 인기 태그 섹션으로 구성.
