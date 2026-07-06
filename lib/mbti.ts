export type Letter = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
export type Dimension = "EI" | "SN" | "TF" | "JP";

export interface QuestionOption {
  label: "A" | "B";
  text: string;
  letter: Letter;
}

export interface Question {
  id: number;
  dimension: Dimension;
  text: string;
  options: [QuestionOption, QuestionOption];
}

export type MbtiType =
  | "INTJ"
  | "INTP"
  | "ENTJ"
  | "ENTP"
  | "INFJ"
  | "INFP"
  | "ENFJ"
  | "ENFP"
  | "ISTJ"
  | "ISFJ"
  | "ESTJ"
  | "ESFJ"
  | "ISTP"
  | "ISFP"
  | "ESTP"
  | "ESFP";

export type ScoreBoard = Record<Letter, number>;

const EMPTY_SCORES: ScoreBoard = {
  E: 0,
  I: 0,
  S: 0,
  N: 0,
  T: 0,
  F: 0,
  J: 0,
  P: 0,
};

/**
 * 8개 답변(letter)을 받아 점수를 집계하고 최종 MBTI 4자리를 계산한다.
 * 동점일 경우 I, N, T, P를 우선한다 (기획 명세서 4번 항목 기준).
 */
export function calculateMbti(answers: Letter[]): {
  type: MbtiType;
  scores: ScoreBoard;
} {
  const scores: ScoreBoard = { ...EMPTY_SCORES };
  answers.forEach((letter) => {
    scores[letter] += 1;
  });

  const ei = scores.E > scores.I ? "E" : "I";
  const sn = scores.S > scores.N ? "S" : "N";
  const tf = scores.T > scores.F ? "T" : "F";
  const jp = scores.J > scores.P ? "J" : "P";

  return { type: `${ei}${sn}${tf}${jp}` as MbtiType, scores };
}
