import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | chrisdotmedia",
    default: "chrisdotmedia — Media & Marketing by Christian Del Pilar",
  },
  description:
    "Portfolio of Christian Del Pilar — photographer, motion designer, and marketer based in Florida.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://chrisdotmedia.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "chrisdotmedia",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="font-sans antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
