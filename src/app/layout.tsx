import type { Metadata } from 'next'
import Navigation from 'components/layouts/Navigation'
import './globals.css'

export const metadata: Metadata = {
  title: 'Digital Forte Indonesia',
  description: 'Digital Forte Indonesia - Digital Marketing Agency',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
