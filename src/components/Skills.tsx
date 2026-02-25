"use client";

import { motion } from "framer-motion";
import { Box, MousePointer2, Rocket } from "lucide-react";

const skillCategories = [
    {
        title: "Frontend / UI Engineering",
        skills: ["React", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3 / Tailwind", "Three.js"],
    },
    {
        title: "Backend / Full-Stack",
        skills: ["Node.js", "Express.js", "FastAPI", "REST APIs", "JWT"],
    },
    {
        title: "AI / ML",
        skills: ["Python", "Machine Learning", "Streamlit", "LLMs", "Ollama"],
    },
    {
        title: "DESIGN_TOOLS",
        skills: ["Figma", "Adobe XD", "Adobe Illustrator", "WIX Studios", "Prototyping", "Wireframing"],
    },
];

export default function Skills() {
    return (
        <section id="skills" className="py-24 bg-transparent relative border-b border-white/5">
            <div className="container mx-auto px-6">
                <div className="mb-16 flex items-end gap-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white uppercase">System <span className="text-accent-CYBER_CYAN">Modules</span></h2>
                    <div className="h-1 flex-grow bg-white/10 relative top-[-10px]">
                        <div className="absolute right-0 top-[-4px] w-2 h-2 bg-accent-CYBER_CYAN animate-pulse" />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="p-1 border border-white/10 hover:border-accent-CYBER_CYAN transition-colors group"
                        >
                            <div className="bg-white/5 p-6 h-full">
                                <h3 className="text-sm font-bold text-accent-CYBER_CYAN mb-4 tracking-widest border-b border-white/10 pb-2">
                                    {category.title}
                                </h3>
                                <ul className="space-y-2">
                                    {category.skills.map((skill) => (
                                        <li key={skill} className="text-gray-400 text-sm hover:text-white flex items-center gap-2">
                                            <span className="w-1 h-1 bg-gray-600 group-hover:bg-accent-NEON_GREEN" />
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* --- NEW: Tech Stack Logos --- */}
                <div className="mt-32 relative">
                    {/* Background Glow - Optimized with Radial Gradient instead of Blur filter */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none opacity-20"
                        style={{
                            background: "radial-gradient(circle, rgba(0,255,65,0.4) 0%, rgba(0,0,0,0) 70%)"
                        }}
                    />

                    <div className="flex flex-col items-center mb-16 relative z-10">
                        <h3 className="text-3xl font-black text-white uppercase tracking-[0.2em] mb-2">
                            Skillset <span className="text-accent-NEON_GREEN">//</span> Matrix
                        </h3>
                        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-accent-NEON_GREEN to-transparent" />
                    </div>

                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                            {[
                                { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
                                { name: "Next.js", icon: "https://cdn.simpleicons.org/next.js/white" },
                                { name: "TailwindCSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
                                { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
                                { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
                                { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26" },
                                { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain.svg" },
                                { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
                                { name: "Express", icon: "https://cdn.simpleicons.org/express/white" },
                                { name: "Java", icon: "https://cdn.simpleicons.org/openjdk/white" },
                                { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
                                { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
                                { name: "GitHub", icon: "https://cdn.simpleicons.org/github/white" },
                                { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
                                { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
                                { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
                                { name: "GSAP", icon: "https://cdn.simpleicons.org/greensock/88CE02" },
                                { name: "Framer", icon: "https://cdn.simpleicons.org/framer/0055FF" },
                                { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
                                { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/white" },
                                { name: "Three.js", icon: "https://cdn.simpleicons.org/threedotjs/white" },
                                { name: "Blender", icon: "https://cdn.simpleicons.org/blender/F5792A" },
                                { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
                                { name: "WIX Studios", icon: "https://cdn.simpleicons.org/wix/0C6EBA" },
                                { name: "Adobe Creative Suite", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/adobecreativecloud.svg" },
                                { name: "Spline", icon: Box },
                                { name: "Cursor", icon: MousePointer2 },
                                { name: "Antigravity", icon: Rocket },
                            ].map((tech, i) => (
                                <motion.div
                                    key={tech.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.03 }}
                                    whileHover={{ y: -5 }}
                                    className="group relative"
                                >
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 group-hover:bg-white/10 group-hover:border-accent-NEON_GREEN/50 group-hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] backdrop-blur-sm">
                                        {typeof tech.icon === 'string' ? (
                                            <>
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={tech.icon}
                                                    alt={tech.name}
                                                    className="w-8 h-8 md:w-10 md:h-10 object-contain opacity-60 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0"
                                                />
                                            </>
                                        ) : (
                                            <tech.icon className="w-8 h-8 md:w-10 md:h-10 text-gray-400 group-hover:text-white transition-all duration-300" />
                                        )}
                                    </div>
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-accent-NEON_GREEN uppercase tracking-wider whitespace-nowrap">
                                        {tech.name}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
