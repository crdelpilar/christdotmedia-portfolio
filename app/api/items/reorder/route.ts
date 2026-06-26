import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function PATCH(request: NextRequest) {
  const supabase = await createAdminClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { updates } = (await request.json()) as {
    updates: { id: string; display_order: number }[];
  };

  const results = await Promise.all(
    updates.map(({ id, display_order }) =>
      supabase
        .from("portfolio_items")
        .update({ display_order, updated_at: new Date().toISOString() })
        .eq("id", id)
    )
  );

  const firstError = results.find((r) => r.error);
  if (firstError?.error) {
    return NextResponse.json(
      { error: firstError.error.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true });
}
