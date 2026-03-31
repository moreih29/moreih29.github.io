<!-- tags: build, deploy, ci, scripts -->
# Build & Deploy

## 빌드 파이프라인

```bash
bun run build
```

`prebuild` 스크립트가 자동 실행:
1. `node scripts/fix-mdx-bold.mjs` — `**텍스트)**조사` 패턴을 `<strong>` 태그로 교정 (한글 MDX 볼드 렌더링 이슈)
2. `bun velite build` — MDX → JSON 변환 (.velite/)
3. `node scripts/patch-velite.mjs` — `.velite/index.js`의 `with { type: 'json' }` 구문을 `createRequire`로 패치 (Node 호환성)

이후 `next build`가 `output: 'export'`로 정적 파일을 `out/`에 생성.

## 개발 서버

```bash
bun run dev   # Next.js dev + Turbopack + Velite watch
```

`next.config.ts`에서 dev 모드 감지 시 Velite를 watch 모드로 자동 실행.

## CI/CD

- `.github/workflows/deploy.yml`
- main 브랜치 push 시 자동 배포
- `ubuntu-latest` + Bun 1.3.9 + `bun install --frozen-lockfile` + `bun run build`
- `out/` → GitHub Pages (actions/upload-pages-artifact + actions/deploy-pages)

## Path Aliases

| Alias | Target |
|-------|--------|
| `@/*` | `./src/*` |
| `#content` | `./.velite` |