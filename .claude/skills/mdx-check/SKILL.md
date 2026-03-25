---
name: mdx-check
description: MDX 파일 빌드 검증. velite build로 에러를 검출하고, 에러가 있으면 Sonnet 에이전트로 병렬 수정.
model: sonnet
---

# MDX Check

MDX 파일의 빌드 에러를 검증하고 자동 수정한다.

## Process

### 1. Velite Build 실행

```bash
bun velite build 2>&1
```

에러가 없으면 "빌드 성공, 에러 없음"을 보고하고 종료.

### 2. 에러 파싱

에러 출력에서 파일명과 에러 유형을 추출한다:
- `Could not parse expression with acorn` → JSX 표현식 파싱 에러 (보통 `{}` 문제)
- `Unexpected character` → JSX 태그 파싱 에러 (보통 `<` 문제)
- 기타 에러 메시지

### 3. 병렬 수정

에러가 있는 파일마다 Agent를 병렬 스폰하여 수정한다:

```
Agent({
  subagent_type: "general-purpose",
  model: "sonnet",
  prompt: "파일 {파일경로}에서 MDX 빌드 에러 수정. 에러: {에러메시지}.
    알려진 MDX 제약:
    - {} 는 JSX 표현식으로 파싱됨 → 수식은 코드 블록(```)으로 감쌀 것
    - < 는 JSX 태그로 파싱됨 → ≪, &lt; 등으로 대체
    - $...$ / $$...$$ LaTeX는 지원 안 됨 → 코드 블록으로 대체
    - ![alt](src) 마크다운 이미지는 Velite가 제거 → <img> 태그 사용
    - 인라인 $var$ 도 제거 → 일반 텍스트나 백틱으로 대체
    파일을 읽고, 에러 원인을 찾아 최소한으로 수정하세요. 내용 자체는 변경하지 마세요."
})
```

### 4. 재검증

모든 수정 완료 후 `bun velite build`를 다시 실행하여 에러가 해결됐는지 확인한다.
에러가 남아있으면 3단계를 반복한다 (최대 2회).

### 5. 결과 보고

수정된 파일 목록과 변경 내용을 요약하여 보고한다.
