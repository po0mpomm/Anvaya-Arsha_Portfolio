
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Leadership from "@/components/Leadership";
import Hobbies from "@/components/Hobbies";
import Contact from "@/components/Contact";
import FlowingBackground from "@/components/FlowingBackground";

export default function Home() {
    return (
        <main className="min-h-screen bg-transparent">
            {/* Background moved to layout.tsx */}

            <div className="relative z-10">
                <Navbar />
                
                {/* Wrapper to restrict the sticky 3D helmet to these sections */}
                <div className="relative w-full">
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <FlowingBackground />
                    </div>
                    <Hero />
                    <About />
                    <Skills />
                    <Experience />
                </div>

                <Projects />
                <Certifications />
                <Leadership />
                <Hobbies />
                <Contact />
            </div>
        </main>
    );
}
