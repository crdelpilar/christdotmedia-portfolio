import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://chrisdotmedia.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/photography",
    "/graphic-design",
    "/motion-design",
    "/film",
    "/marketing",
    "/case-study",
    "/about",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));
}
