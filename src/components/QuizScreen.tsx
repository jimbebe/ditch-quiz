"use client";

import { useState } from "react";
import { QUIZ_QUESTIONS } from "@/lib/quiz-data";

interface QuizScreenProps {
  currentQuestion: number;
  onAnswer: (index: number) => void;
}

export default function QuizScreen({
  currentQuestion,
  onAnswer,
}: QuizScreenProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const question = QUIZ_QUESTIONS[currentQuestion];
  const total = QUIZ_QUESTIONS.length;
  const progress = ((currentQuestion) / total) * 100;

  function handleSelect(index: number) {
    if (selected !== null) return;
    setSelected(index);
    setTimeout(() => {
      setSelected(null);
      onAnswer(index);
    }, 400);
  }

  return (
    <div key={currentQuestion} className="animate-fade-in-up flex w-full flex-col gap-6 px-4 py-6">
      {/* Barre de progression */}
      <div className="flex items-center gap-3">
        <span className="font-body text-lg font-semibold text-ditch-marron/80">
          {currentQuestion + 1}/{total}
        </span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-ditch-marron/15">
          <div
            className="h-full rounded-full bg-ditch-marron transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h2 className="font-display text-xl font-bold leading-snug text-ditch-marron sm:text-2xl">
        {question.question}
      </h2>

      {/* Réponses */}
      <div className="flex flex-col gap-3">
        {question.answers.map((answer, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={`stagger-${i + 1} animate-slide-in-right rounded-xl border-2 px-5 py-4 text-left font-body font-semibold transition-all ${
              selected === i
                ? "scale-[0.98] border-ditch-marron bg-ditch-marron text-ditch-yellow"
                : "border-ditch-marron/30 bg-white/60 text-ditch-marron hover:border-ditch-marron/50 hover:bg-white/80 active:scale-[0.98]"
            }`}
          >
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
}
