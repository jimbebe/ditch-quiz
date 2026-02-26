"use client";

import { useState } from "react";
import Image from "next/image";

interface AdminLoginProps {
  onLogin: (password: string) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.trim()) {
      onLogin(password.trim());
    }
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 p-6">
      <Image
        src="/logo.png"
        alt="Ditch! Japon"
        width={240}
        height={96}
        priority
        className="h-auto w-56"
      />

      <p className="font-accent text-base text-ditch-marron/50">
        Panel d&apos;administration
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-xs flex-col gap-4"
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
    </div>
  );
}
