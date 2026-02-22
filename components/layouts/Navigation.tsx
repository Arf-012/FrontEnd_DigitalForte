"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down
        setIsVisible(false);
        setIsNavOpen(false); // Close nav when scrolling down
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    {
      title: "Home",
      href: "/",
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    },
    {
      title: "About Us",
      href: "/about",
      img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
    },
    {
      title: "Portfolio",
      href: "/portfolio",
      img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    },
    {
      title: "Certificates",
      href: "/certificates",
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
    },
  ];

  // Get current page item
  const currentItem = navItems.find(item => item.href === pathname) || navItems[0];
  
  // Get display image - show hovered item's image, or current page's image
  const displayItem = hoveredItem 
    ? navItems.find(item => item.href === hoveredItem) 
    : currentItem;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsNavOpen(true)}
      onMouseLeave={() => {
        setIsNavOpen(false);
        setHoveredItem(null);
      }}
    >
      <div
        className={`h-16 bg-[#AD1E23] flex items-center justify-center fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="relative w-100 h-10 hover:scale-110 transition-transform">
          <Image
            src="/dfiv2.png"
            alt="Digital Forte Indonesia"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* DROPDOWN MENU */}
      <div
        className={`fixed top-16 left-0 right-0 z-30 bg-white shadow-lg transition-all duration-300 ${
          isNavOpen && isVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="max-w-5xl mx-auto px-8 py-8 grid grid-cols-2 gap-8">
          {/* Left side - Navigation Links */}
          <div className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`text-2xl font-semibold text-gray-800 hover:text-[#AD1E23] transition-colors pb-2 border-b-2 ${
                    isActive
                      ? "border-[#AD1E23] text-[#AD1E23]"
                      : "border-transparent"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          {/* Right side - Single Image Display */}
          <div className="h-64 relative overflow-hidden">
            {displayItem && (
              <div className="absolute inset-0">
                <img
                  src={displayItem.img}
                  alt={displayItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#AD1E23] mix-blend-multiply z-[1]"></div>
                <div className="absolute inset-0 flex items-center justify-center z-[2]">
                  <span className="text-white text-3xl font-bold">
                    {displayItem.title}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}