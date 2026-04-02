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
  title: "Yogesh Thapa | Full-Stack Developer",
  description: "Portfolio of Yogesh Thapa, a Full-Stack Developer specializing in React, Next.js, and Node.js. View my projects and skills.",
  keywords: ["Full-Stack Developer", "React", "Next.js", "Portfolio", "Web Developer", "Yogesh Thapa"],
  openGraph: {
    title: "Yogesh Thapa | Full-Stack Developer",
    description: "Crafting modern web experiences with React & Next.js.",
    url: "https://yogeshthapa.com",
    siteName: "Yogesh Thapa Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
