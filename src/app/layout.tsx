import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Devansh | AI Engineer, Builder, Founder",
  description:
    "Explore Devansh's universe — an interactive 3D space portfolio showcasing AI engineering, full-stack development, and innovative projects.",
  keywords: [
    "AI Engineer",
    "Full Stack Developer",
    "Portfolio",
    "React",
    "Three.js",
    "Next.js",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#030014] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
