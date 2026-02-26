"use client";

import { useState } from "react";
import { PowerCard } from "@/types";

interface EmailScreenProps {
  card: PowerCard;
  isSubmitting: boolean;
  error: string | null;
  onSubmit: (name: string, email: string) => void;
}

export default function EmailScreen({
  card,
  isSubmitting,
  error,
  onSubmit,
}: EmailScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onSubmit(name.trim(), email.trim().toLowerCase());
  }

  return (
    <div className="animate-fade-in-up flex w-full flex-col items-center gap-6 px-4 py-6">
      {/* Preview carte */}
      <div
        className="animate-scale-in flex w-full max-w-sm flex-col items-center gap-3 rounded-2xl border-2 p-6 text-center"
        style={{
          borderColor: card.color,
          background: card.bgColor,
        }}
      >
        <span className="text-5xl">{card.emoji}</span>
        <h2
          className="font-display text-2xl font-bold"
          style={{ color: card.color }}
        >
          {card.name}
        </h2>
        <p className="text-sm text-white/70">{card.description}</p>
        <div
          className="mt-1 w-full rounded-xl px-4 py-2"
          style={{ backgroundColor: `${card.color}15` }}
        >
          <p
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: card.color }}
          >
            Pouvoir Ditch!
          </p>
          <p className="mt-1 text-sm text-white/90">{card.power}</p>
        </div>
      </div>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4"
      >
        <p className="text-center text-white/80">
          Laisse tes coordonnées pour participer au tirage au sort !
        </p>

        <input
          type="text"
          placeholder="Ton prénom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="rounded-xl border-2 border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-colors focus:border-ditch-teal"
        />

        <input
          type="email"
          placeholder="Ton email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-xl border-2 border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-colors focus:border-ditch-teal"
        />

        {error && (
          <p className="text-center text-sm text-red-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !name.trim() || !email.trim()}
          className="rounded-xl bg-ditch-yellow px-6 py-3 font-display text-lg font-bold text-ditch-dark transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
        >
          {isSubmitting ? "Envoi en cours…" : "Je participe !"}
        </button>
      </form>
    </div>
  );
}
