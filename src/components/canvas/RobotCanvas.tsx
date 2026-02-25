"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useInView } from "framer-motion";
import Robot from "./Robot";

export default function RobotCanvas() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { margin: "200px" });

    return (
        <div ref={containerRef} className="w-full h-full">
            <Canvas
                shadows
                camera={{ position: [0, 2, 6], fov: 50 }}
                dpr={[1, 1.5]}
                frameloop={isInView ? "always" : "never"}
            >
                <ambientLight intensity={1.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />
                <Environment preset="city" />

                <Suspense fallback={null}>
                    <Robot scale={[0.6, 0.6, 0.6]} position={[0, -2, 0]} rotation={[0, 0.4, 0]} />
                    <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#00FF41" />
                </Suspense>
                <OrbitControls enableZoom={false} autoRotate={isInView} autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}
