"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Center } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import * as THREE from "three";
import Helmet from "./Helmet";

function ScrollHelmet() {
    const { scrollY } = useScroll();

    // Transform values for the 3D Scene
    // Path: Hero (Center) -> About/Skills (Right) -> Experience (Left) -> Projects (Right) -> Developer (Left)

    const scale = useTransform(scrollY, [0, 800, 2600, 3400, 4200], [2.8, 1.2, 1.2, 1.0, 1.0]);

    // Position X: 
    // 0: Center
    // 800-3600: Right (+3.5) - Stays Right for About/Skills/Experience
    // 3600-4100: Left (-3.5) - Moves to Left for Developer Section
    // 4100+: Left (-3.5) - Holds position
    const x = useTransform(scrollY, [0, 800, 3600, 4100], [0, 3.5, 3.5, -3.5]);

    // Position Y:
    // 0-4200: Centered vertically (0) - Fixed
    // 4200+: Moves UP (+Y) matching scroll speed
    const y = useTransform(scrollY, [0, 4200, 6200], [0, 0, 10]);

    // Rotation: Add some spin during the transition
    // Stop rotation completely after 4200
    const rotateX = useTransform(scrollY, [0, 800, 3400, 4200], [0.2, 0.5, 0.2, 0.4]);
    const rotateY = useTransform(scrollY, [0, 3400, 4200], [0, -Math.PI * 2, -Math.PI * 4]);

    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            // Read latest values from MotionValues without re-rendering React
            groupRef.current.scale.setScalar(scale.get());
            groupRef.current.position.x = x.get();
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
    const { scrollY } = useScroll();

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
