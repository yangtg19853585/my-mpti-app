# 🧬 내 성격에 딱 맞는 IT 부캐 찾기 (IT 부캐 MBTI 테스트)

8개의 질문으로 나의 MBTI를 진단하고, 16가지 IT 직장인 페르소나 중 하나로 결과를 보여주는
Next.js 15 (App Router) + Tailwind CSS 기반 테스트 웹앱입니다.
결과와 실시간 참여자 수는 Supabase에 연동됩니다.

## 기술 스택

- **Next.js 15** (App Router, React 19, Client Components)
- **Tailwind CSS 3**
- **Supabase** (`@supabase/supabase-js`) — 결과 적재 + 실시간(Realtime) 참여자 카운터

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속.

## Supabase 설정

1. `docs/supabase-info.md`의 프로젝트 정보를 바탕으로 `.env.local`에 이미 접속 정보가 채워져 있습니다.
   (직접 다른 프로젝트를 쓰려면 `.env.local.example`을 참고해 값을 교체하세요.)
2. Supabase 대시보드 → **SQL Editor**에서 [`database/schema.sql`](database/schema.sql) 내용을 그대로 실행해
   `mbti_results` 테이블, RLS 정책, Realtime publication을 생성합니다.
3. 테이블이 생성되면 메인 화면의 실시간 참여자 카운팅 배너와, 결과 화면에서의 데이터 저장이 정상 동작합니다.

## 폴더 구조

```
app/
  layout.tsx        # 전역 레이아웃, 메타데이터
  page.tsx          # 홈 → 퀴즈 → 로딩 → 결과 화면 전환을 담당하는 오케스트레이터
  globals.css        # Tailwind + 커스텀 배경/그라디언트 유틸리티
components/
  BackgroundFX.tsx   # 배경 그리드 + 블롭 애니메이션
  HomeScreen.tsx      # 메인 화면 (실시간 카운터, CTA)
  QuizScreen.tsx      # 8문항 질문 화면 (progress bar, 페이드 전환)
  LoadingScreen.tsx   # 결과 분석 로딩 화면
  ResultScreen.tsx    # 결과 화면 (페르소나, 케미, 공유)
lib/
  mbti.ts            # MBTI 타입 정의 및 점수 계산(동점 시 I·N·T·P 우선) 로직
  questions.ts        # 8개 질문 데이터 (E/I, S/N, T/F, J/P 각 2문항)
  personas.ts          # 16가지 IT 부캐 페르소나(특징 3가지, 최고/최악 케미)
  supabaseClient.ts    # Supabase 클라이언트 초기화
  resultsApi.ts        # 결과 저장 / 참여자 수 조회 / 실시간 구독
database/
  schema.sql           # Supabase 테이블 + RLS + Realtime 설정 SQL
```

## 주요 기능

- **질문 로직**: 8개 질문(차원당 2문항), 선택할 때마다 해당 알파벳 점수 +1, 동점 시 I/N/T/P 우선으로 최종 MBTI 계산 (`lib/mbti.ts`).
- **결과 저장**: 테스트 완료 시 `mbti_type`, `answers`를 Supabase `mbti_results` 테이블에 저장.
- **실시간 카운터**: 메인 화면 진입 시 전체 row 수를 조회하고, Supabase Realtime으로 새 참여자가 생길 때마다 숫자가 즉시 갱신됨.
- **결과 공유**: 결과 링크 복사 시 `?type=MBTI` 쿼리 파라미터가 담긴 URL이 생성되어, 링크로 들어온 사람은 바로 해당 결과 화면을 볼 수 있음.
- **트렌디 UI**: Indigo/Cyan/Teal 그라디언트, 다크 배경 + 블롭 애니메이션, 카드형 레이아웃(`rounded-2xl`, `shadow-xl`), 버튼 `hover:scale-105` 인터랙션, 진행바 애니메이션.

## 배포

GitHub 저장소: https://github.com/yangtg19853585/my-mpti-app

Vercel 등에 배포 시, 프로젝트 환경변수에 `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`를 동일하게 등록하세요.
