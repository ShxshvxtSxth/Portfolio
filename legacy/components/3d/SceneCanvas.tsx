"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import NeuralNetwork from "./NeuralNetwork";
import AvatarHologram from "./AvatarHologram";

export default function SceneCanvas() {
  const [mounted, setMounted] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse positions to range [-1, 1]
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 bg-[#080808] z-[-1]" />;
  }

  return (
    <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none bg-[#080808]">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Soft Ambient Light for overall scene visibility */}
        <ambientLight intensity={0.5} />
 
        {/* Cinematic Dual Neon Key Lights (Cyan on Left, Magenta on Right) */}
        <directionalLight position={[-6, 3, 4]} intensity={2.0} color="#00ffff" />
        <directionalLight position={[6, 3, 4]} intensity={2.0} color="#ff00ff" />
        
        {/* Rim Light from behind to make the character pop */}
        <pointLight position={[0, 4, -4]} intensity={1.5} color="#ffffff" />

        {/* 3D Core Components */}
        <NeuralNetwork mouse={mouse} />
        <AvatarHologram mouse={mouse} />
      </Canvas>
    </div>
  );
}
