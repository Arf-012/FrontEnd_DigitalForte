import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import Navigation from "components/layouts/Navigation";
import Footer from "components/layouts/Footer";
import ImageTiles from "components/layouts/ImageTiles";
import Contact from "components/layouts/Contact";
import "./globals.css";

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digital Forte Indonesia",
  description: "Digital Forte Indonesia - Digitalize Your Business",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ibmPlex.className}>
        <Navigation />
        <main>{children}</main>
        <Contact />
        <ImageTiles />
        <Footer />
      </body>
    </html>
  );
}
