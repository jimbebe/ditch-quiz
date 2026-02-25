import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Ditch! — Quel pouvoir es-tu ?",
  description:
    "Découvre ta carte pouvoir Ditch! au Salon du Jeu de Cannes 2026 et tente de gagner un exemplaire du jeu !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${fredoka.variable} ${nunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
