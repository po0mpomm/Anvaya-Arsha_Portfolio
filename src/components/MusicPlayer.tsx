"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Play, Pause, Disc, Volume2, VolumeX, Minimize2, AlertCircle, X, Maximize2 } from "lucide-react";

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [volume, setVolume] = useState(0.3);
    const [hasError, setHasError] = useState(false);
    const [rotation, setRotation] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Scroll Logic for Auto-Minimize
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        // Threshold: 100px (just after start of scroll)
        const shouldBeMinimized = latest > 100;

        // Only update if state needs changing to avoid re-renders
        if (shouldBeMinimized && !isMinimized) {
            setIsMinimized(true);
        } else if (!shouldBeMinimized && isMinimized) {
            setIsMinimized(false);
        }
    });

    // Continuous rotation when playing
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setRotation(prev => (prev + 1) % 360);
            }, 50); // Speed of rotation
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    // Handle play/pause
    const togglePlay = () => {
        if (!audioRef.current || hasError) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => {
                console.log("Autoplay prevented:", e);
                // User interaction needed
            });
        }
        setIsPlaying(!isPlaying);
    };

    // Handle volume change
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
        setIsMuted(newVolume === 0);
    };

    // Toggle Mute
    const toggleMute = () => {
        if (!audioRef.current) return;
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        audioRef.current.muted = newMuted;
    };

    // Error Handling
    const handleError = () => {
        setHasError(true);
        setIsPlaying(false);
        console.error("Music Player Error: Audio file not found or format unsupported.");
    };

    // Auto-play on mount
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                    setHasError(false);
                }).catch((error) => {
                    console.log("Auto-play prevented. User interaction required.");
                    setIsPlaying(false);
                });
            }
        }
    }, []);

    if (hasError) return null; // Hide if broken

    return (
        <motion.div
            layout
            initial={false}
            animate={{
                width: isMinimized ? "64px" : "320px",
                height: isMinimized ? "64px" : "180px", // Approximate height of expanded
                borderRadius: "32px"
            }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 35
            }}
            className="fixed bottom-8 right-8 z-50 bg-black/50 backdrop-blur-3xl border border-white/10 border-t-white/20 border-l-white/20 shadow-2xl overflow-hidden ring-1 ring-white/5"
            style={{ borderRadius: "32px" }}
        >
            <audio
                ref={audioRef}
                src="/audio/on-my-way.mp3"
                loop
                onError={handleError}
            />

            {/* Glossy Reflective Shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-0" />

            {/* Content Container to handle relative positioning */}
            <div className="relative w-full h-full z-10">

                {/* Minimized View */}
                <motion.button
                    animate={{
                        opacity: isMinimized ? 1 : 0,
                        scale: isMinimized ? 1 : 0.5,
                        pointerEvents: isMinimized ? "auto" : "none"
                    }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setIsMinimized(false)}
                    className="absolute inset-0 flex items-center justify-center w-full h-full"
                >
                    <motion.div
                        animate={{ rotate: isPlaying ? 360 : 0 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-1 rounded-full border-2 border-dashed border-white/20"
                    />
                    <Disc size={24} className={`text-accent-NEON_GREEN ${isPlaying ? "animate-pulse" : "opacity-50"}`} />
                </motion.button>

                {/* Expanded View */}
                <motion.div
                    animate={{
                        opacity: isMinimized ? 0 : 1,
                        scale: isMinimized ? 0.9 : 1,
                        filter: isMinimized ? "blur(10px)" : "blur(0px)",
                        pointerEvents: isMinimized ? "none" : "auto"
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 p-5 flex flex-col gap-4 w-full h-full"
                >

                    {/* Top Bar */}
                    <div className="flex justify-between items-center text-xs font-mono text-gray-400">
                        <span className={isPlaying ? "text-accent-NEON_GREEN animate-pulse" : ""}>
                            {isPlaying ? "PLAYING" : "PAUSED"}
                        </span>
                        <button onClick={() => setIsMinimized(true)} className="hover:text-white transition-colors">
                            <Minimize2 size={16} />
                        </button>
                    </div>

                    {/* Main Info */}
                    <div className="flex items-center gap-4">
                        <motion.div
                            className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-gray-800 to-black border border-white/10 flex items-center justify-center shrink-0"
                            animate={{ rotate: isPlaying ? 360 : 0 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="w-3 h-3 rounded-full bg-black border border-white/20 z-10" />
                        </motion.div>

                        <div className="overflow-hidden min-w-0 flex-1">
                            <div className="text-white font-bold text-sm tracking-wide truncate">ON MY WAY</div>
                            <div className="text-gray-500 text-xs font-mono truncate">Alan Walker</div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={togglePlay}
                            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all active:scale-95 ${isPlaying ? "bg-accent-NEON_GREEN text-black" : "bg-white/10 text-white hover:bg-white/20"
                                }`}
                        >
                            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                        </button>

                        <div className="flex-1 flex items-center gap-2">
                            <button onClick={toggleMute} className="text-gray-400 hover:text-white px-1">
                                {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>
                            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden relative group/slider cursor-pointer">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-accent-NEON_GREEN"
                                    style={{ width: `${volume * 100}%` }}
                                    layoutId="volume-bar"
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Cable connection (Fade out) */}
            <motion.div
                animate={{ opacity: isMinimized ? 0 : 1 }}
                className="absolute -top-6 right-8 w-[2px] h-6 bg-neutral-800 z-[-1]"
            />
        </motion.div>
    );
}
