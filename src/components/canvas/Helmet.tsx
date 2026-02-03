"use client";

import { useGLTF } from "@react-three/drei";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Helmet(props: ThreeElements['group']) {
    // Using the standard SciFiHelmet from Khronos Sample Models
    const { scene } = useGLTF("https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/DamagedHelmet/glTF-Binary/DamagedHelmet.glb");
    const modelRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (modelRef.current) {
            const t = state.clock.getElapsedTime();

            // Standard rotation and float
            modelRef.current.rotation.y = t * 0.15;
            modelRef.current.position.y = Math.sin(t * 0.5) * 0.1;
        }
    });

    return (
        <group ref={modelRef} {...props}>
            <primitive object={scene} />
        </group>
    );
}

// Preload the model
useGLTF.preload("https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/DamagedHelmet/glTF-Binary/DamagedHelmet.glb");
