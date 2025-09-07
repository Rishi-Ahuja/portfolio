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
  title: "Rishi Ahuja - Developer | AI/ML | Full Stack | Problem Solver",
  description: "Personal portfolio of Rishi Ahuja, a Computer Science student at University of Waterloo with expertise in AI/ML, Full Stack development, and problem solving.",
  keywords: ["Rishi Ahuja", "Developer", "AI/ML", "Full Stack", "University of Waterloo", "Portfolio"],
  authors: [{ name: "Rishi Ahuja" }],
  creator: "Rishi Ahuja",
  openGraph: {
    title: "Rishi Ahuja - Developer Portfolio",
    description: "AI/ML Developer and Full Stack Engineer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
