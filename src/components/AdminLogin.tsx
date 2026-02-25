"use client";

import { useState, useCallback } from "react";

interface AdminLoginProps {
  onLogin: (password: string) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [clicks, setClicks] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [password, setPassword] = useState("");

  const handleTitleClick = useCallback(() => {
    const next = clicks + 1;
    setClicks(next);
    if (next >= 5) {
      setShowInput(true);
    }
  }, [clicks]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.trim()) {
      onLogin(password.trim());
    }
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 p-6">
      <h1
        onClick={handleTitleClick}
        className="cursor-default font-display text-4xl font-bold text-ditch-yellow select-none"
      >
        DITCH!
      </h1>

      {!showInput && (
        <p className="text-sm text-white/40">
          {clicks > 0 && clicks < 5
            ? `${5 - clicks} clic${5 - clicks > 1 ? "s" : ""} restant${5 - clicks > 1 ? "s" : ""}…`
            : "Panel d'administration"}
        </p>
      )}

      {showInput && (
        <form
          onSubmit={handleSubmit}
          className="animate-fade-in-up flex w-full max-w-xs flex-col gap-4"
        >
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            className="rounded-xl border-2 border-white/10 bg-white/5 px-4 py-3 text-center text-white placeholder-white/40 outline-none focus:border-ditch-teal"
          />
          <button
            type="submit"
            className="rounded-xl bg-ditch-yellow px-6 py-3 font-display font-bold text-ditch-dark transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Entrer
          </button>
        </form>
      )}
    </div>
  );
}
