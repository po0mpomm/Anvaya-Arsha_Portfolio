"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Brackets } from "lucide-react";

const navLinks = [
    { name: "// Home", href: "/" },
    { name: "// About_Me", href: "#about" },
    { name: "// Skillset", href: "#skills" },
    { name: "// Experience", href: "#experience" },
    { name: "// Projects", href: "#projects" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();




    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] py-6 bg-gradient-to-b from-black/80 to-transparent">
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-widest text-white hover:text-accent-NEON_GREEN transition-colors">
                    <Brackets size={24} className="text-accent-NEON_GREEN" />
                    ANVAYA.DEV
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-xs font-bold text-gray-400 hover:text-accent-CYBER_CYAN transition-colors tracking-widest uppercase"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a
                        href="/assets/Resume_Anvaya_Arsha.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-1 text-xs font-bold border border-accent-NEON_GREEN text-accent-NEON_GREEN hover:bg-accent-NEON_GREEN hover:text-black transition-colors uppercase"
                    >
                        [ Download_Resume ]
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-accent-NEON_GREEN"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* progress line */}
            {/* progress line removed for cleaner look */}
            {/* <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent-NEON_GREEN to-transparent opacity-50 absolute bottom-0" /> */}
            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-bold text-gray-400 hover:text-accent-NEON_GREEN transition-colors tracking-widest uppercase"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a
                        href="/assets/Resume_Anvaya_Arsha.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 text-sm font-bold border border-accent-NEON_GREEN text-accent-NEON_GREEN hover:bg-accent-NEON_GREEN hover:text-black transition-colors uppercase"
                    >
                        [ Download_Resume ]
                    </a>
                </div>
            )}
        </nav>
    );
}
