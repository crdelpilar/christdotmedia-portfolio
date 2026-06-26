import Link from "next/link";
import Image from "next/image";

interface CategoryCardProps {
  href: string;
  label: string;
  thumbnail?: string;
  index?: number;
}

export default function CategoryCard({
  href,
  label,
  thumbnail,
  index = 0,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative block aspect-[4/5] overflow-hidden rounded-[6px] bg-cdm-black"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt={label}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover opacity-60 transition-all duration-500 group-hover:opacity-80 group-hover:scale-[1.05]"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-cdm-black to-cdm-gray-1 opacity-60" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-label text-cdm-gray-3 mb-1">Work</p>
        <p className="text-white font-semibold text-base leading-tight">
          {label}
        </p>
      </div>

      {/* Hover arrow */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        <span className="text-white text-xs">→</span>
      </div>
    </Link>
  );
}
