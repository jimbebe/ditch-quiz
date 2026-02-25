"use client";

import { useReducer, useCallback } from "react";
import { QuizState } from "@/types";
import { QUIZ_QUESTIONS } from "@/lib/quiz-data";
import { addScores, getWinningCard } from "@/lib/quiz-logic";

type QuizAction =
  | { type: "START_QUIZ" }
  | { type: "ANSWER"; answerIndex: number }
  | { type: "SET_SUBMITTING"; value: boolean }
  | { type: "SET_ERROR"; error: string | null }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SHOW_TOAST"; message: string; toastType: "success" | "error" }
  | { type: "HIDE_TOAST" }
  | { type: "RESET" };

const initialState: QuizState = {
  step: "welcome",
  currentQuestion: 0,
  scores: {},
  selectedCard: null,
  playerName: "",
  playerEmail: "",
  isSubmitting: false,
  hasSubmitted: false,
  error: null,
  toast: null,
};

function reducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "START_QUIZ":
      return { ...state, step: "quiz", currentQuestion: 0, scores: {} };

    case "ANSWER": {
      const question = QUIZ_QUESTIONS[state.currentQuestion];
      const answer = question.answers[action.answerIndex];
      const newScores = addScores(state.scores, answer);
      const nextQuestion = state.currentQuestion + 1;

      if (nextQuestion >= QUIZ_QUESTIONS.length) {
        const card = getWinningCard(newScores);
        return {
          ...state,
          scores: newScores,
          selectedCard: card,
          step: "result",
        };
      }

      return {
        ...state,
        scores: newScores,
        currentQuestion: nextQuestion,
      };
    }

    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.value, error: null };

    case "SET_ERROR":
      return { ...state, error: action.error, isSubmitting: false };

    case "SUBMIT_SUCCESS":
      return { ...state, hasSubmitted: true, isSubmitting: false, error: null };

    case "SHOW_TOAST":
      return {
        ...state,
        toast: { message: action.message, type: action.toastType },
      };

    case "HIDE_TOAST":
      return { ...state, toast: null };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export function useQuiz() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startQuiz = useCallback(() => dispatch({ type: "START_QUIZ" }), []);

  const answerQuestion = useCallback(
    (index: number) => dispatch({ type: "ANSWER", answerIndex: index }),
    []
  );

  const submitEntry = useCallback(
    async (name: string, email: string) => {
      if (!state.selectedCard) return;

      dispatch({ type: "SET_SUBMITTING", value: true });

      try {
        const res = await fetch("/api/entries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            card_key: state.selectedCard.key,
            card_name: state.selectedCard.name,
            scores: state.scores,
          }),
        });

        if (res.status === 409) {
          dispatch({
            type: "SHOW_TOAST",
            message: "Tu as déjà participé ! 😄",
            toastType: "error",
          });
          dispatch({ type: "SET_SUBMITTING", value: false });
          return;
        }

        if (!res.ok) {
          throw new Error("Erreur serveur");
        }

        dispatch({ type: "SUBMIT_SUCCESS" });
        dispatch({
          type: "SHOW_TOAST",
          message: "Participation enregistrée ! 🎉",
          toastType: "success",
        });
      } catch {
        dispatch({
          type: "SET_ERROR",
          error: "Oups, une erreur est survenue. Réessaie !",
        });
        dispatch({
          type: "SHOW_TOAST",
          message: "Erreur réseau, réessaie !",
          toastType: "error",
        });
      }
    },
    [state.selectedCard, state.scores]
  );

  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  const hideToast = useCallback(() => dispatch({ type: "HIDE_TOAST" }), []);

  return {
    state,
    startQuiz,
    answerQuestion,
    submitEntry,
    reset,
    hideToast,
  };
}
