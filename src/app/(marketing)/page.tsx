'use client';

import Link from "next/link";
import { useState } from "react";
import {
  WebhookIcon,
  SmartphoneIcon,
  AppWindowMacIcon,
  ChevronsLeftRightIcon,
  LayoutGridIcon,
  WholeWordIcon,
  ContactRoundIcon,
  UserCog2Icon,
  BoxIcon,
  GitForkIcon,
} from "lucide-react";

export default function Home() {
  const [activeMobileCard, setActiveMobileCard] = useState<number | null>(null);

  const services = [
    { title: "Web Profile", row: 0, col: 0, icon: WebhookIcon },
    { title: "Mobile Apps (Android)", row: 0, col: 1, icon: SmartphoneIcon },
    { title: "Mobile Apps (IOS)", row: 0, col: 2, icon: AppWindowMacIcon },
    { title: "Web Apps", row: 0, col: 3, icon: ChevronsLeftRightIcon },
    { title: "Content Maintenance", row: 1, col: 0, icon: LayoutGridIcon },
    { title: "Wordpress Development", row: 1, col: 1, icon: WholeWordIcon },
    { title: "Customers Support", row: 1, col: 2, icon: ContactRoundIcon },
    { title: "Technical Support", row: 1, col: 3, icon: UserCog2Icon },
    { title: "Devbox", row: 2, col: 1, icon: BoxIcon },
    { title: "Serenity", row: 2, col: 2, icon: GitForkIcon },
  ];

  const accordionItems = [
    {
      title: "Pengalaman & Kredibilitas",
      content:
        "Digital Forte Indonesia memiliki rekam jejak solid dalam menangani kompleksitas bisnis klien, dari teknologi, desain hingga berbasis tinggi di industri, kami memiliki setiap sektor yang Anda dikelola oleh tenaga ahli yang berpikir dengan standar kualitas yang tinggi.",
    },
    {
      title: "Kami memberikan Solusi terbaik untuk Bisnis Anda",
      content:
        "Kami memberikan solusi terbaik yang disesuaikan dengan kebutuhan bisnis Anda.",
    },
    {
      title: "Profesional, Efektif Dan Efisien",
      content:
        "Tim kami bekerja dengan profesional untuk memberikan hasil yang efektif dan efisien.",
    },
    {
      title: "Kami terbuka untuk semua kalangan",
      content:
        "Kami melayani berbagai kalangan dari startup hingga perusahaan besar.",
    },
  ];

  return (
    <div className="bg-white text-[#16161D]">
      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-md">
            <h1 className="text-[42px] accent-line font-bold leading-tight mb-6">
              Your Best Friend to Help You Digitalize Your Business.
            </h1>

            <p className="text-gray-700 leading-relaxed mb-8 text-sm">
              Digital Forte Indonesia hadir sebagai mitra kerja yang memahami
              kebutuhan bisnis secara menyeluruh. Kami bukan sekadar penyedia
              jasa, melainkan sahabat yang siap mendampingi dan memberdayakan
              Anda dalam setiap langkah transformasi digital yang nyata dan
              bermakna bersama Bisnis Anda.
            </p>

            <a href="http://wa.me/85811112194">
              <button className="bg-[#AD1E23] text-white px-8 py-3 text-sm font-medium flex items-center gap-2 hover:bg-[#8d1519] transition-colors">
                Tanya sahabat digitalmu.
                <span>→</span>
              </button>
            </a>
          </div>

          {/* Workspace Image */}
          <div className="w-full h-[400px] bg-gray-200 rounded-sm overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800"
              alt="Workspace"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-[56px] font-bold mb-16">Services</h2>

          {/* Desktop view - 4 columns with specific grid positioning */}
          <div className="hidden md:grid grid-cols-4 gap-3">
            {services.map((service, index) => (
              <div
                key={index}
                style={{
                  gridColumn: service.col + 1,
                  gridRow: service.row + 1,
                }}
                className="p-6 h-32 flex flex-col justify-between relative group cursor-pointer transition-all bg-[#AD1E23] text-white hover:bg-white hover:border-2 hover:border-[#AD1E23] hover:text-[#AD1E23]"
              >
                <div className="absolute bottom-4 left-4 transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-white group-hover:hidden" />
                </div>

                {/* Default state - just title and arrow */}
                <span className="text-sm font-medium leading-tight group-hover:hidden">
                  {service.title}
                </span>

                <div className="flex justify-end group-hover:hidden">
                  <span className="text-xl">→</span>
                </div>

                {/* Hover state - show description */}
                <div className="hidden group-hover:block text-xs text-gray-700 leading-relaxed">
                  Pengembangan {service.title.toLowerCase()} profesional dengan
                  teknologi terkini dan standar kualitas terbaik untuk mendukung
                  transformasi digital bisnis Anda.
                </div>
              </div>
            ))}
          </div>

          {/* Mobile view - 2 columns with click interaction */}
          <div className="grid md:hidden grid-cols-2 gap-3">
            {services.map((service, index) => {
              const isActive = activeMobileCard === index;
              return (
                <div
                  key={index}
                  onClick={() => setActiveMobileCard(isActive ? null : index)}
                  className={`p-6 flex flex-col justify-between relative cursor-pointer transition-all ${
                    isActive
                      ? "bg-white border-2 border-[#AD1E23] text-[#AD1E23] min-h-32"
                      : "bg-[#AD1E23] text-white h-32"
                  }`}
                >
                  {!isActive && (
                    <>
                      <div className="absolute bottom-4 left-4">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Default state - title and arrow */}
                      <span className="text-sm font-medium leading-tight break-words">
                        {service.title}
                      </span>

                      <div className="flex justify-end">
                        <span className="text-xl">→</span>
                      </div>
                    </>
                  )}

                  {/* Active/clicked state - show description */}
                  {isActive && (
                    <div className="text-xs text-gray-700 leading-relaxed break-words">
                      Pengembangan {service.title.toLowerCase()} profesional
                      dengan teknologi terkini dan standar kualitas terbaik untuk
                      mendukung transformasi digital bisnis Anda.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-[56px] font-bold mb-16">Why Us?</h2>

          <div className="space-y-0">
            {accordionItems.map((item, index) => (
              <details key={index} className="border-b border-gray-300 group">
                <summary className="py-6 flex justify-between items-center cursor-pointer list-none">
                  <span className="text-[#AD1E23] font-medium text-sm pr-4">
                    {item.title}
                  </span>
                  <div className="w-6 h-6 bg-[#AD1E23] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg font-light leading-none group-open:hidden">
                      +
                    </span>
                    <span className="text-white text-lg font-light leading-none hidden group-open:block">
                      −
                    </span>
                  </div>
                </summary>

                <div className="pb-6">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}