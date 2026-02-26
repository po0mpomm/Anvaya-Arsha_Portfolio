"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [phase, setPhase] = useState<"loading" | "ready" | "complete">("loading");

    useEffect(() => {
        if (phase === "loading") {
            const timeout = setTimeout(() => {
                setPhase("ready");
            }, 3500); // 3.5s load time
            return () => clearTimeout(timeout);
        }
    }, [phase]);

    const handleEnter = () => {
        setPhase("complete");
        // Dispatch event to start music
        window.dispatchEvent(new Event("START_AUDIO"));
    };

    return (
        <AnimatePresence mode="wait">
            {phase !== "complete" && (
                <motion.div
                    key="preloader"
                    // Exit strategy: Simple fade out of the container to reveal the site. 
                    exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.2, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
                >
                    {/* Cyber Grid Background */}
                    <div className="absolute inset-0 z-0 bg-black" />
                    <div className="absolute inset-0 z-10 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                    <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.08)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

                    {/* CORE CONTAINER */}
                    <motion.div
                        // Exit strategy: The core implodes (scales down) rapidly
                        exit={{ opacity: 0, scale: 0.5, filter: "blur(20px)", transition: { duration: 0.5, ease: "backIn" } }}
                        className="relative w-64 h-64 flex items-center justify-center z-20"
                    >
                        {/* Ring 1: Outer Dashed */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border border-white/20 rounded-full border-dashed transition-colors"
                        />

                        {/* Ring 2: Reverse Spin Cyan */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-4 border-2 border-accent-CYBER_CYAN/30 rounded-full border-t-transparent border-l-transparent transition-colors"
                        />

                        {/* Ring 3: Fast Spin Green */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-8 border-4 border-accent-NEON_GREEN/50 rounded-full border-r-transparent border-b-transparent"
                        />

                        {/* Center Core Pulse / Popup Message */}
                        <AnimatePresence mode="wait">
                            {phase === "loading" && (
                                <motion.div
                                    key="core"
                                    initial={{ opacity: 1, scale: 1 }}
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                    exit={{ opacity: 0, scale: 0, transition: { duration: 0.5 } }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="w-24 h-24 absolute bg-white/5 rounded-full backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,65,0.2)] transition-colors"
                                >
                                    <span className="text-xs font-mono text-accent-NEON_GREEN font-bold animate-pulse">
                                        SYSTEM
                                    </span>
                                </motion.div>
                            )}

                            {phase === "ready" && (
                                <motion.button
                                    key="ready-btn"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{
                                        scale: 1.05,
                                        textShadow: "0 0 15px rgba(0,255,65,1)",
                                        boxShadow: "0 0 60px rgba(0,255,65,0.8), inset 0 0 30px rgba(0,255,65,0.4)",
                                        backgroundColor: "rgba(0,255,65,0.15)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleEnter}
                                    style={{
                                        boxShadow: "0 0 30px rgba(0,255,65,0.4), inset 0 0 20px rgba(0,255,65,0.3)",
                                        background: "radial-gradient(circle, rgba(0,255,65,0.15) 0%, rgba(0,0,0,0) 70%)"
                                    }}
                                    className="w-32 h-32 absolute rounded-full backdrop-blur-md border border-accent-NEON_GREEN/80 flex flex-col items-center justify-center cursor-pointer z-50 pointer-events-auto transition-all group"
                                >
                                    {/* Sci-Fi HUD Crosshairs/Corners */}
                                    <div className="absolute top-2 left-2 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-accent-NEON_GREEN/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    <div className="absolute top-2 right-2 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-accent-NEON_GREEN/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-accent-NEON_GREEN/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-accent-NEON_GREEN/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                    <span style={{ textShadow: "0 0 10px rgba(0,255,65,0.8)" }} className="text-base font-mono text-accent-NEON_GREEN font-bold tracking-widest relative z-10">
                                        CLICK
                                    </span>
                                    <span className="text-[9px] font-mono text-accent-NEON_GREEN/80 tracking-widest mt-1.5 relative z-10">
                                        [ READY ]
                                    </span>
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Bottom Status Text */}
                    <AnimatePresence mode="wait">
                        {phase === "loading" ? (
                            <motion.div
                                key="status-loading"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                                transition={{ delay: 0.2 }}
                                className="absolute bottom-12 font-mono text-[10px] text-gray-500 tracking-[0.3em] animate-pulse"
                            >
                                INITIALIZING_CORE_SYSTEMS...
                            </motion.div>
                        ) : (
                            <motion.div
                                key="status-ready"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                                className="absolute bottom-12 md:bottom-16 flex flex-col items-center gap-2 z-20"
                            >
                                {/* Beautifully Glowing Terminal Interface Box */}
                                <div className="relative px-7 py-3.5 bg-black/80 backdrop-blur-md border border-accent-NEON_GREEN/40 rounded-xl text-xs sm:text-sm text-accent-NEON_GREEN font-mono tracking-widest flex items-center gap-3 overflow-hidden shadow-[0_0_30px_rgba(0,255,65,0.15)] group">
                                    {/* Scanline Overlay */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.05)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none opacity-50" />

                                    {/* Subtle Radial Glow inside the box */}
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(0,255,65,0.1)_0%,transparent_100%)] pointer-events-none" />

                                    {/* System Prompt */}
                                    <div className="flex items-center gap-2.5 relative z-10">
                                        <span className="opacity-40 text-[10px] sm:text-xs tracking-[0.3em] font-medium">{`C:\\SYSCFG>`}</span>

                                        {/* Message Text with beautiful Neon Glow */}
                                        <span className="font-bold tracking-widest" style={{ textShadow: "0 0 10px rgba(0,255,65,0.6), 0 0 20px rgba(0,255,65,0.2)" }}>
                                            Let's get inside the system...
                                        </span>
                                    </div>

                                    {/* Blinking Terminal Cursor */}
                                    <span className="relative z-10 inline-block w-2.5 h-4 bg-accent-NEON_GREEN animate-pulse shadow-[0_0_10px_rgba(0,255,65,0.8)] rounded-[1px]" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </motion.div>
            )}
        </AnimatePresence>
    );
}
