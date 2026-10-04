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

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    if (!posAttr) return;

    for (let i = 0; i < count; i++) {
      let y = posAttr.getY(i) + speeds[i] * delta;
      let x = posAttr.getX(i) + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002;
      let z = posAttr.getZ(i) + Math.cos(state.clock.elapsedTime * 0.4 + i) * 0.002;

      // Wrap around ceiling
      if (y > 3.8) {
        y = -0.5;
        x = (Math.random() - 0.5) * 6;
        z = (Math.random() - 0.5) * 5;
      }

      posAttr.setXYZ(i, x, y, z);
    }
    posAttr.needsUpdate = true;
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
