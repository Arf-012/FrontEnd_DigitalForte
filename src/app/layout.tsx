import Navigation from '../../components/layout/Navigation';
import Footer from '../../components/layout/Footer';
import './globals.css';

export default function RootLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />  
        <main>
          {children}  
        </main>
        <Footer />  
      </body>
    </html>
  )
}