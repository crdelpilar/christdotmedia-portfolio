import type { Category } from "./types";

export const CATEGORIES: {
  slug: Category;
  label: string;
  href: string;
  supportsVideo: boolean;
}[] = [
  { slug: "photo",     label: "Photography",   href: "/photography",   supportsVideo: false },
  { slug: "graphic",   label: "Graphic Design", href: "/graphic-design", supportsVideo: false },
  { slug: "motion",    label: "Motion Design",  href: "/motion-design",  supportsVideo: true  },
  { slug: "film",      label: "Film",           href: "/film",           supportsVideo: true  },
  { slug: "marketing", label: "Marketing",      href: "/marketing",      supportsVideo: true  },
];

export const CATEGORY_MAP: Record<Category, (typeof CATEGORIES)[number]> =
  Object.fromEntries(CATEGORIES.map((c) => [c.slug, c])) as Record<
    Category,
    (typeof CATEGORIES)[number]
  >;
