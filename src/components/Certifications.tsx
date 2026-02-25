"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
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

// --- 3D INTERACTIVE TILT CARD COMPONENT ---
const TiltCard = ({ cert, idx }: { cert: any, idx: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Mouse Position Trackers
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring Physics for smooth settling
    const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
    const glowX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
    const glowY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();

        // Calculate mouse position relative to card center (-0.5 to 0.5)
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;

        mouseX.set(xPct);
        mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="perspective-[1500px] h-full"
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX: isHovered ? rotateX : 0,
                    rotateY: isHovered ? rotateY : 0,
                    transformStyle: "preserve-3d",
                }}
                className="group relative h-full w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-8 transition-colors duration-300 hover:border-accent-CYBER_CYAN/50 cursor-pointer"
            >
                {/* --- HOLOGRAPHIC GLARE EFFECT --- */}
                <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 mix-blend-screen pointer-events-none transition-opacity duration-300"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                600px circle at ${glowX}% ${glowY}%,
                                rgba(0, 255, 65, 0.1),
                                rgba(0, 183, 255, 0.05) 40%,
                                transparent 80%
                            )
                        `
                    }}
                />

                {/* --- INTERIOR PARALLAX CONTENT --- */}
                <div style={{ transform: "translateZ(30px)" }} className="relative z-10 h-full flex flex-col justify-between">

                    <div>
                        {/* Header: Icon & Date */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover:border-accent-CYBER_CYAN/30 transition-colors shadow-lg">
                                {cert.icon}
                            </div>
                            <span className="text-[10px] font-mono text-gray-400 border border-white/10 px-2 py-1 rounded bg-black/60 shadow-inner">
                                {cert.date}
                            </span>
                        </div>

                        {/* Text Content */}
                        <div className="mb-6">
                            <h3 className="text-xl font-black text-white mb-2 group-hover:text-accent-CYBER_CYAN transition-colors line-clamp-2 drop-shadow-md">
                                {cert.title}
                            </h3>
                            <p className="text-sm text-gray-400 mb-2 font-light">{cert.issuer}</p>
                            <div className="inline-block px-2 py-1 bg-black/50 border border-white/5 rounded text-[9px] text-gray-500 font-mono tracking-widest">
                                ID: {cert.id}
                            </div>
                        </div>

                        {/* Skills/Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {cert.skills.map((skill: string, sIdx: number) => (
                                <span
                                    key={sIdx}
                                    className="text-[10px] px-2 py-1 bg-white/5 text-gray-300 border border-white/10 rounded-sm group-hover:border-accent-CYBER_CYAN/30 transition-colors shadow-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Footer / Link */}
                    <div style={{ transform: "translateZ(20px)" }} className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[10px] text-accent-CYBER_CYAN font-bold flex items-center gap-1.5 tracking-widest">
                            <CheckCircle size={14} className="opacity-80" /> VERIFIED
                        </span>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-[10px] flex items-center gap-2 text-white group-hover:text-accent-CYBER_CYAN transition-colors font-bold tracking-widest uppercase bg-white/5 group-hover:bg-accent-CYBER_CYAN/10 px-3 py-1.5 rounded-full border border-transparent group-hover:border-accent-CYBER_CYAN/30"
                        >
                            View <ExternalLink size={12} />
                        </motion.button>
                    </div>

                </div>

                {/* Decorative Cyber Corners */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent-CYBER_CYAN/0 group-hover:border-accent-CYBER_CYAN/60 transition-all duration-500 rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent-CYBER_CYAN/0 group-hover:border-accent-CYBER_CYAN/60 transition-all duration-500 rounded-bl-xl" />
            </motion.div>
        </motion.div>
    );
};

export default function Certifications() {

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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {certifications.map((cert, idx) => (
                        <TiltCard key={idx} cert={cert} idx={idx} />
                    ))}
                </div>

            </div>
        </section>
    );
}
