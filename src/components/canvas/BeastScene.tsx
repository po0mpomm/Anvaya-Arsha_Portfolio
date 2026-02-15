"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Center } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
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
    const scaleDesktop = useTransform(scrollY, [0, 800, 2600, 3400, 4200], [2.8, 1.2, 1.2, 1.0, 1.0]);
    const xDesktop = useTransform(scrollY, [0, 800, 3600, 4100], [0, 3.5, 3.5, -3.5]);

    // --- MOBILE TRANSFORMS ---
    // Smaller scale, tighter X bounds to stay in viewport
    const scaleMobile = useTransform(scrollY, [0, 800, 2600, 3400, 4200], [1.8, 0.9, 0.9, 0.8, 0.8]);
    const xMobile = useTransform(scrollY, [0, 800, 3600, 4100], [0, 1.2, 1.2, -1.2]);


    // Position Y (Shared logic essentially, but maybe adjusted if needed)
    const y = useTransform(scrollY, [0, 4200, 6200], [0, 0, 10]);

    // Rotation
    const rotateX = useTransform(scrollY, [0, 800, 3400, 4200], [0.2, 0.5, 0.2, 0.4]);
    const rotateY = useTransform(scrollY, [0, 3400, 4200], [0, -Math.PI * 2, -Math.PI * 4]);

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
    return (
        <motion.div className="w-full h-full absolute inset-0">
            <Canvas
                className="w-full h-full pointer-events-auto"
                dpr={1} // Fixed 1x resolution for consistent 60FPS
                performance={{ min: 0.5 }}
                camera={{ position: [0, 0, 8], fov: 35 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance", // Request discrete GPU
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
