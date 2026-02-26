"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Entry, Stats } from "@/types";
import { POWER_CARDS } from "@/lib/quiz-data";

interface AdminDashboardProps {
  password: string;
  onLogout: () => void;
}

export default function AdminDashboard({
  password,
  onLogout,
}: AdminDashboardProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [winner, setWinner] = useState<Entry | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [statsRes, entriesRes] = await Promise.all([
        fetch(`/api/stats?password=${encodeURIComponent(password)}`),
        fetch(`/api/entries?password=${encodeURIComponent(password)}`),
      ]);

      if (statsRes.status === 401 || entriesRes.status === 401) {
        setError("Mot de passe incorrect");
        setLoading(false);
        return;
      }

      const [statsData, entriesData] = await Promise.all([
        statsRes.json(),
        entriesRes.json(),
      ]);

      setStats(statsData);
      setEntries(entriesData);
      setError(null);
    } catch {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleDraw() {
    setActionLoading(true);
    try {
      const res = await fetch("/api/draw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.winner) {
        setWinner(data.winner);
      } else {
        setError(data.error || "Erreur tirage");
      }
    } catch {
      setError("Erreur réseau");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleClear() {
    if (!confirm("Supprimer TOUTES les participations ? Cette action est irréversible.")) {
      return;
    }
    setActionLoading(true);
    try {
      await fetch("/api/entries/clear", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      await fetchData();
      setWinner(null);
    } catch {
      setError("Erreur réseau");
    } finally {
      setActionLoading(false);
    }
  }

  function handleExport() {
    window.open(
      `/api/entries/export?password=${encodeURIComponent(password)}`,
      "_blank"
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="font-accent text-lg text-ditch-marron/50">Chargement…</p>
      </div>
    );
  }

  if (error === "Mot de passe incorrect") {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4">
        <p className="text-red-600">{error}</p>
        <button
          onClick={onLogout}
          className="font-accent text-base text-ditch-marron/40 underline"
        >
          Réessayer
        </button>
      </div>
    );
  }

  const cardColors: Record<string, string> = {};
  for (const card of POWER_CARDS) {
    cardColors[card.key] = card.color;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Ditch!"
            width={120}
            height={48}
            className="h-auto w-24"
          />
          <span className="font-accent text-lg text-ditch-crimson">Admin</span>
        </div>
        <button
          onClick={onLogout}
          className="text-sm text-ditch-marron/40 hover:text-ditch-marron/60"
        >
          Déconnexion
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="mb-8 rounded-2xl border-2 border-ditch-marron/15 bg-white/50 p-6">
          <h2 className="mb-4 font-display text-lg font-bold text-ditch-marron">
            Statistiques — {stats.total} participant{stats.total > 1 ? "s" : ""}
          </h2>
          <div className="flex flex-col gap-3">
            {stats.byCard.map((item) => {
              const pct = stats.total > 0 ? (item.count / stats.total) * 100 : 0;
              return (
                <div key={item.card_key} className="flex items-center gap-3">
                  <span className="w-32 text-sm font-semibold text-ditch-marron/70">
                    {item.card_name}
                  </span>
                  <div className="h-6 flex-1 overflow-hidden rounded-full bg-ditch-marron/10">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: cardColors[item.card_key] || "#3B0C11",
                      }}
                    />
                  </div>
                  <span className="w-16 text-right text-sm text-ditch-marron/50">
                    {item.count} ({Math.round(pct)}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mb-8 flex flex-wrap gap-3">
        <button
          onClick={handleDraw}
          disabled={actionLoading}
          className="rounded-xl bg-ditch-marron px-6 py-3 font-display font-bold text-ditch-yellow transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
        >
          Tirage au sort
        </button>
        <button
          onClick={handleExport}
          className="rounded-xl border-2 border-ditch-marron/20 bg-white/50 px-6 py-3 font-display font-bold text-ditch-marron transition-all hover:bg-white/70 active:scale-[0.98]"
        >
          Exporter CSV
        </button>
        <button
          onClick={fetchData}
          className="rounded-xl border-2 border-ditch-marron/20 bg-white/50 px-6 py-3 font-display font-bold text-ditch-marron transition-all hover:bg-white/70 active:scale-[0.98]"
        >
          Rafraîchir
        </button>
        <button
          onClick={handleClear}
          disabled={actionLoading}
          className="rounded-xl border-2 border-red-600/30 bg-red-600/10 px-6 py-3 font-display font-bold text-red-700 transition-all hover:bg-red-600/20 active:scale-[0.98] disabled:opacity-50"
        >
          Tout supprimer
        </button>
      </div>

      {/* Winner */}
      {winner && (
        <div className="mb-8 animate-scale-in rounded-2xl border-2 border-ditch-marron bg-ditch-marron/10 p-6 text-center">
          <p className="mb-2 font-accent text-base text-ditch-marron/60">Gagnant du tirage :</p>
          <p className="font-display text-2xl font-bold text-ditch-marron">
            {winner.name}
          </p>
          <p className="text-ditch-marron/70">{winner.email}</p>
          <p className="mt-1 font-accent text-base text-ditch-marron/60">
            Carte : {winner.card_name}
          </p>
        </div>
      )}

      {error && error !== "Mot de passe incorrect" && (
        <p className="mb-4 text-center text-red-600">{error}</p>
      )}

      {/* Tableau des participants */}
      <div className="overflow-x-auto rounded-2xl border-2 border-ditch-marron/15">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ditch-marron/15 bg-white/50">
              <th className="px-4 py-3 font-semibold text-ditch-marron/60">Nom</th>
              <th className="px-4 py-3 font-semibold text-ditch-marron/60">Email</th>
              <th className="px-4 py-3 font-semibold text-ditch-marron/60">Carte</th>
              <th className="px-4 py-3 font-semibold text-ditch-marron/60">Date</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr
                key={entry.id}
                className="border-b border-ditch-marron/5 hover:bg-white/40"
              >
                <td className="px-4 py-3 text-ditch-marron">{entry.name}</td>
                <td className="px-4 py-3 text-ditch-marron/70">{entry.email}</td>
                <td className="px-4 py-3">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: `${cardColors[entry.card_key] || "#3B0C11"}22`,
                      color: cardColors[entry.card_key] || "#3B0C11",
                    }}
                  >
                    {entry.card_name}
                  </span>
                </td>
                <td className="px-4 py-3 text-ditch-marron/50">
                  {new Date(entry.created_at).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
            {entries.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center font-accent text-base text-ditch-marron/40">
                  Aucun participant pour le moment
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
