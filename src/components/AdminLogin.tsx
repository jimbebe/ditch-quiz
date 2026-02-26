"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

interface AdminLoginProps {
  onLogin: (password: string) => void;
}

export default function AdminLogin({ onLogin, directAccess = false }: AdminLoginProps & { directAccess?: boolean }) {
  const [clicks, setClicks] = useState(0);
  const [showInput, setShowInput] = useState(directAccess);
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
      <div
        onClick={handleTitleClick}
        className="cursor-default select-none"
      >
        <Image
          src="/logo.png"
          alt="Ditch! Japon"
          width={240}
          height={96}
          priority
          className="h-auto w-56"
        />
      </div>

      {!showInput && (
        <p className="font-accent text-base text-ditch-marron/50">
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
            className="rounded-xl border-2 border-ditch-marron/20 bg-white/50 px-4 py-3 text-center text-ditch-marron placeholder-ditch-marron/40 outline-none focus:border-ditch-marron"
          />
          <button
            type="submit"
            className="rounded-xl bg-ditch-marron px-6 py-3 font-display font-bold text-ditch-yellow transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Entrer
          </button>
        </form>
      )}
    </div>
  );
}
