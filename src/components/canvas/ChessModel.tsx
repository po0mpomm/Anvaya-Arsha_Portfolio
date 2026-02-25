"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, Float } from "@react-three/drei";

function ChessPawn() {
    const materialProps = {
        color: "#333",
        roughness: 0.2,
        metalness: 0.8,
    };

    return (
        <group dispose={null}>
            {/* Base Bottom */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.9, 1.0, 0.2, 32]} />
                <meshStandardMaterial {...materialProps} />
            </mesh>
            {/* Base Curve */}
            <mesh position={[0, 0.3, 0]}>
                <cylinderGeometry args={[0.65, 0.85, 0.4, 32]} />
                <meshStandardMaterial {...materialProps} />
            </mesh>

            {/* Body */}
            <mesh position={[0, 1.2, 0]}>
                <cylinderGeometry args={[0.25, 0.65, 1.5, 32]} />
                <meshStandardMaterial {...materialProps} />
            </mesh>

            {/* Collar */}
            <mesh position={[0, 1.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.35, 0.08, 16, 32]} />
                <meshStandardMaterial {...materialProps} />
            </mesh>

            {/* Head */}
            <mesh position={[0, 2.35, 0]}>
                <sphereGeometry args={[0.45, 32, 32]} />
                <meshStandardMaterial {...materialProps} />
            </mesh>
        </group>
    );
}

const ChessModel = ({ scale = 1, active = true }: { scale?: number; active?: boolean }) => {
    return (
        <div className="w-full h-full">
            <Canvas shadows dpr={[1, 1.5]} camera={{ fov: 45 }} frameloop={active ? "always" : "never"}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.5}>
                        <Float
                            speed={active ? 2 : 0}
                            rotationIntensity={active ? 0.5 : 0}
                            floatIntensity={active ? 0.5 : 0}
                            floatingRange={[-0.1, 0.1]}
                        >
                            <group scale={scale}>
                                <ChessPawn />
                            </group>
                        </Float>
                        {/* Invisible helper to force zoom out/add padding */}
                        <mesh visible={false} position={[0, 1.4, 0]}>
                            <boxGeometry args={[4, 5, 4]} />
                        </mesh>
                    </Stage>
                    <OrbitControls autoRotate={active} autoRotateSpeed={4} enableZoom={false} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default ChessModel;
