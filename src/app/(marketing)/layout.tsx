import Navigation from "components/layouts/Navigation";
import Footer from "components/layouts/Footer";
import ImageTiles from "components/layouts/ImageTiles";
import Contact from "components/layouts/Contact";
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Contact />
      <ImageTiles />
      <Footer />
    </>
  )
}