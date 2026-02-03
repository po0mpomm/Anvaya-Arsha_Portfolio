"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Github, Code, Palette, Terminal, Layers, Loader2 } from "lucide-react";
import { useRef } from "react";


const designerProjects = [
    {
        title: "LYFEINDEX_DESIGN",
        tags: "[3D, Web, Space_Theme]",
        description: "Preserving every story, honoring every legacy. A cosmic journey through life's index.",
        image: "lyfeindex",
        customImage: "/assets/lyfeindex.png"
    },
    {
        title: "PEHCHAAN_APP",
        tags: "[UI/UX, Mobile_App, Branding]",
        description: "Digital identity platform for rural India. Focused on accessibility and simplified user flows.",
        image: "pehchaan"
    },
    {
        title: "CYBER_CONCLAVE",
        tags: "[Web_Design, Futuristic, Event]",
        description: "Official registration portal for the National Cyber Summit. Matrix-inspired visual identity.",
        image: "cyber"
    },
    {
        title: "ADVITYA_2023",
        tags: "[Creative, Cultural_Fest, Art_Direction]",
        description: "Immersive event website for VIT Bhopal's annual fest. Featuring parallax storytelling.",
        image: "advitya"
    },
    {
        title: "ED_SYNAPSE",
        tags: "[SaaS, Dark_Mode, EdTech]",
        description: "AI-powered learning ecosystem with a space-themed minimal interface.",
        image: "edsynapse"
    }
];

const developerProjects = [
    {
        title: "EXPENSE_TRACKER_CORE",
        tags: "[MERN, JWT, SQL]",
        description: "Full-stack finance management kernel. Secure auth & real-time analytics.",
        status: "DEPLOYED",
        github: "#",
        demo: "#"
    },
    {
        title: "DISEASE_PRED_SYS",
        tags: "[Python, ML, Streamlit]",
        description: "AI-driven health analysis engine. 95% accuracy in trend prediction.",
        status: "BETA",
        github: "#",
        demo: "#"
    },
    {
        title: "AI_VOICE_AGENT",
        tags: "[FastAPI, Gemini, TTS]",
        description: "Real-time conversational AI with voice synthesis pipeline.",
        status: "PROTOTYPE",
        github: "#",
        demo: "#"
    },
    {
        title: "AI_FITNESS_COACH",
        tags: "[Python, Computer_Vision, AI]",
        description: "Real-time posture analysis and rep counting system using pose estimation.",
        status: "LIVE_BETA",
        github: "https://github.com/po0mpomm/AI-Fitness-Coach-",
        demo: "#"
    },
    {
        title: "ECOM_CART_CORE",
        tags: "[React, Redux, Node.js]",
        description: "Scalable e-commerce cart architecture with state management and persistent storage.",
        status: "DEV",
        github: "https://github.com/po0mpomm/Ecom-cart",
        demo: "#"
    }
];

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <section id="projects" ref={containerRef} className="bg-transparent relative overflow-hidden">

            {/* --- PART 1: DESIGNER ANVAYA --- */}
            <div className="relative py-24">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-4 mb-2">
                            <Palette className="text-accent-CYBER_CYAN" size={32} />
                            <span className="text-accent-CYBER_CYAN tracking-[0.5em] text-xs font-bold uppercase">Persona_01</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
                            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-CYBER_CYAN to-blue-500">Designer</span> Anvaya
                        </h2>
                        <p className="max-w-xl text-gray-400 mt-6 text-lg border-l-2 border-accent-CYBER_CYAN pl-6">
                            Crafting immersive digital experiences where aesthetics meet functionality.
                        </p>
                    </motion.div>

                    {/* Horizontal Scroll Layout for Designer Projects */}
                    <div className="relative group/scroll">
                        {/* Fade Masks */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

                        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory px-4 md:px-0">
                            {designerProjects.map((project, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="group relative min-w-[320px] md:min-w-[420px] aspect-[4/5] bg-neutral-900 rounded-xl overflow-hidden snap-center border border-white/5 hover:border-accent-CYBER_CYAN/50 transition-all shadow-2xl"
                                >
                                    {/* Abstract Artistic Backgrounds based on project type */}
                                    {/* If customImage exists, show it. Otherwise show abstract gradient */}
                                    {project.customImage ? (
                                        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                                            <img
                                                src={project.customImage}
                                                alt={project.title}
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                            />
                                            {/* Gradient Overlay for text readability */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                        </div>
                                    ) : (
                                        <div className={`absolute inset-0 transition-transform duration-700 group-hover:scale-110 opacity-60
                                            ${project.image === 'pehchaan' ? 'bg-gradient-to-br from-orange-500/20 via-red-900/40 to-black' : ''}
                                            ${project.image === 'cyber' ? 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-500/30 via-black to-black' : ''}
                                            ${project.image === 'advitya' ? 'bg-gradient-to-bl from-purple-600/30 via-pink-900/20 to-black' : ''}
                                            ${project.image === 'edsynapse' ? 'bg-gradient-to-b from-blue-600/20 via-indigo-900/30 to-black' : ''}
                                        `} />
                                    )}

                                    {/* Overlay Pattern */}
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                                    <div className="relative z-20 h-full flex flex-col justify-end p-8">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Layers className="text-accent-CYBER_CYAN" size={18} />
                                                <span className="text-[10px] uppercase tracking-widest text-accent-CYBER_CYAN font-bold">{project.tags}</span>
                                            </div>

                                            <h3 className="text-3xl font-black text-white mb-2 leading-none">{project.title.replace('_', ' ')}</h3>

                                            <p className="text-sm text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                {project.description}
                                            </p>

                                            <button className="mt-6 text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-white/50 group-hover:text-white transition-colors">
                                                View Case Study <ExternalLink size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            {/* --- PART 2: DEVELOPER ARSHA --- */}
            <div className="relative py-24">
                <div className="absolute inset-0 bg-gradient-to-b from-accent-NEON_GREEN/5 to-transparent pointer-events-none" />

                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-16 text-right"
                    >
                        <div className="flex items-center gap-4 mb-2 justify-end">
                            <span className="text-accent-NEON_GREEN tracking-[0.5em] text-xs font-bold uppercase">Persona_02</span>
                            <Terminal className="text-accent-NEON_GREEN" size={32} />
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
                            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-NEON_GREEN to-emerald-600">Developer</span> Arsha
                        </h2>
                        <p className="max-w-xl text-gray-400 mt-6 text-lg border-r-2 border-accent-NEON_GREEN pr-6 ml-auto">
                            Architecting robust systems with clean code and scalable logic.
                            Specializing in <span className="text-accent-NEON_GREEN">Full-Stack</span>, <span className="text-accent-NEON_GREEN">AI Intergration</span>, and <span className="text-accent-NEON_GREEN">Performance</span>.
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {developerProjects.map((project, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.15, duration: 0.5 }}
                                className="group relative border border-white/10 bg-black hover:bg-white/5 hover:border-accent-NEON_GREEN transition-all p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Code className="text-gray-500 group-hover:text-accent-NEON_GREEN transition-colors" size={20} />
                                        <h3 className="text-2xl font-bold text-white group-hover:text-accent-NEON_GREEN transition-colors">{project.title}</h3>
                                        <span className="text-[10px] border border-white/20 px-2 py-0.5 text-gray-400 rounded-full">{project.status}</span>
                                    </div>
                                    <p className="text-accent-NEON_GREEN/80 font-mono text-xs mb-3">{project.tags}</p>
                                    <p className="text-gray-400 max-w-2xl">{project.description}</p>
                                </div>

                                <div className="flex gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-accent-NEON_GREEN font-mono text-sm uppercase">
                                        [ <Github size={16} /> Source ]
                                    </a>
                                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:text-accent-NEON_GREEN font-mono text-sm uppercase">
                                        [ <ExternalLink size={16} /> Demo ]
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
}
