"use client";

import { useRef, useEffect, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// ─── Shared scene data type ────────────────────────────────────────────────
export interface SceneData {
  scrollProgress: number;
  activeNode: number;
}

// ─── Constants ─────────────────────────────────────────────────────────────
const HELMET_URL =
  "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/DamagedHelmet/glTF-Binary/DamagedHelmet.glb";

// Emissive colour per node (green → cyan → grey)
const NODE_EMISSIVE: THREE.Color[] = [
  new THREE.Color(0x00ff41), // ACTIVE_LOG
  new THREE.Color(0x00f3ff), // COMPLETED (recent)
  new THREE.Color(0x555555), // COMPLETED (older)
];

const NODE_INTENSITY = [0.5, 0.28, 0.1];

// ─── Helmet mesh (reads from shared ref so no re-render overhead) ──────────
function HelmetMesh({ dataRef }: { dataRef: MutableRefObject<SceneData> }) {
  const { scene } = useGLTF(HELMET_URL);
  const groupRef = useRef<THREE.Group>(null);
  const matsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const liveEmissive = useRef(new THREE.Color(0x00ff41));

  // Collect all MeshStandardMaterials once after GLB loads
  useEffect(() => {
    const found: THREE.MeshStandardMaterial[] = [];
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach((m) => {
        const mat = m as THREE.MeshStandardMaterial;
        if (!mat.isMeshStandardMaterial) return;
        // Set initial emissive
        mat.emissive = liveEmissive.current.clone();
        mat.emissiveIntensity = NODE_INTENSITY[0];
        found.push(mat);
      });
    });
    matsRef.current = found;
  }, [scene]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const { scrollProgress, activeNode } = dataRef.current;

    // ── Idle bob ──
    groupRef.current.position.y = Math.sin(t * 0.45) * 0.09;

    // ── Continuous slow spin (Y) ──
    groupRef.current.rotation.y += 0.004;

    // ── Scroll-driven X tilt per node ──
    const targetTiltX = activeNode === 0 ? -0.08 : activeNode === 1 ? 0 : 0.08;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetTiltX + Math.sin(t * 0.3) * 0.04,
      0.03
    );

    // ── Subtle Z roll from scroll ──
    groupRef.current.rotation.z = Math.sin(scrollProgress * Math.PI) * 0.06;

    // ── Emissive colour lerp toward active node target ──
    const target = NODE_EMISSIVE[activeNode] ?? NODE_EMISSIVE[0];
    liveEmissive.current.lerp(target, 0.035);

    const targetInt = NODE_INTENSITY[activeNode] ?? NODE_INTENSITY[0];
    matsRef.current.forEach((mat) => {
      mat.emissive.copy(liveEmissive.current);
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        targetInt,
        0.035
      );
    });
  });

  return (
    <group ref={groupRef} scale={1.85}>
      <primitive object={scene} />
    </group>
  );
}

// Pre-warm the GLB fetch
useGLTF.preload(HELMET_URL);

// ─── Canvas wrapper ────────────────────────────────────────────────────────
export default function CareerHelmetScene({
  sceneDataRef,
}: {
  sceneDataRef: MutableRefObject<SceneData>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      {/* Warm ambient — very dim so emissive stands out */}
      <ambientLight intensity={0.18} color="#000e00" />
      {/* Key: green top-right */}
      <pointLight position={[4, 4, 4]} intensity={2.2} color="#00ff41" />
      {/* Fill: cyan left */}
      <pointLight position={[-4, -2, 2]} intensity={1.0} color="#00f3ff" />
      {/* Rim: white bottom-back */}
      <pointLight position={[0, -5, -2]} intensity={0.4} color="#ffffff" />
      <HelmetMesh dataRef={sceneDataRef} />
    </Canvas>
  );
}
