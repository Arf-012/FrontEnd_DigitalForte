'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ImageTiles() {
  const pathname = usePathname();

  const tiles = [
    {
      title: "Products",
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
      href: "/product",
    },
    {
      title: "Portfolio",
      img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
      href: "/portfolio",
    },
    {
      title: "About Us",
      img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
      href: "/about",
    },
  ];

  const homeImg = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800";

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3">
        {tiles.map((item, i) => {
          // If current page matches the tile's href, link to home instead
          const isCurrentPage = pathname === item.href;
          const linkHref = isCurrentPage ? "/" : item.href;
          const displayTitle = isCurrentPage ? "Home" : item.title;
          const displayImg = isCurrentPage ? homeImg : item.img;

          return (
            <Link
              key={i}
              href={linkHref}
              className="relative h-96 overflow-hidden group cursor-pointer block"
            >
              <img
                src={displayImg}
                alt={displayTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#AD1E23] mix-blend-multiply group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute inset-0 flex flex-col justify-between p-8 z-[1]">
                <h3 className="text-white text-3xl font-semibold">
                  {displayTitle}
                </h3>
                <div className="flex justify-end">
                  <span className="text-white text-2xl">→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}