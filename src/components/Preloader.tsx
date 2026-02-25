"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
            // Dispatch event to start music
            window.dispatchEvent(new Event("START_AUDIO"));
        }, 3500); // 3.5s load time
        return () => clearTimeout(timeout);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    // Exit strategy: Simple fade out of the container to reveal the site. 
                    exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.2, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
                >
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

                        {/* Center Core Pulse */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-24 h-24 bg-white/5 rounded-full backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,65,0.2)] transition-colors"
                        >
                            <span className="text-xs font-mono text-accent-NEON_GREEN font-bold animate-pulse">
                                SYSTEM
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Bottom Status Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                        transition={{ delay: 0.2 }}
                        className="absolute bottom-12 font-mono text-[10px] text-gray-500 tracking-[0.3em] animate-pulse"
                    >
                        INITIALIZING_CORE_SYSTEMS...
                    </motion.div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}
