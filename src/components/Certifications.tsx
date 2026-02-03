"use client";

import { motion } from "framer-motion";
import { Award, CheckCircle, ExternalLink, ShieldCheck, Database, Cpu, Code, Layers } from "lucide-react";
import { useState } from "react";

const certifications = [
    {
        title: "Full Stack Developer MERN",
        issuer: "SmartBridge Indonesia",
        date: "Apr 2025",
        id: "CC-FSD-2025-12750",
        skills: ["MongoDB", "Express.js", "Node.js", "React.js"],
        icon: <Layers className="text-orange-400" size={32} />,
        link: "#" // Placeholder
    },
    {
        title: "GEN AI Specialist",
        issuer: "AdroIT Technologies",
        date: "Nov 2025",
        id: "PC9DiL58sp",
        skills: ["Generative AI", "LLMs", "Prompt Eng."],
        icon: <Cpu className="text-purple-400" size={32} />,
        link: "#"
    },
    {
        title: "Enterprise Gen AI",
        issuer: "IBM",
        date: "Apr 2025",
        id: "ae9dbf4b87...",
        skills: ["AI Strategy", "Cloud Integration"],
        icon: <Cpu className="text-blue-500" size={32} />,
        link: "#"
    },
    {
        title: "Applied Machine Learning",
        issuer: "University of Michigan",
        date: "Jan 2024",
        id: "LQHXUNRG3PMF",
        skills: ["Python", "Machine Learning", "Data Science"],
        icon: <Database className="text-yellow-400" size={32} />,
        link: "#"
    },
    {
        title: "C / C++ Programming",
        issuer: "Shineskill Software",
        date: "May 2023",
        id: "Credential Verified",
        skills: ["C++", "C", "System Prog."],
        icon: <Code className="text-blue-400" size={32} />,
        link: "#"
    },
    {
        title: "Java Programming",
        issuer: "Shineskill Software",
        date: "Jun 2023",
        id: "Credential Verified",
        skills: ["Java", "OOPs", "Backend"],
        icon: <Code className="text-red-400" size={32} />,
        link: "#"
    }
];

export default function Certifications() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="py-32 bg-transparent relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-CYBER_CYAN/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-NEON_GREEN/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Section Header */}
                <div className="mb-20 text-center relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4">
                            <ShieldCheck size={14} className="text-accent-CYBER_CYAN" />
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Verified Credentials</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                            Authorized <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-CYBER_CYAN to-blue-500">Certifications</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-accent-CYBER_CYAN to-transparent mx-auto" />
                    </motion.div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certifications.map((cert, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group relative h-full"
                        >
                            {/* Card Container */}
                            <div className="relative h-full bg-black/40 backdrop-blur-xl border border-white/10 p-8 overflow-hidden transition-all duration-500 hover:border-accent-CYBER_CYAN/50 group-hover:shadow-[0_0_30px_rgba(0,183,255,0.1)]">

                                {/* Hover Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent-CYBER_CYAN/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {/* Header: Icon & Date */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover:border-accent-CYBER_CYAN/30 transition-colors">
                                        {cert.icon}
                                    </div>
                                    <span className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-1 rounded bg-black/50">
                                        {cert.date}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="mb-6 relative z-10">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-CYBER_CYAN transition-colors line-clamp-2">
                                        {cert.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 mb-1">{cert.issuer}</p>
                                    <p className="text-[10px] text-gray-600 font-mono uppercase tracking-wider">ID: {cert.id}</p>
                                </div>

                                {/* Skills & Link */}
                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {cert.skills.map((skill, sIdx) => (
                                            <span
                                                key={sIdx}
                                                className="text-[10px] px-2 py-1 bg-white/5 text-gray-300 border border-white/5 rounded hover:border-accent-CYBER_CYAN/30 hover:text-accent-CYBER_CYAN transition-colors cursor-default"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="pt-4 border-t border-white/5 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity">
                                        <span className="text-xs text-accent-CYBER_CYAN font-bold flex items-center gap-1">
                                            <CheckCircle size={12} /> VERIFIED
                                        </span>
                                        <button className="text-xs flex items-center gap-2 text-white hover:text-accent-CYBER_CYAN transition-colors uppercase font-bold tracking-wider">
                                            View Credential <ExternalLink size={12} />
                                        </button>
                                    </div>
                                </div>

                                {/* Decorative Corners */}
                                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accent-CYBER_CYAN/0 group-hover:border-accent-CYBER_CYAN/50 transition-all duration-500" />
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-accent-CYBER_CYAN/0 group-hover:border-accent-CYBER_CYAN/50 transition-all duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
