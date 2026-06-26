import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import CategoryCard from "@/components/CategoryCard";
import { createClient } from "@/lib/supabase/server";
import { CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "chrisdotmedia — Media & Marketing by Christian Del Pilar",
  description:
    "Photography, graphic design, motion design, film, and marketing — portfolio of Christian Del Pilar, Florida.",
};

export const revalidate = 60;

const DISCIPLINES = [
  "Photography",
  "Motion Design",
  "Film",
  "Graphic Design",
  "Marketing",
  "Photography",
  "Motion Design",
  "Film",
  "Graphic Design",
  "Marketing",
];

export default async function HomePage() {
  const supabase = await createClient();

  // Fetch site settings
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .single();

  // Fetch one visible thumbnail per category for the cards
  const thumbnailMap: Record<string, string | undefined> = {};
  await Promise.all(
    CATEGORIES.map(async (cat) => {
      const { data } = await supabase
        .from("portfolio_items")
        .select("url, poster_url, media_type")
        .eq("category", cat.slug)
        .eq("visible", true)
        .order("display_order", { ascending: true })
        .limit(1)
        .single();
      if (data) {
        thumbnailMap[cat.slug] =
          data.media_type === "youtube"
            ? `https://img.youtube.com/vi/${data.url.match(/(?:v=|youtu\.be\/)([^&?/\s]+)/)?.[1]}/hqdefault.jpg`
            : data.poster_url ?? data.url;
      }
    })
  );

  const heroLine1 = settings?.hero_line_1 ?? "Christian";
  const heroLine2 = settings?.hero_line_2 ?? "Del Pilar";
  const heroLine3 = settings?.hero_line_3 ?? "media & marketing.";
  const heroLede =
    settings?.hero_lede ??
    "Photographer. Motion designer. Marketer. Based in Florida.";

  return (
    <>
      <Nav />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative min-h-screen bg-cdm-black flex flex-col justify-end pb-20 px-6 overflow-hidden">
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(245,166,35,0.08), transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* Status indicator */}
          <div className="flex items-center gap-2 mb-8">
            <span
              className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
              aria-hidden="true"
            />
            <span className="text-label text-cdm-gray-3">
              Available for work
            </span>
          </div>

          {/* Title */}
          <h1 className="text-display text-white mb-6 leading-none">
            <span className="block">{heroLine1}</span>
            <span className="block">{heroLine2}</span>
            <span className="block gradient-text">{heroLine3}</span>
          </h1>

          {/* Lede + CTAs */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-8 mt-6">
            <p className="text-cdm-gray-2 text-base max-w-sm leading-relaxed flex-1">
              {heroLede}
            </p>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/photography" className="btn-primary">
                See the work
              </Link>
              <Link href="/case-study" className="btn-ghost text-white">
                Case study
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Discipline marquee ───────────────────────── */}
      <div className="bg-cdm-off-white py-5 overflow-hidden border-y border-cdm-rule">
        <div
          className="flex gap-10 whitespace-nowrap"
          style={{
            animation: "marquee 25s linear infinite",
          }}
          aria-hidden="true"
        >
          {[...DISCIPLINES, ...DISCIPLINES].map((d, i) => (
            <span key={i} className="text-label text-cdm-gray-2 flex-shrink-0">
              {d}
              <span className="mx-4 text-cdm-gray-3">·</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* ── Category cards ───────────────────────────── */}
      <section className="bg-cdm-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-label text-cdm-gray-3 mb-2">01 — Work</p>
            <h2 className="text-section-title text-cdm-black">
              Five disciplines.
              <br />
              <span className="gradient-text">One vision.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat, i) => (
              <CategoryCard
                key={cat.slug}
                href={cat.href}
                label={cat.label}
                thumbnail={thumbnailMap[cat.slug]}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Case study teaser ────────────────────────── */}
      <section className="bg-cdm-off-white py-24 px-6 border-t border-cdm-rule">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center gap-12">
          <div className="flex-1">
            <p className="text-label text-cdm-gray-3 mb-3">
              02 — Case Study
            </p>
            <h2 className="text-section-title text-cdm-black mb-5">
              charity: water
            </h2>
            <p className="text-cdm-gray-1 text-base leading-relaxed max-w-lg mb-8">
              A spec campaign exploring how storytelling and design can drive
              real-world impact for one of the world&apos;s most trusted
              non-profits.
            </p>
            <Link href="/case-study" className="btn-primary">
              Read the case study
            </Link>
          </div>

          <div className="flex-1 aspect-video bg-cdm-black rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cdm-black via-cdm-gray-1 to-cdm-black opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-label text-cdm-gray-3">
                Case Study — charity: water
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────── */}
      <ContactSection email={settings?.email} />

      <Footer
        email={settings?.email}
        linkedin={settings?.linkedin ?? undefined}
        instagram={settings?.instagram ?? undefined}
      />
    </>
  );
}
