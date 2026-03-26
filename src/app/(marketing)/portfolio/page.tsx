"use client";

import { useState, useEffect } from "react";
import { Project } from "types/project";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/portfolios`,
        );
        const json = await res.json();
        if (json.success) {
          setProjects(json.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch portfolios:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const toggleProject = (project: Project) => {
    if (selectedProject?.id === project.id) {
      setSelectedProject(null);
    } else {
      setSelectedProject(project);
    }
  };

  if (loading)
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );

  return (
    <div className="bg-white min-h-screen text-[#16161D]">
      <section>
        <div className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-12 items-center">
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
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col gap-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div
                  className="relative overflow-hidden group cursor-pointer min-h-64 h-86"
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
                    <h3 className="text-white text-3xl font-bold leading-tight text-center">
                      {project.title}
                    </h3>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500 border-2 border-[#AD1E23] ${
                    selectedProject?.id === project.id
                      ? "opacity-100 max-h-96 ease-out"
                      : "opacity-0 max-h-0 border-0 ease-in-out"
                  }`}
                >
                  <div className="bg-white p-12">
                    <p className="text-[#AD1E23] leading-relaxed text-base">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}