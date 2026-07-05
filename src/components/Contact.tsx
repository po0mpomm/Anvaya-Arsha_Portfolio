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

// --- Cinematic Animation Variants ---
const baseEasing = [0.16, 1, 0.3, 1] as const;

const dramaticReveal = {
    hidden: { opacity: 0, filter: "blur(15px)", y: 40 },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: { duration: 1.5, ease: baseEasing }
    }
};

const slowScale = {
    hidden: { opacity: 0, scale: 0.85, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 2, ease: baseEasing, delay: 0.2 }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
};

export default function Contact() {
    return (
        <footer id="contact" className="relative bg-transparent text-white overflow-hidden py-10 border-t border-white/10 min-h-screen flex flex-col justify-between">

            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-NEON_GREEN to-transparent" />
                <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full" />
                <div className="absolute bottom-20 right-10 w-64 h-64 border border-white/10 rounded-full" />
            </div>

            <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="container mx-auto px-6 relative z-10 flex-grow flex flex-col items-center"
            >

                {/* HEADLINE */}
                <motion.div
                    variants={dramaticReveal}
                    className="text-center mt-12 mb-[-30px] md:mb-[-50px] z-20 mix-blend-difference"
                >
                    <h2 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none px-4">
                        ALWAYS <span className="text-gray-700 italic font-serif">BUILDING</span><br />
                        THE <span className="text-accent-NEON_GREEN">FUTURE.</span>
                    </h2>
                </motion.div>

                {/* CENTRAL 3D MODEL */}
                <div className="relative w-full h-[400px] md:h-[600px] lg:h-[900px] flex justify-center items-center mt-8 md:-mt-40 mb-8 md:-mb-40 overflow-hidden">
                    {/* Fixed aspect ratio wrapper scaled via CSS to ensure model doesn't crop or drift on mobile */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 origin-center w-[1000px] h-[750px] scale-[0.55] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 xl:scale-[1.2]">
                        <motion.div
                            variants={slowScale}
                            className="w-full h-full relative"
                        >
                            <SplineScene />
                            {/* Mask to hide Spline Logo - Maximized coverage to completely hide watermark */}
                            <div className="absolute -bottom-6 -right-6 w-56 h-24 md:w-80 md:h-32 bg-black z-[9999] pointer-events-none" />
                        </motion.div>
                    </div>

                    {/* Left Links */}
                    <motion.div variants={dramaticReveal} className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 flex-col gap-4 md:gap-6 text-xs md:text-sm font-bold tracking-widest text-gray-400 z-20">
                        <span className="text-[10px] text-accent-NEON_GREEN mb-1 md:mb-2">PAGES</span>
                        <a href="#home" className="hover:text-white transition-colors">HOME</a>
                        <a href="#about" className="hover:text-white transition-colors">ABOUT_ME</a>
                        <a href="#skills" className="hover:text-white transition-colors">SKILLSET</a>
                        <a href="#projects" className="hover:text-white transition-colors">PROJECTS</a>
                    </motion.div>

                    {/* Right Links */}
                    <motion.div variants={dramaticReveal} className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col gap-4 md:gap-6 text-xs md:text-sm font-bold tracking-widest text-right text-gray-400 z-20">
                        <span className="text-[10px] text-accent-NEON_GREEN mb-1 md:mb-2">FOLLOW ON</span>
                        <a href="https://github.com/po0mpomm" target="_blank" className="hover:text-white transition-colors flex items-center justify-end gap-2">
                            GITHUB <Github size={16} />
                        </a>
                        <a href="https://www.linkedin.com/in/anvaya-arsha/" target="_blank" className="hover:text-white transition-colors flex items-center justify-end gap-2">
                            LINKEDIN <Linkedin size={16} />
                        </a>
                        <a href="https://www.behance.net/anvayaarsha1" target="_blank" className="hover:text-white transition-colors flex items-center justify-end gap-2">
                            BEHANCE
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zM8 11h5M8 7h5M8.5 16h6a2 2 0 0 0 2-2v-4h-2v4h-4v-4H8.5v4z" style={{ display: 'none' }} /> 
                                <path d="M12.45 14h2.95c.57-1.15.53-2.52-.16-3.41-.69-.9-1.93-1.09-2.95-1.09h-2.3v9h4.3c1.02 0 2.26-.19 2.95-1.09.69-.9.73-2.27.16-3.41zm-2.3-2.5h2.3c.51 0 .86.25.86.84s-.35.84-.86.84h-2.3v-1.68zm0 5.68v-2h2.3c.51 0 .86.25.86.84s-.35.84-.86.84h-2.3z" fill="currentColor" stroke="none" />
                                <path d="M7 11.5H2v2h5v-2zM3.5 8h3v-2h-3v2z" fill="currentColor" stroke="none" />
                                <path d="M17 10.5h-3v-1h3v1z" fill="currentColor" stroke="none" />
                            </svg>
                        </a>
                        <a href="mailto:anvayaarsha2003@gmail.com" className="hover:text-white transition-colors flex items-center justify-end gap-2">
                            EMAIL <Mail size={16} />
                        </a>
                    </motion.div>
                </div>

                {/* Mobile Links Fallback */}
                <motion.div variants={dramaticReveal} className="sm:hidden flex flex-wrap justify-center gap-6 text-xs font-bold tracking-widest text-gray-400 z-20 mb-8">
                    <a href="https://github.com/po0mpomm" target="_blank" className="hover:text-white transition-colors flex items-center gap-2">
                        GITHUB
                    </a>
                    <a href="https://www.linkedin.com/in/anvaya-arsha/" target="_blank" className="hover:text-white transition-colors flex items-center gap-2">
                        LINKEDIN
                    </a>
                    <a href="mailto:anvayaarsha2003@gmail.com" className="hover:text-white transition-colors flex items-center gap-2">
                        EMAIL
                    </a>
                </motion.div>

                {/* CTA BUTTON */}
                <motion.a
                    variants={dramaticReveal}
                    href="mailto:anvayaarsha2003@gmail.com"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative z-30 md:mt-16 px-10 py-5 bg-accent-NEON_GREEN text-black font-black uppercase tracking-widest text-sm md:text-base mb-12 flex items-center gap-2 hover:bg-white transition-colors"
                >
                    INITIATE_CONTACT <ArrowRight size={18} />
                </motion.a>

                {/* Bottom Bar */}
                <motion.div variants={dramaticReveal} className="w-full flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 font-mono border-t border-white/5 pt-8 w-full">
                    <p>© 2026 ANVAYA_ARSHA. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span>PRIVACY_PROTOCOL</span>
                        <span>TERMS_OF_SERVICE</span>
                    </div>
                </motion.div>

            </motion.div>
        </footer>
    );
}
