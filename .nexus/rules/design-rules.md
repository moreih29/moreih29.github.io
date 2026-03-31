<!-- tags: design, ui, ux, color, typography, layout, component, interaction -->
# Design Rules

블로그 디자인 개편 시 따르는 규칙. 2026-03-31 상담에서 결정.

---

## 1. 시각적 정체성

- **방향**: 대폭 리디자인 — 강한 시각적 위계, 체계적 elevation
- **톤**: 절제된 전문성, 저널/논문 느낌
- **elevation**: 3단계 체계 (card / raised / overlay)
- **브랜딩**: 로고 마크 + 서브타이틀 + 시그니처 컬러

---

## 2. 색상 체계

- **Primary**: Slate/Steel `#94a3b8` — 무채색 중심 절제 톤
- **카테고리 뱃지**: 다양한 색 유지 (AI/Web/MLOps/DevOps 각각 구분)
- **SVG 다크모드**: CSS 필터 핵(`invert+hue-rotate`) 제거 → SVG 자체 다크모드 대응
- **접근성**: 카테고리 색상 WCAG AA 대비 보정

---

## 3. 정보 구조

- **홈**: 원페이지 랜딩 (히어로 피처 포스트 + 최신 포스트 + 시리즈 프리뷰 + 인기 태그)
- **검색**: 글로벌 검색 (Cmd+K, Fuse.js + 빌드 타임 인덱스)
- **시리즈**: 전용 페이지 유지 + 홈에서 프리뷰
- **포스트 목록**: 필터 + 검색 통합

---

## 4. 타이포그래피

- **폰트 로딩**: next/font 로컬 호스팅 (Pretendard + JetBrains Mono woff2)
- **헤딩 위계**: CSS 변수 기반 체계적 타입 스케일 (h1~h4 크기/weight)
- **한글 prose**: line-height 1.7, word-break: keep-all, letter-spacing 미세 조정

---

## 5. 레이아웃

- **FloatingToc**: CSS Grid 기반 재구성 (하드코딩 제거)
- **모바일**: 모바일 우선 — 햄버거 메뉴, 터치 타겟 44px+, 브레드크럼
- **본문 폭**: `max-w-[65ch]` — 타이포그래피 기반 최적 줄 길이

---

## 6. 컴포넌트

- **이미지 모달**: aria 속성 + 포커스 트래핑 + X 닫기 버튼 (외부 의존성 없이)
- **히어로**: 슬라이더 제거 → 정적 피처 포스트 (절제 톤 일관)
- **코드 블록**: 커스텀 복사 버튼 오버레이
- **페이지네이션**: 말줄임 로직 (1 2 ... 5 6 7 ... 12 13)

---

## 7. 상호작용

- **페이지 전환**: NProgress 스타일 상단 프로그레스 바
- **마이크로 인터랙션**: 체계적 세트 (카드 lift, 링크 underline transition, 버튼 press, 뱃지 배경 전환) — 모두 은은하고 절제
- **user-select**: none 전체 제거, 비텍스트 영역에 cursor: default 적용