"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down
        setIsVisible(false);
        setIsMobileNavOpen(false);
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
      title: "About",
      href: "/about",
      img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
    },
    {
      title: "Portfolio",
      href: "/portfolio",
      img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    },
    {
      title: "Products",
      href: "/product",
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
    },
  ];

  const currentItem = navItems.find(item => item.href === pathname) || navItems[0];
  const displayItem = hoveredItem 
    ? navItems.find(item => item.href === hoveredItem) 
    : currentItem;

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav
        className={`hidden md:flex h-16 bg-[#AD1E23] items-center justify-center fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/" className="relative w-10 h-10 hover:scale-110 transition-transform px-15">
            <Image
              src="/dfiv2.png"
              alt="Digital Forte Indonesia"
              fill
              className="object-contain"
            />
          </Link>

          {/* Navigation Links */}
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-6 h-16 flex items-center text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white text-black"
                    : "text-white hover:bg-white hover:text-black"
                }`}
              >
                {item.title}
                {/* Active indicator - red line jutting out from bottom */}
                {isActive && (
                  <div className="absolute -bottom-1 left-0 right-0 h-1 bg-[#AD1E23]"></div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* MOBILE NAVBAR */}
      <div
        className="md:hidden relative"
        onMouseEnter={() => setIsMobileNavOpen(true)}
        onMouseLeave={() => {
          setIsMobileNavOpen(false);
          setHoveredItem(null);
        }}
      >
        <div
          className={`h-16 bg-[#AD1E23] flex items-center justify-center fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
            isVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="relative w-10 h-10 hover:scale-110 transition-transform">
            <Image
              src="/dfi.png"
              alt="Digital Forte Indonesia"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        <div
          className={`fixed top-16 left-0 right-0 z-30 bg-white shadow-lg transition-all duration-300 ${
            isMobileNavOpen && isVisible
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
    </>
  );
}