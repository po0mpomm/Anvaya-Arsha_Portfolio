import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import FlowingBackground from "@/components/FlowingBackground";

import Preloader from "@/components/Preloader";
import MusicPlayer from "@/components/MusicPlayer";
import TargetCursor from "@/components/ui/TargetCursor";

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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${jetbrainsMono.variable} font-mono antialiased text-white selection:bg-[#00FF41] selection:text-black overflow-x-hidden`}
        style={{ color: "#00FF41", minHeight: '100vh' }}
      >
        <Preloader />
        <TargetCursor
          spinDuration={2}
          hideDefaultCursor={true}
          parallaxOn={true}
          hoverDuration={0.2}
          targetSelector="a, button, .cursor-pointer, input, select, textarea, .cursor-target, .cursor-pointer"
        />
        <FlowingBackground />
        <SmoothScroll>{children}</SmoothScroll>
        <MusicPlayer />
      </body>
    </html>
  );
}
