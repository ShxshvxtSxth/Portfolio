"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";

function Blob() {
  const mesh = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.25;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.18;
  });

  return (
    <mesh ref={mesh} scale={1.55}>
      <icosahedronGeometry args={[1, 24]} />
      <MeshDistortMaterial
        color="#aeb8d6"
        distort={0.45}
        speed={1.5}
        roughness={0.28}
        metalness={0.5}
      />
    </mesh>
  );
}

/**
 * Dark "always shipping" tile — a slowly morphing metallic blob.
 */
export default function ThreeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 1.8]} gl={{ antialias: true }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={2.6} color="#ffffff" />
      <directionalLight position={[-4, -1, -3]} intensity={2.2} color="#7dd3fc" />
      <pointLight position={[2, -2.5, 2]} intensity={22} color="#f472b6" />
      <Blob />
    </Canvas>
  );
}
