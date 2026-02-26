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
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    const headers = ["id", "name", "email", "card_key", "card_name", "created_at"];
    const csvRows = [headers.join(",")];

    for (const entry of data || []) {
      const row = headers.map((h) => {
        const val = String(entry[h] ?? "");
        return `"${val.replace(/"/g, '""')}"`;
      });
      csvRows.push(row.join(","));
    }

    const csv = csvRows.join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="ditch-quiz-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (err) {
    console.error("GET /api/entries/export error:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
