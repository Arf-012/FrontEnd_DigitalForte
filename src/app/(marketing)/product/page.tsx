"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Komponen untuk animasi fade-up
const FadeUp = ({ children, delay = 0, className = "" }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// Komponen untuk setiap layanan
const ServiceItem = ({ title, description, imageSrc, imageAlt }: any) => (
  <div className="md:ml-20 mb-24">
    <FadeUp>
      <h2 className="text-6xl font-bold mb-10">{title}</h2>
    </FadeUp>
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <FadeUp delay={0.1}>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </FadeUp>
      <FadeUp delay={0.2}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={600}
          height={400}
          className="w-full h-auto"
        />
      </FadeUp>
    </div>
  </div>
);

export default function ServicesPage() {
  const services = [
    {
      title: "Web Development",
      description:
        "Membangun Website Profile bagi Bisnis Anda (Perusahaan maupun Perorangan) sebagai sarana profesional untuk menampilkan identitas brand, profil perusahaan, layanan yang ditawarkan, portofolio, serta informasi kontak guna meningkatkan kepercayaan, kredibilitas, dan jangkauan bisnis di era digital.",
      imageSrc: "/web.webp",
      imageAlt: "Web Development",
    },
    {
      title: "Mobile Development",
      description:
        "Membangun Aplikasi Mobile berbasis Android dan iOS yang dirancang secara modern, responsif, dan fungsional untuk memenuhi kebutuhan bisnis maupun perorangan, meningkatkan efisiensi operasional, memperluas jangkauan pengguna, serta memberikan pengalaman pengguna yang optimal di berbagai perangkat.",
      imageSrc: "/mobile.webp",
      imageAlt: "Mobile Development",
    },
    {
      title: "Software Development",
      description:
        "Membangun software berbasis website maupun desktop yang dapat disesuaikan dengan kebutuhan bisnis maupun departemen Anda, guna mempermudah alur kerja, meningkatkan efisiensi kinerja tim, serta mendukung kolaborasi yang lebih efektif dan terintegrasi.",
      imageSrc: "/software.webp",
      imageAlt: "Software Development",
    },
    {
      title: "Content Maintenance",
      description:
        "Membangun Website Profile bagi Bisnis Anda (Perusahaan maupun Perorangan) sebagai sarana profesional untuk menampilkan identitas brand, profil perusahaan, layanan yang ditawarkan, portofolio, serta informasi kontak guna meningkatkan kepercayaan, kredibilitas, dan jangkauan bisnis di era digital.",
      imageSrc: "/content.webp",
      imageAlt: "Content Maintenance",
    },
    {
      title: "WordPress Development",
      description:
        "Membangun Aplikasi Mobile berbasis Android dan iOS yang dirancang secara modern, responsif, dan fungsional untuk memenuhi kebutuhan bisnis maupun perorangan, meningkatkan efisiensi operasional, memperluas jangkauan pengguna, serta memberikan pengalaman pengguna yang optimal di berbagai perangkat.",
      imageSrc: "/wordpress.webp",
      imageAlt: "WordPress Development",
    },
    {
      title: "Customer Service",
      description:
        "Membangun software berbasis website maupun desktop yang dapat disesuaikan dengan kebutuhan bisnis maupun departemen Anda, guna mempermudah alur kerja, meningkatkan efisiensi kinerja tim, serta mendukung kolaborasi yang lebih efektif dan terintegrasi.",
      imageSrc: "/customer.webp",
      imageAlt: "Customer Service",
    },
    {
      title: "Technical Support",
      description:
        "Jasa Pembuatan dan Pemeliharaan Jaringan, Instalasi Hardware, serta Software di Perusahaan Anda yang dirancang untuk memastikan sistem berjalan stabil, aman, dan optimal, sehingga mendukung kelancaran operasional serta meningkatkan produktivitas bisnis.",
      imageSrc: "/tech.webp",
      imageAlt: "Technical Support",
    },
  ];

  return (
    <div className="bg-white text-[#16161d] overflow-hidden">
      {/* HERO SECTION - Ditambahkan padding top lebih besar */}
      <section className="max-w-6xl mx-auto pt-24 pb-16 px-6 grid md:grid-cols-2 gap-10 items-center">
        <FadeUp>
          <Image
            src="/service.webp"
            alt="Development"
            width={600}
            height={400}
            className="w-full h-auto"
          />
        </FadeUp>

        <div>
          <FadeUp delay={0.2}>
            <motion.h1
              className="text-7xl font-bold mb-6 border-b-4 border-[#AD1E23] inline-block pb-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Services
            </motion.h1>
          </FadeUp>

          <FadeUp delay={0.4}>
            <p className="mt-6 text-gray-700 leading-relaxed">
              Kami menyediakan berbagai layanan digital terintegrasi yang
              dirancang khusus untuk mempercepat pertumbuhan bisnis Anda. Mulai
              dari pengembangan perangkat lunak hingga strategi pemasaran
              digital, tim kami hadir sebagai sahabat yang memberikan solusi
              tepat guna, efisien, dan mudah dikelola untuk setiap tantangan
              teknologi Anda.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="max-w-6xl mx-auto px-6  relative">
        {/* Timeline */}
        <motion.div
          className="hidden md:block absolute left-0 top-0 bottom-0 w-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col items-center h-full">
            <motion.div
              className="w-[2px] bg-[#AD1E23] relative origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{ height: `${(services.length - 1) * 14.28}%` }}
            >
              {services.map((_, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
                  className="w-3 h-3 bg-[#AD1E23] rounded-full absolute left-1/2 -translate-x-1/2"
                  style={{ top: `${(i / (services.length - 1)) * 100}%` }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Render all services */}
        {services.map((service, index) => (
          <ServiceItem key={index} {...service} />
        ))}
      </section>
    </div>
  );
}
