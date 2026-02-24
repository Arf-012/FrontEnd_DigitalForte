"use client";

import { useRef } from "react";
import { useIntersectionObserver } from "hooks/useIntersectionObserver";
import Image from "next/image";

export default function AboutPage() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isIntersecting } = useIntersectionObserver(ref);

  return (
    <div className="bg-white min-h-screen text-[#16161D]">
      <section
        ref={ref}
        className={`transition-all duration-700 ease-in-out ${isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-12 items-center`}
      >
        <div className="max-w-full">
          <h1 className="accent-line text-6xl font-bold leading-tight mb-4">
            Your Best Friend to Help You Digitalize Your Business.
          </h1>

          <p className="leading-relaxed mb-8 text-sm">
            Digital Forte Indonesia hadir sebagai mitra terpercaya yang memahami
            bahwa setiap bisnis memiliki tantangannya sendiri. Kami bukan
            sekadar penyedia jasa, melainkan sahabat yang siap mendengarkan dan
            menyederhanakan rumitnya teknologi menjadi solusi digital yang nyata
            demi kemajuan bisnis Anda.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="max-w-full grid md:grid-cols-2 items-start">
          <h1 className="text-6xl font-bold text-center mb-8">About us</h1>

          <p className="leading-relaxed mb-8 text-sm px-25">
            Digital Forte Indonesia hadir sebagai mitra terpercaya yang memahami
            bahwa setiap bisnis memiliki tantangannya sendiri. Kami bukan
            sekadar penyedia jasa, melainkan sahabat yang siap mendengarkan dan
            menyederhanakan rumitnya teknologi menjadi solusi digital yang nyata
            demi kemajuan bisnis Anda. Digital Forte Indonesia hadir sebagai
            mitra terpercaya yang memahami bahwa setiap bisnis memiliki
            tantangannya sendiri. Kami bukan sekadar penyedia jasa, melainkan
            sahabat yang siap mendengarkan dan menyederhanakan rumitnya
            teknologi menjadi solusi digital yang nyata demi kemajuan bisnis
            Anda.
          </p>
        </div>
      </section>

      <section className="vision-mission-section py-24">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center">
            <Image
              src="/images/tech1.jpg"
              alt="Vision and Mission"
              width={800}
              height={600}
              className="w-full max-w-xl"
            />
          </div>

          <div className="space-y-16">
            {/* Vision */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Our Vision
              </h1>
              <p className="text-sm leading-relaxed max-w-md">
                Menjadikan perusahaan IT yang Smart dan bermanfaat untuk alam
                semesta
              </p>
            </div>

            {/* Mission */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Our Mission
              </h1>

              <ul className="text-sm leading-relaxed space-y-2 max-w-md list-disc pl-5">
                <li>
                  Perusahaan yang selalu mengembangkan diri mengikuti
                  perkembangan teknologi
                </li>
                <li>
                  Memberikan solusi teknologi yang dapat menjangkau ke seluruh
                  lapisan masyarakat
                </li>
                <li>
                  Menjadi perusahaan IT yang maju, modern dan bermanfaat untuk
                  semua
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section py-24">
        <div className="cta-header mb-4">
          <h1 className="text-5xl font-bold text-center">
            Tingkatkan Efisiensi Kinerja
          </h1>
        </div>

        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center">
            <Image
              src="/images/tech2.jpg"
              alt="Call to Action"
              width={800}
              height={600}
              className="w-full max-w-xl"
            />
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-md font-semibold mb-4">
                — Digitalize Your Business —
              </h1>

              <p className="text-sm leading-relaxed font-semibold max-w-md mb-6">
                Dengan semangat dan potensi anak muda yang mempunyai cita-cita
                akan mengembangkan Teknologi Informasi yang dapat di jangkau dan
                berguna bagi masyarakat di semua kalangan
              </p>

              <button className="bg-[#AD1E23] text-white px-8 py-3 text-sm font-medium flex items-center gap-2 hover:bg-[#8d1519] transition-colors">
                Tanya sahabat digitalmu.
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
