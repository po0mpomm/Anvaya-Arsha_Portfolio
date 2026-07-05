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
    const scaleDesktop = useTransform(scrollY, [0, 800, 2600, 3800, 8100], [2.8, 1.3, 1.3, 1.15, 0.95]);
    const xDesktop = useTransform(scrollY, [0, 800, 4200, 8100], [0, 3.5, 2.5, 2.5]);

    // --- MOBILE TRANSFORMS ---
    const scaleMobile = useTransform(scrollY, [0, 800, 2600, 3800, 8100], [1.8, 0.9, 0.9, 0.9, 0.8]);
    const xMobile = useTransform(scrollY, [0, 800, 4200, 8100], [0, 1.2, 0.5, 0.5]);

    // Position Y - Shift UP during the Career Map to align with the designated box
    const y = useTransform(scrollY, [0, 800, 4200, 8100], [0, 0, 0.9, 0.9]);

    // Rotation - Extended duration to match delay
    const rotateX = useTransform(scrollY, [0, 800, 3800, 8100], [0.2, 0.5, 0.2, 0.4]);
    const rotateY = useTransform(scrollY, [0, 3800, 8100], [0, -Math.PI * 2, -Math.PI * 4]);

    const groupRef = useRef<THREE.Group>(null);
    const targetMouse = useRef({ x: 0, y: 0 });
    const currentMouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize to -1 to 1
            targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame(() => {
        if (groupRef.current) {
            const currentScale = isMobile ? scaleMobile.get() : scaleDesktop.get();
            const currentX = isMobile ? xMobile.get() : xDesktop.get();

            groupRef.current.scale.setScalar(currentScale);
            
            if (!isMobile) {
                // Smoothly interpolate mouse position (damped spring effect)
                currentMouse.current.x = THREE.MathUtils.lerp(currentMouse.current.x, targetMouse.current.x, 0.05);
                currentMouse.current.y = THREE.MathUtils.lerp(currentMouse.current.y, targetMouse.current.y, 0.05);

                // Apply scroll transforms PLUS subtle mouse parallax
                groupRef.current.position.x = currentX + currentMouse.current.x * 0.3;
                groupRef.current.position.y = y.get() + currentMouse.current.y * 0.3;
                
                groupRef.current.rotation.x = rotateX.get() - currentMouse.current.y * 0.15;
                groupRef.current.rotation.y = rotateY.get() + currentMouse.current.x * 0.25;
            } else {
                groupRef.current.position.x = currentX;
                groupRef.current.position.y = y.get();
                groupRef.current.rotation.x = rotateX.get();
                groupRef.current.rotation.y = rotateY.get();
            }
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
    const { scrollY } = useScroll();

    return (
        <motion.div ref={containerRef} className="w-full h-full absolute inset-0">
            <Canvas
                className="w-full h-full pointer-events-none"
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
