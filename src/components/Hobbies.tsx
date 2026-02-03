"use client";

import { motion } from "framer-motion";
import { Gamepad2 } from "lucide-react";
import dynamic from "next/dynamic";

const HobbiesModel = dynamic(() => import("./canvas/HobbiesModel"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-neutral-900/50 animate-pulse" />
});

const ChessModel = dynamic(() => import("./canvas/ChessModel"), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-neutral-900/50 animate-pulse" />
});

const SplineItem = ({ scene }: { scene: string }) => (
    <div className="w-full h-64 relative mb-6 rounded-xl overflow-hidden border border-white/10 bg-black/50">
        <iframe src={scene} frameBorder='0' width='100%' height='100%'></iframe>
    </div>
);

export default function Hobbies() {
    return (
        <section id="hobbies" className="py-24 bg-black text-white border-t border-white/5 relative overflow-hidden">

            {/* Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.05)_0%,transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold mb-16 text-center uppercase tracking-widest relative z-10">
                    <span className="text-accent-NEON_GREEN">Social</span> // Hobbies
                </h2>

                <div className="grid lg:grid-cols-3 gap-8 items-center">

                    {/* LEFT COLUMN - CHESS */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-neutral-900/50 border border-white/10 p-8 rounded-xl backdrop-blur-sm hover:border-accent-NEON_GREEN/50 transition-all text-center lg:text-left h-full flex flex-col justify-center"
                    >
                        {/* 3D CHESS PLACEHOLDER */}
                        <div className="w-full h-64 relative mb-6 rounded-xl overflow-hidden border border-white/10 bg-black/50">
                            <ChessModel />
                        </div>

                        <h3 className="text-3xl font-black mb-4 uppercase text-white">
                            Lets explore some<br /><span className="text-gray-500">GAMBIT</span>
                        </h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Knows little bit of chess...<br />
                            like to play chess
                        </p>
                        <div className="mb-6 text-sm text-gray-400">
                            Connect me on <a href="https://www.chess.com/member/Anvaya_Arsha" target="_blank" className="text-accent-NEON_GREEN hover:underline">chess.com</a>
                            <br />
                            Username - <span className="font-mono text-white">Anvaya_Arsha</span>
                        </div>
                        <div className="flex gap-4 justify-center lg:justify-start text-xs font-mono text-accent-NEON_GREEN">
                            <span className="border border-white/20 px-2 py-1 rounded">UnRated</span>
                            <span className="border border-white/20 px-2 py-1 rounded">TACTICIAN</span>
                        </div>
                    </motion.div>


                    {/* CENTER COLUMN - LOGO/ICON */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="h-[500px] relative order-first lg:order-none w-full flex items-center justify-center p-8"
                    >
                        {/* Placeholder or previous content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-accent-NEON_GREEN/20 to-transparent rounded-full opacity-20 blur-3xl" />
                        <div className="p-8 border border-accent-NEON_GREEN rounded-full bg-black/50 backdrop-blur-sm">
                            <Gamepad2 size={64} className="text-accent-NEON_GREEN animate-pulse" />
                        </div>
                    </motion.div>


                    {/* RIGHT COLUMN - BGMI */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-neutral-900/50 border border-white/10 p-8 rounded-xl backdrop-blur-sm hover:border-accent-ERROR_RED/50 transition-all text-center lg:text-right h-full flex flex-col justify-center"
                    >
                        {/* 3D GUN MODEL */}
                        <div className="w-full h-64 relative mb-6 rounded-xl overflow-hidden border border-white/10 bg-black/50">
                            <HobbiesModel url="/models/gun.glb" scale={0.2} autoRotate intensity={1.5} />
                        </div>

                        <h3 className="text-3xl font-black mb-4 uppercase text-white">
                            Competitive<br /><span className="text-gray-500">BGMI Player</span>
                        </h3>
                        <p className="text-gray-400 mb-2 leading-relaxed">
                            12,000+ matches played with an average K/D of 4.92.
                        </p>
                        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                            Conqueror-tier player and In-Game Leader (IGL), focused on rotations, team coordination, and clutch decision-making.
                        </p>

                        <div className="mb-6 text-sm text-gray-400 space-y-1 font-mono">
                            <div className="flex justify-center lg:justify-end gap-2">
                                <span className="text-accent-ERROR_RED">BGMI ID:</span> <span className="text-white">5230467501</span>
                            </div>
                            <div className="flex justify-center lg:justify-end gap-2">
                                <span className="text-accent-ERROR_RED">Alt ID:</span> <span className="text-white">55569016614</span>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center lg:justify-end text-xs font-mono text-accent-ERROR_RED">
                            <span className="border border-white/20 px-2 py-1 rounded">CONQUEROR</span>
                            <span className="border border-white/20 px-2 py-1 rounded">IGL</span>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
