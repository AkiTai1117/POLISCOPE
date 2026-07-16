import type { Question } from "./questions";

export type DiagnosisResult = {
  score: number;
  position: number;
  label: string;
  description: string;
};

export function calculateResult(
  questions: Question[],
  answers: Record<number, number>,
): DiagnosisResult {
  const rawScore = questions.reduce(
    (total, question) => total + (answers[question.id] ?? 0) * question.direction,
    0,
  );
  const maximum = questions.length * 2;
  const score = Math.round((rawScore / maximum) * 100);
  const position = Math.max(0, Math.min(100, (score + 100) / 2));

  if (score <= -61) {
    return { score, position, label: "左寄り", description: "平等や公的支援を、特に重視する傾向が見られます。" };
  }
  if (score <= -21) {
    return { score, position, label: "やや左寄り", description: "市場の自由より、平等や公的支援をやや重視する傾向です。" };
  }
  if (score < 21) {
    return { score, position, label: "中道", description: "左右どちらかに偏らず、論点ごとに判断する傾向が見られます。" };
  }
  if (score < 61) {
    return { score, position, label: "やや右寄り", description: "公的な介入より、自由や秩序をやや重視する傾向です。" };
  }
  return { score, position, label: "右寄り", description: "自由な競争や社会の秩序を、特に重視する傾向が見られます。" };
}
