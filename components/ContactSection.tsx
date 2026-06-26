import Link from "next/link";

interface ContactSectionProps {
  email?: string;
}

export default function ContactSection({
  email = "hello@chrisdotmedia.com",
}: ContactSectionProps) {
  return (
    <section className="bg-cdm-black py-28 px-6 text-white text-center">
      <p className="text-label text-cdm-gray-3 mb-4">Let&apos;s Work Together</p>
      <h2 className="text-section-title mb-6">
        Got a project?
        <br />
        <span className="gradient-text">Let&apos;s talk.</span>
      </h2>
      <p className="text-cdm-gray-2 max-w-md mx-auto mb-10 text-base leading-relaxed">
        Whether you need photography, motion design, or a full campaign —
        I&apos;d love to hear about it.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/contact" className="btn-primary">
          Get in touch
        </Link>
        <a href={`mailto:${email}`} className="btn-ghost text-white">
          {email}
        </a>
      </div>
    </section>
  );
}
