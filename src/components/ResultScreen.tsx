import { PowerCard } from "@/types";

interface ResultScreenProps {
  card: PowerCard;
  onReset: () => void;
}

export default function ResultScreen({ card, onReset }: ResultScreenProps) {
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

      {/* Confirmation */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-lg font-semibold text-ditch-yellow">
          Participation enregistrée !
        </p>
        <p className="text-sm text-white/60">
          Viens nous montrer ton résultat sur le stand Délires Games !
        </p>
      </div>

      {/* Rejouer */}
      <button
        onClick={onReset}
        className="rounded-xl border-2 border-white/20 bg-white/5 px-8 py-3 font-display font-bold text-white transition-all hover:border-ditch-teal hover:bg-white/10 active:scale-[0.98]"
      >
        Rejouer
      </button>
    </div>
  );
}
