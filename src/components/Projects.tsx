"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ExternalLink, Github, Code, Palette, Terminal, Layers, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

const designerProjects = [
    {
        title: "LYFEINDEX_DESIGN",
        tags: ["3D", "Web", "Space_Theme"],
        description: "Preserving every story, honoring every legacy. A cosmic journey through life's index.",
        customImage: "/assets/lyfeindex.png"
    },
    {
        title: "PEHCHAAN_APP",
        tags: ["UI/UX", "Mobile_App", "Branding"],
        description: "Digital identity platform for rural India. Focused on accessibility and simplified user flows.",
        customImage: "/assets/pehchaan.jpg"
    },
    {
        title: "STACKSTORE",
        tags: ["UI/UX", "E-commerce", "Web_Design"],
        description: "Modern & clean e-commerce website design featuring luxury brand integration and user-friendly navigation.",
        customImage: "/assets/stackstore.jpg",
        link: "https://www.figma.com/proto/MwoJQ0Q8pwZHHL3917p78Y/StackStore--Ecom-Website-?page-id=0%3A1&node-id=1-2&viewport=164%2C-162%2C0.5&t=MBawO3ofccwqQ2Tm-1&scaling=scale-down&content-scaling=fixed"
    },
    {
        title: "CYBER_CONCLAVE",
        tags: ["Web_Design", "Futuristic", "Event"],
        description: "Official registration portal for the National Cyber Summit. Matrix-inspired visual identity.",
        customImage: "/assets/cyber_conclave.jpg"
    },
    {
        title: "ADVITYA_2023",
        tags: ["Creative", "Cultural_Fest", "Art_Direction"],
        description: "Immersive event website for VIT Bhopal's annual fest. Featuring parallax storytelling.",
        customImage: "/assets/advitya.jpg"
    },
    {
        title: "ED_SYNAPSE",
        tags: ["SaaS", "Dark_Mode", "EdTech"],
        description: "AI-powered learning ecosystem with a space-themed minimal interface.",
        customImage: "/assets/edsynapse.jpg"
    },
    {
        title: "LYFEINDEX_D2",
        tags: ["UI/UX", "Memorial", "Timeless"],
        description: "A heritage preservation platform. Timeless design meeting modern digital legacy.",
        customImage: "/assets/lyfeindex_2.png",
        link: "https://www.figma.com/proto/xYoW4uYQunHXpQqCQGiUzg/Untitled?node-id=1-2"
    },
    {
        title: "KAHANI_MANCH",
        tags: ["Web_Design", "Cultural", "Calligraphy"],
        description: "Official portal for the Hindi Club. Blending traditional Indian aesthetics with modern web usability.",
        customImage: "/assets/kahani_manch.png",
        link: "https://www.figma.com/design/LIixmBBhDHk5tuf8IfbnqP/Hindi-Club?node-id=0-1"
    }
];

// 3D Tilt Card Component with Scroll-Driven Reveal
function DesignerProjectCard({ project, index }: { project: typeof designerProjects[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    // Scroll-driven reveal/hide logic
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
    const translateY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            style={{
                rotateX,
                rotateY,
                opacity,
                scale,
                y: translateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative w-full aspect-[4/5] bg-neutral-900/50 rounded-2xl overflow-hidden border border-white/10 hover:border-accent-CYBER_CYAN/50 transition-colors shadow-2xl backdrop-blur-sm"
        >
            {/* Full-bleed Image with Top Alignment */}
            <div 
               style={{ transform: "translateZ(-20px)" }}
               className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
            >
                <img
                    src={project.customImage}
                    alt={project.title}
                    className="w-full h-full object-cover object-top opacity-60 group-hover:opacity-80 transition-opacity"
                />
                {/* Deeper gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90" />
            </div>

            {/* Content Container */}
            <div 
                style={{ transform: "translateZ(50px)" }}
                className="relative z-20 h-full flex flex-col justify-end p-8"
            >
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-accent-CYBER_CYAN">
                           ({project.tags.join(', ').toUpperCase()})
                        </span>
                    </div>

                    <h3 className="text-3xl font-black text-white leading-tight uppercase tracking-tight">
                        {project.title.replace(/_/g, ' ')}
                    </h3>

                    <div className="pt-2">
                        {project.link ? (
                            <a 
                                href={project.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors"
                            >
                                Figma link <ArrowRight size={14} />
                            </a>
                        ) : (
                             <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
                                Figma link <ArrowRight size={14} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Glowing accent highlight */}
            <div className="absolute inset-0 border-2 border-accent-CYBER_CYAN/0 group-hover:border-accent-CYBER_CYAN/20 transition-all duration-500 rounded-2xl pointer-events-none" />
        </motion.div>
    );
}

const developerProjects = [
    {
        title: "DWELLO_AI",
        tags: "[n8n, Real-Estate, AI_Agent]",
        description: "Intelligent Real Estate AI Agent powered by n8n. Automating lead generation and property matching.",
        status: "NEW",
        github: "https://github.com/po0mpomm/Real-estate-n8n-Agent",
        demo: "#"
    },
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
        github: "https://github.com/po0mpomm/Disease-Prediction-model",
        demo: "#"
    },
    {
        title: "AI_VOICE_AGENT",
        tags: "[FastAPI, Gemini, TTS]",
        description: "Real-time conversational AI with voice synthesis pipeline.",
        status: "PROTOTYPE",
        github: "https://github.com/po0mpomm/AI-Voice-Agent",
        demo: "https://ai-voice-agent-nihg.onrender.com/"
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

    return (
        <section id="projects" ref={containerRef} className="bg-transparent relative overflow-hidden py-24">
            
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-accent-CYBER_CYAN/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-accent-NEON_GREEN/10 blur-[100px] rounded-full" />
            </div>

            {/* --- PART 1: DESIGNER ANVAYA --- */}
            <div className="container mx-auto px-6 relative z-10 mb-32">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center md:text-left"
                >
                    <div className="inline-flex items-center gap-4 mb-4">
                        <Palette className="text-accent-CYBER_CYAN" size={24} />
                        <span className="text-accent-CYBER_CYAN tracking-[0.4em] text-[12px] font-bold uppercase">Persona_01</span>
                    </div>
                    
                    <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-8">
                        Meet <span className="text-accent-CYBER_CYAN">designer</span> <br />
                        Anvaya
                    </h2>
                    
                    <p className="max-w-xl text-gray-400 text-lg font-medium leading-relaxed">
                        Crafting immersive digital experiences where aesthetics meet functionality.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {designerProjects.map((project, i) => (
                        <DesignerProjectCard key={i} project={project} index={i} />
                    ))}
                </div>
            </div>


{/* --- PART 2: DEVELOPER ARSHA --- */}
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center md:text-right"
                >
                    <div className="inline-flex items-center gap-4 mb-4 px-4 py-2 bg-accent-NEON_GREEN/10 border border-accent-NEON_GREEN/20 rounded-full md:ml-auto">
                        <span className="text-accent-NEON_GREEN tracking-[0.3em] text-[10px] font-bold uppercase">Persona_02</span>
                        <Terminal className="text-accent-NEON_GREEN" size={20} />
                    </div>
                    
                    <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-8">
                        Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-NEON_GREEN to-emerald-600">Developer</span> <br />
                        Arsha
                    </h2>
                    
                    <p className="max-w-xl text-gray-400 text-lg border-r-4 border-accent-NEON_GREEN pr-8 py-2 font-medium md:ml-auto">
                        Engineering robust backends and intelligent algorithms. Where logic dictates form and performance is the ultimate metric.
                    </p>
                </motion.div>

                {/* Terminal Dashboard */}
                <div className="relative border border-white/10 bg-[#050505] rounded-xl overflow-hidden shadow-2xl">
                    {/* Terminal Header */}
                    <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="text-[10px] uppercase font-mono text-gray-500 tracking-widest">
                            root@arsha:~/projects --active_kernels: 05
                        </div>
                        <div className="w-12 h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="w-1/2 h-full bg-accent-NEON_GREEN/50"
                            />
                        </div>
                    </div>

                    {/* Project Rows */}
                    <div className="divide-y divide-white/10">
                        {developerProjects.map((project, i) => (
                            <DeveloperProjectRow key={i} project={project} index={i} />
                        ))}
                    </div>

                    {/* Terminal Footer */}
                    <div className="bg-white/5 p-3 flex justify-between items-center text-[8px] md:text-[10px] font-mono text-accent-NEON_GREEN/50 uppercase tracking-tighter">
                        <span>[ System Status: Optimal ]</span>
                        <span className="animate-pulse">_ Awaiting Input...</span>
                        <span>v2.0.4-LTS</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Sub-component for Developer Project Row
function DeveloperProjectRow({ project, index }: { project: typeof developerProjects[0]; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative p-6 md:p-10 transition-all hover:bg-accent-NEON_GREEN/[0.02]"
        >
            {/* Scanner Effect */}
            <div className="absolute left-0 top-0 h-full w-1 bg-accent-NEON_GREEN opacity-0 group-hover:opacity-100 group-hover:h-full transition-all duration-300 origin-top" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-accent-NEON_GREEN opacity-50">0{index + 1}</span>
                        <h3 className="text-2xl md:text-4xl font-black text-white group-hover:text-accent-NEON_GREEN transition-colors uppercase tracking-tight">
                            {project.title.replace(/_/g, ' ')}
                        </h3>
                        {isHovered && (
                            <motion.span 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-[10px] font-mono px-2 py-1 border border-accent-NEON_GREEN/30 text-accent-NEON_GREEN rounded animate-pulse"
                            >
                                {project.status}
                            </motion.span>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] md:text-xs">
                         <div className="flex items-center gap-2">
                            <span className="text-gray-500">TAGS:</span>
                            <span className="text-accent-NEON_GREEN underline decoration-accent-NEON_GREEN/30 underline-offset-4">{project.tags}</span>
                         </div>
                         <div className="hidden md:flex items-center gap-2">
                            <span className="text-gray-500">TYPE:</span>
                            <span className="text-white">Core System</span>
                         </div>
                         <div className="hidden lg:flex items-center gap-2">
                            <span className="text-gray-500">UPTIME:</span>
                            <span className="text-white">99.9%</span>
                         </div>
                    </div>

                    <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
                        {project.description}
                    </p>
                </div>

                <div className="flex flex-row md:flex-col lg:flex-row items-center gap-4 md:items-end lg:items-center">
                    <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-md hover:border-accent-NEON_GREEN/50 hover:bg-accent-NEON_GREEN/5 transition-all text-[10px] font-mono uppercase text-white hover:text-accent-NEON_GREEN"
                    >
                        <Github size={14} /> Source
                    </a>
                    <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-md hover:bg-accent-NEON_GREEN transition-all text-[10px] font-bold uppercase"
                    >
                        <ExternalLink size={14} /> Live Demo
                    </a>
                </div>
            </div>

            {/* Grid background on hover */}
            <div className={`absolute inset-0 bg-[url('/grid.svg')] bg-[size:40px_40px] opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none`} />
        </motion.div>
    );
}
