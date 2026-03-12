"use client";

import { motion } from "framer-motion";
import { Terminal, Cpu, Network } from "lucide-react";

const experiences = [
    {
        company: "LabelNest.inc",
        role: "Web & Brand Intern",
        period: "Nov 2025 - Feb 2026",
        tech: "React // Next.js // Branding",
        description: "Architecting digital brand structures & optimizing user-facing platforms for maximum engagement.",
        icon: <Network size={20} />
    },
    {
        company: "MIXLabs Creative",
        role: "UI/UX & Full-Stack Intern",
        period: "2024 – 2024",
        tech: "Figma // AI Assets // Frontend",
        description: "Executed UI/UX workflows and frontend modules. Developed AI-generated assets for production.",
        icon: <Cpu size={20} />
    }
];

// --- Cinematic Animation Variants ---
const baseEasing = [0.16, 1, 0.3, 1] as const;

const cardReveal = {
    hidden: (index: number) => ({
        opacity: 0,
        filter: "blur(10px)",
        x: index % 2 === 0 ? 50 : -50,
        scale: 0.95
    }),
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        x: 0,
        scale: 1,
        transition: { duration: 1.2, ease: baseEasing }
    }
};

export default function Experience() {
    return (
        <section id="experience" className="py-12 md:py-24 bg-transparent text-white border-b border-white/5 relative overflow-hidden">
            {/* Background Grid Decoration */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.h2 
                    initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: baseEasing }}
                    className="text-4xl font-bold mb-16 text-center uppercase tracking-widest text-white flex justify-center items-center gap-4"
                >
                    <Terminal className="text-accent-NEON_GREEN" />
                    <span className="text-accent-NEON_GREEN">/</span> Execution_Log
                </motion.h2>

                <div className="relative max-w-4xl mx-auto space-y-8">
                    {/* Vertical Connecting Line */}
                    <motion.div 
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: baseEasing }}
                        className="absolute left-4 md:left-[50%] top-0 w-[1px] bg-white/10 hidden md:block origin-top" 
                    />

                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                        >
                            {/* Timeline Node */}
                            <motion.div 
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.2 + 0.3, ease: baseEasing }}
                                className="absolute left-4 md:left-[50%] w-3 h-3 bg-black border border-accent-NEON_GREEN transform md:-translate-x-1.5 hidden md:block"
                            >
                                <div className="absolute inset-0 bg-accent-NEON_GREEN opacity-50 animate-ping" />
                            </motion.div>

                            {/* Card */}
                            <motion.div
                                custom={index}
                                variants={cardReveal}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="w-full md:w-[calc(50%-2rem)] group"
                            >
                                <div className="relative border border-white/10 bg-black/40 backdrop-blur-sm hover:border-accent-NEON_GREEN/50 transition-all duration-300 p-4 md:p-6 overflow-hidden">

                                    {/* Cyber Corner Accents */}
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent-NEON_GREEN opacity-50 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent-NEON_GREEN opacity-50 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent-NEON_GREEN opacity-50 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent-NEON_GREEN opacity-50 group-hover:opacity-100 transition-opacity" />

                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-accent-NEON_GREEN transition-colors">{exp.role}</h3>
                                            <div className="flex items-center gap-2 text-accent-CYBER_CYAN text-xs font-mono tracking-wider mt-1">
                                                <span>@ {exp.company}</span>
                                            </div>
                                        </div>
                                        <div className="p-2 bg-white/5 border border-white/10 rounded-sm text-accent-NEON_GREEN">
                                            {exp.icon}
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <p className="text-gray-400 font-light text-xs md:text-sm leading-relaxed mb-4">
                                        {exp.description}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
                                            {exp.period}
                                        </span>
                                        <span className="text-[10px] uppercase tracking-widest text-accent-CYBER_CYAN/50 group-hover:text-accent-CYBER_CYAN transition-colors">
                                            {exp.tech}
                                        </span>
                                    </div>

                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
