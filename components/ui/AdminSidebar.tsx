"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  siteName?: string;
  siteSubtitle?: string;
  onLogout?: () => void;
}

const navItems = [{ label: "Portfolio", href: "/admin/portfolio" }];

export default function AdminSidebar({
  siteName = "digitalforte.id",
  siteSubtitle = "Admin Panel",
  onLogout,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col bg-white min-h-screen w-56 border-r border-gray-100">
      {/* Brand */}
      <div className="px-5 py-6 bg-linear-to-r from-red-900 to-red-600">
        <p className="text-2xl font-bold text-white leading-tight">
          {siteName}
        </p>
        <p className="text-xs text-white mt-0.5 italic">{siteSubtitle}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2">
        <ul>
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <li
                key={item.href}
                className={`relative after:absolute after:bottom-0 after:left-5 after:h-0.5 after:bg-[#8B1A1A] after:transition-[width] after:duration-300 after:ease-in-out ${
                  isActive
                    ? "after:w-[40%] after:bg-red-600 hover:after:w-[80%]"
                    : "after:w-[40%] after:bg-[#8B1A1A] hover:after:w-[80%] hover:after:bg-red-600"
                }`}
              >
                <Link
                  href={item.href}
                  className={`flex items-center justify-between text-lg px-5 py-3 font-semibold transition-colors ${
                    isActive
                      ? "text-[#8B1A1A]"
                      : "text-[#8B1A1A] hover:text-red-600"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <svg
                      className="w-4 h-4 text-[#8B1A1A]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-3">
        <button
          onClick={onLogout}
          className="flex items-center justify-between w-full px-4 py-3 bg-[#8B1A1A] text-white text-sm font-medium hover:bg-red-800 transition-colors"
        >
          <span className="leading-tight">
            Log Out &amp;
            <br />
            <span className="text-xs text-red-300 font-normal">
              Return to Site
            </span>
          </span>
          <svg
            className="w-4 h-4 text-red-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </button>
      </div>
    </aside>
  );
}
