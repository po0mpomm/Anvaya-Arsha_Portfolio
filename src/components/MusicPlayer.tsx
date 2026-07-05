"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, X, Disc, Maximize2, SkipForward, SkipBack, Music, Activity } from "lucide-react";

const PLAYLIST = [
    { title: "Headlights", artist: "ALOK_&_ALAN", src: "/audio/headlights.mp3" },
    { title: "On My Way", artist: "ALAN_WALKER", src: "/audio/on-my-way.mp3" },
    { title: "Sunflower", artist: "POST_MALONE", src: "/audio/sunflower.mp3" }
];

export default function MusicPlayer() {
    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [volume, setVolume] = useState(0.4);
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
        // Exponential volume curve for more natural human hearing perception
        if (audioRef.current) audioRef.current.volume = Math.pow(newVolume, 2);
        setIsMuted(newVolume === 0);
    };

    const handleError = () => {
        setHasError(true);
        setIsPlaying(false);
    };

    const nextTrack = (e?: React.MouseEvent | boolean) => {
        if (typeof e !== 'boolean' && e) e.stopPropagation();
        const forcePlay = e === true;
        const wasPlaying = isPlaying || forcePlay;
        setCurrentTrack((prev) => (prev + 1) % PLAYLIST.length);
        setHasError(false);
        if (wasPlaying) {
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play().catch(console.error);
                    setIsPlaying(true);
                }
            }, 50);
        }
    };

    const prevTrack = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        const wasPlaying = isPlaying;
        setCurrentTrack((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
        setHasError(false);
        if (wasPlaying) {
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play().catch(console.error);
                    setIsPlaying(true);
                }
            }, 50);
        }
    };

    // We no longer need the generic currentTrack useEffect for auto-play since it's handled in nextTrack/prevTrack

    const selectTrack = (index: number, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setCurrentTrack(index);
        setHasError(false);
        setIsPlaying(true);
        setShowPlaylist(false);
    };

    // Remove the old currentTrack auto-play effect here

    // Apply Volume Changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = Math.pow(volume, 2);
        }
    }, [volume]);

    // Autoplay Logic - Standardized
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);

        audio.addEventListener("play", onPlay);
        audio.addEventListener("pause", onPause);

        // Preloader Signal
        const handleStartAudio = () => {
            userPausedRef.current = false;
            audio.muted = false;
            setIsMuted(false);
            audio.play().catch((err) => console.log("Audio play failed:", err));
        };
        window.addEventListener("START_AUDIO", handleStartAudio);

        return () => {
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
            <audio 
                ref={audioRef} 
                src={PLAYLIST[currentTrack].src} 
                playsInline 
                onError={handleError} 
                onEnded={() => nextTrack(true)}
            />

            {/* PLAYLIST POPUP */}
            <AnimatePresence>
                {showPlaylist && !isMinimized && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full right-0 mb-4 w-64 bg-black/95 border border-accent-NEON_GREEN/30 shadow-[0_0_30px_rgba(0,255,65,0.15)] backdrop-blur-xl z-[70] rounded-sm overflow-hidden"
                    >
                        <div className="p-3 border-b border-white/10 flex justify-between items-center bg-accent-NEON_GREEN/5">
                            <div className="flex items-center gap-2">
                                <Music size={12} className="text-accent-NEON_GREEN" />
                                <span className="text-accent-NEON_GREEN text-xs font-bold tracking-widest uppercase">SYS.PLAYLIST</span>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); setShowPlaylist(false); }} className="text-white/50 hover:text-red-400 transition-colors">
                                <X size={14} />
                            </button>
                        </div>
                        <div className="flex flex-col p-1 max-h-48 overflow-y-auto custom-scrollbar">
                            {PLAYLIST.map((track, idx) => (
                                <button
                                    key={idx}
                                    onClick={(e) => selectTrack(idx, e)}
                                    className={`flex flex-col text-left p-2 hover:bg-white/10 transition-colors border-l-2 ${currentTrack === idx ? 'border-accent-NEON_GREEN bg-accent-NEON_GREEN/10' : 'border-transparent'}`}
                                >
                                    <span className={`text-xs font-bold uppercase ${currentTrack === idx ? 'text-accent-NEON_GREEN' : 'text-white'}`}>{track.title}</span>
                                    <span className="text-[10px] text-white/50 font-mono mt-0.5">{track.artist}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                                    <h3 className="text-white font-bold text-xs sm:text-sm tracking-widest uppercase truncate max-w-[124px] sm:max-w-[140px] drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                                        {PLAYLIST[currentTrack].title}
                                    </h3>
                                    <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
                                        <div className="px-1 py-[1px] bg-accent-NEON_GREEN/20 border border-accent-NEON_GREEN/30 text-[7px] sm:text-[8px] text-accent-NEON_GREEN rounded-[2px]">MP3</div>
                                        <p className="text-white/40 text-[9px] sm:text-[10px] font-mono tracking-wider truncate">
                                            {PLAYLIST[currentTrack].artist}
                                        </p>
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
                                    <div className="flex gap-1.5 sm:gap-2 items-center">
                                        <button onClick={prevTrack} className="text-white/70 hover:text-white transition-colors">
                                            <SkipBack size={10} className="w-2 h-2 sm:w-[10px] sm:h-[10px]" />
                                        </button>
                                        <button onClick={togglePlay} className="text-white hover:text-accent-NEON_GREEN transition-colors flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 border border-white/10 rounded-sm hover:border-accent-NEON_GREEN/50 bg-white/5">
                                            {isPlaying ? <Pause size={10} className="w-2 h-2 sm:w-[10px] sm:h-[10px]" /> : <Play size={10} className="w-2 h-2 sm:w-[10px] sm:h-[10px]" />}
                                        </button>
                                        <button onClick={nextTrack} className="text-white/70 hover:text-white transition-colors">
                                            <SkipForward size={10} className="w-2 h-2 sm:w-[10px] sm:h-[10px]" />
                                        </button>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setShowPlaylist(!showPlaylist); }} 
                                            className={`flex items-center gap-1.5 px-2 py-1 ml-1 transition-all border rounded-sm ${showPlaylist ? 'bg-accent-NEON_GREEN/20 border-accent-NEON_GREEN text-accent-NEON_GREEN shadow-[0_0_10px_rgba(0,255,65,0.2)]' : 'bg-white/5 border-white/10 text-white/70 hover:text-accent-NEON_GREEN hover:border-accent-NEON_GREEN/50 hover:bg-white/10'}`}
                                        >
                                            <Music size={10} className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                            <span className="text-[8px] sm:text-[9px] font-bold tracking-widest uppercase hidden sm:block">Playlist</span>
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setIsMinimized(true); setShowPlaylist(false); }}
                                            className="text-white/40 hover:text-red-400 transition-colors w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center ml-1"
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
