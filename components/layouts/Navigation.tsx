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
        setIsVisible(false);
        setIsMobileNavOpen(false);
      } else {
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
      img: "Home.webp",
    },
    {
      title: "About",
      href: "/about",
      img: "About.webp",
    },
    {
      title: "Portfolio",
      href: "/portfolio",
      img: "Portfolio.webp",
    },
    {
      title: "Services",
      href: "/product",
      img: "Products.webp",
    },
  ];

  const currentItem = navItems.find((item) => item.href === pathname) || navItems[0];
  const displayItem = hoveredItem
    ? navItems.find((item) => item.href === hoveredItem)
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
          <Link
            href="/"
            className="relative w-10 h-10 hover:scale-110 transition-transform px-20"
          >
            <Image
              src="/dfiv2.png"
              alt="Digital Forte Indonesia"
              fill
              className="object-contain"
            />
          </Link>

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

                {isActive && (
                  <div className="absolute -bottom-1 left-0 right-0 h-1 bg-[#AD1E23]" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* MOBILE NAVBAR */}
      <div className="md:hidden">
        <div
          className={`h-16 bg-[#AD1E23] flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
            isVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <Link href="/" className="relative w-28 h-8">
            <Image
              src="/dfiv2.png"
              alt="Digital Forte Indonesia"
              fill
              className="object-contain"
            />
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="text-white p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileNavOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`fixed top-16 left-0 right-0 bg-white z-30 transition-all duration-300 ${
            isMobileNavOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="px-6 py-6 flex flex-col gap-6">
            {/* LINKS */}
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileNavOpen(false)}
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`text-xl font-semibold pb-2 border-b transition-colors ${
                      isActive
                        ? "text-[#AD1E23] border-[#AD1E23]"
                        : "text-gray-800 border-gray-200"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>

            {/* IMAGE PREVIEW */}
            <div className="relative h-40 w-full overflow-hidden rounded-lg">
              {displayItem && (
                <>
                  <img
                    src={displayItem.img}
                    alt={displayItem.title}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-[#AD1E23] mix-blend-multiply" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {displayItem.title}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}