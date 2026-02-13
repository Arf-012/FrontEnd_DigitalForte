export default function Footer() {
  return (
    <footer className="bg-white py-8 px-8">
        <div className="max-w-10xl mx-auto bg-[#16161D] text-white py-16 px-8">
          <div className="grid md:grid-cols-3 gap-16 text-sm">
            <div>
              <h3 className="text-[#AD1E23] font-bold text-xl leading-tight">
                Digital
                <br />
                Forte
                <br />
                Indonesia
              </h3>
            </div>

            <div>
              <p className="text-[#AD1E23] mb-3 font-medium">
                Official Contact
              </p>
              <p className="mb-1">+62 858 1211 2594</p>
              <p className="mb-1">digitalforteindonesia</p>
              <p className="text-gray-400">Our Website</p>
            </div>

            <div>
              <p className="text-[#AD1E23] mb-3 font-medium">
                Official Contacts
              </p>
              <p className="mb-1">+62 858 1211 2594</p>
              <p className="mb-1">digitalforteindonesia</p>
              <p className="text-gray-400">Our Address</p>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 mt-12">
            Digital Forte Indonesia, 2024. All Rights Reserved
          </p>
        </div>
      </footer>
  )
}