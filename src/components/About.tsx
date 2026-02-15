"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section id="about" className="py-16 md:py-32 bg-transparent text-white relative border-b border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-start">

                    {/* Terminal Window Graphic */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="border border-white/20 bg-black rounded-lg overflow-hidden font-mono text-sm"
                    >
                        <div className="bg-white/10 p-2 flex gap-2 items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="ml-2 text-xs text-gray-500">user_profile.json</span>
                        </div>
                        <div className="p-6 text-gray-300 space-y-2">
                            <p><span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = {"{"}</p>
                            <p className="pl-4">name: <span className="text-green-400">"Anvaya Arsha"</span>,</p>
                            <p className="pl-4">role: <span className="text-green-400">"Full-Stack Developer"</span>,</p>
                            <p className="pl-4">education: <span className="text-green-400">"B.Tech CSE @ VIT Bhopal"</span>,</p>
                            <p className="pl-4">traits: [<span className="text-green-400">"UI/UX Expert"</span>, <span className="text-green-400">"AI/ML Enthusiast"</span>],</p>
                            <p className="pl-4">status: <span className="text-yellow-400">"Building the Future"</span></p>
                            <p>{"}"};</p>
                        </div>
                    </motion.div>

                    {/* Visual Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-8 text-white uppercase">
                            Refactoring <br />
                            <span className="text-accent-NEON_GREEN">Reality</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6 font-light">
                            I translate complex user requirements into elegant, high-performance code.
                            Merging the gap between <span className="text-white border-b border-accent-NEON_GREEN">Design Logic</span> and <span className="text-white border-b border-accent-CYBER_CYAN">Software Development</span>.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <div className="p-4 border border-white/10 hover:border-accent-NEON_GREEN transition-colors">
                                <h3 className="text-2xl font-bold text-accent-NEON_GREEN">20+</h3>
                                <p className="text-xs text-gray-500 uppercase">Deployments</p>
                            </div>
                            <div className="p-4 border border-white/10 hover:border-accent-CYBER_CYAN transition-colors">
                                <h3 className="text-2xl font-bold text-accent-CYBER_CYAN">10</h3>
                                <p className="text-xs text-gray-500 uppercase">Months Exp.</p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
