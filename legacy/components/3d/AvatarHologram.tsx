import React, { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useGLTF, Float } from "@react-three/drei";
import * as THREE from "three";

interface AvatarHologramProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

function HologramPanel() {
  const panelRef = useRef<THREE.Mesh>(null);
  const ringInnerRef = useRef<THREE.Mesh>(null);
  const ringOuterRef = useRef<THREE.Mesh>(null);
  const supportRef = useRef<THREE.Mesh>(null);

  // Load the avatar image texture safely
  const texture = useLoader(THREE.TextureLoader, "/avatar.jpg");

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    // Subtle floating animation for panel
    if (panelRef.current) {
      panelRef.current.position.y = Math.sin(elapsed * 1.5) * 0.15;
      panelRef.current.rotation.y = Math.sin(elapsed * 0.5) * 0.1;
    }

    // Opposite rotations for telemetry rings
    if (ringInnerRef.current) {
      ringInnerRef.current.rotation.z = elapsed * 0.4;
      ringInnerRef.current.position.y = Math.sin(elapsed * 1.5) * 0.15 - 1.8;
    }
    if (ringOuterRef.current) {
      ringOuterRef.current.rotation.z = -elapsed * 0.2;
      ringOuterRef.current.position.y = Math.sin(elapsed * 1.5) * 0.15 - 1.8;
    }
    
    if (supportRef.current) {
      supportRef.current.position.y = Math.sin(elapsed * 1.5) * 0.15 - 1.95;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 3D Volumetric Scan Glow */}
      <mesh position={[0, -0.2, -0.05]} ref={supportRef}>
        <cylinderGeometry args={[1.5, 0, 3.5, 32, 1, true]} />
        <meshBasicMaterial
          color="#0ea5e9"
          transparent={true}
          opacity={0.06}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Futuristic Floating Telemetry Rings */}
      <mesh ref={ringInnerRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.4, 1.45, 64]} />
        <meshBasicMaterial
          color="#0ea5e9"
          side={THREE.DoubleSide}
          transparent={true}
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={ringOuterRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.6, 1.63, 64]} />
        <meshBasicMaterial
          color="#10b981"
          side={THREE.DoubleSide}
          transparent={true}
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main Holographic Avatar Frame */}
      <mesh ref={panelRef} position={[0, 0, 0]}>
        <planeGeometry args={[2.5, 3.4]} />
        <meshBasicMaterial
          map={texture}
          transparent={true}
          opacity={0.85}
          side={THREE.DoubleSide}
        />
        
        {/* Sleek Border Frame */}
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(2.5, 3.4)]} />
          <lineBasicMaterial color="#0ea5e9" transparent={true} opacity={0.6} linewidth={1.5} />
        </lineSegments>
        
        {/* Hologram Corner Tech Decals */}
        <mesh position={[1.2, 1.65, 0.01]}>
          <planeGeometry args={[0.2, 0.02]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        <mesh position={[1.29, 1.56, 0.01]}>
          <planeGeometry args={[0.02, 0.2]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        <mesh position={[-1.2, -1.65, 0.01]}>
          <planeGeometry args={[0.2, 0.02]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        <mesh position={[-1.29, -1.56, 0.01]}>
          <planeGeometry args={[0.02, 0.2]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      </mesh>
    </group>
  );
}

// 3D Avatar Loader (for when GLB is present)
function ModelLoader({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (modelRef.current) {
      // Gentle floating animation
      modelRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.1;
      // Face cursor rotation
      modelRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={[3.4, 3.4, 3.4]}
      position={[0, -2.6, 0]}
      rotation={[0, 0, 0]}
    />
  );
}

export default function AvatarHologram({ mouse }: AvatarHologramProps) {
  const [hasGlb, setHasGlb] = useState(false);
  const glbUrl = "/avatar.glb";

  useEffect(() => {
    // Proactively check if avatar.glb exists in public folder
    fetch(glbUrl, { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          setHasGlb(true);
        }
      })
      .catch(() => setHasGlb(false));
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    // Parallax mouse follow
    const targetX = mouse.current.x * 0.2;
    const targetY = -mouse.current.y * 0.15;
    
    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        {hasGlb ? (
          <React.Suspense fallback={<HologramPanel />}>
            <ModelLoader url={glbUrl} />
          </React.Suspense>
        ) : (
          <React.Suspense fallback={null}>
            <HologramPanel />
          </React.Suspense>
        )}
      </Float>
    </group>
  );
}
