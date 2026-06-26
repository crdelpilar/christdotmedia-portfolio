import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Christian Del Pilar.",
};

export const revalidate = 3600;

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("email, linkedin, instagram")
    .single();

  const email = settings?.email ?? "hello@chrisdotmedia.com";

  return (
    <>
      <Nav />

      <main className="flex-1 bg-cdm-white pt-28 pb-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-label text-cdm-gray-3 mb-4">Contact</p>
          <h1 className="text-section-title text-cdm-black mb-6 leading-tight">
            Let&apos;s make
            <br />
            <span className="gradient-text">something great.</span>
          </h1>
          <p className="text-cdm-gray-1 text-base leading-relaxed mb-10 max-w-sm mx-auto">
            Tell me about your project — I&apos;ll get back to you within 24
            hours.
          </p>

          {/* Email CTA */}
          <a
            href={`mailto:${email}`}
            className="btn-primary text-base px-8 py-4 mb-12 inline-flex"
          >
            {email}
          </a>

          {/* Social links */}
          <div className="border-t border-cdm-rule pt-10 flex justify-center gap-8">
            {settings?.instagram && settings.instagram !== "#" && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-label text-cdm-gray-2 hover:text-cdm-black transition-colors"
              >
                Instagram
              </a>
            )}
            {settings?.linkedin && settings.linkedin !== "#" && (
              <a
                href={settings.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-label text-cdm-gray-2 hover:text-cdm-black transition-colors"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </main>

      <Footer
        email={settings?.email}
        linkedin={settings?.linkedin ?? undefined}
        instagram={settings?.instagram ?? undefined}
      />
    </>
  );
}
