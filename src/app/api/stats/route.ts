import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  const password = request.nextUrl.searchParams.get("password");

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { data, error } = await getSupabase()
      .from("entries")
      .select("card_key, card_name");

    if (error) throw error;

    const total = data?.length || 0;
    const counts: Record<string, { card_name: string; count: number }> = {};

    for (const entry of data || []) {
      if (!counts[entry.card_key]) {
        counts[entry.card_key] = { card_name: entry.card_name, count: 0 };
      }
      counts[entry.card_key].count++;
    }

    const byCard = Object.entries(counts)
      .map(([card_key, { card_name, count }]) => ({
        card_key,
        card_name,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({ total, byCard });
  } catch (err) {
    console.error("GET /api/stats error:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
