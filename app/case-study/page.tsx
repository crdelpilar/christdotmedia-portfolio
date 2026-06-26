import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Case Study — charity: water",
  description:
    "A spec campaign exploring how storytelling and design can drive real-world impact for charity: water.",
};

export const revalidate = 3600;

export default async function CaseStudyPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("email, linkedin, instagram")
    .single();

  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="relative bg-cdm-black pt-40 pb-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 50% at 60% 50%, rgba(245,166,35,0.07), transparent)",
          }}
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6">
            <span className="text-label text-cdm-gray-3">Spec Project</span>
          </div>
          <h1 className="text-section-title text-white mb-6 leading-tight">
            charity: water
            <br />
            <span className="gradient-text">Campaign Concept</span>
          </h1>
          <div className="aspect-video bg-cdm-black/50 rounded-xl border border-white/10 flex items-center justify-center mt-10">
            <span className="text-label text-cdm-gray-3">
              Cover image — add to public/images/
            </span>
          </div>
        </div>
      </section>

      {/* Meta strip */}
      <section className="bg-cdm-off-white border-y border-cdm-rule py-8 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-5 gap-6">
          {[
            { label: "Client", value: "charity: water (spec)" },
            { label: "Role", value: "Art Director / Designer" },
            { label: "Year", value: "2024" },
            { label: "Deliverables", value: "Campaign, Print, Digital" },
            { label: "Tools", value: "Figma, After Effects, Photoshop" },
          ].map((m) => (
            <div key={m.label}>
              <p className="text-label text-cdm-gray-3 mb-1">{m.label}</p>
              <p className="text-cdm-black text-sm font-medium">{m.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Body */}
      <main className="py-20 px-6 bg-cdm-white">
        <div className="max-w-4xl mx-auto">
          {/* Brief + Approach */}
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            <div>
              <p className="text-label text-cdm-gray-3 mb-3">The Brief</p>
              <h2 className="text-2xl font-bold text-cdm-black mb-4 leading-snug">
                Raise awareness without raising cynicism.
              </h2>
              <p className="text-cdm-gray-1 leading-relaxed text-base">
                charity: water has one of the most compelling missions in the
                non-profit world. The challenge was to create a campaign that
                felt human — not guilt-driven — and trusted the audience to
                care if given the right story.
              </p>
            </div>
            <div>
              <p className="text-label text-cdm-gray-3 mb-3">Approach</p>
              <h2 className="text-2xl font-bold text-cdm-black mb-4 leading-snug">
                Lead with faces. Close with facts.
              </h2>
              <p className="text-cdm-gray-1 leading-relaxed text-base">
                Rather than opening with statistics, the campaign leads with
                portraits and personal narratives — then contextualizes impact
                through clean data visualizations. Emotion first, proof second.
              </p>
            </div>
          </div>

          {/* Pull quote */}
          <blockquote className="border-l-4 border-cdm-orange pl-8 py-4 my-20">
            <p
              className="font-extrabold leading-tight gradient-text"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
            >
              &ldquo;Clean water changes everything.&rdquo;
            </p>
            <cite className="text-label text-cdm-gray-3 not-italic mt-3 block">
              — Campaign tagline concept
            </cite>
          </blockquote>

          {/* Placeholder for additional case study assets */}
          <div className="grid md:grid-cols-2 gap-6 my-16">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="aspect-[4/3] bg-cdm-off-white rounded-xl border border-cdm-rule flex items-center justify-center"
              >
                <span className="text-label text-cdm-gray-3">
                  Asset {n} — add to public/images/
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <ContactSection email={settings?.email} />
      <Footer
        email={settings?.email}
        linkedin={settings?.linkedin ?? undefined}
        instagram={settings?.instagram ?? undefined}
      />
    </>
  );
}
