"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';
import { ArrowUpRight, Crosshair, Grid3X3, Trophy, Activity, Target, Scan, Fingerprint, Zap } from "lucide-react";
const HobbiesModel = dynamic(() => import('./canvas/HobbiesModel'), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center text-emerald-500/20 font-mono text-xs">NEURAL_LINK_ESTABLISHING...</div>
});

const ChessModel = dynamic(() => import('./canvas/ChessModel'), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center text-emerald-500/20 font-mono text-xs">NEURAL_LINK_ESTABLISHING...</div>
});

const DataStream = ({ text, delay = 0 }: { text: string, delay?: number }) => {
    return (
        <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.2, delay }}
            className="font-mono"
        >
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.02, delay: delay + (i * 0.01) }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
}

export default function Hobbies() {
    const [activeId, setActiveId] = useState<'01' | '02'>('01');
    const containerRef = useRef<HTMLElement>(null);

    // Parallax Mouse/Gaze Tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        mouseX.set((clientX - centerX) / centerX);
        mouseY.set((clientY - centerY) / centerY);
    };

    // Smooth spring physics for the parallax
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    // Layer Transforms
    const layer1X = useTransform(springX, [-1, 1], [-20, 20]); // Background
    const layer1Y = useTransform(springY, [-1, 1], [-20, 20]);
    const layer2X = useTransform(springX, [-1, 1], [-50, 50]); // HUD Elements
    const layer2Y = useTransform(springY, [-1, 1], [-50, 50]);
    const layer3X = useTransform(springX, [-1, 1], [30, -30]); // Foreground/Model (Inverse movement for depth)
    const layer3Y = useTransform(springY, [-1, 1], [30, -30]);

    // Scroll handling for Logic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const frequencyScale = useTransform(scrollYProgress, [0, 1], [0, 100]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest > 0.4 && activeId !== '02') {
            setActiveId('02');
        } else if (latest <= 0.4 && activeId !== '01') {
            setActiveId('01');
        }
    });

    const scrollToSection = (id: '01' | '02') => {
        if (!containerRef.current) return;
        const containerTop = containerRef.current.offsetTop;
        const containerHeight = containerRef.current.offsetHeight;
        // Scroll to start for 01, middle for 02
        const targetScroll = id === '01' ? containerTop : containerTop + (containerHeight * 0.6);
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    };

    const hobbies = {
        '01': {
            title: "STRATEGY_CORE",
            subtitle: "CHESS_ENTHUSIAST",
            description: "CASUAL_PLAYER_DETECTED. KNOWLEDGE_BASE_GROWING. PASSION_FOR_THE_GAME_OPTIMIZED.",
            color: "text-emerald-400",
            glow: "shadow-[0_0_50px_rgba(52,211,153,0.2)]",
            border: "border-emerald-500/30",
            stats: [
                { label: "RANK", value: "UNRATED", icon: <Trophy className="w-3 h-3" /> },
                { label: "CLASS", value: "TACTICIAN", icon: <Grid3X3 className="w-3 h-3" /> },
                { label: "COORD", value: "E4-C5", icon: <Activity className="w-3 h-3" /> },
            ],
            link: "https://www.chess.com/member/Anvaya_Arsha",
            linkText: "INITIATE_LINK",
            Model: ChessModel,
            modelScale: 1.2
        },
        '02': {
            title: "REFLEX_CORE",
            subtitle: "BGMI_ELITE_COMMANDER",
            description: "HIGH_VELOCITY_BATTLE_ROYALE_SIMULATION. SPLIT_SECOND_SYNCHRONIZATION_REQUIRED.",
            color: "text-rose-500",
            glow: "shadow-[0_0_50px_rgba(244,63,94,0.2)]",
            border: "border-rose-500/30",
            stats: [
                { label: "K/D_RATIO", value: "4.92", icon: <Crosshair className="w-3 h-3" /> },
                { label: "MATCHES", value: "12,000+", icon: <Target className="w-3 h-3" /> },
                { label: "ROLE", value: "IGL", icon: <Trophy className="w-3 h-3" /> },
            ],
            link: "#",
            linkText: "VIEW_STATS",
            Model: HobbiesModel,
            modelScale: 0.3
        }
    };



    return (
        <section
            id="hobbies"
            ref={containerRef}
            className="relative h-[300vh] bg-black text-white border-t border-white/5 font-mono"
            onMouseMove={handleMouseMove}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

                {/* --- LAYER 1: BACKGROUND GRID (Parallax) --- */}
                <motion.div style={{ x: layer1X, y: layer1Y }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,100,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,100,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 [mask-image:radial-gradient(circle_at_center,black_40%,transparent_90%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />
                </motion.div>


                {/* --- LAYER 2: HUD ELEMENTS (Parallax) --- */}
                {/* --- LAYER 2: HUD ELEMENTS (Parallax) --- */}
                <motion.div style={{ x: layer2X, y: layer2Y }} className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between">

                    {/* Aligned HUD Text Container */}
                    <div className="w-full max-w-5xl mx-auto px-8 h-full flex flex-col justify-between py-6 lg:py-8 relative">
                        {/* Top HUD */}
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                    <Scan className="w-4 h-4 text-emerald-500 animate-pulse" />
                                    SYSTEM_READY
                                </div>
                                <div className="h-0.5 w-24 bg-gradient-to-r from-emerald-500 to-transparent" />
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] text-gray-500">NEURAL_ID: 884-29-X</div>
                                <div className="text-[10px] text-gray-500">LATENCY: 12ms</div>
                            </div>
                        </div>

                        {/* Bottom HUD */}
                        <div className="flex justify-between items-end">
                            <div className="text-[10px] text-gray-500 flex items-center gap-2">
                                <Fingerprint className="w-4 h-4 text-emerald-500" />
                                BIO_AUTH_VERIFIED
                            </div>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className={`w-1 h-3 ${i <= 3 ? 'bg-emerald-500' : 'bg-gray-800'}`} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Frequency Tuner (Fixed to Viewport Edge for Professional Look) */}
                    <div className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 flex flex-col gap-6 items-center">
                        <div
                            className="text-[10px] text-gray-500 tracking-[0.2em] whitespace-nowrap rotate-180"
                            style={{ writingMode: 'vertical-rl' }}
                        >
                            FREQUENCY_TUNER
                        </div>
                        <div className="w-0.5 h-32 bg-gray-900/50 rounded-full relative overflow-hidden ring-1 ring-white/10">
                            <motion.div
                                style={{ height: scrollYProgress.get() * 100 + '%' }}
                                className={`w-full absolute top-0 bg-gradient-to-b ${activeId === '01' ? 'from-emerald-900/0 via-emerald-500 to-emerald-400' : 'from-rose-900/0 via-rose-600 to-rose-500'} transition-all duration-700 ease-in-out`}
                            />
                            {/* Indicator dot */}
                            <motion.div
                                style={{ top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                                className={`absolute left-1/2 -translate-x-1/2 w-2 h-1 ${activeId === '01' ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]' : 'bg-rose-500 shadow-[0_0_10px_#f43f5e]'} z-10 rounded-full transition-colors duration-700`}
                            />
                        </div>
                        <div className="text-[10px] font-mono text-gray-500 w-8 text-center mt-2">
                            <motion.span>{useTransform(frequencyScale, (v) => v.toFixed(0))}</motion.span>Hz
                        </div>
                    </div>
                </motion.div>


                {/* --- LAYER 3: MAIN CONTENT (Inverse Parallax) --- */}
                <motion.div
                    style={{ x: layer3X, y: layer3Y }}
                    className="relative z-20 w-full max-w-7xl px-8 flex flex-col items-center"
                >

                    {/* Header - Compacted spacing */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="mb-8 text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-950/30 backdrop-blur text-[10px] text-emerald-400 mb-2 tracking-widest">
                            <Zap className="w-3 h-3" />
                            NEURAL_INTERFACE_V3.05
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">Memory</span>
                            <span className="text-emerald-500 text-xl align-top ml-2">.LOG</span>
                        </h2>
                    </motion.div>


                    {/* THE CORE (Grid Layout) */}
                    <div className="w-full grid grid-cols-12 gap-4 items-center">

                        {/* LEFT: CONTROLLER (3 Cols) */}
                        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 lg:items-start order-2 lg:order-1">
                            <button
                                onClick={() => scrollToSection('01')}
                                className={`w-full lg:w-auto text-left p-4 lg:p-6 border-l-2 transition-all duration-300 relative overflow-hidden group ${activeId === '01' ? 'border-emerald-500 bg-emerald-950/10' : 'border-gray-800 hover:border-gray-600'}`}
                            >
                                <div className="absolute inset-0 bg-emerald-500/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                                <div className="text-[10px] text-emerald-500/50 mb-1">FREQ_01 //</div>
                                <div className={`text-xl lg:text-2xl font-bold uppercase ${activeId === '01' ? 'text-white' : 'text-gray-600'}`}>Strategy</div>
                            </button>

                            <button
                                onClick={() => scrollToSection('02')}
                                className={`w-full lg:w-auto text-left p-4 lg:p-6 border-l-2 transition-all duration-300 relative overflow-hidden group ${activeId === '02' ? 'border-rose-500 bg-rose-950/10' : 'border-gray-800 hover:border-gray-600'}`}
                            >
                                <div className="absolute inset-0 bg-rose-500/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                                <div className="text-[10px] text-rose-500/50 mb-1">FREQ_02 //</div>
                                <div className={`text-xl lg:text-2xl font-bold uppercase ${activeId === '02' ? 'text-white' : 'text-gray-600'}`}>Reflex</div>
                            </button>
                        </div>

                        {/* CENTER: THE IRIS (6 Cols) */}
                        <div className="col-span-12 lg:col-span-6 flex justify-center py-8 order-1 lg:order-2">
                            <div className="w-[280px] h-[280px] lg:w-[420px] lg:h-[420px] relative">
                                {/* Rotating Rings */}
                                <div className={`absolute inset-0 rounded-full border border-dashed transition-colors duration-500 animate-[spin_20s_linear_infinite] ${activeId === '01' ? 'border-emerald-500/20' : 'border-rose-500/20'}`} />
                                <div className={`absolute inset-4 rounded-full border border-dotted transition-colors duration-500 animate-[spin_15s_linear_infinite_reverse] ${activeId === '01' ? 'border-emerald-500/30' : 'border-rose-500/30'}`} />

                                {/* 3D Canvas */}
                                <div className={`absolute inset-8 rounded-full overflow-hidden bg-black/50 backdrop-blur-sm border transition-all duration-500 ${hobbies[activeId].border} ${hobbies[activeId].glow}`}>
                                    {/* STRATEGY MODEL (Chess) */}
                                    <motion.div
                                        className="absolute inset-0 w-full h-full"
                                        initial={{ opacity: 1, scale: 1 }}
                                        animate={{
                                            opacity: activeId === '01' ? 1 : 0,
                                            scale: activeId === '01' ? 1 : 0.95,
                                            zIndex: activeId === '01' ? 10 : 0,
                                            pointerEvents: activeId === '01' ? 'auto' : 'none'
                                        }}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                    >
                                        <ChessModel scale={1.2} active={activeId === '01'} />
                                    </motion.div>

                                    {/* REFLEX MODEL (Gun) */}
                                    <motion.div
                                        className="absolute inset-0 w-full h-full"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{
                                            opacity: activeId === '02' ? 1 : 0,
                                            scale: activeId === '02' ? 1 : 0.95,
                                            zIndex: activeId === '02' ? 10 : 0,
                                            pointerEvents: activeId === '02' ? 'auto' : 'none'
                                        }}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                    >
                                        <HobbiesModel url="/models/gun.glb" scale={0.3} active={activeId === '02'} />
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: DATA FEED (3 Cols) */}
                        <div className="col-span-12 lg:col-span-3 flex flex-col lg:items-end justify-center h-[300px] relative order-3">
                            <AnimatePresence>
                                <motion.div
                                    key={activeId}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col lg:items-end gap-4 absolute w-full"
                                >
                                    <div className="text-right">
                                        <div className={`text-[10px] ${hobbies[activeId].color} tracking-widest mb-1`}>
                                            <DataStream text={hobbies[activeId].title} />
                                        </div>
                                        <div className="text-xl lg:text-2xl font-bold max-w-[250px] leading-tight text-white mb-2 lg:ml-auto">
                                            {hobbies[activeId].subtitle}
                                        </div>
                                        <p className="text-gray-500 text-[10px] lg:text-xs max-w-[250px] leading-relaxed lg:ml-auto">
                                            {hobbies[activeId].description}
                                        </p>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="w-full lg:max-w-[250px] border-t border-gray-800 pt-4 mt-2 flex flex-col gap-3">
                                        {hobbies[activeId].stats.map((stat, i) => (
                                            <div key={i} className="flex justify-between items-center text-xs">
                                                <span className="text-gray-600 flex items-center gap-2">
                                                    {stat.icon} {stat.label}
                                                </span>
                                                <span className={hobbies[activeId].color}>{stat.value}</span>
                                            </div>
                                        ))}

                                        {/* Added IDs for Reflex Section */}
                                        {activeId === '02' && (
                                            <div className="mt-2 pt-2 border-t border-dashed border-gray-800 flex flex-col gap-1">
                                                <div className="flex justify-between text-[10px]">
                                                    <span className="text-gray-500">USER_ID:</span>
                                                    <span className="text-rose-400 font-bold tracking-wider">5230467501</span>
                                                </div>
                                                <div className="flex justify-between text-[10px]">
                                                    <span className="text-gray-500">ALT_ID:</span>
                                                    <span className="text-rose-400 font-bold tracking-wider">55569016614</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Main Action */}
                                    {activeId === '01' && (
                                        <a
                                            href={hobbies[activeId].link}
                                            target="_blank"
                                            className={`mt-4 px-6 py-2 border ${hobbies[activeId].border} ${hobbies[activeId].color} text-[10px] tracking-widest hover:bg-white/5 transition-colors uppercase self-end`}
                                        >
                                            {hobbies[activeId].linkText}
                                        </a>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>

                </motion.div>

            </div>
        </section >
    );
}
