"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface AmbientParticlesProps {
  count?: number;
}

export function AmbientParticles({ count = 120 }: AmbientParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, scales, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Scatter in volume around the cafe counter
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = -0.5 + Math.random() * 4.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;

      scl[i] = 0.02 + Math.random() * 0.04;
      spd[i] = 0.08 + Math.random() * 0.15;
    }
    return [pos, scl, spd];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    // Zero-overhead GPU transform animation (eliminates costly per-frame CPU buffer uploads on mobile)
    pointsRef.current.rotation.y = t * 0.035;
    pointsRef.current.rotation.x = Math.sin(t * 0.15) * 0.05;
    pointsRef.current.position.y = Math.sin(t * 0.25) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        color="#E5B070"
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
