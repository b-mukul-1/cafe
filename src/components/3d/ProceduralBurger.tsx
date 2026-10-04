"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface ProceduralBurgerProps {
  progress: number;
  active: boolean;
}

export function ProceduralBurger({ progress, active }: ProceduralBurgerProps) {
  const groupRef = useRef<THREE.Group>(null);

  // References to separable layers
  const topBunRef = useRef<THREE.Group>(null);
  const lettuceRef = useRef<THREE.Mesh>(null);
  const tomatoRef = useRef<THREE.Mesh>(null);
  const cheeseRef = useRef<THREE.Mesh>(null);
  const pattyRef = useRef<THREE.Mesh>(null);
  const bottomBunRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current || !active) return;

    // Slow rotation
    groupRef.current.rotation.y += delta * 0.45;

    // Burger scene occurs around scroll 0.38 to 0.62
    if (progress >= 0.35 && progress <= 0.65) {
      // Scene entrance & exit scale
      let sceneScale = 1;
      if (progress < 0.4) {
        sceneScale = (progress - 0.35) / 0.05;
      } else if (progress > 0.6) {
        sceneScale = 1 - (progress - 0.6) / 0.05;
      }
      groupRef.current.scale.setScalar(Math.max(0.001, sceneScale * 1.1));
      groupRef.current.position.set(0, 0, 0);

      // Deconstruction animation (layers separate and float apart, then rejoin)
      // Progress 0.42 to 0.56: separation factor peak at 0.49
      let sep = 0;
      if (progress >= 0.42 && progress <= 0.56) {
        const factor = (progress - 0.42) / 0.14; // 0 to 1
        sep = Math.sin(factor * Math.PI); // 0 -> 1 -> 0 smooth bell curve
      }

      if (topBunRef.current) topBunRef.current.position.y = 0.55 + sep * 0.65;
      if (lettuceRef.current) lettuceRef.current.position.y = 0.35 + sep * 0.40;
      if (tomatoRef.current) tomatoRef.current.position.y = 0.22 + sep * 0.22;
      if (cheeseRef.current) cheeseRef.current.position.y = 0.10 + sep * 0.08;
      if (pattyRef.current) pattyRef.current.position.y = -0.06 - sep * 0.08;
      if (bottomBunRef.current) bottomBunRef.current.position.y = -0.32 - sep * 0.25;
    } else if (progress >= 0.8) {
      // Symphony orbit scene
      const t = (progress - 0.8) / 0.2;
      const angle = t * Math.PI * 2 + (Math.PI * 2) / 3;
      groupRef.current.position.set(Math.cos(angle) * 1.6, 0.2 + Math.sin(angle * 3) * 0.2, Math.sin(angle) * 1.3);
      groupRef.current.scale.setScalar(0.65);
      // Reset separation
      if (topBunRef.current) topBunRef.current.position.y = 0.55;
      if (lettuceRef.current) lettuceRef.current.position.y = 0.35;
      if (tomatoRef.current) tomatoRef.current.position.y = 0.22;
      if (cheeseRef.current) cheeseRef.current.position.y = 0.10;
      if (pattyRef.current) pattyRef.current.position.y = -0.06;
      if (bottomBunRef.current) bottomBunRef.current.position.y = -0.32;
    } else {
      groupRef.current.scale.setScalar(0.001);
      groupRef.current.position.set(0, -10, 0);
    }
  });

  return (
    <group ref={groupRef} visible={active}>
      {/* 1. TOP BRIOCHE BUN */}
      <group ref={topBunRef} position={[0, 0.55, 0]}>
        {/* Bun Dome */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.9, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#C57A33" roughness={0.35} metalness={0.1} />
        </mesh>
        {/* Golden Glaze Ring */}
        <mesh position={[0, -0.02, 0]}>
          <cylinderGeometry args={[0.9, 0.88, 0.08, 32]} />
          <meshStandardMaterial color="#B06520" roughness={0.4} />
        </mesh>
        {/* Toasted Sesame Seeds */}
        {[
          [0.3, 0.6, 0.2],
          [-0.2, 0.65, 0.3],
          [0.1, 0.72, -0.1],
          [-0.4, 0.52, -0.2],
          [0.4, 0.48, -0.3],
          [-0.1, 0.58, 0.45],
        ].map((pos, idx) => (
          <mesh key={idx} position={pos as [number, number, number]} scale={[0.03, 0.015, 0.05]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial color="#F4E9DC" roughness={0.5} />
          </mesh>
        ))}
      </group>

      {/* 2. CRISP FARM GREENS / LETTUCE */}
      <mesh ref={lettuceRef} position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.96, 0.94, 0.06, 24]} />
        <meshStandardMaterial color="#4A8522" roughness={0.6} />
      </mesh>

      {/* 3. HEIRLOOM TOMATO SLICES */}
      <mesh ref={tomatoRef} position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.88, 0.88, 0.1, 32]} />
        <meshStandardMaterial color="#C0392B" roughness={0.25} />
      </mesh>

      {/* 4. MELTED RACLETTE CHEESE */}
      <mesh ref={cheeseRef} position={[0, 0.1, 0]} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[1.3, 0.05, 1.3]} />
        <meshStandardMaterial color="#F39C12" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* 5. GOURMET SEARED PATTY */}
      <mesh ref={pattyRef} position={[0, -0.06, 0]}>
        <cylinderGeometry args={[0.92, 0.9, 0.24, 32]} />
        <meshStandardMaterial color="#3E2723" roughness={0.7} metalness={0.15} />
      </mesh>

      {/* 6. TOASTED BRIOCHE BOTTOM BUN */}
      <mesh ref={bottomBunRef} position={[0, -0.32, 0]}>
        <cylinderGeometry args={[0.88, 0.85, 0.22, 32]} />
        <meshStandardMaterial color="#C57A33" roughness={0.4} />
      </mesh>
    </group>
  );
}
