"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Center } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, useInView } from "framer-motion";
import * as THREE from "three";
import Helmet from "./Helmet";

function ScrollHelmet() {
    const { scrollY } = useScroll();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // --- DESKTOP TRANSFORMS ---
    const scaleDesktop = useTransform(scrollY, [0, 800, 2600, 3400, 4800], [2.8, 1.2, 1.2, 1.0, 0.8]);
    const xDesktop = useTransform(scrollY, [0, 800, 3600, 4800], [0, 3.5, 3.5, -3.5]);

    // --- MOBILE TRANSFORMS ---
    const scaleMobile = useTransform(scrollY, [0, 800, 2600, 3400, 4800], [1.8, 0.9, 0.9, 0.8, 0.7]);
    const xMobile = useTransform(scrollY, [0, 800, 3600, 4800], [0, 1.2, 0.8, -1.2]);


    // Position Y - Fine-tuned to stop even earlier
    const y = useTransform(scrollY, [0, 4800, 6800], [0, 0, 10]);

    // Rotation - Adjusted duration
    const rotateX = useTransform(scrollY, [0, 800, 3400, 4800], [0.2, 0.5, 0.2, 0.4]);
    const rotateY = useTransform(scrollY, [0, 3400, 4800], [0, -Math.PI * 2, -Math.PI * 4]);

    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            const currentScale = isMobile ? scaleMobile.get() : scaleDesktop.get();
            const currentX = isMobile ? xMobile.get() : xDesktop.get();

            groupRef.current.scale.setScalar(currentScale);
            groupRef.current.position.x = currentX;
            groupRef.current.position.y = y.get();
            groupRef.current.rotation.x = rotateX.get();
            groupRef.current.rotation.y = rotateY.get();
        }
    });

    return (
        <group ref={groupRef}>
            <Center>
                <Helmet />
            </Center>
        </group>
    );
}

export default function BeastScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { margin: "200px" });

    return (
        <motion.div ref={containerRef} className="w-full h-full absolute inset-0">
            <Canvas
                className="w-full h-full pointer-events-auto"
                frameloop={isInView ? "always" : "never"}
                dpr={[1, 1.5]} // Clamp pixel ratio for mobile performance
                performance={{ min: 0.5 }}
                camera={{ position: [0, 0, 8], fov: 35 }}
                gl={{
                    antialias: false, // OFF for mobile performance
                    alpha: true,
                    powerPreference: "default", // Save battery
                    stencil: false,
                    depth: true,
                }}
            >
                {/* Lighting - Optimized: No Shadows */}
                <ambientLight intensity={2} />
                <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} intensity={30} color="#ffffff" />
                <directionalLight position={[-5, 5, 5]} intensity={2} color="#ffffff" />

                {/* Content */}
                <Suspense fallback={null}>
                    <ScrollHelmet />
                </Suspense>
            </Canvas >
        </motion.div>
    );
}
