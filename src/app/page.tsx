"use client";

import Header from "@/components/Header";
import WelcomeScreen from "@/components/WelcomeScreen";
import QuizScreen from "@/components/QuizScreen";
import ResultScreen from "@/components/ResultScreen";
import Toast from "@/components/Toast";
import { useQuiz } from "@/hooks/useQuiz";

export default function Home() {
  const { state, startQuiz, answerQuestion, submitEntry, reset, hideToast } =
    useQuiz();

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col items-center">
      {state.step !== "welcome" && <Header onReset={reset} />}

      <main className="flex w-full flex-1 flex-col items-center justify-center">
        {state.step === "welcome" && <WelcomeScreen onStart={startQuiz} />}

        {state.step === "quiz" && (
          <QuizScreen
            currentQuestion={state.currentQuestion}
            onAnswer={answerQuestion}
          />
        )}

        {state.step === "result" && state.selectedCard && (
          <ResultScreen
            card={state.selectedCard}
            isSubmitting={state.isSubmitting}
            error={state.error}
            hasSubmitted={state.hasSubmitted}
            onSubmit={submitEntry}
            onReset={reset}
          />
        )}
      </main>

      {state.toast && (
        <Toast
          message={state.toast.message}
          type={state.toast.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
}
