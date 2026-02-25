import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { data, error } = await getSupabase()
      .from("entries")
      .select("id, name, email, card_key, card_name");

    if (error) throw error;

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Aucun participant" },
        { status: 404 }
      );
    }

    const winner = data[Math.floor(Math.random() * data.length)];

    return NextResponse.json({ winner });
  } catch (err) {
    console.error("POST /api/draw error:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
