import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AD X-RAY | Performance Benchmarking",
  description: "High-precision Year over Year ad spend comparison.",
  icons: {
    icon: "/logo.svg",
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="pt-24 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

