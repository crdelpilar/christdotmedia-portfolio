// ── App-level types (used in components/pages) ───────────────────────────────

export type Category = "photo" | "graphic" | "motion" | "film" | "marketing";
export type MediaType = "image" | "youtube" | "vimeo" | "mp4" | "local_video";

export interface PortfolioItem {
  id: string;
  category: Category;
  title: string;
  media_type: MediaType;
  url: string;
  poster_url: string | null;
  display_order: number;
  visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: number;
  hero_line_1: string;
  hero_line_2: string;
  hero_line_3: string;
  hero_lede: string;
  about_lede: string;
  about_p1: string;
  about_p2: string;
  email: string;
  linkedin: string;
  instagram: string;
  updated_at: string;
}

// ── Supabase Database type ───────────────────────────────────────────────────
// Mirrors the Supabase auto-generated format so typed clients work correctly.

export type Database = {
  public: {
    Tables: {
      portfolio_items: {
        Row: {
          id: string;
          category: string;
          title: string;
          media_type: string;
          url: string;
          poster_url: string | null;
          display_order: number;
          visible: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category: string;
          title?: string;
          media_type: string;
          url: string;
          poster_url?: string | null;
          display_order?: number;
          visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category?: string;
          title?: string;
          media_type?: string;
          url?: string;
          poster_url?: string | null;
          display_order?: number;
          visible?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          id: number;
          hero_line_1: string;
          hero_line_2: string;
          hero_line_3: string;
          hero_lede: string;
          about_lede: string;
          about_p1: string;
          about_p2: string;
          email: string;
          linkedin: string;
          instagram: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          hero_line_1?: string;
          hero_line_2?: string;
          hero_line_3?: string;
          hero_lede?: string;
          about_lede?: string;
          about_p1?: string;
          about_p2?: string;
          email?: string;
          linkedin?: string;
          instagram?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          hero_line_1?: string;
          hero_line_2?: string;
          hero_line_3?: string;
          hero_lede?: string;
          about_lede?: string;
          about_p1?: string;
          about_p2?: string;
          email?: string;
          linkedin?: string;
          instagram?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

// Helper: cast the untyped Supabase row to our strict app types
export function toPortfolioItem(
  row: Database["public"]["Tables"]["portfolio_items"]["Row"]
): PortfolioItem {
  return row as unknown as PortfolioItem;
}

export function toSiteSettings(
  row: Database["public"]["Tables"]["site_settings"]["Row"]
): SiteSettings {
  return row as unknown as SiteSettings;
}
