"use client";

import { useRef } from "react";
import { useIntersectionObserver } from "hooks/useIntersectionObserver";
import { useIsMobile } from "hooks/useIsMobile";
import Image from "next/image";

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const visionRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  const isMobile = useIsMobile();

  const observerOptions = {
    threshold: 0.2,
    freezeOnceVisible: true,
  };

  const heroObserver = useIntersectionObserver(heroRef, observerOptions);
  const aboutObserver = useIntersectionObserver(aboutRef, observerOptions);
  const visionObserver = useIntersectionObserver(visionRef, observerOptions);
  const ctaObserver = useIntersectionObserver(ctaRef, observerOptions);

  const heroVisible = isMobile ? true : heroObserver.isIntersecting;
  const aboutVisible = isMobile ? true : aboutObserver.isIntersecting;
  const visionVisible = isMobile ? true : visionObserver.isIntersecting;
  const ctaVisible = isMobile ? true : ctaObserver.isIntersecting;

  const fadeUp = (visible: boolean, delay = 0) =>
    isMobile
      ? "opacity-100"
      : `transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } ${delay ? `delay-[${delay}ms]` : ""}`;

  return (
    <div className="bg-white min-h-screen text-[#16161D]">
      {/* HERO */}
      <section
        ref={heroRef}
        className={`${fadeUp(heroVisible)} max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center`}
      >
        <div>
          <h1 className="accent-line text-3xl md:text-6xl font-bold leading-tight mb-4">
            Your Best Friend to Help You Digitalize Your Business.
          </h1>

          <p className="leading-relaxed mb-8 text-sm">
            Digital Forte Indonesia hadir sebagai mitra terpercaya yang memahami
            bahwa setiap bisnis memiliki tantangannya sendiri.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section
        ref={aboutRef}
        className={`${fadeUp(aboutVisible)} py-16 md:py-24`}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 px-6 md:px-0">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-8">
              About us
            </h1>
          </div>

          <div>
            <p className="leading-relaxed text-sm">
              Digital Forte Indonesia hadir sebagai mitra terpercaya yang
              memahami bahwa setiap bisnis memiliki tantangannya sendiri. Kami
              bukan sekadar penyedia jasa, melainkan sahabat yang siap
              mendengarkan dan menyederhanakan teknologi menjadi solusi digital
              nyata.
            </p>
          </div>
        </div>
      </section>

      {/* VISION MISSION */}
      <section
        ref={visionRef}
        className={`${fadeUp(visionVisible)} py-16 md:py-24`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="flex justify-center">
            <Image
              src="/images/tech1.jpg"
              alt="Vision and Mission"
              width={800}
              height={600}
              className="w-full max-w-md md:max-w-xl"
            />
          </div>

          <div className="space-y-10 md:space-y-16 flex flex-col items-center text-center">
            <div className="flex flex-col items-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Our Vision
              </h1>
              <p className="text-sm leading-relaxed max-w-md">
                Menjadikan perusahaan IT yang Smart dan bermanfaat untuk alam
                semesta
              </p>
            </div>

            <div className="flex flex-col items-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Our Mission
              </h1>

              <ul className="text-sm space-y-2 max-w-md list-disc list-inside">
                <li>Mengikuti perkembangan teknologi</li>
                <li>Memberikan solusi teknologi ke semua kalangan</li>
                <li>Menjadi perusahaan IT modern</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className={`${fadeUp(ctaVisible)} py-16 md:py-24`}>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-16 px-4">
          Tingkatkan Efisiensi Kinerja
        </h1>

        <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="flex justify-center">
            <Image
              src="/images/tech2.jpg"
              alt="Call to Action"
              width={800}
              height={600}
              className="w-full max-w-md md:max-w-xl"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-center">
              — Digitalize Your Business —
            </h2>

            <div className="flex flex-col items-center text-center">
              <p className="text-lg font-semibold mb-6 max-w-md">
                Dengan semangat anak muda kami ingin mengembangkan teknologi
                informasi yang dapat dijangkau semua kalangan.
              </p>

              <button className="bg-[#AD1E23] text-white px-6 md:px-8 py-3 text-sm font-medium flex items-center gap-2 hover:bg-[#8d1519] transition-colors">
                Tanya sahabat digitalmu →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
