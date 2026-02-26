import Image from "next/image";

const CARDS = [
  { emoji: "👻", bg: "#FFDD00", color: "#3B0C11", rotate: -18, tx: -36, delay: 0 },
  { emoji: "🐺", bg: "#2A8A8A", color: "#FFF8E7", rotate: -6, tx: -12, delay: 0.08 },
  { emoji: "🗡️", bg: "#FFDD00", color: "#3B0C11", rotate: 6, tx: 12, delay: 0.16 },
  { emoji: "🎎", bg: "#2A8A8A", color: "#FFF8E7", rotate: 18, tx: 36, delay: 0.24 },
] as const;

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="animate-fade-in-up flex flex-col items-center gap-8 px-6 py-12 text-center">
      {/* Logo */}
      <Image
        src="/logo.png"
        alt="Ditch! Japon"
        width={320}
        height={128}
        priority
        className="h-auto w-72"
      />

      {/* Cartes en éventail */}
      <div className="relative flex h-28 w-64 items-center justify-center">
        {CARDS.map((card, i) => (
          <div
            key={i}
            className="animate-card-fan absolute h-[90px] w-[60px] rounded-xl shadow-md"
            style={{
              backgroundColor: card.bg,
              "--card-fan-transform": `rotate(${card.rotate}deg) translateX(${card.tx}px)`,
              "--card-delay": `${card.delay}s`,
            } as React.CSSProperties}
          >
            <span className="flex h-full items-center justify-center text-2xl">
              {card.emoji}
            </span>
          </div>
        ))}
      </div>

      <div>
        <h2 className="font-display text-3xl font-bold text-ditch-marron">
          Quel pouvoir es-tu ?
        </h2>
        <p className="mt-3 max-w-sm font-body text-lg text-ditch-marron/90">
          Réponds à 4 questions pour découvrir ta carte pouvoir Ditch! et tenter
          de gagner un exemplaire du jeu !
        </p>
      </div>
      <button
        onClick={onStart}
        className="animate-pulse-glow rounded-2xl bg-ditch-marron px-10 py-4 font-display text-xl font-bold text-ditch-yellow transition-transform active:scale-95"
      >
        Je joue !
      </button>
    </div>
  );
}
