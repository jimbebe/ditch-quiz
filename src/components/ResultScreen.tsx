"use client";

import { useState } from "react";
import { PowerCard } from "@/types";

interface ResultScreenProps {
  card: PowerCard;
  isSubmitting: boolean;
  error: string | null;
  hasSubmitted: boolean;
  onSubmit: (name: string, email: string) => void;
}

export default function ResultScreen({
  card,
  isSubmitting,
  error,
  hasSubmitted,
  onSubmit,
}: ResultScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !consent) return;
    onSubmit(name.trim(), email.trim().toLowerCase());
  }

  return (
    <div className="animate-fade-in-up flex w-full flex-col items-center gap-8 px-4 py-8 text-center">
      {/* Carte résultat */}
      <div
        className="animate-scale-in flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl border-2 p-8"
        style={{
          borderColor: card.color,
          background: card.bgColor,
          boxShadow: `0 0 40px ${card.color}33`,
        }}
      >
        <p className="text-xs font-bold uppercase tracking-wider text-white/50">
          Ta carte pouvoir Ditch!
        </p>
        <span className="text-6xl">{card.emoji}</span>
        <h2
          className="font-display text-3xl font-bold"
          style={{ color: card.color }}
        >
          {card.name}
        </h2>
        <p className="text-base text-white/80">{card.description}</p>
        <div
          className="mt-2 w-full rounded-xl border px-4 py-3"
          style={{
            backgroundColor: `${card.color}20`,
            borderColor: `${card.color}40`,
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: card.color }}
          >
            Pouvoir Ditch!
          </p>
          <p className="mt-1 text-sm font-semibold text-white">{card.power}</p>
        </div>
      </div>

      {/* Formulaire tirage au sort */}
      {hasSubmitted ? (
        <p className="text-lg font-semibold text-ditch-yellow">
          Participation enregistrée !
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border-2 border-white/10 bg-white/5 p-6"
        >
          <p className="font-display text-lg font-bold text-ditch-yellow">
            Tente de gagner le jeu !
          </p>
          <p className="text-sm text-white/60">
            Laisse tes coordonnées pour participer au tirage au sort le 2 mars.
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

          <label className="flex items-start gap-3 text-left">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-ditch-yellow"
            />
            <span className="text-xs text-white/60">
              J&apos;accepte que mes données (prénom, email) soient utilisées
              par Délires Games pour le tirage au sort et recevoir des
              informations sur les jeux Délires Games. Je peux me désinscrire à
              tout moment en écrivant à{" "}
              <a
                href="mailto:thibaud@deliresgames.com"
                className="text-ditch-teal underline"
              >
                thibaud@deliresgames.com
              </a>
              .
            </span>
          </label>

          {error && (
            <p className="text-center text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !name.trim() || !email.trim() || !consent}
            className="rounded-xl bg-ditch-yellow px-6 py-3 font-display text-lg font-bold text-ditch-dark transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting ? "Envoi en cours…" : "Je participe !"}
          </button>
        </form>
      )}

      {/* Partage Instagram */}
      <div className="flex w-full max-w-sm flex-col items-center gap-3 rounded-2xl border-2 border-white/10 bg-white/5 p-6">
        <p className="font-display text-lg font-bold text-ditch-yellow">
          Double tes chances !
        </p>
        <p className="text-sm text-white/60">
          Fais un screenshot de ta carte, partage-la en story Instagram et
          tague{" "}
          <span className="font-bold text-white">@ditchlejeu</span>
        </p>
        <a
          href="https://www.instagram.com/ditchlejeu"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 px-6 py-3 font-display font-bold text-white transition-all hover:brightness-110 active:scale-[0.98]"
        >
          📸 Je partage en story
        </a>
      </div>

      {/* CTAs */}
      <div className="flex w-full max-w-sm flex-col gap-3">
        <a
          href="https://deliresgames.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-6 py-3 font-display font-bold text-white transition-all hover:border-white/40 hover:bg-white/10 active:scale-[0.98]"
        >
          🛒 J'achète le jeu
        </a>
        <a
          href="https://www.myludo.fr/#!/game/ditch-95212"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-6 py-3 font-display font-bold text-white transition-all hover:border-white/40 hover:bg-white/10 active:scale-[0.98]"
        >
          🎲 Je note mes scores sur MyLudo
        </a>
        <a
          href="https://www.instagram.com/ditchlejeu"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/20 bg-white/5 px-6 py-3 font-display font-bold text-white transition-all hover:border-white/40 hover:bg-white/10 active:scale-[0.98]"
        >
          📸 Je suis Ditch! sur Instagram
        </a>
      </div>
    </div>
  );
}
