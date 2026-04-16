"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Project } from "types/project";
import { useIsMobile } from "hooks/useIsMobile";

interface Gallery {
  id: number;
  image: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const SkeletonBar = () => (
  <div className="w-full h-64 bg-gray-200 animate-pulse rounded-sm" />
);

export default function Portfolio() {
  const isMobile = useIsMobile();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [galleries, setGalleries] = useState<Record<number, Gallery[]>>({});
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    const cached = localStorage.getItem("portfolio_cache");
    if (cached) {
      setProjects(JSON.parse(cached));
      setLoading(false);
    }

    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/portfolios`);
        const json = await res.json();
        if (json.success) {
          const data = json.data.data;
          localStorage.setItem("portfolio_cache", JSON.stringify(data));
          setProjects(data);
          setIsOffline(false);
        } else {
          throw new Error("API returned failure");
        }
      } catch (err) {
        console.error("Failed to fetch portfolios, using cache:", err);
        if (!cached) setProjects([]);
        setIsOffline(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [API_BASE]);

  const fetchGallery = async (projectId: number) => {
    if (galleries[projectId]) return;

    const cached = localStorage.getItem(`gallery_cache_${projectId}`);
    if (cached) {
      setGalleries((prev) => ({ ...prev, [projectId]: JSON.parse(cached) }));
    }

    try {
      const res = await fetch(
        `${API_BASE}/api/portfolios/${projectId}/galleries`
      );
      const json = await res.json();
      if (json.success) {
        const data = json.data.data;
        localStorage.setItem(`gallery_cache_${projectId}`, JSON.stringify(data));
        setGalleries((prev) => ({ ...prev, [projectId]: data }));
      } else {
        throw new Error("Gallery API returned failure");
      }
    } catch (err) {
      console.error("Failed to fetch gallery, using cache:", err);
      if (!cached) {
        setGalleries((prev) => ({ ...prev, [projectId]: [] }));
      }
    }
  };

  const toggleProject = (project: Project) => {
    if (selectedProject?.id === project.id) {
      setSelectedProject(null);
    } else {
      setSelectedProject(project);
      fetchGallery(project.id);
    }
  };

  return (
    <div className="bg-white min-h-screen text-[#16161D]">

      {/* Offline banner */}
      {isOffline && (
        <div className="bg-yellow-100 text-yellow-800 text-center text-sm py-2 px-4">
          Backend tidak tersedia. Menampilkan data terakhir yang tersimpan.
        </div>
      )}

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-4xl font-bold leading-none"
            onClick={() => setLightboxImage(null)}
          >
            &times;
          </button>
          <img
            src={lightboxImage}
            alt="Gallery fullscreen"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Header */}
      <section>
        <div
          className={`max-w-7xl mx-auto px-8 py-24 items-center ${
            isMobile ? "flex flex-col" : "grid grid-cols-2 gap-12"
          }`}
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-md"
          >
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
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col gap-4">

            {/* Skeleton */}
            {loading && projects.length === 0 && (
              <>
                <SkeletonBar />
                <SkeletonBar />
                <SkeletonBar />
              </>
            )}

            {/* Empty state */}
            {!loading && projects.length === 0 && (
              <p className="text-gray-400 text-sm text-center py-12">
                Belum ada portofolio.
              </p>
            )}

            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                {/* Image Bar */}
                <div
                  className={`relative overflow-hidden group cursor-pointer ${
                    isMobile ? "min-h-48 h-48" : "min-h-64 h-64"
                  }`}
                  onClick={() => toggleProject(project)}
                >
                  <div className="absolute inset-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover absolute inset-0 w-full h-full"
                    />
                    <div className="absolute inset-0 bg-[#AD1E23] mix-blend-multiply opacity-80 group-hover:opacity-70 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="relative h-full p-8 flex flex-col justify-center">
                    <h3
                      className={`text-white font-bold leading-tight text-center ${
                        isMobile ? "text-xl" : "text-3xl"
                      }`}
                    >
                      {project.title}
                    </h3>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>

                {/* Expandable Panel */}
                <div
                  className={`overflow-hidden transition-all duration-500 border-2 border-[#AD1E23] ${
                    selectedProject?.id === project.id
                      ? "opacity-100 max-h-[2000px] ease-out"
                      : "opacity-0 max-h-0 border-0 ease-in-out"
                  }`}
                >
                  <div
                    className={`bg-white ${
                      isMobile
                        ? "flex flex-col gap-8 p-8"
                        : "grid grid-cols-2 gap-12 p-12"
                    }`}
                  >
                    {/* Left - Description */}
                    <div className="flex flex-col justify-start">
                      <p className="text-[#AD1E23] leading-relaxed text-base">
                        {project.description}
                      </p>
                    </div>

                    {/* Right - Gallery */}
                    <div className="space-y-4">
                      {(galleries[project.id] ?? []).map((gallery) => (
                        <div
                          key={gallery.id}
                          className="overflow-hidden shadow-lg relative h-64 cursor-pointer"
                          onClick={() => setLightboxImage(gallery.image)}
                        >
                          <img
                            src={gallery.image}
                            alt={`${project.title} gallery`}
                            className="object-cover absolute inset-0 w-full h-full hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                      {galleries[project.id]?.length === 0 && (
                        <p className="text-gray-400 text-sm">
                          No gallery images yet.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}