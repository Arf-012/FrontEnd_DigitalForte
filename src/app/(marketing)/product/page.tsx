import Image from "next/image";

export default function ServicesPage() {
  return (
    <div className="bg-[#e9e9e9] text-[#1e1e1e]">
      {/* HERO */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <Image
            src="/images.jpg"
            alt="Development"
            width={600}
            height={400}
            className="w-full h-auto"
          />
        </div>

        <div>
          <h1 className="text-5xl font-bold mb-6 border-b-4 border-red-500 inline-block pb-2">
            Services
          </h1>
          <p className="mt-6 text-gray-700 leading-relaxed">
            Kami menyediakan berbagai layanan digital terintegrasi yang
            dirancang khusus untuk mempercepat pertumbuhan bisnis Anda. Mulai
            dari pengembangan perangkat lunak hingga strategi pemasaran
            digital, tim kami hadir sebagai sahabat yang memberikan solusi tepat
            guna, efisien, dan mudah dikelola untuk setiap tantangan teknologi
            Anda.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 pb-20 relative">
        {/* Timeline */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-16">
          <div className="flex flex-col items-center h-full">
            <div className="w-[2px] bg-red-500 flex-1 relative">
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className="w-3 h-3 bg-red-500 rounded-full absolute left-1/2 -translate-x-1/2"
                  style={{ top: `${i * 16}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Web Development */}
        <div className="md:ml-20 mb-24">
          <h2 className="text-6xl font-bold mb-10">Web Development</h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <p className="text-gray-700 leading-relaxed">
              Membangun Website Profile bagi Bisnis Anda (Perusahaan maupun
              Perorangan) sebagai sarana profesional untuk menampilkan identitas
              brand, profil perusahaan, layanan yang ditawarkan, portofolio,
              serta informasi kontak guna meningkatkan kepercayaan, kredibilitas,
              dan jangkauan bisnis di era digital.
            </p>
            <Image
              src="/images.jpg"
              alt="Web Development"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Mobile Development */}
        <div className="md:ml-20 mb-24">
          <h2 className="text-6xl font-bold mb-10">Mobile Development</h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <p className="text-gray-700 leading-relaxed">
              Membangun Aplikasi Mobile berbasis Android dan iOS yang dirancang
              secara modern, responsif, dan fungsional untuk memenuhi kebutuhan
              bisnis maupun perorangan, meningkatkan efisiensi operasional,
              memperluas jangkauan pengguna, serta memberikan pengalaman
              pengguna yang optimal di berbagai perangkat.
            </p>
            <Image
              src="/images.jpg"
              alt="Mobile Development"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Software Development */}
        <div className="md:ml-20 mb-24">
          <h2 className="text-6xl font-bold mb-10">Software Development</h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <p className="text-gray-700 leading-relaxed">
              Membangun Software berbasis website maupun desktop yang dapat
              disesuaikan dengan kebutuhan bisnis maupun department Anda untuk
              mempermudah kinerja tim ataupun kolaborasi secara efisien dan
              terintegrasi.
            </p>
            <Image
              src="/images.jpg"
              alt="Software Development"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Content Maintenance */}
        <div className="md:ml-20 mb-24">
          <h2 className="text-6xl font-bold mb-10">Content Maintenance</h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <p className="text-gray-700 leading-relaxed">
              Menyediakan Maintenance konten aplikasi maupun media sosial yang
              membutuhkan posting konten secara berkala guna menjaga konsistensi
              informasi dan engagement dengan audiens.
            </p>
            <Image
              src="/images.jpg"
              alt="Content Maintenance"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* WordPress Development */}
        <div className="md:ml-20 mb-24">
          <h2 className="text-6xl font-bold mb-10">WordPress Development</h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <p className="text-gray-700 leading-relaxed">
              Membangun Website berbasis WordPress yang fleksibel, mudah
              dikelola, dan dikustomisasi sesuai kebutuhan bisnis Anda.
            </p>
            <Image
              src="/images.jpg"
              alt="WordPress Development"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Customer Service */}
        <div className="md:ml-20 mb-24">
          <h2 className="text-6xl font-bold mb-10">Customer Service</h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <p className="text-gray-700 leading-relaxed">
              Memberikan layanan bantuan kepada pelanggan secara responsif dan
              profesional untuk memastikan kepuasan serta pengalaman terbaik
              dalam menggunakan layanan Anda.
            </p>
            <Image
              src="/images.jpg"
              alt="Customer Service"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Technical Support */}
        <div className="md:ml-20">
          <h2 className="text-6xl font-bold mb-10">Technical Support</h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <p className="text-gray-700 leading-relaxed">
              Tim Profesional dan Berpengalaman siap membantu Anda dalam
              mengatasi berbagai permasalahan teknis secara cepat dan tepat.
            </p>
            <Image
              src="/images.jpg"
              alt="Technical Support"
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>
    </div>
  );
}