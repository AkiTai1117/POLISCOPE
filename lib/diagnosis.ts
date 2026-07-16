import type { Question } from "./questions";

export type DiagnosisResult = {
  score: number;
  position: number;
  label: string;
  description: string;
  isOverflow: boolean;
  overflowSide: "left" | "right" | "none";
};

// 100点を「表示上の目安」とし、極端な回答では最大±140点まで伸びる。
const SCORE_LIMIT = 140;

function makeResult(
  score: number,
  label: string,
  description: string,
): DiagnosisResult {
  const isOverflow = Math.abs(score) > 100;
  const overflowSide = score < -100 ? "left" : score > 100 ? "right" : "none";

  return {
    score,
    // ±100を超えたマーカーは、バーの端から少し飛び出して表示する。
    position: Math.max(-8, Math.min(108, (score + 100) / 2)),
    label,
    description,
    isOverflow,
    overflowSide,
  };
}

export function calculateResult(
  questions: Question[],
  answers: Record<number, number>,
): DiagnosisResult {
  const rawScore = questions.reduce(
    (total, question) => total + (answers[question.id] ?? 0) * question.direction,
    0,
  );
  const maximum = questions.length * 2;
  const score = Math.round((rawScore / maximum) * SCORE_LIMIT);

  if (score <= -101) {
    return makeResult(score, "左に振り切れ", "平等や公的支援を重視する回答が、メーターの測定範囲を突破しました。" );
  }
  if (score <= -61) {
    return makeResult(score, "左寄り", "平等や公的支援を、特に重視する傾向が見られます。" );
  }
  if (score <= -21) {
    return makeResult(score, "やや左寄り", "市場の自由より、平等や公的支援をやや重視する傾向です。" );
  }
  if (score < 21) {
    return makeResult(score, "中道", "左右どちらかに偏らず、論点ごとに判断する傾向が見られます。" );
  }
  if (score < 61) {
    return makeResult(score, "やや右寄り", "公的な介入より、自由や秩序をやや重視する傾向です。" );
  }
  if (score <= 100) {
    return makeResult(score, "右寄り", "自由な競争や社会の秩序を、特に重視する傾向が見られます。" );
  }
  return makeResult(score, "右に振り切れ", "自由や秩序を重視する回答が、メーターの測定範囲を突破しました。" );
}
