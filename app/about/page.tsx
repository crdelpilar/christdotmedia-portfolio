import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Christian Del Pilar — photographer, motion designer, and marketer based in Florida.",
};

export const revalidate = 3600;

const SERVICES = [
  {
    title: "Photography",
    description:
      "Portrait, commercial, and event photography with a documentary eye.",
  },
  {
    title: "Motion Design",
    description:
      "Logo animations, social content, and title sequences that move with purpose.",
  },
  {
    title: "Graphic Design",
    description:
      "Brand identities, print collateral, and digital assets with lasting clarity.",
  },
  {
    title: "Marketing",
    description:
      "Campaign strategy, content creation, and performance-driven storytelling.",
  },
];

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .single();

  const lede =
    settings?.about_lede ??
    "I help brands and people communicate clearly through visual media.";
  const p1 =
    settings?.about_p1 ??
    "I'm Christian Del Pilar — a media designer and marketer based in Florida. My work spans photography, motion, graphic design, and marketing strategy, united by a belief that clarity is the highest form of creativity.";
  const p2 =
    settings?.about_p2 ??
    "I'm available for freelance projects, brand partnerships, and long-term collaborations. If you have a story worth telling, I'd like to help you tell it.";

  return (
    <>
      <Nav />

      <main className="flex-1 bg-cdm-white pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20">
            {/* Portrait — sticky on desktop */}
            <div className="lg:w-72 flex-shrink-0">
              <div className="lg:sticky lg:top-28">
                <div className="aspect-[3/4] bg-cdm-off-white rounded-xl overflow-hidden relative">
                  <Image
                    src="/images/Screenshot 2024-11-17 140707.png"
                    alt="Christian Del Pilar"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 288px"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="flex-1 max-w-2xl">
              <p className="text-label text-cdm-gray-3 mb-4">About</p>
              <h1 className="text-section-title text-cdm-black mb-8 leading-tight">
                Christian
                <br />
                <span className="gradient-text">Del Pilar</span>
              </h1>

              <p className="text-xl font-light text-cdm-gray-1 leading-relaxed mb-6">
                {lede}
              </p>
              <p className="text-base text-cdm-gray-1 leading-relaxed mb-4">
                {p1}
              </p>
              <p className="text-base text-cdm-gray-1 leading-relaxed mb-16">
                {p2}
              </p>

              {/* Services grid */}
              <div className="border-t border-cdm-rule pt-10">
                <p className="text-label text-cdm-gray-3 mb-6">Services</p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {SERVICES.map((s) => (
                    <div key={s.title}>
                      <h3 className="font-bold text-cdm-black mb-1">
                        {s.title}
                      </h3>
                      <p className="text-sm text-cdm-gray-2 leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
