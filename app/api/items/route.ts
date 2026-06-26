import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import type { Category } from "@/lib/types";

const VALID_CATEGORIES: Category[] = [
  "photo",
  "graphic",
  "motion",
  "film",
  "marketing",
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") as Category | null;
  const all = searchParams.get("all") === "true";

  const supabase = all ? await createAdminClient() : await createClient();

  let query = supabase
    .from("portfolio_items")
    .select("*")
    .order("display_order", { ascending: true });

  if (all) {
    // Verify auth for full list
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } else {
    query = query.eq("visible", true);
  }

  if (category && VALID_CATEGORIES.includes(category)) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = await createAdminClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { data, error } = await supabase
    .from("portfolio_items")
    .insert(body)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data, { status: 201 });
}
