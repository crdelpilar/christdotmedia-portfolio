"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AdminItemGrid from "@/components/AdminItemGrid";
import AdminModal from "@/components/AdminModal";
import type { PortfolioItem, Category, SiteSettings } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";

type Tab = Category | "settings";

export default function AdminDashboard() {
  const router = useRouter();
  const supabase = createClient();

  const [activeTab, setActiveTab] = useState<Tab>("photo");
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const currentCategory = CATEGORIES.find((c) => c.slug === activeTab);

  const fetchItems = useCallback(async () => {
    if (activeTab === "settings") return;
    setLoading(true);
    const { data } = await supabase
      .from("portfolio_items")
      .select("*")
      .eq("category", activeTab)
      .order("display_order", { ascending: true });
    setItems(data ?? []);
    setLoading(false);
  }, [activeTab, supabase]);

  const fetchSettings = useCallback(async () => {
    const { data } = await supabase.from("site_settings").select("*").single();
    setSettings(data);
  }, [supabase]);

  useEffect(() => {
    if (activeTab === "settings") {
      fetchSettings();
      setLoading(false);
    } else {
      fetchItems();
    }
  }, [activeTab, fetchItems, fetchSettings]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const handleReorder = async (reordered: PortfolioItem[]) => {
    setItems(reordered);
    const updates = reordered.map((item, index) => ({
      id: item.id,
      display_order: index,
    }));
    await fetch("/api/items/reorder", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updates }),
    });
  };

  const handleSaveItem = async (data: Partial<PortfolioItem>) => {
    if (editingItem?.id) {
      await fetch(`/api/items/${editingItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, display_order: items.length }),
      });
    }
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/items/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleToggleVisible = async (id: string, visible: boolean) => {
    await fetch(`/api/items/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible }),
    });
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, visible } : i))
    );
  };

  const handleSaveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!settings) return;
    await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
  };

  const TABS: { id: Tab; label: string }[] = [
    ...CATEGORIES.map((c) => ({ id: c.slug as Tab, label: c.label })),
    { id: "settings", label: "Site Settings" },
  ];

  return (
    <div className="min-h-screen bg-cdm-off-white">
      {/* Top bar */}
      <header className="bg-cdm-black text-white px-6 h-14 flex items-center justify-between sticky top-0 z-50">
        <p className="text-label tracking-widest">chrisdotmedia / admin</p>
        <button
          onClick={handleLogout}
          className="text-label text-cdm-gray-3 hover:text-white transition-colors"
        >
          Sign out
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white rounded-xl p-2 shadow-sm">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-cdm-black text-white"
                  : "text-cdm-gray-2 hover:text-cdm-black hover:bg-cdm-off-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings tab */}
        {activeTab === "settings" && settings && (
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="font-bold text-cdm-black text-lg mb-6">
              Site Settings
            </h2>
            <form onSubmit={handleSaveSettings} className="space-y-5 max-w-lg">
              {(
                [
                  ["hero_line_1", "Hero Line 1"],
                  ["hero_line_2", "Hero Line 2"],
                  ["hero_line_3", "Hero Line 3 (gradient)"],
                  ["hero_lede", "Hero Lede"],
                  ["about_lede", "About Lede"],
                  ["about_p1", "About Paragraph 1"],
                  ["about_p2", "About Paragraph 2"],
                  ["email", "Email"],
                  ["linkedin", "LinkedIn URL"],
                  ["instagram", "Instagram URL"],
                ] as [keyof SiteSettings, string][]
              ).map(([field, label]) => (
                <div key={field}>
                  <label className="text-label text-cdm-gray-2 block mb-1">
                    {label}
                  </label>
                  {["about_p1", "about_p2", "hero_lede", "about_lede"].includes(
                    field
                  ) ? (
                    <textarea
                      value={(settings[field] as string) ?? ""}
                      onChange={(e) =>
                        setSettings((prev) =>
                          prev ? { ...prev, [field]: e.target.value } : prev
                        )
                      }
                      rows={3}
                      className="w-full border border-cdm-rule rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cdm-orange/40 resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={(settings[field] as string) ?? ""}
                      onChange={(e) =>
                        setSettings((prev) =>
                          prev ? { ...prev, [field]: e.target.value } : prev
                        )
                      }
                      className="w-full border border-cdm-rule rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cdm-orange/40"
                    />
                  )}
                </div>
              ))}
              <button type="submit" className="btn-primary">
                Save Settings
              </button>
            </form>
          </div>
        )}

        {/* Category tab */}
        {activeTab !== "settings" && (
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-bold text-cdm-black text-lg">
                  {currentCategory?.label}
                </h2>
                <p className="text-label text-cdm-gray-3 mt-0.5">
                  {items.length} items · drag to reorder
                </p>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="btn-primary py-2 px-4 text-xs"
              >
                + Add item
              </button>
            </div>

            {loading ? (
              <p className="text-label text-cdm-gray-3 py-10 text-center">
                Loading…
              </p>
            ) : items.length === 0 ? (
              <p className="text-label text-cdm-gray-3 py-10 text-center">
                No items yet. Add one above.
              </p>
            ) : (
              <AdminItemGrid
                items={items}
                onReorder={handleReorder}
                onEdit={(item) => setEditingItem(item)}
                onDelete={handleDelete}
                onToggleVisible={handleToggleVisible}
              />
            )}
          </div>
        )}
      </div>

      {/* Modal — undefined = closed, null = new item, PortfolioItem = edit */}
      {editingItem !== undefined && currentCategory && (
        <AdminModal
          item={editingItem}
          category={activeTab as Category}
          supportsVideo={currentCategory.supportsVideo}
          onSave={handleSaveItem}
          onClose={() => setEditingItem(undefined)}
        />
      )}
    </div>
  );
}
