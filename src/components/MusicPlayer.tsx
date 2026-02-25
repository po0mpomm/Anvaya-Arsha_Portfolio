"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, X, Disc, Maximize2, SkipForward, SkipBack, Music, Activity } from "lucide-react";

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [hasError, setHasError] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const userPausedRef = useRef(false);
    const hasInteractedRef = useRef(false);
    const { scrollY } = useScroll();

    // Auto-minimize on scroll
    useMotionValueEvent(scrollY, "change", (latest) => {
        const shouldBeMinimized = latest > 100;
        if (shouldBeMinimized && !isMinimized) setIsMinimized(true);
        else if (!shouldBeMinimized && isMinimized) setIsMinimized(false);
    });

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!audioRef.current || hasError) return;
        if (isPlaying) {
            audioRef.current.pause();
            userPausedRef.current = true;
        } else {
            userPausedRef.current = false;
            audioRef.current.play().catch(console.error);
        }
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) audioRef.current.volume = newVolume;
        setIsMuted(newVolume === 0);
    };

    const handleError = () => {
        setHasError(true);
        setIsPlaying(false);
    };

    // Autoplay Logic - Standardized
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = volume;

        const checkInterval = setInterval(() => {
            if (userPausedRef.current) return;
            if (!audio.paused && audio.muted && hasInteractedRef.current) audio.muted = false;
        }, 1000);

        const handleInteraction = () => {
            hasInteractedRef.current = true;
            if (userPausedRef.current) return;
            if (!audio.paused && audio.muted) audio.muted = false;
            if (audio.volume !== volume) audio.volume = volume;
            if (audio.paused) audio.play().catch(() => { });
        };

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);

        audio.addEventListener("play", onPlay);
        audio.addEventListener("pause", onPause);
        window.addEventListener("click", handleInteraction, { once: true });
        window.addEventListener("scroll", handleInteraction, { once: true });

        // Preloader Signal
        const handleStartAudio = () => {
            userPausedRef.current = false;
            if (hasInteractedRef.current) {
                audio.muted = false;
                audio.play().catch(() => { });
            } else {
                audio.muted = true;
                audio.play().catch(() => { });
            }
        };
        window.addEventListener("START_AUDIO", handleStartAudio);

        return () => {
            clearInterval(checkInterval);
            audio.removeEventListener("play", onPlay);
            audio.removeEventListener("pause", onPause);
            window.removeEventListener("START_AUDIO", handleStartAudio);
        };
    }, []);

    if (hasError) return null;

    return (
        <motion.div
            layout
            initial={false}
            animate={{
                width: isMinimized ? "auto" : "auto",
            }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 1
            }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-10 md:right-10 z-[60] flex justify-end"
        >
            <audio ref={audioRef} src="/audio/on-my-way.mp3" loop playsInline onError={handleError} />

            {/* FUTURISTIC HUD CONTAINER */}
            <motion.div
                layout
                className={`relative overflow-hidden group transition-all duration-500 ease-out font-mono
                ${isMinimized
                        ? "w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-black/90 border border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer hover:border-accent-NEON_GREEN/50 hover:shadow-[0_0_20px_rgba(0,255,65,0.2)]"
                        : "h-[72px] sm:h-[96px] w-[calc(100vw-2rem)] sm:w-[360px] max-w-[360px] bg-black/80 border border-white/10 shadow-2xl backdrop-blur-xl clip-path-notch"
                    }`}
                style={{
                    clipPath: isMinimized ? "none" : "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)"
                }}
                onClick={isMinimized ? () => setIsMinimized(false) : undefined}
            >

                {/* --- DECORATIVE TECH ELEMENTS (Expanded Only) --- */}
                {!isMinimized && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                        {/* Scanning Line Effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,255,65,0.1)_50%,transparent_100%)] h-[200%] w-full animate-scan" style={{ animationDuration: '3s' }} />

                        {/* Top Tech Border */}
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-NEON_GREEN/50 to-transparent" />

                        {/* Corner Accents */}
                        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accent-NEON_GREEN/30 clip-path-polygon-[0_0,100%_0,100%_100%]" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-accent-NEON_GREEN/30" />

                        {/* Tech Labels */}
                        <div className="absolute top-1 right-2 text-[8px] text-accent-NEON_GREEN/60 tracking-widest">SYS.AUDIO_01</div>
                        <div className="absolute bottom-1 right-8 text-[8px] text-white/20">RMS_DETECT</div>

                        {/* Background Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-20" />
                    </motion.div>
                )}

                {/* --- CONTENT LAYOUT --- */}
                <div className={`relative w-full h-full flex items-center ${isMinimized ? 'justify-center p-0' : 'pl-3 pr-2 sm:pl-5 sm:pr-4 gap-3 sm:gap-5'}`}>

                    {/* 1. ALBUM ART / ICON (CD PLAYER STYLE) */}
                    <motion.div
                        layout="position"
                        className={`relative shrink-0 flex items-center justify-center 
                        ${isMinimized ? "w-full h-full" : "w-12 h-12 sm:w-16 sm:h-16"}`}
                    >
                        {isMinimized ? (
                            // Minimized: CD Case Icon
                            <motion.div
                                className="w-8 h-8 sm:w-12 sm:h-12 bg-zinc-900 rounded-md border border-white/10 flex items-center justify-center relative shadow-lg"
                                animate={{ scale: isPlaying ? [1, 1.05, 1] : 1 }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                            >
                                <div className="w-5 h-5 sm:w-8 sm:h-8 rounded-full border border-white/5 bg-zinc-800 flex items-center justify-center">
                                    <div className={`w-1 h-1 sm:w-2 sm:h-2 rounded-full ${isPlaying ? "bg-accent-NEON_GREEN animate-pulse" : "bg-zinc-600"}`} />
                                </div>
                                {/* 3 Green Dots (SS Reference) */}
                                <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 flex gap-[2px]">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className={`w-[2px] h-[2px] sm:w-[3px] sm:h-[3px] rounded-full ${isPlaying ? "bg-accent-NEON_GREEN animate-pulse" : "bg-zinc-700"}`} style={{ animationDelay: `${i * 0.2}s` }} />
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            // Expanded: Spinning Realistic CD
                            <div className="relative w-12 h-12 sm:w-16 sm:h-16 group/art cursor-pointer" onClick={togglePlay}>
                                {/* CD Case Shell */}
                                <div className="absolute inset-0 bg-zinc-900/80 rounded-lg border border-white/10 backdrop-blur-sm" />

                                {/* The CD Disc */}
                                <motion.div
                                    animate={{ rotate: isPlaying ? 360 : 0 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-[2px] rounded-full border border-white/5 overflow-hidden bg-black shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                                >
                                    {/* Iridescent Surface */}
                                    <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#333_0deg,transparent_60deg,#333_120deg,transparent_180deg,#333_240deg,transparent_300deg,#333_360deg)] opacity-40" />
                                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.1)_0%,transparent_50%,rgba(255,255,255,0.1)_100%)]" />
                                    {/* Center Hole */}
                                    <div className="absolute inset-[35%] rounded-full border border-white/10 bg-zinc-900 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-black border border-white/20" />
                                    </div>
                                </motion.div>

                                {/* Play Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/art:opacity-100 transition-opacity z-10">
                                    <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                        {isPlaying ? <Pause size={12} className="text-white fill-current" /> : <Play size={12} className="text-white ml-0.5 fill-current" />}
                                    </div>
                                </div>

                                {/* 3 Green Dots (SS Reference) */}
                                <div className="absolute -bottom-1 -right-1 flex gap-0.5 sm:gap-1 z-20 bg-black/80 px-1 rounded-full border border-white/10">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className={`w-[2px] h-[2px] sm:w-1 sm:h-1 rounded-full ${isPlaying ? "bg-accent-NEON_GREEN shadow-[0_0_5px_#00FF41]" : "bg-zinc-700"}`} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* 2. TEXT & CONTROLS */}
                    <AnimatePresence mode="popLayout">
                        {!isMinimized && (
                            <motion.div
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -5 }}
                                className="flex-1 flex flex-col justify-center min-w-0 pt-1"
                            >
                                {/* Track Info */}
                                <div className="flex flex-col mb-1 sm:mb-3">
                                    <h3 className="text-white font-bold text-xs sm:text-sm tracking-widest uppercase truncate max-w-[124px] sm:max-w-[140px] drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">On My Way</h3>
                                    <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
                                        <div className="px-1 py-[1px] bg-accent-NEON_GREEN/20 border border-accent-NEON_GREEN/30 text-[7px] sm:text-[8px] text-accent-NEON_GREEN rounded-[2px]">MP3</div>
                                        <p className="text-white/40 text-[9px] sm:text-[10px] font-mono tracking-wider truncate">ALAN_WALKER</p>
                                    </div>
                                </div>

                                {/* Controls Row */}
                                <div className="flex items-center justify-between pr-1 sm:pr-2">
                                    {/* Tech Volume Slider */}
                                    <div className="flex items-center gap-1.5 sm:gap-3 w-16 sm:w-32 group/vol">
                                        <Volume2 size={10} className="text-accent-NEON_GREEN/60 hidden sm:block" />
                                        <div className="flex-1 h-6 flex items-center relative">
                                            {/* Segmented Bar Background */}
                                            <div className="flex gap-[2px] w-full h-1.5 opacity-30">
                                                {[...Array(10)].map((_, i) => (
                                                    <div key={i} className="flex-1 bg-white skew-x-[-20deg]" />
                                                ))}
                                            </div>
                                            {/* Active Segments */}
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 flex gap-[2px] w-full h-1.5 overflow-hidden pointer-events-none">
                                                <div className="flex w-full h-full" style={{ width: `${volume * 100}%` }}>
                                                    {[...Array(10)].map((_, i) => (
                                                        <div key={i} className={`flex-1 mx-[1px] skew-x-[-20deg] ${i / 10 < volume ? 'bg-accent-NEON_GREEN shadow-[0_0_5px_#00FF41]' : 'opacity-0'}`} />
                                                    ))}
                                                </div>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.1"
                                                value={volume}
                                                onChange={handleVolumeChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-1.5 sm:gap-2">
                                        <button onClick={togglePlay} className="text-white hover:text-accent-NEON_GREEN transition-colors flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 border border-white/10 rounded-sm hover:border-accent-NEON_GREEN/50 bg-white/5">
                                            {isPlaying ? <Pause size={10} className="w-2 h-2 sm:w-[10px] sm:h-[10px]" /> : <Play size={10} className="w-2 h-2 sm:w-[10px] sm:h-[10px]" />}
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}
                                            className="text-white/40 hover:text-red-400 transition-colors w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"
                                        >
                                            <X size={12} className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- VISUALIZER SPECTRUM (Bottom Right) --- */}
                {!isMinimized && (
                    <div className="absolute bottom-2 right-2 flex items-end gap-[2px] h-4 opacity-80 pointer-events-none">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1 bg-accent-NEON_GREEN shadow-[0_0_5px_#00FF41]"
                                animate={{
                                    height: isPlaying ? ["20%", `${Math.random() * 80 + 20}%`, "40%"] : "10%",
                                    opacity: isPlaying ? [0.6, 1, 0.8] : 0.3
                                }}
                                transition={{
                                    duration: 0.2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    delay: i * 0.05
                                }}
                            />
                        ))}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}
