"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center text-xs text-white/20">LOADING_SCENE...</div>,
});

const SplineScene = () => (
    <div className="w-full h-full">
        <Spline
            scene="https://prod.spline.design/zlQ0FvpjMo11Ghre/scene.splinecode"
        />
    </div>
);

export default function Contact() {
    return (
        <footer id="contact" className="relative bg-black text-white overflow-hidden py-10 border-t border-white/10 min-h-screen flex flex-col justify-between">

            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-NEON_GREEN to-transparent" />
                <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full" />
                <div className="absolute bottom-20 right-10 w-64 h-64 border border-white/10 rounded-full" />
            </div>

            <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col items-center">

                {/* HEADLINE */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mt-12 mb-[-30px] md:mb-[-50px] z-20 mix-blend-difference"
                >
                    <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none px-4">
                        ALWAYS <span className="text-gray-700 italic font-serif">BUILDING</span><br />
                        THE <span className="text-accent-NEON_GREEN">FUTURE.</span>
                    </h2>
                </motion.div>

                {/* CENTRAL 3D MODEL */}
                <div className="relative w-full h-[600px] md:h-[900px] flex justify-center items-center -mt-8 md:-mt-40 mt-8 -mb-10 md:-mb-40">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 0.65 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="w-full h-full absolute inset-0 z-10"
                    >
                        <SplineScene />
                        {/* Mask to hide Spline Logo - Maximized coverage to completely hide watermark */}
                        <div className="absolute bottom-0 right-0 w-56 h-16 bg-black z-[9999] pointer-events-none" />
                    </motion.div>

                    {/* Left Links */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-6 text-sm font-bold tracking-widest text-gray-400 z-20">
                        <span className="text-[10px] text-accent-NEON_GREEN mb-2">PAGES</span>
                        <a href="#home" className="hover:text-white transition-colors">HOME</a>
                        <a href="#about" className="hover:text-white transition-colors">ABOUT_ME</a>
                        <a href="#skills" className="hover:text-white transition-colors">SKILLSET</a>
                        <a href="#projects" className="hover:text-white transition-colors">PROJECTS</a>
                    </div>

                    {/* Right Links */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-6 text-sm font-bold tracking-widest text-right text-gray-400 z-20">
                        <span className="text-[10px] text-accent-NEON_GREEN mb-2">FOLLOW ON</span>
                        <a href="https://github.com/po0mpomm" target="_blank" className="hover:text-white transition-colors flex items-center justify-end gap-2">
                            GITHUB <Github size={16} />
                        </a>
                        <a href="https://www.linkedin.com/in/anvaya-arsha/" target="_blank" className="hover:text-white transition-colors flex items-center justify-end gap-2">
                            LINKEDIN <Linkedin size={16} />
                        </a>
                        <a href="https://www.behance.net/anvayaarsha1" target="_blank" className="hover:text-white transition-colors flex items-center justify-end gap-2">
                            BEHANCE
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zM8 11h5M8 7h5M8.5 16h6a2 2 0 0 0 2-2v-4h-2v4h-4v-4H8.5v4z" style={{ display: 'none' }} /> {/* Placeholder hidden */}
                                <path d="M12.45 14h2.95c.57-1.15.53-2.52-.16-3.41-.69-.9-1.93-1.09-2.95-1.09h-2.3v9h4.3c1.02 0 2.26-.19 2.95-1.09.69-.9.73-2.27.16-3.41zm-2.3-2.5h2.3c.51 0 .86.25.86.84s-.35.84-.86.84h-2.3v-1.68zm0 5.68v-2h2.3c.51 0 .86.25.86.84s-.35.84-.86.84h-2.3z" fill="currentColor" stroke="none" />
                                <path d="M7 11.5H2v2h5v-2zM3.5 8h3v-2h-3v2z" fill="currentColor" stroke="none" />
                                <path d="M17 10.5h-3v-1h3v1z" fill="currentColor" stroke="none" />
                            </svg>
                        </a>
                        <a href="mailto:anvayaarsha2003@gmail.com" className="hover:text-white transition-colors flex items-center justify-end gap-2">
                            EMAIL <Mail size={16} />
                        </a>
                    </div>
                </div>

                {/* CTA BUTTON */}
                <motion.a
                    href="mailto:anvayaarsha2003@gmail.com"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative z-30 px-10 py-5 bg-accent-NEON_GREEN text-black font-black uppercase tracking-widest text-sm md:text-base mb-12 flex items-center gap-2 hover:bg-white transition-colors"
                >
                    INITIATE_CONTACT <ArrowRight size={18} />
                </motion.a>

                {/* Bottom Bar */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 font-mono border-t border-white/5 pt-8 w-full">
                    <p>© 2026 ANVAYA_ARSHA. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span>PRIVACY_PROTOCOL</span>
                        <span>TERMS_OF_SERVICE</span>
                    </div>
                </div>

            </div>
        </footer>
    );
}
