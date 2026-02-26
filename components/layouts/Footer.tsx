export default function Footer() {
  return (
    <footer className="bg-white py-8 px-8">
      <div className="max-w-8xl mx-auto bg-[#16161D] text-white py-16 px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-32 text-sm">
          {/* Brand Name */}
          <div>
            <h3 className="text-[#AD1E23] font-bold text-2xl leading-tight">
              Digital
              <br />
              Forte
              <br />
              Indonesia
            </h3>
          </div>

          {/* Official Contacts */}
          <div>
            <p className="text-[#AD1E23] mb-3 font-semibold text-sm">
              Official Contacts
            </p>
            <p className="mb-1">+62 858-1111-2194</p>
            <p className="mb-1">Our Address</p>
          </div>

          {/* Social Media */}
          <div>
            <p className="text-[#AD1E23] mb-3 font-semibold text-sm">
              Social Media
            </p>
            <p className="mb-1">Instagram</p>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-[#AD1E23] mt-12 md:mt-20">
          ©Digital Forte Indonesia, 2026. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}