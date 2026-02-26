"use client";

import { useState } from "react";
import { PowerCard } from "@/types";

interface ResultScreenProps {
  card: PowerCard;
  isSubmitting: boolean;
  error: string | null;
  hasSubmitted: boolean;
  onSubmit: (name: string, email: string) => void;
  onReset: () => void;
}

export default function ResultScreen({
  card,
  isSubmitting,
  error,
  hasSubmitted,
  onSubmit,
  onReset,
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
      <div className="animate-scale-in flex w-full max-w-xs flex-col items-center gap-4 rounded-3xl bg-ditch-marron p-8 shadow-xl">
        <span className="text-7xl">{card.emoji}</span>
        <h2 className="font-display text-2xl font-bold text-ditch-yellow">
          {card.name}
        </h2>
        <p className="font-body text-sm leading-relaxed text-ditch-yellow/80">
          {card.description}
        </p>
        <div className="mt-1 w-full rounded-xl bg-ditch-yellow/10 px-4 py-3">
          <p className="font-body text-[10px] font-bold uppercase tracking-widest text-ditch-yellow/50">
            Pouvoir
          </p>
          <p className="mt-1 font-body text-sm font-semibold text-ditch-yellow">
            {card.power}
          </p>
        </div>
      </div>

      {/* Formulaire tirage au sort */}
      {hasSubmitted ? (
        <p className="font-display text-lg font-semibold text-ditch-marron">
          Participation enregistrée !
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border-2 border-ditch-marron/20 bg-white/50 p-6"
        >
          <p className="font-display text-lg font-bold text-ditch-marron">
            Tente de gagner le jeu !
          </p>
          <p className="font-body text-sm text-ditch-marron/80">
            Laisse tes coordonnées pour participer au tirage au sort qui aura lieu le 2 mars.
          </p>

          <input
            type="text"
            placeholder="Ton prénom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="font-body rounded-xl border-2 border-ditch-marron/20 bg-white/80 px-4 py-3 text-ditch-marron placeholder-ditch-marron/50 outline-none transition-colors focus:border-ditch-marron"
          />

          <input
            type="email"
            placeholder="Ton email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="font-body rounded-xl border-2 border-ditch-marron/20 bg-white/80 px-4 py-3 text-ditch-marron placeholder-ditch-marron/50 outline-none transition-colors focus:border-ditch-marron"
          />

          <label className="flex items-start gap-3 text-left">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-ditch-marron"
            />
            <span className="font-body text-xs text-ditch-marron/80">
              J&apos;accepte que mes données (prénom, email) soient utilisées
              par Délires Games pour le tirage au sort et recevoir des
              informations sur les jeux Délires Games. Je peux me désinscrire à
              tout moment en écrivant à{" "}
              <a
                href="mailto:thibaud@deliresgames.com"
                className="text-ditch-crimson underline"
              >
                thibaud@deliresgames.com
              </a>
              .
            </span>
          </label>

          {error && (
            <p className="font-body text-center text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !name.trim() || !email.trim() || !consent}
            className="rounded-xl bg-ditch-marron px-6 py-3 font-display text-lg font-bold text-ditch-yellow transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting ? "Envoi en cours…" : "Je participe !"}
          </button>
        </form>
      )}

      {/* Partage Instagram */}
      <div className="flex w-full max-w-sm flex-col items-center gap-3 rounded-2xl border-2 border-ditch-marron/20 bg-white/50 p-6">
        <p className="font-display text-lg font-bold text-ditch-marron">
          Double tes chances !
        </p>
        <p className="font-body text-sm text-ditch-marron/80">
          Fais un screenshot de ta carte, partage-la en story Instagram et
          tague{" "}
          <span className="font-bold text-ditch-marron">@ditchlejeu</span>
        </p>
        <a
          href="https://www.instagram.com/ditchlejeu"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 px-6 py-3 font-display font-bold text-white transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Je partage en story
        </a>
      </div>

      {/* CTAs */}
      <div className="flex w-full max-w-sm flex-col gap-3">
        <a
          href="https://deliresgames.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-ditch-marron/20 bg-white/50 px-6 py-3 font-display font-bold text-ditch-marron transition-all hover:border-ditch-marron/40 hover:bg-white/70 active:scale-[0.98]"
        >
          🎴 J'achète le jeu
        </a>
        <a
          href="https://www.myludo.fr/#!/game/ditch-95212"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-ditch-marron/20 bg-white/50 px-6 py-3 font-display font-bold text-ditch-marron transition-all hover:border-ditch-marron/40 hover:bg-white/70 active:scale-[0.98]"
        >
          📋 J'ajoute le jeu sur MyLudo
        </a>
        <a
          href="https://www.instagram.com/ditchlejeu"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-ditch-marron/20 bg-white/50 px-6 py-3 font-display font-bold text-ditch-marron transition-all hover:border-ditch-marron/40 hover:bg-white/70 active:scale-[0.98]"
        >
          📸 Je suis l'aventure Ditch! sur Instagram
        </a>
      </div>

      {/* Refaire le quiz */}
      <button
        onClick={onReset}
        className="font-body text-sm text-ditch-marron/60 underline transition-colors hover:text-ditch-marron"
      >
        Refaire le quiz
      </button>
    </div>
  );
}
