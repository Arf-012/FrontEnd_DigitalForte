"use client";

import { useState, useRef } from "react";
import { Project } from "types/project";
import Image from "next/image";
import { useIntersectionObserver } from "hooks/useIntersectionObserver";

export default function Portfolio() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isIntersecting } = useIntersectionObserver(ref);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = [
    {
      id: 1,
      title: "Antam Mobile App",
      row: 0,
      col: 0,
      colSpan: 4,
      rowSpan: 1,
      image: "/images/antam.webp",
      description:
        "Proyek ini bertujuan untuk mengembangkan sebuah platform yang mampu mengkonsolidasikan jaminan host alumin Institut Pariwisata Trisakti. Kami mengembangkan website yang mengintegrasikan berbagai fitur untuk memudahkan pengelolaan database yang efisien, guna memperinisiat sinergi antara perlindungan informasi karir dan kolaborasi profesional secara real-time di industri pariwisata.",
      details: [
        "Mobile App Development",
        "Backend Integration",
        "Real-time Data Sync",
      ],
      gallery: [
        "/images/antam2.png",
        "/images/antam3.png",
        "/images/antam4.png",
      ],
    },
  ];

  const toggleProject = (project: Project) => {
    if (selectedProject?.id === project.id) {
      setSelectedProject(null);
    } else {
      setSelectedProject(project);
    }
  };

  return (
    <div className="bg-white min-h-screen text-[#16161D]">
      <section>
        <div
          ref={ref}
          className={`
    transition-all duration-700 ease-out
    ${isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
    max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-12 items-center
  `}
        >
          <div className="max-w-md">
            <h1 className="accent-line text-6xl font-bold leading-tight mb-6">
              Our Portfolio
            </h1>
            <p className="text-gray-700 leading-relaxed mb-8 text-sm">
              Kami bangga mempersembahkan kurasi proyek strategis yang menjadi
              bukti nyata kompetensi dan kredibilitas Digital Forte Indonesia.
              Setiap solusi yang kami hadirkan dirancang untuk memberikan dampak
              terukur, menggabungkan presisi teknis dengan visi pertumbuhan
              bisnis jangka panjang.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div
          ref={ref}
          className={`transition-all duration-700 ease-out ${isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} max-w-7xl mx-auto px-8`}
        >
          <div className="grid grid-cols-4 gap-4 auto-rows-fr">
            {projects.map((project) => (
              <div
                key={project.id}
                style={{
                  gridColumn: `span ${project.colSpan}`,
                  gridRow: `span ${project.rowSpan}`,
                }}
                className="relative overflow-hidden group cursor-pointer min-h-100"
                onClick={() => toggleProject(project)}
              >
                <div className="absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#AD1E23] mix-blend-multiply opacity-80 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="relative h-full p-8 flex flex-col justify-center">
                  <h3 className="text-white text-3xl font-bold leading-tight text-center">
                    {project.title}
                  </h3>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
            ))}
          </div>

          <section>
            <div
              className={`overflow-hidden transition-all duration-500 border-2 border-[#AD1E23] ${
                selectedProject
                  ? "opacity-100 max-h-200 ease-out"
                  : "opacity-0 max-h-0 border-0 ease-in-out"
              }`}
            >
              <div className="bg-white">
                <div className="grid md:grid-cols-2 gap-12 p-12">
                  {/* Left Side - Description */}
                  <div className="flex flex-col justify-start">
                    <p className="text-[#AD1E23] leading-relaxed text-base">
                      {selectedProject?.description}
                    </p>
                  </div>
                  {/* Right Side - Gallery Images */}
                  <div className="space-y-4">
                    {selectedProject?.gallery.map((gallery, index) => (
                      <div
                        key={index}
                        className="rounded-lg overflow-hidden shadow-lg relative h-64"
                      >
                        <Image
                          src={gallery}
                          alt={`${selectedProject.title} Gallery ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
