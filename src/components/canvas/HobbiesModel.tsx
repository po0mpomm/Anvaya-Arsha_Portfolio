import React, { Suspense } from "react";
import { useGLTF, OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Model({ url, scale = 1 }: { url: string; scale?: number }) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={scale} />;
}

const HobbiesModel = ({
    url,
    scale = 1,
    autoRotate = true,
    intensity = 1,
    active = true
}: {
    url: string;
    scale?: number;
    autoRotate?: boolean;
    intensity?: number;
    active?: boolean;
}) => {
    return (
        <div className="w-full h-full">
            <Canvas
                shadows
                dpr={[1, 1.5]}
                camera={{ fov: 45 }}
                frameloop={active ? "always" : "never"}
            >
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={intensity}>
                        <Model url={url} scale={scale} />
                    </Stage>
                    <OrbitControls autoRotate={active && autoRotate} enableZoom={false} />
                </Suspense>
            </Canvas>
        </div>
    );
};

useGLTF.preload("/models/gun.glb");

export default HobbiesModel;
