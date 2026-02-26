import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, card_key, card_name, scores } = body;

    if (!name || !email || !card_key || !card_name) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    const { error } = await getSupabase().from("entries").insert({
      name,
      email: email.toLowerCase(),
      card_key,
      card_name,
      scores: scores || {},
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Tu as déjà participé !" },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("POST /api/entries error:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const password = request.nextUrl.searchParams.get("password");

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { data, error } = await getSupabase()
      .from("entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/entries error:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
