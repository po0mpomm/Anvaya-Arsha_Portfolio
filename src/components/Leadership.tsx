"use client";

import { motion } from "framer-motion";
import { Award, Users, Terminal } from "lucide-react";

const items = [
    {
        icon: <Users size={24} />,
        title: "Head_of_Design",
        context: "VITronix Club",
        description: "Led 6 designers. Managed UI/UX for campus events."
    },
    {
        icon: <Users size={24} />,
        title: "Core_Member",
        context: "Sports Club",
        description: "Organized 5+ tournaments. 200+ participants logistics."
    },
    {
        icon: <Award size={24} />,
        title: "Summer_of_Bitcoin",
        context: "2025 Proposal",
        description: "Advanced to Proposal Round. Graphic & Analytical skills."
    },
    {
        icon: <Award size={24} />,
        title: "Silver_Medalist",
        context: "Aarambh Cricket",
        description: "Represented VIT Bhopal. Team Strategy & Execution."
    },
];

export default function Leadership() {
    return (
        <section className="py-24 bg-black text-white border-t border-white/5">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold mb-16 text-center uppercase tracking-widest">
                    <span className="text-accent-NEON_GREEN">sudo</span> list_achievements
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((item, idx) => (
                        <motion.div
                            key={idx}
                            className="p-6 border border-white/10 bg-black hover:bg-white/5 hover:border-accent-NEON_GREEN transition-all group"
                        >
                            <div className="mb-4 text-gray-400 group-hover:text-accent-NEON_GREEN transition-colors flex justify-between items-start">
                                {item.icon}
                                <Terminal size={14} className="opacity-20 group-hover:opacity-100" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                            <p className="text-xs text-accent-CYBER_CYAN font-mono mb-4">@ {item.context}</p>
                            <p className="text-gray-400 text-xs leading-relaxed font-mono">
                                {">"} {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
