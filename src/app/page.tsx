
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

export default function Home() {
    return (
        <main className="min-h-screen bg-transparent">
            {/* Background moved to layout.tsx */}

            <div className="relative z-10">
                <Navbar />
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Projects />
                <Certifications />
                <Leadership />
                <Hobbies />
                <Contact />
            </div>
        </main>
    );
}
