export default function Home() {
  const services = [
    { title: "Web Profile", row: 0, col: 0 },
    { title: "Mobile Apps (Android)", row: 0, col: 1 },
    { title: "Mobile Apps (IOS)", row: 0, col: 2 },
    { title: "Web Apps", row: 0, col: 3 },
    { title: "Content Maintenance", row: 1, col: 0 },
    { title: "Wordpress Development", row: 1, col: 1 },
    { title: "Customers Support", row: 1, col: 2 },
    { title: "Technical Support", row: 1, col: 3 },
    { title: "Devbox", row: 2, col: 1 },
    { title: "Serenity", row: 2, col: 2 },
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
            <h1 className="text-[42px] font-bold leading-tight mb-6">
              Your Best Friend to Help You Digitalize Your Business.
            </h1>

            <p className="text-gray-700 leading-relaxed mb-8 text-sm">
              Digital Forte Indonesia hadir sebagai mitra kerja yang memahami
              kebutuhan bisnis secara menyeluruh. Kami bukan sekadar penyedia
              jasa, melainkan sahabat yang siap mendampingi dan memberdayakan
              Anda dalam setiap langkah transformasi digital yang nyata dan
              bermakna bersama Bisnis Anda.
            </p>

            <button className="bg-[#AD1E23] text-white px-8 py-3 text-sm font-medium flex items-center gap-2 hover:bg-[#8d1519] transition-colors">
              Tanya sahabat digitalmu.
              <span>→</span>
            </button>
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

          <div className="grid grid-cols-4 gap-3">
            {services.map((service, index) => (
              <div
                key={index}
                style={{
                  gridColumn: service.col + 1,
                  gridRow: service.row + 1,
                }}
                className="p-6 h-32 flex flex-col justify-between relative group cursor-pointer transition-all bg-[#AD1E23] text-white hover:bg-white hover:border-2 hover:border-[#AD1E23] hover:text-[#AD1E23]"
              >
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

      {/* CONTACT */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-[56px] font-bold mb-8">Contact Us</h2>

          <p className="text-gray-700 leading-relaxed max-w-2xl mb-8 text-sm">
            Kami percaya setiap bisnis punya cerita unik, dan kami siap jadi
            bagian dari kesuksesan Anda. Tim PT. Digital Forte Indonesia siap
            mendengarkan kebutuhan Anda, dan bersama-sama kita akan menciptakan
            solusi digital paling pas buat Anda. Hubungi kami sekarang, ya, kami
            tunggu kabar Anda!
          </p>

          <button className="bg-[#AD1E23] text-white px-8 py-3 text-sm font-medium flex items-center gap-2 hover:bg-[#8d1519] transition-colors">
            Tanya sahabat digitalmu.
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </button>
        </div>
      </section>

      {/* IMAGE TILES */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3">
          {[
            {
              title: "Certificates",
              img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
            },
            {
              title: "Portfolio",
              img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
            },
            {
              title: "About Us",
              img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative h-96 overflow-hidden group cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#AD1E23]/70 flex flex-col justify-between p-8 transition-all group-hover:bg-[#AD1E23]/85">
                <h3 className="text-white text-3xl font-semibold">
                  {item.title}
                </h3>
                <div className="flex justify-end">
                  <span className="text-white text-2xl">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      
    </div>
  );
}
