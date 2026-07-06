"use client";

import { useState } from "react";
import { getPersona, PERSONAS } from "@/lib/personas";
import type { MbtiType } from "@/lib/mbti";

interface ResultScreenProps {
  mbtiType: MbtiType;
  onRestart: () => void;
}

export default function ResultScreen({ mbtiType, onRestart }: ResultScreenProps) {
  const [copied, setCopied] = useState(false);
  const persona = getPersona(mbtiType);
  const bestPersona = PERSONAS[persona.bestMatch.type];
  const worstPersona = PERSONAS[persona.worstMatch.type];

  async function handleCopyLink() {
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("type", mbtiType);

    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("아래 링크를 복사해서 공유해보세요!", url.toString());
    }
  }

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center px-6 py-14">
      <div className="w-full max-w-md animate-pop-in">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-7 text-center shadow-xl backdrop-blur-sm">
          <p className="text-sm font-semibold text-cyan-300">나의 IT 부캐는</p>

          <div className="mx-auto mt-3 text-5xl">{persona.emoji}</div>

          <h1 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
            {persona.title}
          </h1>

          <div className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full bg-indigo-600/20 px-4 py-1.5">
            <span className="text-lg font-black tracking-[0.2em] text-gradient">
              {mbtiType}
            </span>
          </div>

          <p className="mt-4 text-balance text-sm leading-relaxed text-slate-300 sm:text-base">
            &ldquo;{persona.tagline}&rdquo;
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-sm">
          <h2 className="text-sm font-bold text-indigo-200">
            🔍 나의 일상 속 특징
          </h2>
          <ul className="mt-3 space-y-2.5">
            {persona.traits.map((trait, index) => (
              <li
                key={index}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-200"
              >
                <span className="mt-0.5 text-cyan-400">•</span>
                <span>{trait}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-teal-400/30 bg-teal-400/5 p-5 shadow-xl">
            <p className="text-xs font-bold text-teal-300">💚 최고의 협업 파트너</p>
            <p className="mt-2 text-base font-extrabold text-white">
              {bestPersona.type} · {bestPersona.title}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              {persona.bestMatch.reason}
            </p>
          </div>
          <div className="rounded-2xl border border-rose-400/30 bg-rose-400/5 p-5 shadow-xl">
            <p className="text-xs font-bold text-rose-300">
              ⚡ 케미를 조심해야 할 파트너
            </p>
            <p className="mt-2 text-base font-extrabold text-white">
              {worstPersona.type} · {worstPersona.title}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              {persona.worstMatch.reason}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full rounded-2xl bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 hover:bg-indigo-500 active:scale-95"
          >
            {copied ? "✅ 링크가 복사되었어요!" : "🔗 결과 링크 복사하기"}
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="w-full rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-base font-semibold text-slate-200 transition-all hover:scale-105 hover:bg-white/10 active:scale-95"
          >
            🔄 테스트 다시 하기
          </button>
        </div>
      </div>
    </div>
  );
}
