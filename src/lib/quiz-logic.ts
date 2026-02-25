import { PowerCard, QuizAnswer } from "@/types";
import { POWER_CARDS } from "./quiz-data";

export function addScores(
  current: Record<string, number>,
  answer: QuizAnswer
): Record<string, number> {
  const updated = { ...current };
  for (const [key, value] of Object.entries(answer.scores)) {
    updated[key] = (updated[key] || 0) + value;
  }
  return updated;
}

export function getWinningCard(scores: Record<string, number>): PowerCard {
  let maxScore = -1;
  let winnerKey = POWER_CARDS[0].key;

  for (const [key, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      winnerKey = key;
    }
  }

  return POWER_CARDS.find((c) => c.key === winnerKey) || POWER_CARDS[0];
}
