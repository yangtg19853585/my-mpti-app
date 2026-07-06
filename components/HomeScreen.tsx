"use client";

import { useEffect, useState } from "react";
import { fetchParticipantCount, subscribeToNewParticipants } from "@/lib/resultsApi";

interface HomeScreenProps {
  onStart: () => void;
}

export default function HomeScreen({ onStart }: HomeScreenProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    fetchParticipantCount().then((value) => {
      if (active) setCount(value);
    });

    const unsubscribe = subscribeToNewParticipants(() => {
      setCount((prev) => (prev === null ? 1 : prev + 1));
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-6 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            IT 직무 성향 테스트
          </span>
        </div>

        <h1 className="text-balance text-center text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
          출근길 내 모습으로 알아보는
          <br />
          <span className="text-gradient">&apos;IT 부캐&apos;</span> 테스트
        </h1>

        <p className="mt-5 text-center text-sm leading-relaxed text-slate-300 sm:text-base">
          협업 스타일부터 위기 대처법까지, 내 MBTI 유형에 맞는
          <br className="hidden sm:block" />
          IT 직무 페르소나는?
        </p>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-xl backdrop-blur-sm">
          <p className="flex items-center justify-center gap-2 text-center text-sm font-medium text-cyan-200 sm:text-base">
            <span aria-hidden>👥</span>
            {count === null ? (
              <span className="inline-block h-4 w-40 animate-pulse rounded bg-white/10" />
            ) : (
              <span>
                이미{" "}
                <span className="font-extrabold text-white">
                  {count.toLocaleString()}명
                </span>
                의 동료들이 자신의 부캐를 확인했어요!
              </span>
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={onStart}
          className="group mt-10 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 hover:bg-indigo-500 active:scale-95"
        >
          내 IT 부캐 확인하러 가기
          <span className="inline-block animate-bounce-x transition-transform group-hover:translate-x-1">
            ➔
          </span>
        </button>

        <p className="mt-4 text-center text-xs text-slate-500">
          약 1분이면 완료돼요 · 8개의 간단한 질문
        </p>
      </div>
    </div>
  );
}
