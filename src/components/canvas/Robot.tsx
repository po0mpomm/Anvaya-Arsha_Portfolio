"use client";

import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Robot(props: any) {
    // Load the Robot Expressive model (Creative Commons CC0)
    const { scene, animations } = useGLTF("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/RobotExpressive/RobotExpressive.glb");
    const group = useRef<THREE.Group>(null);
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        // Play 'Idle' animation by default if available, or just the first one
        // The model usually has: Dance, Death, Idle, Jump, No, Punch, Running, Sitting, Standing, ThumbsUp, Walking, WalkJump, Wave, Yes

        const idleAction = actions["Idle"] || actions[Object.keys(actions)[0]];
        const waveAction = actions["Wave"];

        if (idleAction) {
            idleAction.reset().fadeIn(0.5).play();
        }

        // Optional: Trigger Wave on mount or periodically
        if (waveAction) {
            // waveAction.play(); // Uncomment to wave initially
        }

        return () => {
            // Cleanup
            actions["Idle"]?.fadeOut(0.5);
        };
    }, [actions]);

    useFrame((state) => {
        if (group.current) {
            // Slight rotation to follow mouse could be added here, but keeping it simple first
            // group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    return (
        <group ref={group} {...props} dispose={null}>
            <primitive object={scene} />
        </group>
    );
}

// Preload to avoid pop-in
useGLTF.preload("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/RobotExpressive/RobotExpressive.glb");
