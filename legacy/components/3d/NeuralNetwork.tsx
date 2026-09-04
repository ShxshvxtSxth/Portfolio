import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface NeuralNetworkProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

export default function NeuralNetwork({ mouse }: NeuralNetworkProps) {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const count = 80; // Optimized number of nodes
  const maxDistance = 3.5; // Distance threshold to draw lines

  // Generate random node positions and velocities
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;

      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return [pos, vel];
  }, [count]);

  // Buffer geometries references
  const particlesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (!particlesRef.current || !linesRef.current || !groupRef.current) return;

    const geo = particlesRef.current.geometry;
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    // 1. Update node positions based on velocities & bounds checking
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      posArray[idx] += velocities[idx];
      posArray[idx + 1] += velocities[idx + 1];
      posArray[idx + 2] += velocities[idx + 2];

      // Boundary collision check
      if (Math.abs(posArray[idx]) > 8) velocities[idx] *= -1;
      if (Math.abs(posArray[idx + 1]) > 8) velocities[idx + 1] *= -1;
      if (Math.abs(posArray[idx + 2]) > 8) velocities[idx + 2] *= -1;
    }
    posAttr.needsUpdate = true;

    // 2. Compute connections (lines) between nodes within threshold distance
    const linePositions: number[] = [];
    const lineColors: number[] = [];

    for (let i = 0; i < count; i++) {
      const idxA = i * 3;
      const xA = posArray[idxA];
      const yA = posArray[idxA + 1];
      const zA = posArray[idxA + 2];

      for (let j = i + 1; j < count; j++) {
        const idxB = j * 3;
        const xB = posArray[idxB];
        const yB = posArray[idxB + 1];
        const zB = posArray[idxB + 2];

        // Euclidean distance
        const dx = xA - xB;
        const dy = yA - yB;
        const dz = zA - zB;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          // Line vertices
          linePositions.push(xA, yA, zA);
          linePositions.push(xB, yB, zB);

          // Alpha fade based on distance
          const alpha = 1.0 - dist / maxDistance;
          // Colors: transition from teal (#0ea5e9) to green (#10b981)
          const r = THREE.MathUtils.lerp(0.05, 0.06, alpha);
          const g = THREE.MathUtils.lerp(0.65, 0.72, alpha);
          const b = THREE.MathUtils.lerp(0.91, 0.5, alpha);

          lineColors.push(r, g, b); // Start point color
          lineColors.push(r, g, b); // End point color
        }
      }
    }

    const lineGeo = linesRef.current.geometry;
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeo.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 3));

    // 3. Apply smooth mouse parallax rotation to the group
    const targetX = mouse.current.x * 0.15;
    const targetY = -mouse.current.y * 0.15;

    groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetY - groupRef.current.rotation.x) * 0.05;
    
    // Constant slow background rotation
    groupRef.current.rotation.y += 0.001;
  });

  return (
    <group ref={groupRef}>
      {/* Interactive Nodes (Points) */}
      <points ref={particlesRef} geometry={particlesGeometry}>
        <pointsMaterial
          color="#0ea5e9"
          size={0.15}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connective Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          vertexColors={true}
          transparent={true}
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
}
