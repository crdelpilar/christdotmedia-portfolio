import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Graphic Design",
  description: "Graphic design portfolio of Christian Del Pilar.",
};

export const revalidate = 60;

export default async function GraphicDesignPage() {
  const supabase = await createClient();
  const [{ data: items }, { data: settings }] = await Promise.all([
    supabase
      .from("portfolio_items")
      .select("*")
      .eq("category", "graphic")
      .eq("visible", true)
      .order("display_order", { ascending: true }),
    supabase.from("site_settings").select("email, linkedin, instagram").single(),
  ]);

  return (
    <CategoryPage
      title="Graphic Design"
      description="Visual identities, layouts, and print work built around ideas."
      items={items ?? []}
      email={settings?.email}
      linkedin={settings?.linkedin ?? undefined}
      instagram={settings?.instagram ?? undefined}
    />
  );
}
