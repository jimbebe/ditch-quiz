import Image from "next/image";

interface HeaderProps {
  onReset?: () => void;
}

export default function Header({ onReset }: HeaderProps) {
  return (
    <header className="w-full py-4 flex flex-col items-center">
      <button onClick={onReset} className="cursor-pointer">
        <Image
          src="/logo.png"
          alt="Ditch! Japon"
          width={200}
          height={80}
          priority
          className="h-auto w-48"
        />
      </button>
    </header>
  );
}
