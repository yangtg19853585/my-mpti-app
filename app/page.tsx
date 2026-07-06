"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BackgroundFX from "@/components/BackgroundFX";
import HomeScreen from "@/components/HomeScreen";
import QuizScreen from "@/components/QuizScreen";
import LoadingScreen from "@/components/LoadingScreen";
import ResultScreen from "@/components/ResultScreen";
import { calculateMbti, type Letter, type MbtiType } from "@/lib/mbti";
import { PERSONAS } from "@/lib/personas";
import { submitResult } from "@/lib/resultsApi";

type Screen = "home" | "quiz" | "loading" | "result";

const MIN_LOADING_MS = 1400;

function isMbtiType(value: string | null): value is MbtiType {
  return !!value && value.toUpperCase() in PERSONAS;
}

function AppFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [screen, setScreen] = useState<Screen>("home");
  const [mbtiType, setMbtiType] = useState<MbtiType | null>(null);

  useEffect(() => {
    const sharedType = searchParams.get("type");
    if (isMbtiType(sharedType)) {
      setMbtiType(sharedType.toUpperCase() as MbtiType);
      setScreen("result");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleStart() {
    setScreen("quiz");
  }

  function handleQuizComplete(answers: Letter[]) {
    setScreen("loading");
    const { type } = calculateMbti(answers);

    const startedAt = Date.now();
    submitResult({ mbtiType: type, answers }).finally(() => {
      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(MIN_LOADING_MS - elapsed, 0);
      setTimeout(() => {
        setMbtiType(type);
        setScreen("result");
      }, remaining);
    });
  }

  function handleRestart() {
    setMbtiType(null);
    setScreen("home");
    router.replace("/");
  }

  return (
    <main className="relative min-h-dvh w-full">
      <BackgroundFX />
      {screen === "home" && <HomeScreen onStart={handleStart} />}
      {screen === "quiz" && <QuizScreen onComplete={handleQuizComplete} />}
      {screen === "loading" && <LoadingScreen />}
      {screen === "result" && mbtiType && (
        <ResultScreen mbtiType={mbtiType} onRestart={handleRestart} />
      )}
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AppFlow />
    </Suspense>
  );
}
