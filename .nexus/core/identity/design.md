<!-- tags: design, architecture, tech-stack -->
# Design

## 핵심 설계 결정

1. **Next.js 16 + Static Export** — App Router를 활용하되 `output: 'export'`로 완전 정적 사이트 생성. 서버 없이 GitHub Pages에서 호스팅.

2. **Velite + MDX 콘텐츠 파이프라인** — MDX 파일이 빌드 시 Velite를 통해 타입드 데이터로 변환되어 `#content`로 import. 시리즈/태그/TOC 등 메타데이터 자동 추출.

3. **Bun 런타임** — 빠른 설치/빌드 속도를 위해 Bun 사용. CI에서도 Bun 1.3.9 고정.

4. **Tailwind CSS 4 + Typography** — 유틸리티 우선 스타일링. Typography 플러그인으로 MDX 콘텐츠 렌더링.

5. **Shiki(rehype-pretty-code) 코드 하이라이팅** — 빌드 타임에 구문 하이라이팅 적용, 다크/라이트 두얼 테마.