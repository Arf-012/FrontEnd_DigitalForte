// app/(marketing)/page.tsx
// HOMEPAGE - This is what users see when they visit "/"

import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-red-900 via-red-800 to-gray-900 text-white min-h-[600px] flex items-center">
        {/* Background pattern or image */}
        <div className="absolute inset-0 opacity-10">
          <Image 
            src="/images/hero-pattern.png" 
            alt="" 
            fill 
            className="object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Digitalize Your Business with{' '}
              <span className="text-red-300">Digital Forte Indonesia</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Professional web development, mobile apps, and software solutions 
              to help you navigate the digital world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/services"
                className="inline-block bg-white text-red-900 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-center"
              >
                Explore Our Services
              </Link>
              <Link 
                href="/portfolio"
                className="inline-block border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-red-900 transition-colors text-center"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <Link href="/services/web-development" className="group">
              <div className="bg-gradient-to-br from-red-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-700 transition-colors">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Web Development
                </h3>
                <p className="text-gray-600 mb-4">
                  Modern, responsive websites built with the latest technologies for optimal performance.
                </p>
                <span className="text-red-600 font-semibold group-hover:text-red-700">
                  Learn More →
                </span>
              </div>
            </Link>

            {/* Service Card 2 */}
            <Link href="/services/mobile-development" className="group">
              <div className="bg-gradient-to-br from-red-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-700 transition-colors">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Mobile Development
                </h3>
                <p className="text-gray-600 mb-4">
                  Native and cross-platform mobile apps for iOS and Android devices.
                </p>
                <span className="text-red-600 font-semibold group-hover:text-red-700">
                  Learn More →
                </span>
              </div>
            </Link>

            {/* Service Card 3 */}
            <Link href="/services/software-development" className="group">
              <div className="bg-gradient-to-br from-red-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-700 transition-colors">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Software Development
                </h3>
                <p className="text-gray-600 mb-4">
                  Custom software solutions designed to streamline your business operations.
                </p>
                <span className="text-red-600 font-semibold group-hover:text-red-700">
                  Learn More →
                </span>
              </div>
            </Link>

            {/* Service Card 4 */}
            <Link href="/services/content-maintenance" className="group">
              <div className="bg-gradient-to-br from-red-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-700 transition-colors">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Content Maintenance
                </h3>
                <p className="text-gray-600 mb-4">
                  Keep your website fresh with regular updates and content management.
                </p>
                <span className="text-red-600 font-semibold group-hover:text-red-700">
                  Learn More →
                </span>
              </div>
            </Link>

            {/* Service Card 5 */}
            <Link href="/services/wordpress-development" className="group">
              <div className="bg-gradient-to-br from-red-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-700 transition-colors">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  WordPress Development
                </h3>
                <p className="text-gray-600 mb-4">
                  Custom WordPress themes and plugins for easy content management.
                </p>
                <span className="text-red-600 font-semibold group-hover:text-red-700">
                  Learn More →
                </span>
              </div>
            </Link>

            {/* Service Card 6 */}
            <Link href="/services/technical-support" className="group">
              <div className="bg-gradient-to-br from-red-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-700 transition-colors">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Technical Support
                </h3>
                <p className="text-gray-600 mb-4">
                  24/7 technical support to keep your systems running smoothly.
                </p>
                <span className="text-red-600 font-semibold group-hover:text-red-700">
                  Learn More →
                </span>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/services"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We deliver exceptional results through expertise and dedication
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                We deliver projects on time without compromising quality
              </p>
            </div>

            <div className="text-center">
              <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                Every project goes through rigorous testing and quality checks
              </p>
            </div>

            <div className="text-center">
              <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-gray-600">
                Our experienced developers bring years of expertise to your project
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Portfolio
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take a look at some of our recent projects
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Portfolio Item 1 */}
            <Link href="/portfolio/1" className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="relative h-64 bg-gray-200">
                <Image 
                  src="/images/portfolio/project-1.jpg" 
                  alt="E-Commerce Platform"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  E-Commerce Platform
                </h3>
                <p className="text-gray-600 mb-4">
                  Modern online shopping experience with seamless checkout
                </p>
                <span className="text-red-600 font-semibold">View Project →</span>
              </div>
            </Link>

            {/* Portfolio Item 2 */}
            <Link href="/portfolio/2" className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="relative h-64 bg-gray-200">
                <Image 
                  src="/images/portfolio/project-2.jpg" 
                  alt="Corporate Website"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Corporate Website
                </h3>
                <p className="text-gray-600 mb-4">
                  Professional website showcasing company profile and services
                </p>
                <span className="text-red-600 font-semibold">View Project →</span>
              </div>
            </Link>

            {/* Portfolio Item 3 */}
            <Link href="/portfolio/3" className="group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <div className="relative h-64 bg-gray-200">
                <Image 
                  src="/images/portfolio/project-3.jpg" 
                  alt="Mobile App"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Mobile App
                </h3>
                <p className="text-gray-600 mb-4">
                  Cross-platform mobile application for iOS and Android
                </p>
                <span className="text-red-600 font-semibold">View Project →</span>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/portfolio"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-900 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Lets Build Something Amazing Together
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Have a project in mind? Get in touch and lets discuss how we can help bring your vision to life.
          </p>
          <Link 
            href="/contact"
            className="inline-block bg-white text-red-900 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  )
}