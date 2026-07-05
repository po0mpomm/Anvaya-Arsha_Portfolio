"use client";

import {
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
  useMemo,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA CONFIG — add/remove jobs here; nothing else needs to change
// ─────────────────────────────────────────────────────────────────────────────

interface ExperienceItem {
  year: string;
  company: string;
  role: string;
  period: string;
  location: string;
  tech: string[];
  status: "ACTIVE_LOG" | "COMPLETED";
  tasks: string[];
  logo: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    year: "2026",
    company: "Novalantis",
    role: "AI Intern",
    period: "Apr 2026 – Present",
    location: "Remote",
    tech: ["Python", "Generative AI", "LLMs", "LangGraph", "RAG Systems", "Automation"],
    status: "ACTIVE_LOG",
    logo: "/assets/novalantis.png",
    tasks: [
      "Developed an in-house autonomous Lead Generation System leveraging Generative AI, LLMs, RAG, AI agents, prompt engineering, workflow automation, CRM integrations, lead scoring, and intelligent outreach to automate enterprise sales pipelines.",
      "Currently developing an AI-powered healthcare platform in partnership with the Government of Jharkhand, applying Generative AI, LLMs, RAG, NLP, machine learning, AI workflow automation, and data analytics to build scalable digital healthcare solutions.",
      "Delivered production-ready AI applications by integrating enterprise workflows, automation pipelines, and scalable system architectures.",
    ],
  },
  {
    year: "2025",
    company: "LabelNest.inc",
    role: "Web & Automation Analyst Intern",
    period: "Nov 2025 – Feb 2026",
    location: "Bangalore, KA",
    tech: ["React.js", "Next.js", "UI/UX", "Automation"],
    status: "COMPLETED",
    logo: "/assets/labelnest.png",
    tasks: [
      "Designed and developed the company’s official website, focusing on responsive UI, performance optimization, and user experience.",
      "Contributed to the development of the HRMS platform by supporting workflow automation, development, and product implementation.",
      "Conducted data collection, validation, analysis, and reporting to derive business insights and support data-driven product decisions.",
    ],
  },
  {
    year: "2024",
    company: "MIXLabs Creative",
    role: "UI/UX & Full-Stack Intern",
    period: "Jan 2024 – Jul 2024",
    location: "Pune, MH",
    tech: ["Figma", "React.js", "UI/UX", "Frontend"],
    status: "COMPLETED",
    logo: "/assets/mixlabs.png",
    tasks: [
      "Contributed to UX design and digital product development for web platforms, ensuring smooth design-to-development handoff.",
      "Built and iterated on frontend components in collaboration with developers, reducing design-code inconsistencies in production.",
    ],
  },
];

// NOTE: The 3D helmet is handled globally by BeastScene (FlowingBackground),
// which is a position:fixed canvas that uses scroll-driven transforms to move
// the helmet through all sections. No local Canvas is needed here.

// ─────────────────────────────────────────────────────────────────────────────
// PARTICLE FIELD  — 100 CSS dots, pure visual, no state
// ─────────────────────────────────────────────────────────────────────────────

function ParticleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        left: `${(Math.random() * 100).toFixed(2)}%`,
        top: `${(Math.random() * 100).toFixed(2)}%`,
        size: (Math.random() * 1.4 + 0.4).toFixed(2),
        dur: `${(Math.random() * 5 + 3).toFixed(2)}s`,
        delay: `${(Math.random() * 8).toFixed(2)}s`,
      })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-accent-NEON_GREEN"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0.07,
            animation: `particlePulse ${p.dur} ${p.delay} ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NODE MARKER — the waypoint indicator on the journey rail
// ─────────────────────────────────────────────────────────────────────────────

function NodeMarker({
  active,
  past,
  year,
}: {
  active: boolean;
  past: boolean;
  year: string;
}) {
  const col = active ? "#00FF41" : past ? "#00F3FF" : "#4B5563";
  return (
    <div className="flex items-center gap-2.5 relative">
      {/* Ring + dot */}
      <div className="relative w-6 h-6 flex items-center justify-center flex-shrink-0">
        <div
          className="absolute inset-0 rounded-full border-2 transition-all duration-700"
          style={{
            borderColor: col,
            opacity: active ? 1 : 0.4,
            transform: `scale(${active ? 1 : 0.78})`,
          }}
        />
        {active && (
          <div
            className="absolute inset-0 rounded-full border border-accent-NEON_GREEN animate-ping"
            style={{ opacity: 0.45 }}
          />
        )}
        <div
          className="w-2 h-2 rounded-full transition-all duration-700"
          style={{
            backgroundColor: col,
            boxShadow: active ? `0 0 7px ${col}, 0 0 14px ${col}40` : "none",
          }}
        />
      </div>
      {/* Year label */}
      <span
        className="font-mono text-[9px] tracking-[0.22em] uppercase whitespace-nowrap transition-all duration-500"
        style={{ color: active ? "#00FF41" : past ? "#00F3FF55" : "#4B556350" }}
      >
        {year}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE / REDUCED-MOTION FALLBACK
// ─────────────────────────────────────────────────────────────────────────────

function MobileFallback() {
  return (
    <section
      id="experience"
      className="py-24 relative overflow-hidden border-b border-white/5"
    >
      {/* Grid bg */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <h2 className="text-3xl font-bold font-mono tracking-widest text-white mb-16 flex items-center gap-3 uppercase">
          <span className="text-accent-NEON_GREEN">&gt;_</span>
          <span className="text-accent-NEON_GREEN">/</span>
          CAREER_MAP
        </h2>

        {/* Timeline */}
        <div className="relative max-w-2xl space-y-12">
          {/* Rail line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-accent-NEON_GREEN via-accent-CYBER_CYAN to-transparent opacity-25" />

          {EXPERIENCES.map((exp, i) => {
            const isActive = exp.status === "ACTIVE_LOG";
            return (
              <div key={i} className="relative pl-14">
                {/* Year badge */}
                <div className="absolute left-0 top-0 w-10 h-10 bg-black border border-white/10 flex flex-col items-center justify-center rounded z-10">
                  <span className="font-mono text-[7px] text-gray-500 uppercase tracking-wider">
                    YEAR
                  </span>
                  <span className="font-mono text-[10px] font-black text-gray-400">
                    {exp.year}
                  </span>
                </div>
                {/* Node dot */}
                <div className="absolute left-[18px] top-5 w-2 h-2 rounded-full border border-gray-600 bg-black z-10" />

                {/* Card */}
                <div className="border border-white/10 bg-black/50 p-5 space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent-NEON_GREEN opacity-20" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent-NEON_GREEN opacity-20" />

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-mono text-base font-bold text-gray-200">
                        {exp.role}
                      </h3>
                      <div className="font-mono text-xs text-accent-CYBER_CYAN mt-0.5">
                        @ {exp.company} · {exp.location}
                      </div>
                      <div className="font-mono text-[10px] text-gray-500 mt-0.5">
                        {exp.period}
                      </div>
                    </div>
                    <span
                      className={`text-[8px] font-mono tracking-widest px-2 py-0.5 border rounded-sm font-bold uppercase shrink-0 ${
                        isActive
                          ? "text-accent-NEON_GREEN border-accent-NEON_GREEN/30 bg-accent-NEON_GREEN/5"
                          : "text-accent-CYBER_CYAN border-accent-CYBER_CYAN/30 bg-accent-CYBER_CYAN/5"
                      }`}
                    >
                      ● {exp.status}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {exp.tasks.map((task, ti) => (
                      <li
                        key={ti}
                        className="flex items-start gap-2 font-mono text-xs text-gray-400 leading-relaxed"
                      >
                        <span className="text-accent-NEON_GREEN shrink-0 font-bold mt-0.5">
                          ›
                        </span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[8px] uppercase tracking-wider text-accent-CYBER_CYAN/70 bg-accent-CYBER_CYAN/5 border border-accent-CYBER_CYAN/20 px-2 py-0.5 rounded-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function Experience() {
  // ── Refs ──────────────────────────────────────────────────────────────────
  const sectionRef = useRef<HTMLElement>(null);
  const pathLineRef = useRef<HTMLDivElement>(null);
  const cornerLabelRef = useRef<HTMLDivElement>(null);

  // Per-node content blocks (3 absolutely-stacked divs; GSAP shows one at a time)
  const contentBlockRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  // Per-node bullet <li> refs  [ node ][ bullet ]
  const bulletRefs = useRef<(HTMLLIElement | null)[][]>([[], [], []]);

  // Per-node tag <span> refs  [ node ][ tag ]
  const tagRefs = useRef<(HTMLSpanElement | null)[][]>([[], [], []]);

  // Year watermark refs
  const yearWmRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  // (No local R3F scene — helmet lives in BeastScene/FlowingBackground global canvas)

  // ── State ──────────────────────────────────────────────────────────────────
  const [activeNode, setActiveNode] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // ── Client-side init ───────────────────────────────────────────────────────
  useEffect(() => {
    const checkDesktop = () => window.innerWidth >= 768;
    setIsDesktop(checkDesktop());
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setInitialized(true);

    const onResize = () => setIsDesktop(checkDesktop());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Lenis → GSAP ScrollTrigger sync ───────────────────────────────────────
  // useLenis fires after every Lenis scroll tick, ensuring GSAP reads the
  // latest smooth-scrolled window.scrollY position.
  useLenis(() => {
    ScrollTrigger.update();
  });

  // ── GSAP Setup ─────────────────────────────────────────────────────────────
  useLayoutEffect(() => {
    if (!initialized || !isDesktop || reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    // Total pin distance: 4.5 viewport heights (~4500 px on a 1000px screen)
    const SCROLL_DIST = window.innerHeight * 4.5;

    // ── Set initial states ──────────────────────────────────────────────────
    // Block 0 visible; blocks 1+2 start invisible/offset
    contentBlockRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 24 });
    });

    // All bullets start fully clipped (right-to-left wipe)
    bulletRefs.current.forEach((group) => {
      group.forEach((el) => {
        if (el) gsap.set(el, { clipPath: "inset(0 100% 0 0)", opacity: 0 });
      });
    });

    // All tags start at scale 0
    tagRefs.current.forEach((group) => {
      group.forEach((el) => {
        if (el) gsap.set(el, { scale: 0, opacity: 0 });
      });
    });

    // Year watermarks — only node 0 slightly visible at start
    yearWmRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0 });
    });

    // Corner label hidden off-left
    if (cornerLabelRef.current)
      gsap.set(cornerLabelRef.current, { opacity: 0, x: -22 });

    // Path line starts scaled to 0 (origin: top)
    if (pathLineRef.current)
      gsap.set(pathLineRef.current, { scaleY: 0, transformOrigin: "top center" });

    // ── Build the scrubbed timeline ────────────────────────────────────────
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${SCROLL_DIST}`,
          pin: true,
          scrub: 0.8,
          onUpdate(self) {
            const p = self.progress;
            const node = p > 0.65 ? 2 : p > 0.33 ? 1 : 0;
            setActiveNode(node);
          },
        },
      });

      // ── ENTRY  (0–7) ────────────────────────────────────────────────────────
      tl.to(cornerLabelRef.current, { opacity: 1, x: 0, duration: 5, ease: "power3.out" }, 2);
      tl.fromTo(
        pathLineRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 100, ease: "none" },
        0
      );

      // ── NODE 0 reveals  (8–28) ─────────────────────────────────────────────
      bulletRefs.current[0].forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 7 },
          8 + i * 6
        );
      });
      tagRefs.current[0].forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, ease: "back.out(1.7)", duration: 3 },
          24 + i * 1.3
        );
      });

      // ── TRANSITION 0 → 1  (30–37) ──────────────────────────────────────────
      tl.to(contentBlockRefs.current[0], { opacity: 0, y: -22, duration: 5, ease: "power2.inOut" }, 30);
      tl.fromTo(
        contentBlockRefs.current[1],
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 5, ease: "power2.out" },
        33
      );
      tl.to(yearWmRefs.current[0], { opacity: 0, duration: 5 }, 30);
      tl.to(yearWmRefs.current[1], { opacity: 1, duration: 5 }, 33);

      // ── NODE 1 reveals  (39–59) ────────────────────────────────────────────
      bulletRefs.current[1].forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 8 },
          39 + i * 7
        );
      });
      tagRefs.current[1].forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, ease: "back.out(1.7)", duration: 3 },
          55 + i * 1.3
        );
      });

      // ── TRANSITION 1 → 2  (62–69) ──────────────────────────────────────────
      tl.to(contentBlockRefs.current[1], { opacity: 0, y: -22, duration: 5, ease: "power2.inOut" }, 62);
      tl.fromTo(
        contentBlockRefs.current[2],
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 5, ease: "power2.out" },
        65
      );
      tl.to(yearWmRefs.current[1], { opacity: 0, duration: 5 }, 62);
      tl.to(yearWmRefs.current[2], { opacity: 1, duration: 5 }, 65);

      // ── NODE 2 reveals  (71–91) ────────────────────────────────────────────
      bulletRefs.current[2].forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 8 },
          71 + i * 7
        );
      });
      tagRefs.current[2].forEach((el, i) => {
        if (!el) return;
        tl.fromTo(
          el,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, ease: "back.out(1.7)", duration: 3 },
          86 + i * 1.3
        );
      });
    }, sectionRef);

    // Cleanup on unmount / re-run
    return () => {
      ctx.revert(); // This fully removes GSAP wrappers (like pin-spacer) so React can safely unmount!
    };
  }, [initialized, isDesktop, reduceMotion]);

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER PATHS
  // ─────────────────────────────────────────────────────────────────────────

  // Loading skeleton (shown on server + first client paint before useEffect fires)
  if (!initialized) {
    return (
      <div key="loading">
        <section
          id="experience"
          className="h-screen bg-black flex items-center justify-center border-b border-white/5"
        >
          <div className="text-center space-y-2">
            <div className="font-mono text-xs text-accent-NEON_GREEN/50 tracking-[0.4em] animate-pulse uppercase">
              INITIALIZING_CAREER_MAP...
            </div>
            <div className="font-mono text-[9px] text-gray-700 tracking-[0.3em]">
              STAND BY
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Mobile / reduced-motion: static upgraded timeline
  if (!isDesktop || reduceMotion) {
    return (
      <div key="mobile">
        <MobileFallback />
      </div>
    );
  }

  // ── Full cinematic desktop scene ──────────────────────────────────────────
  return (
    <div key="desktop">
      <section
        ref={sectionRef}
        id="experience"
        className="relative w-full h-screen bg-transparent border-b border-white/5"
      >
      {/* Inner overflow-clip wrapper — keeps particles/watermarks inside bounds
          without putting overflow:hidden on the GSAP-pinned section element */}
      <div className="absolute inset-0 overflow-hidden">

        {/* ── Background: grid ──────────────────────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(rgba(0,255,65,0.013) 1px, transparent 1px), " +
              "linear-gradient(90deg, rgba(0,255,65,0.013) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* ── Background: particle field ───────────────────────────────── */}
        <ParticleField />

        {/* ── Background: giant year watermarks (crossfade per node) ───── */}
        {EXPERIENCES.map((exp, i) => (
          <div
            key={exp.year}
            ref={(el) => {
              yearWmRefs.current[i] = el;
            }}
            className="absolute pointer-events-none select-none font-mono font-black"
            style={{
              right: "4%",
              bottom: "6%",
              fontSize: "clamp(5rem, 20vw, 18rem)",
              lineHeight: 1,
              opacity: 0,
              zIndex: 1,
              color: "transparent",
              background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.02) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 20px 50px rgba(0, 255, 65, 0.15)",
            }}
            aria-hidden
          >
            {exp.year}
          </div>
        ))}

        {/* ── Linear vignette (only darkens left side for timeline, leaves right side transparent for helmet) ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 40%)",
            zIndex: 2,
          }}
        />


        {/* ── Corner label: pinned section identifier ─────────────────── */}
        <div
          ref={cornerLabelRef}
          className="absolute top-7 left-7 font-mono"
          style={{ zIndex: 40, opacity: 0 }}
        >
          <div className="flex items-center gap-2">
            <span className="text-accent-NEON_GREEN text-sm">&gt;_</span>
            <span className="text-white/80 text-sm tracking-[0.24em] uppercase font-bold">
              / CAREER_MAP
            </span>
          </div>
          <div className="text-[8px] text-gray-600 tracking-[0.32em] mt-0.5 uppercase">
            SCROLL TO NAVIGATE
          </div>
        </div>

        {/* ── Progress dots (right edge) ───────────────────────────────── */}
        <div
          className="absolute right-7 top-1/2 -translate-y-1/2 flex flex-col gap-3"
          style={{ zIndex: 40 }}
        >
          {EXPERIENCES.map((_, i) => (
            <div key={i} className="flex items-center gap-2 justify-end">
              <span
                className="font-mono text-[8px] tracking-widest transition-all duration-500"
                style={{ color: i === activeNode ? "#00FF41" : "#374151" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div
                className="h-px rounded-full transition-all duration-700"
                style={{
                  width: i === activeNode ? "28px" : "8px",
                  backgroundColor:
                    i === activeNode
                      ? "#00FF41"
                      : i < activeNode
                      ? "#00F3FF50"
                      : "#37415150",
                }}
              />
            </div>
          ))}
        </div>

        {/* ── Main content split layout ─────────────────────────────────── */}
        <div className="absolute inset-0 flex" style={{ zIndex: 10 }}>

          {/* ── LEFT: Journey rail + content cards ───────────────────── */}
          <div className="flex-1 flex items-center relative px-4 py-8">

            {/* Journey path column — fixed to left edge */}
            <div
              className="absolute left-6 top-0 bottom-0 flex flex-col justify-between py-20"
              style={{ zIndex: 20, width: "72px" }}
            >
              {/* Glowing vertical line (GSAP scaleY 0→1) */}
              <div
                ref={pathLineRef}
                className="absolute left-1/2 -translate-x-1/2 top-[80px] bottom-[80px] w-px"
                style={{
                  background:
                    "linear-gradient(to bottom, #00FF41, #00F3FF55, transparent)",
                  boxShadow:
                    "0 0 14px rgba(0,255,65,0.45), 0 0 5px rgba(0,255,65,0.7)",
                  transformOrigin: "top center",
                }}
              />

              {/* Node markers — evenly spaced along the rail */}
              {EXPERIENCES.map((exp, i) => (
                <NodeMarker
                  key={i}
                  active={i === activeNode}
                  past={i < activeNode}
                  year={exp.year}
                />
              ))}
            </div>

            {/* Content cards slot — absolutely stacked, GSAP swaps opacity */}
            <div className="relative w-full h-full ml-24 flex items-center">
              {EXPERIENCES.map((exp, nodeIdx) => {
                const isActive = exp.status === "ACTIVE_LOG";

                return (
                  <div
                    key={nodeIdx}
                    ref={(el) => {
                      contentBlockRefs.current[nodeIdx] = el;
                    }}
                    className="absolute inset-0 flex items-center pr-4 lg:pr-8"
                    style={{ opacity: nodeIdx === 0 ? 1 : 0 }}
                  >
                    {/* Card */}
                    <div
                      className="w-full max-w-lg relative overflow-hidden"
                      style={{
                        border: `1px solid ${
                          isActive
                            ? "rgba(0,255,65,0.28)"
                            : "rgba(0,243,255,0.18)"
                        }`,
                        background: "rgba(0,0,0,0.72)",
                        backdropFilter: "blur(10px)",
                        transition: "border-color 0.8s ease, box-shadow 0.8s ease",
                        boxShadow:
                          nodeIdx === activeNode && isActive
                            ? "0 0 40px rgba(0,255,65,0.09), inset 0 0 30px rgba(0,255,65,0.02)"
                            : "none",
                      }}
                    >
                      {/* Corner bracket accents */}
                      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-accent-NEON_GREEN opacity-25" />
                      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-accent-NEON_GREEN opacity-25" />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-accent-NEON_GREEN opacity-25" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-accent-NEON_GREEN opacity-25" />

                      {/* Subtle ambient glow inside card */}
                      <div
                        className="absolute -right-12 -top-12 w-44 h-44 rounded-full blur-3xl pointer-events-none"
                        style={{
                          backgroundColor: isActive
                            ? "rgba(0,255,65,0.04)"
                            : "rgba(0,243,255,0.03)",
                        }}
                      />

                      <div className="p-6 md:p-8 relative">
                        {/* Status badge */}
                        <div className="flex items-center gap-3 mb-4">
                          <span
                            className={`text-[8px] font-mono tracking-widest px-2 py-0.5 border rounded-sm font-bold uppercase ${
                              isActive
                                ? "text-accent-NEON_GREEN border-accent-NEON_GREEN/30 bg-accent-NEON_GREEN/5"
                                : "text-accent-CYBER_CYAN border-accent-CYBER_CYAN/30 bg-accent-CYBER_CYAN/5"
                            }`}
                          >
                            ● {exp.status}
                          </span>
                        </div>

                        {/* Logo (Absolute Top Right) */}
                        <div className={`absolute top-6 right-6 md:top-8 md:right-8 w-20 h-20 bg-white/5 border border-white/10 rounded flex items-center justify-center shrink-0 ${(exp.company === "LabelNest.inc" || exp.company === "MIXLabs Creative") ? "mt-4" : ""}`}>
                          <img
                            src={exp.logo}
                            alt={exp.company}
                            className="w-14 h-14 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        </div>

                        {/* Role */}
                        <h3 className="font-mono text-xl md:text-2xl font-bold text-gray-100 tracking-wide mb-1 pr-24">
                          {exp.role}
                        </h3>

                        {/* Company + location + period */}
                        <div className="font-mono text-xs text-accent-CYBER_CYAN flex items-center gap-2 mb-1">
                          <span className="font-bold">@ {exp.company}</span>
                          <span className="text-gray-600">·</span>
                          <span>{exp.location}</span>
                        </div>
                        <div className="font-mono text-[10px] text-gray-500 mb-4">
                          {exp.period}
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-white/6 mb-4" />

                        {/* Bullets — each gets a clipPath wipe reveal via GSAP */}
                        <ul className="space-y-2.5 mb-5">
                          {exp.tasks.map((task, tIdx) => (
                            <li
                              key={tIdx}
                              ref={(el) => {
                                bulletRefs.current[nodeIdx][tIdx] = el;
                              }}
                              className="flex items-start gap-2.5 font-mono text-xs text-gray-400 leading-relaxed"
                            >
                              <span className="text-accent-NEON_GREEN font-black shrink-0 mt-0.5">
                                &gt;
                              </span>
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech tags — each pops in via GSAP scale + opacity */}
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                          {exp.tech.map((tech, tIdx) => (
                            <span
                              key={tech}
                              ref={(el) => {
                                tagRefs.current[nodeIdx][tIdx] = el;
                              }}
                              className="font-mono text-[9px] uppercase tracking-wider text-accent-CYBER_CYAN/80 bg-accent-CYBER_CYAN/5 border border-accent-CYBER_CYAN/20 px-2.5 py-0.5 rounded-sm"
                              style={{ display: "inline-block" }} // needed for scale transforms
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: transparent spacer — the global BeastScene helmet    ──
               (FlowingBackground is position:fixed behind everything) shows
               through here exactly as the user scrolls. A subtle ambient
               glow shifts per active node to complement it.               ── */}
          <div
            className="hidden lg:block relative shrink-0 pointer-events-none"
            style={{ width: "42%" }}
          >
            {/* Per-node ambient glow that frames the original helmet */}
            <div
              className="absolute inset-0 transition-all duration-1000"
              style={{
                background:
                  activeNode === 0
                    ? "radial-gradient(ellipse at 50% 50%, rgba(0,255,65,0.07) 0%, transparent 60%)"
                    : activeNode === 1
                    ? "radial-gradient(ellipse at 50% 50%, rgba(0,243,255,0.05) 0%, transparent 60%)"
                    : "radial-gradient(ellipse at 50% 50%, rgba(60,60,60,0.03) 0%, transparent 60%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
