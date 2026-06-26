"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/case-study", label: "Case Study" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Pages with dark hero backgrounds (logo/links start white)
  const darkHeroPages = [
    "/",
    "/photography",
    "/graphic-design",
    "/motion-design",
    "/film",
    "/marketing",
    "/case-study",
  ];
  const isDarkHero = darkHeroPages.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor =
    isDarkHero && !scrolled ? "text-white" : "text-cdm-black";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`font-mono text-sm font-medium tracking-widest uppercase transition-colors duration-300 ${textColor}`}
        >
          chrisdotmedia
        </Link>

        {/* Desktop links — hidden below 900px */}
        <div className="hidden min-[900px]:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 hover:opacity-70 ${textColor}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA — always visible */}
        <Link
          href="/contact"
          className="btn-primary text-xs px-4 py-2"
          style={{ fontSize: "0.8rem" }}
        >
          Get in touch
        </Link>
      </div>
    </nav>
  );
}
