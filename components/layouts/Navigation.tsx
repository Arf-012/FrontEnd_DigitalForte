import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-red-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl">
            Digital Forte Indonesia
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-red-300">Home</Link>
            <Link href="/about" className="hover:text-red-300">About</Link>
            <Link href="/services" className="hover:text-red-300">Services</Link>
            <Link href="/portfolio" className="hover:text-red-300">Portfolio</Link>
            <Link href="/products" className="hover:text-red-300">Products</Link>
            <Link href="/contact" className="hover:text-red-300">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}