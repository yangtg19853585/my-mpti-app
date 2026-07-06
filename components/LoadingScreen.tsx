"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "답변을 분석하고 있어요...",
  "E/I, S/N, T/F, J/P 성향을 계산하는 중...",
  "가장 잘 맞는 IT 부캐를 매칭하는 중...",
  "찰떡궁합 동료를 찾는 중...",
];

export default function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 650);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center px-6 py-16">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-white/10 border-t-cyan-400" />
          <div
            className="absolute inset-2 animate-spin rounded-full border-4 border-white/5 border-t-indigo-400"
            style={{ animationDirection: "reverse", animationDuration: "1.1s" }}
          />
          <span className="text-2xl">🧬</span>
        </div>
        <p className="min-h-6 text-center text-sm font-medium text-slate-300 sm:text-base">
          {MESSAGES[messageIndex]}
        </p>
      </div>
    </div>
  );
}
