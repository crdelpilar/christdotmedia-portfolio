import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WorkGrid from "@/components/WorkGrid";
import type { PortfolioItem } from "@/lib/types";

interface CategoryPageProps {
  title: string;
  description?: string;
  items: PortfolioItem[];
  email?: string;
  linkedin?: string;
  instagram?: string;
}

export default function CategoryPage({
  title,
  description,
  items,
  email,
  linkedin,
  instagram,
}: CategoryPageProps) {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="relative bg-cdm-black pt-40 pb-20 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(245,166,35,0.06), transparent)",
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-label text-cdm-gray-3 mb-4">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
          <h1 className="text-section-title text-white mb-4">{title}</h1>
          {description && (
            <p className="text-cdm-gray-2 max-w-xl text-base leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </section>

      {/* Grid */}
      <main className="flex-1 bg-cdm-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {items.length === 0 ? (
            <p className="text-cdm-gray-3 text-center py-20 text-label">
              No items yet — check back soon.
            </p>
          ) : (
            <WorkGrid items={items} />
          )}
        </div>
      </main>

      <Footer email={email} linkedin={linkedin} instagram={instagram} />
    </>
  );
}
