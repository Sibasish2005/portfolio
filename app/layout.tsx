import type { Metadata } from "next";
import { DM_Mono, Orbitron, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Sibasish Chakraborti — Full Stack Developer",
  description:
    "Portfolio of Sibasish Chakraborti, a Full Stack Developer specializing in Next.js, React, FastAPI, and cloud technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark antialiased", dmMono.variable, orbitron.variable, "font-sans", geist.variable)}
    >
      <body>{children}</body>
    </html>
  );
}
