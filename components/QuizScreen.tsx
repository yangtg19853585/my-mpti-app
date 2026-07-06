"use client";

import { useState } from "react";
import { QUESTIONS } from "@/lib/questions";
import type { Letter } from "@/lib/mbti";

interface QuizScreenProps {
  onComplete: (answers: Letter[]) => void;
}

const TRANSITION_MS = 260;

export default function QuizScreen({ onComplete }: QuizScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Letter[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<"A" | "B" | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const total = QUESTIONS.length;
  const question = QUESTIONS[currentIndex];
  const progress = Math.round(((currentIndex + (isExiting ? 1 : 0)) / total) * 100);

  function handleSelect(label: "A" | "B", letter: Letter) {
    if (isExiting) return;
    setSelectedLabel(label);
    setIsExiting(true);

    const nextAnswers = [...answers, letter];

    setTimeout(() => {
      if (currentIndex + 1 >= total) {
        onComplete(nextAnswers);
        return;
      }
      setAnswers(nextAnswers);
      setCurrentIndex((prev) => prev + 1);
      setSelectedLabel(null);
      setIsExiting(false);
    }, TRANSITION_MS);
  }

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-400">
            <span className="rounded-full bg-white/5 px-2.5 py-1 text-indigo-200">
              {`[ ${currentIndex + 1} / ${total} ]`}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full shimmer-bg animate-shimmer transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div
          key={currentIndex}
          className={`rounded-2xl border border-white/10 bg-white/5 p-7 shadow-xl backdrop-blur-sm ${
            isExiting ? "animate-fade-out" : "animate-fade-in"
          }`}
        >
          <p className="min-h-24 text-balance text-center text-lg font-bold leading-snug text-white sm:text-xl">
            {question.text}
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {question.options.map((option) => {
              const isSelected = selectedLabel === option.label;
              return (
                <button
                  key={option.label}
                  type="button"
                  disabled={isExiting}
                  onClick={() => handleSelect(option.label, option.letter)}
                  className={`group flex items-start gap-3 rounded-xl border px-4 py-4 text-left text-sm leading-relaxed transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-default sm:text-base ${
                    isSelected
                      ? "border-cyan-400 bg-cyan-400/10 text-white"
                      : "border-white/10 bg-white/5 text-slate-200 hover:border-indigo-400/50 hover:bg-indigo-500/10"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      isSelected
                        ? "bg-cyan-400 text-slate-900"
                        : "bg-white/10 text-slate-300 group-hover:bg-indigo-500/40"
                    }`}
                  >
                    {option.label}
                  </span>
                  <span>{option.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
