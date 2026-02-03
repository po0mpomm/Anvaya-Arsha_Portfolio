"use client";

import { useGLTF, OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

function Model({ url, scale = 1 }: { url: string; scale?: number }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={scale} />;
}

export default function HobbiesModel({
    url,
    scale = 1,
    autoRotate = true,
    intensity = 1
}: {
    url: string;
    scale?: number;
    autoRotate?: boolean;
    intensity?: number;
}) {
    return (
        <div className="w-full h-full">
            <Canvas shadows dpr={[1, 2]} camera={{ fov: 45 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={intensity}>
                        <Model url={url} scale={scale} />
                    </Stage>
                    <OrbitControls autoRotate={autoRotate} enableZoom={false} />
                </Suspense>
            </Canvas>
        </div>
    );
}
