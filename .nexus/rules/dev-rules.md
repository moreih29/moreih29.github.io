<!-- tags: code, content, build, deploy, convention -->
<!-- tags: code, content, build, deploy, convention -->
# Development Rules

프로젝트 개발 시 따르는 규칙.

---

## 1. 코드 규칙

- TypeScript strict 모드 유지
- Path alias 사용: `@/*` (src), `#content` (.velite)
- 컴포넌트는 `src/components/`, 유틸리티는 `src/lib/`
- Tailwind 유틸리티 클래스 사용, 다크모드는 `dark:` prefix
- **내부 링크는 반드시 `next/link`의 `<Link>` 사용** — `<a href>` 금지. 풀 페이지 리로드로 다크모드 FOUC 발생. 외부 URL만 `<a>` 허용.

---

## 2. 콘텐츠 규칙

- MDX 파일은 `content/posts/` 하위에 위치
- 시리즈 네이밍: `{prefix}-{number}-{topic}.mdx`
- 이미지 저장: `public/images/{series-prefix}/` 또는 `public/images/{slug}/`

---

## 3. 커밋 규칙

- 커밋 메시지: 한글 사용
- Conventional prefix: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:` 등

---

## 4. 빌드/배포 규칙

- `bun run build` 성공 확인 후 커밋
- main 브랜치 push 시 자동 배포 (GitHub Pages)