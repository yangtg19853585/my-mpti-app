-- ============================================================
-- IT 부캐 찾기 MBTI 테스트 - Supabase 스키마
-- Supabase 대시보드 > SQL Editor 에서 그대로 실행하세요.
-- ============================================================

create extension if not exists "pgcrypto";

create table if not exists public.mbti_results (
  id uuid primary key default gen_random_uuid(),
  mbti_type text not null check (char_length(mbti_type) = 4),
  answers jsonb not null,
  created_at timestamptz not null default now()
);

-- Row Level Security 활성화
alter table public.mbti_results enable row level security;

-- 누구나(anon 포함) 결과를 저장할 수 있도록 INSERT 허용
create policy "Allow public insert on mbti_results"
  on public.mbti_results
  for insert
  to anon
  with check (true);

-- 메인 화면의 실시간 참여자 수 카운팅을 위해 SELECT(count) 허용
create policy "Allow public read on mbti_results"
  on public.mbti_results
  for select
  to anon
  using (true);

-- 실시간 카운터 배너가 INSERT 이벤트를 구독할 수 있도록 Realtime publication에 추가
alter publication supabase_realtime add table public.mbti_results;
