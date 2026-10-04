"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface ProceduralCupProps {
  progress: number; // 0 to 1 overall scroll progress
  active: boolean;
}

export function ProceduralCup({ progress, active }: ProceduralCupProps) {
  const groupRef = useRef<THREE.Group>(null);
  const steamRef = useRef<THREE.Points>(null);

  // Steam particle setup
  const particleCount = 45;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 1] = 0.5 + Math.random() * 0.9;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Subtle breathing rotation
    groupRef.current.rotation.y += delta * 0.3;

    // Steam particle animation
    if (steamRef.current) {
      const geo = steamRef.current.geometry;
      const posAttr = geo.attributes.position;
      if (posAttr) {
        for (let i = 0; i < particleCount; i++) {
          let y = posAttr.getY(i) + delta * 0.35;
          if (y > 1.6) {
            y = 0.5;
            posAttr.setX(i, (Math.random() - 0.5) * 0.35);
            posAttr.setZ(i, (Math.random() - 0.5) * 0.35);
          }
          posAttr.setY(i, y);
        }
        posAttr.needsUpdate = true;
      }
    }

    // Scroll animation response:
    // Scene 1: cup rises (0 -> 0.18)
    // Scene 2: cup tilts (0.18 -> 0.38)
    if (progress < 0.18) {
      const t = progress / 0.18;
      groupRef.current.position.y = -1.2 + t * 1.2;
      groupRef.current.rotation.x = 0;
      groupRef.current.scale.setScalar(0.7 + t * 0.3);
    } else if (progress < 0.38) {
      const t = (progress - 0.18) / 0.2;
      groupRef.current.position.y = 0;
      groupRef.current.position.x = -0.4 * t;
      groupRef.current.rotation.x = 0.25 * t;
      groupRef.current.rotation.z = -0.15 * t;
      groupRef.current.scale.setScalar(1.0);
    } else if (progress < 0.8) {
      // Moves back slightly during burger and dessert scenes
      groupRef.current.position.set(0, -5, 0);
    } else {
      // Symphony scene: orbit
      const t = (progress - 0.8) / 0.2;
      const angle = t * Math.PI * 2;
      groupRef.current.position.set(Math.cos(angle) * 1.5, 0.4 + Math.sin(angle * 2) * 0.2, Math.sin(angle) * 1.2);
      groupRef.current.scale.setScalar(0.7);
    }
  });

  return (
    <group ref={groupRef} visible={active}>
      {/* Saucer */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[1.2, 0.9, 0.08, 48]} />
        <meshStandardMaterial color="#1C1510" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Saucer Inner Ring */}
      <mesh position={[0, -0.36, 0]}>
        <cylinderGeometry args={[0.7, 0.6, 0.02, 36]} />
        <meshStandardMaterial color="#C98A4C" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Ceramic Cup Body */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.75, 0.5, 0.95, 48]} />
        <meshStandardMaterial color="#221A14" roughness={0.25} metalness={0.15} />
      </mesh>

      {/* Inner Ceramic Wall */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.68, 0.44, 0.92, 48]} />
        <meshStandardMaterial color="#F5EFE6" roughness={0.3} />
      </mesh>

      {/* Coffee Liquid Surface */}
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.66, 0.66, 0.02, 48]} />
        <meshStandardMaterial color="#2B1608" roughness={0.1} metalness={0.3} />
      </mesh>

      {/* Crema Swirl */}
      <mesh position={[0, 0.435, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.62, 32]} />
        <meshStandardMaterial color="#C98A4C" opacity={0.6} transparent roughness={0.6} />
      </mesh>

      {/* Cup Handle */}
      <mesh position={[0.75, 0.12, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[0.3, 0.08, 16, 32, Math.PI * 1.1]} />
        <meshStandardMaterial color="#221A14" roughness={0.25} metalness={0.15} />
      </mesh>

      {/* Golden Rim Accent */}
      <mesh position={[0, 0.58, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.71, 0.76, 48]} />
        <meshStandardMaterial color="#E5B070" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Rising Steam Particle Cloud */}
      <points ref={steamRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#FAF6F0"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
