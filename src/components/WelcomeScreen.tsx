interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="animate-fade-in-up flex flex-col items-center gap-8 px-6 py-12 text-center">
      <div className="text-7xl">🎴</div>
      <div>
        <h2 className="font-display text-3xl font-bold text-ditch-yellow">
          Quel pouvoir es-tu ?
        </h2>
        <p className="mt-3 max-w-sm text-lg text-white/80">
          Réponds à 4 questions pour découvrir ta carte pouvoir Ditch! et tente
          de gagner un exemplaire du jeu !
        </p>
      </div>
      <button
        onClick={onStart}
        className="animate-pulse-glow rounded-2xl bg-ditch-yellow px-10 py-4 font-display text-xl font-bold text-ditch-dark transition-transform active:scale-95"
      >
        Je joue !
      </button>
    </div>
  );
}
