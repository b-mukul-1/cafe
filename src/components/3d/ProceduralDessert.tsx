"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface ProceduralDessertProps {
  progress: number;
  active: boolean;
}

export function ProceduralDessert({ progress, active }: ProceduralDessertProps) {
  const groupRef = useRef<THREE.Group>(null);
  const sauceDropRef = useRef<THREE.Mesh>(null);
  const spoonRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current || !active) return;

    // Slow rotation
    groupRef.current.rotation.y += delta * 0.35;

    // Dessert scene runs around scroll 0.60 to 0.82
    if (progress >= 0.58 && progress <= 0.84) {
      let sceneScale = 1;
      if (progress < 0.64) {
        sceneScale = (progress - 0.58) / 0.06;
      } else if (progress > 0.78) {
        sceneScale = 1 - (progress - 0.78) / 0.06;
      }
      groupRef.current.scale.setScalar(Math.max(0.001, sceneScale * 1.15));
      groupRef.current.position.set(0, 0, 0);

      // Sauce drop falls (progress 0.65 to 0.75)
      if (sauceDropRef.current) {
        if (progress >= 0.65 && progress <= 0.75) {
          const dropT = (progress - 0.65) / 0.1;
          sauceDropRef.current.position.y = 1.2 - dropT * 0.75;
          sauceDropRef.current.scale.set(0.08, 0.12 * (1 - dropT * 0.3), 0.08);
          sauceDropRef.current.visible = true;
        } else {
          sauceDropRef.current.visible = false;
        }
      }

      // Spoon cuts in (progress 0.70 to 0.78)
      if (spoonRef.current) {
        if (progress >= 0.70 && progress <= 0.79) {
          const spoonT = (progress - 0.70) / 0.09;
          spoonRef.current.position.set(0.8 - spoonT * 0.45, 0.9 - spoonT * 0.45, 0.4);
          spoonRef.current.rotation.z = -Math.PI / 4 + spoonT * 0.15;
          spoonRef.current.visible = true;
        } else {
          spoonRef.current.visible = false;
        }
      }
    } else if (progress >= 0.8) {
      // Symphony orbit scene
      const t = (progress - 0.8) / 0.2;
      const angle = t * Math.PI * 2 + (Math.PI * 4) / 3;
      groupRef.current.position.set(Math.cos(angle) * 1.5, 0.3 + Math.sin(angle * 2.5) * 0.2, Math.sin(angle) * 1.3);
      groupRef.current.scale.setScalar(0.65);
      if (sauceDropRef.current) sauceDropRef.current.visible = false;
      if (spoonRef.current) spoonRef.current.visible = false;
    } else {
      groupRef.current.scale.setScalar(0.001);
      groupRef.current.position.set(0, -10, 0);
    }
  });

  return (
    <group ref={groupRef} visible={active}>
      {/* Plate */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[1.3, 1.1, 0.06, 48]} />
        <meshStandardMaterial color="#1A130E" roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[0, -0.37, 0]}>
        <cylinderGeometry args={[0.9, 0.8, 0.02, 36]} />
        <meshStandardMaterial color="#2B1D14" roughness={0.3} />
      </mesh>

      {/* Layer 1: Biscuit Crust Base */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.8, 0.82, 0.15, 36]} />
        <meshStandardMaterial color="#8D5524" roughness={0.6} />
      </mesh>

      {/* Layer 2: Silky Molten Cheesecake / Cream Body */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.78, 0.78, 0.45, 36]} />
        <meshStandardMaterial color="#F9EBE0" roughness={0.25} />
      </mesh>

      {/* Layer 3: Caramelized Burnt Basque Surface / Mirror Glaze */}
      <mesh position={[0, 0.29, 0]}>
        <cylinderGeometry args={[0.76, 0.77, 0.04, 36]} />
        <meshStandardMaterial color="#5A2E10" roughness={0.15} metalness={0.2} />
      </mesh>

      {/* Garnish: Pistachio Crumble & Gold Flakes */}
      <mesh position={[0.2, 0.32, 0.1]} scale={[0.12, 0.04, 0.12]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#558B2F" roughness={0.5} />
      </mesh>
      <mesh position={[-0.15, 0.32, -0.1]} scale={[0.08, 0.03, 0.08]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#E5B070" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Dynamic Sauce Droplet */}
      <mesh ref={sauceDropRef} position={[0, 0.8, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#C98A4C" roughness={0.1} metalness={0.3} />
      </mesh>

      {/* Sleek Dessert Spoon Cutting In */}
      <group ref={spoonRef} position={[0.8, 0.8, 0.4]} rotation={[0, 0, -Math.PI / 4]}>
        {/* Handle */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.02, 0.03, 1.2, 16]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.85} />
        </mesh>
        {/* Bowl */}
        <mesh position={[0, -0.05, 0]} scale={[0.15, 0.22, 0.08]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.85} />
        </mesh>
      </group>
    </group>
  );
}
