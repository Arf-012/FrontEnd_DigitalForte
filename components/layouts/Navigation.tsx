'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down
        setIsVisible(false)
      } else {
        // Scrolling up
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div className="relative">
      <input type="checkbox" id="nav-toggle" className="hidden peer" />
      
      <label htmlFor="nav-toggle" className="cursor-pointer block">
        <div 
          className={`h-16 bg-[#AD1E23] flex items-center justify-center fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
            isVisible ? 'translate-y-0' : '-translate-y-full'
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
      </label>

      {/* FULLSCREEN NAVBAR OVERLAY */}
      <div className="hidden peer-checked:flex fixed inset-0 z-50">
        <label 
          htmlFor="nav-toggle"
          className="absolute top-8 right-8 w-12 h-12 bg-white text-[#AD1E23] flex items-center justify-center text-2xl font-light hover:bg-gray-100 transition-colors cursor-pointer z-10"
        >
          ×
        </label>

        {/* Grid of navigation items with background images */}
        <div className="w-full h-full grid grid-rows-2">
          {/* Top section - Home */}
          <Link 
            href="/" 
            className="relative flex items-center justify-center overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[#AD1E23] mix-blend-multiply z-[1]"></div>
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200" 
              alt="Home"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <span className="relative z-[2] text-white text-6xl font-bold group-hover:text-gray-200 transition-colors">
              Home
            </span>
          </Link>

          {/* Bottom section - 3 columns */}
          <div className="grid grid-cols-3">
            {/* Certificates */}
            <Link 
              href="/certificates" 
              className="relative flex items-center justify-center overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[#AD1E23] mix-blend-multiply z-[1]"></div>
              <img 
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800" 
                alt="Certificates"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="relative z-[2] text-white text-6xl font-bold group-hover:text-gray-200 transition-colors">
                Certificates
              </span>
            </Link>

            {/* Portfolio */}
            <Link 
              href="/portfolio" 
              className="relative flex items-center justify-center overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[#AD1E23] mix-blend-multiply z-[1]"></div>
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800" 
                alt="Portfolio"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="relative z-[2] text-white text-6xl font-bold group-hover:text-gray-200 transition-colors">
                Portfolio
              </span>
            </Link>

            {/* About Us */}
            <Link 
              href="/about" 
              className="relative flex items-center justify-center overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[#AD1E23] mix-blend-multiply z-[1]"></div>
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800" 
                alt="About Us"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="relative z-[2] text-white text-6xl font-bold group-hover:text-gray-200 transition-colors">
                About Us
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}