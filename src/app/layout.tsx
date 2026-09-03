import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "CivilVerse — AI-First Civil Engineering Knowledge & Exploration",
  description:
    "One Universe. Every Structure. Every Engineer. Explore civil engineering marvels, interactive calculators, Archie AI with Engineering X-Ray, and structured learning paths.",
  keywords: [
    "Civil Engineering",
    "Structural Engineering",
    "Archie AI",
    "Engineering Calculators",
    "Burj Khalifa",
    "Millau Viaduct",
    "Concrete Mix Design",
    "IS 456",
    "ACI 318",
    "Shear Force Bending Moment",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090d16] text-slate-100 antialiased min-h-screen flex flex-col selection:bg-blue-600 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
