"use client";

import { motion, useMotionValue, useSpring, useTransform, useInView, animate } from "framer-motion";
import { useState, useEffect, useRef, ReactNode } from "react";

// --- Custom Hooks & Helpers ---
function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) setMatches(media.matches);
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches, query]);
    return matches;
}

const CountUp = ({ to, delay = 0 }: { to: number; delay?: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!inView) return;
        const node = ref.current;
        if (node) {
            const controls = animate(0, to, {
                duration: 1.5,
                delay,
                ease: "easeOut",
                onUpdate(value) {
                    node.textContent = Math.round(value).toString();
                },
            });
            return () => controls.stop();
        }
    }, [to, inView, delay]);

    return <span ref={ref}>0</span>;
};

const MagneticLink = ({ children, color = "text-accent-NEON_GREEN" }: { children: ReactNode, color?: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouse = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;
        // Subtle magnetic pull
        x.set(distanceX * 0.2);
        y.set(distanceY * 0.2);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.span
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            style={{ x: springX, y: springY }}
            className={`inline-block relative cursor-pointer font-medium ${color} group px-1 rounded-sm hover:bg-white/5 transition-colors`}
        >
            {children}
            {/* Sweep underline */}
            <span className={`absolute bottom-0 left-0 w-0 h-[1px] bg-current transition-all duration-300 ease-out group-hover:w-full`} />
        </motion.span>
    );
};

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, { once: true, margin: "-100px" });
    const isMobile = useMediaQuery("(max-width: 768px)");
    const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

    // --- Tilt Logic ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 100, mass: 0.5 });
    const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 100, mass: 0.5 });

    const rotateX = useTransform(smoothMouseY, [-1, 1], ["4deg", "-4deg"]);
    const rotateY = useTransform(smoothMouseX, [-1, 1], ["-4deg", "4deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isMobile || prefersReducedMotion || !containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        // Normalize mouse pos between -1 and 1 based on container
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        mouseX.set(x * 2);
        mouseY.set(y * 2);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // --- Typewriter State ---
    const fullCode = `const developer = {
  name: "Anvaya Arsha",
  role: "AI/ML Engineer",
  education: "Vellore Institute of Technology (VIT)",
  traits: [
    "AI/ML Expert",
    "Automation Enthusiast",
    "UI/UX Expert"
  ],
  status: "Building the Future"
};`;
    const [codeText, setCodeText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    
    useEffect(() => {
        if (inView) {
            if (prefersReducedMotion) {
                setCodeText(fullCode);
                setIsTyping(false);
                return;
            }
            setIsTyping(true);
            let i = 0;
            const interval = setInterval(() => {
                setCodeText(fullCode.slice(0, i + 1));
                i++;
                if (i > fullCode.length) {
                    clearInterval(interval);
                    setIsTyping(false);
                }
            }, 15); // typing speed
            return () => clearInterval(interval);
        }
    }, [inView, fullCode, prefersReducedMotion]);

    // --- Interactive State ---
    const [activeTrait, setActiveTrait] = useState<string | null>(null);

    // --- HUD Tickers ---
    const [memoryValue, setMemoryValue] = useState(64.12);
    useEffect(() => {
        const interval = setInterval(() => {
            setMemoryValue(prev => {
                const step = (Math.random() - 0.5) * 0.1;
                return Math.max(64.0, Math.min(65.0, prev + step));
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // --- Rendering Code with Syntax Highlighting ---
    // A simple parser just for this specific block to allow interactive hovering
    const renderCode = () => {
        // We render what has been typed so far
        if (codeText.length === 0) return <span className="animate-pulse">_</span>;

        // If it's fully typed, we can add interactive spans. If not, just raw text.
        if (isTyping) {
            return (
                <pre className="whitespace-pre-wrap font-mono text-sm md:text-base leading-relaxed text-gray-300">
                    {codeText}
                    <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse ml-1 align-middle" />
                </pre>
            );
        }

        return (
            <pre className="whitespace-pre-wrap font-mono text-sm md:text-base leading-relaxed text-gray-300">
                <span className="text-purple-400">const</span> <span className="text-blue-400 animate-pulse">developer</span> <span className="text-white">=</span> {"{\n"}
                {"  "}name: <span className="text-green-400">"Anvaya Arsha"</span>,{"\n"}
                {"  "}role: <span className="text-green-400">"AI/ML Engineer"</span>,{"\n"}
                {"  "}education: <span className="text-green-400">"Vellore Institute of Technology (VIT)"</span>,{"\n"}
                {"  "}traits: {"[\n"}
                {"    "}<span 
                    onMouseEnter={() => setActiveTrait("AI/ML")}
                    onMouseLeave={() => setActiveTrait(null)}
                    className="text-green-400 cursor-pointer hover:text-white transition-colors hover:bg-white/10 px-1 rounded"
                >"AI/ML Expert"</span>,{"\n"}
                {"    "}<span 
                    onMouseEnter={() => setActiveTrait("Automation")}
                    onMouseLeave={() => setActiveTrait(null)}
                    className="text-green-400 cursor-pointer hover:text-white transition-colors hover:bg-white/10 px-1 rounded"
                >"Automation Enthusiast"</span>,{"\n"}
                {"    "}<span 
                    onMouseEnter={() => setActiveTrait("UI/UX")}
                    onMouseLeave={() => setActiveTrait(null)}
                    className="text-green-400 cursor-pointer hover:text-white transition-colors hover:bg-white/10 px-1 rounded"
                >"UI/UX Expert"</span>{"\n"}
                {"  ]"},{"\n"}
                {"  "}status: <span className="text-yellow-400">"Building the Future"</span>{"\n"}
                {"};"}
                <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse ml-1 align-middle" />
            </pre>
        );
    };

    return (
        <section 
            id="about" 
            className="py-16 md:py-32 bg-transparent text-white relative border-b border-white/5 overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={containerRef}
        >
            {/* Ambient Background Particle/Glow Field */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <motion.div 
                    style={{ 
                        x: useTransform(smoothMouseX, [-1, 1], [-50, 50]),
                        y: useTransform(smoothMouseY, [-1, 1], [-50, 50]),
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-NEON_GREEN/5 blur-[150px] rounded-full opacity-50" 
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                
                {/* Contextual HUD Readouts aligned to the grid */}
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex justify-between items-end w-full max-w-6xl mx-auto mb-4 text-[9px] md:text-[10px] text-gray-500 font-mono uppercase tracking-widest"
                >
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-CYBER_CYAN animate-pulse" />
                        COORDINATES: 23.3441° N, 85.3096° E
                    </div>
                    <div className="flex items-center gap-2">
                        SYS_MEM: {memoryValue.toFixed(2)}TB / 128.00TB
                    </div>
                </motion.div>

                {/* Unified System Console Frame */}
                <motion.div
                    style={isMobile ? {} : { rotateX, rotateY, transformPerspective: 1200 }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="max-w-6xl mx-auto relative group"
                >
                    {/* Visual Connector Line (Top) */}
                    <div className="hidden md:block absolute top-6 left-[45%] right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-NEON_GREEN/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    <div className="grid md:grid-cols-12 gap-0 border border-white/10 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-xl shadow-2xl relative z-10">
                        
                        {/* LEFT PANEL: Code Execution */}
                        <div className="md:col-span-5 bg-black/60 border-r border-white/10 p-6 flex flex-col relative">
                            {/* Window Chrome */}
                            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                                <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 hover:scale-110 hover:shadow-[0_0_10px_rgba(239,68,68,0.6)] transition-all cursor-pointer" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 hover:scale-110 hover:shadow-[0_0_10px_rgba(234,179,8,0.6)] transition-all cursor-pointer" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-400 hover:scale-110 hover:shadow-[0_0_10px_rgba(34,197,94,0.6)] transition-all cursor-pointer" />
                                <span className="ml-2 text-[10px] text-gray-500 font-mono tracking-widest">~/user_profile.json</span>
                            </div>

                            {/* Code Area */}
                            <div className="flex-1 overflow-x-auto custom-scrollbar relative">
                                {renderCode()}
                            </div>
                            
                            {/* Subtle Circuit Connector (Bottom) */}
                            <div className="hidden md:block absolute -right-[1px] bottom-16 w-4 h-[1px] bg-accent-NEON_GREEN/50 z-20" />
                        </div>

                        {/* RIGHT PANEL: Output Result */}
                        <div className="md:col-span-7 p-8 md:p-16 relative flex flex-col justify-center overflow-hidden">
                            {/* Connector Node */}
                            <div className="hidden md:block absolute left-[-4px] bottom-[63.5px] w-2 h-2 rounded-full bg-accent-NEON_GREEN shadow-[0_0_10px_rgba(0,255,65,0.8)] z-20" />

                            <motion.h2 
                                initial={{ filter: "blur(10px)", opacity: 0 }}
                                animate={inView ? { filter: "blur(0px)", opacity: 1 } : {}}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="text-4xl md:text-6xl font-black mb-6 text-white uppercase leading-none tracking-tighter"
                            >
                                Refactoring <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-NEON_GREEN to-accent-CYBER_CYAN relative inline-block">
                                    Reality
                                    <motion.span 
                                        animate={{ opacity: [0, 1, 0, 0, 1, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                                        className="absolute inset-0 text-accent-NEON_GREEN translate-x-[2px] opacity-0 mix-blend-screen"
                                    >
                                        Reality
                                    </motion.span>
                                </span>
                            </motion.h2>

                            <motion.p 
                                initial={{ opacity: 0, y: 10 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 1, delay: 0.7 }}
                                className="text-gray-400 text-base md:text-lg leading-relaxed mb-10 font-light max-w-xl"
                            >
                                I architect intelligent AI models and translate complex requirements into scalable, high-performance systems.
                                Merging the gap between <MagneticLink color="text-accent-NEON_GREEN">Machine Learning</MagneticLink> and <MagneticLink color="text-accent-CYBER_CYAN">Software Development</MagneticLink>.
                            </motion.p>

                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={inView ? { opacity: 1 } : {}}
                                transition={{ duration: 1, delay: 1 }}
                                className="grid grid-cols-2 gap-4"
                            >
                                <div className={`p-6 border border-white/10 rounded-xl transition-all duration-500 ${activeTrait === 'Automation' ? 'bg-accent-NEON_GREEN/10 border-accent-NEON_GREEN shadow-[0_0_20px_rgba(0,255,65,0.2)] scale-[1.02]' : 'hover:border-white/20'}`}>
                                    <h3 className="text-3xl font-black text-white flex items-baseline gap-1">
                                        <CountUp to={20} delay={1.2} /><span className="text-accent-NEON_GREEN text-xl">+</span>
                                    </h3>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">Deployments</p>
                                </div>
                                <div className={`p-6 border border-white/10 rounded-xl transition-all duration-500 ${activeTrait === 'AI/ML' ? 'bg-accent-CYBER_CYAN/10 border-accent-CYBER_CYAN shadow-[0_0_20px_rgba(0,243,255,0.2)] scale-[1.02]' : 'hover:border-white/20'}`}>
                                    <h3 className="text-3xl font-black text-white">
                                        <CountUp to={1} delay={1.4} />
                                    </h3>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">Year Exp.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    
                    {/* Glow Underneath */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-accent-NEON_GREEN/20 to-accent-CYBER_CYAN/20 opacity-0 blur-2xl group-hover:opacity-30 transition-opacity duration-1000 -z-10 rounded-[3rem]" />
                </motion.div>
            </div>
        </section>
    );
}
