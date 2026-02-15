import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import FlowingBackground from "@/components/FlowingBackground";

import Preloader from "@/components/Preloader";
import MusicPlayer from "@/components/MusicPlayer";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SYSTEM // ANVAYA ARSHA",
  description: "Advanced Digital Portfolio. Status: ONLINE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${jetbrainsMono.variable} font-mono antialiased text-white selection:bg-[#00FF41] selection:text-black overflow-x-hidden`}
        style={{ color: "#00FF41", minHeight: '100vh' }}
      >
        <Preloader />
        <FlowingBackground />
        <SmoothScroll>{children}</SmoothScroll>
        <MusicPlayer />
      </body>
    </html>
  );
}
