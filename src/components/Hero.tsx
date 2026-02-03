"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { TypewriterEffect } from "@/components/ui/Typewriter"; // Placeholder, will inline if simple
import { Terminal, Cpu, ShieldCheck } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-x-hidden overflow-y-visible z-20 flex flex-col items-center justify-center bg-transparent">


            {/* HUD Overlay */}
            <div className="absolute top-24 left-6 md:left-12 flex flex-col gap-2 opacity-50 pointer-events-none">
                <div className="text-xs text-accent-CYBER_CYAN">SYS.STATUS: ONLINE</div>
                <div className="text-xs text-accent-CYBER_CYAN">KERNEL: v4.2.0</div>
                <div className="text-xs text-accent-CYBER_CYAN">SECURE_CONNECTION: ESTABLISHED</div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 w-full max-w-5xl px-6 text-center select-none">

                {/* Glitch Title */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="mb-8 relative"
                >
                    <div className="absolute inset-0 bg-black/60 blur-xl -z-10 rounded-full scale-110" />

                    <div className="inline-block border border-accent-NEON_GREEN/30 bg-black/80 backdrop-blur-md px-4 py-1 mb-6">
                        <span className="text-xs font-bold text-accent-NEON_GREEN tracking-widest animate-pulse">
                            ● SYSTEM ONLINE
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-2 relative z-10 drop-shadow-[0_0_15px_rgba(0,255,65,0.5)]">
                        ANVAYA<span className="text-accent-NEON_GREEN">_ARSHA</span>
                    </h1>
                    <p className="text-xs md:text-sm text-gray-400 tracking-[1em] uppercase relative z-10 font-bold bg-black/40 inline-block px-2">
                        Software Developer // Full Stack
                    </p>
                </motion.div>

                {/* Console Output Role */}
                <div className="h-16 flex justify-center items-center text-accent-CYBER_CYAN font-bold text-lg md:text-2xl">
                    <span className="mr-2">{">"}</span>
                    FULL_STACK_DEVELOPER | UI/UX_ENGINEER
                    <span className="w-3 h-6 bg-accent-CYBER_CYAN ml-2 animate-pulse" />
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12">
                    <button className="group relative px-6 py-3 bg-accent-NEON_GREEN/10 border border-accent-NEON_GREEN text-accent-NEON_GREEN font-bold uppercase tracking-widest hover:bg-accent-NEON_GREEN hover:text-black transition-all clip-path-polygon">
                        <span className="flex items-center gap-2">
                            <Terminal size={18} /> Execute.Projects()
                        </span>
                    </button>
                    <a
                        href="/assets/Resume_Anvaya_Arsha.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative px-6 py-3 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
                    >
                        <span className="flex items-center gap-2">
                            <Cpu size={18} /> View_Logs (Resume)
                        </span>
                    </a>
                </div>

            </div>

            {/* Decorative Footers */}
            <div className="absolute bottom-10 w-full px-12 flex justify-between text-[10px] text-gray-600 uppercase tracking-widest">
                <div>Coordinates: 23.3441° N, 85.3096° E</div>
                <div>Memory: 64TB / 128TB</div>
            </div>
        </section>
    );
}
