"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface ProceduralBeansProps {
  progress: number;
  active: boolean;
}

export function ProceduralBeans({ progress, active }: ProceduralBeansProps) {
  const groupRef = useRef<THREE.Group>(null);
  const beanCount = 28;

  // Pre-generate orbital parameters for each bean
  const beansData = useMemo(() => {
    return Array.from({ length: beanCount }, (_, i) => {
      const radius = 1.2 + Math.random() * 1.4;
      const speed = 0.5 + Math.random() * 0.8;
      const initialAngle = (i / beanCount) * Math.PI * 2;
      const yOffset = (Math.random() - 0.5) * 1.2;
      const scale = 0.08 + Math.random() * 0.06;
      return { radius, speed, initialAngle, yOffset, scale };
    });
  }, [beanCount]);

  useFrame((state, delta) => {
    if (!groupRef.current || !active) return;

    // Rotate group slowly
    groupRef.current.rotation.y += delta * 0.4;

    // Expand orbit based on scroll progress in Scene 2 (0.18 -> 0.38)
    let orbitScale = 0;
    if (progress >= 0.15 && progress <= 0.42) {
      if (progress < 0.25) {
        orbitScale = (progress - 0.15) / 0.1;
      } else if (progress > 0.35) {
        orbitScale = 1 - (progress - 0.35) / 0.07;
      } else {
        orbitScale = 1;
      }
    } else if (progress >= 0.8) {
      orbitScale = (progress - 0.8) / 0.2;
    }

    groupRef.current.scale.setScalar(Math.max(0.001, orbitScale));
  });

  return (
    <group ref={groupRef} visible={active}>
      {beansData.map((b, i) => {
        const x = Math.cos(b.initialAngle) * b.radius;
        const z = Math.sin(b.initialAngle) * b.radius;
        return (
          <group key={i} position={[x, b.yOffset, z]} scale={b.scale} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
            {/* Bean Halves forming center crease */}
            <mesh position={[-0.4, 0, 0]} scale={[0.8, 1.4, 0.9]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color="#362214" roughness={0.4} metalness={0.2} />
            </mesh>
            <mesh position={[0.4, 0, 0]} scale={[0.8, 1.4, 0.9]}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color="#2E1B0E" roughness={0.4} metalness={0.2} />
            </mesh>
            {/* Dark Crease */}
            <mesh position={[0, 0, 0.2]} scale={[0.1, 1.3, 0.2]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color="#110A05" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
