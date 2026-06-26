import Link from "next/link";

const CATEGORY_LINKS = [
  { href: "/photography", label: "Photography" },
  { href: "/graphic-design", label: "Graphic Design" },
  { href: "/motion-design", label: "Motion Design" },
  { href: "/film", label: "Film" },
  { href: "/marketing", label: "Marketing" },
];

const PAGE_LINKS = [
  { href: "/", label: "Home" },
  { href: "/case-study", label: "Case Study" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

interface FooterProps {
  email?: string;
  linkedin?: string;
  instagram?: string;
}

export default function Footer({
  email = "hello@chrisdotmedia.com",
  linkedin = "#",
  instagram = "#",
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cdm-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Large logotype */}
        <p className="text-display font-extrabold leading-none mb-16 opacity-10 select-none pointer-events-none">
          cdm
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16 border-t border-white/10 pt-10">
          {/* Navigate */}
          <div>
            <p className="text-label text-cdm-gray-3 mb-4">Navigate</p>
            <ul className="space-y-2">
              {CATEGORY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cdm-gray-2 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <p className="text-label text-cdm-gray-3 mb-4">Pages</p>
            <ul className="space-y-2">
              {PAGE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cdm-gray-2 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-label text-cdm-gray-3 mb-4">Contact</p>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="text-sm text-cdm-gray-2 hover:text-white transition-colors break-all"
                >
                  {email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-label text-cdm-gray-3 mb-4">Social</p>
            <ul className="space-y-2">
              {instagram && instagram !== "#" && (
                <li>
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-cdm-gray-2 hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
              )}
              {linkedin && linkedin !== "#" && (
                <li>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-cdm-gray-2 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Copyright — hidden admin access */}
        <div className="border-t border-white/10 pt-6 flex items-center justify-between">
          <Link
            href="/admin"
            className="text-xs text-cdm-gray-3 hover:text-white transition-colors"
            title="Admin"
          >
            © {year} chrisdotmedia. All rights reserved.
          </Link>
          <p className="text-xs text-cdm-gray-3">
            Christian Del Pilar
          </p>
        </div>
      </div>
    </footer>
  );
}
