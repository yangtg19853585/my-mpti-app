import { supabase, RESULTS_TABLE } from "./supabaseClient";
import type { Letter, MbtiType } from "./mbti";

export interface SubmitResultPayload {
  mbtiType: MbtiType;
  answers: Letter[];
}

/** 테스트 완료 시 최종 MBTI 결과와 답변 리스트를 DB에 적재한다. */
export async function submitResult({ mbtiType, answers }: SubmitResultPayload) {
  const { error } = await supabase
    .from(RESULTS_TABLE)
    .insert({ mbti_type: mbtiType, answers });

  if (error) {
    console.error("[submitResult] Supabase insert 실패:", error.message);
  }
}

/** 지금까지 테스트에 참여한 총 인원 수(row 수)를 가져온다. */
export async function fetchParticipantCount(): Promise<number> {
  const { count, error } = await supabase
    .from(RESULTS_TABLE)
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("[fetchParticipantCount] Supabase count 실패:", error.message);
    return 0;
  }

  return count ?? 0;
}

/** 새로운 참여자가 INSERT 될 때마다 실시간으로 콜백을 호출한다. */
export function subscribeToNewParticipants(onInsert: () => void) {
  const channel = supabase
    .channel("mbti_results_inserts")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: RESULTS_TABLE },
      () => onInsert()
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
