"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

interface DessertSceneProps {
  progress: number;
  active: boolean;
}

export function DessertScene({ progress, active }: DessertSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { size } = useThree();
  const isMobile = size.width < 768;
  const { scene } = useGLTF("/models/cake/strawberry_chocolate_cake.gltf");

  // Clone scene to avoid mutation across mounts
  const clonedCake = React.useMemo(() => scene.clone(true), [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current || !active) return;

    // Slow rotation to showcase the decadent strawberries and mirror glaze
    groupRef.current.rotation.y += delta * 0.25;

    // Dessert scene runs around scroll 0.58 to 0.84
    if (progress >= 0.58 && progress <= 0.84) {
      let sceneScale = 1;
      if (progress < 0.64) {
        sceneScale = (progress - 0.58) / 0.06;
      } else if (progress > 0.78) {
        sceneScale = 1 - (progress - 0.78) / 0.06;
      }

      const targetScale = isMobile ? 4.9 : 6.5;
      const targetPosY = isMobile ? 0.08 : -0.2;
      groupRef.current.scale.setScalar(Math.max(0.0001, sceneScale * targetScale));
      groupRef.current.position.set(0, targetPosY, 0);
      groupRef.current.rotation.x = 0.28;
    } else if (progress >= 0.76 && progress < 0.88) {
      // Symphony orbit scene (Full screen orbiting glory: 0.76 -> 0.88)
      const t = (progress - 0.76) / 0.12;
      const angle = t * Math.PI * 2 + (Math.PI * 4) / 3;
      const orbitX = isMobile ? 1.05 : 1.7;
      const orbitZ = isMobile ? 0.85 : 1.3;
      const symScale = isMobile ? 2.8 : 4.0;
      groupRef.current.position.set(
        Math.cos(angle) * orbitX,
        (isMobile ? 0.20 : 0.05) + Math.sin(angle * 2.5) * 0.15,
        Math.sin(angle) * orbitZ
      );
      groupRef.current.scale.setScalar(symScale);
      groupRef.current.rotation.x = 0.2;
    } else if (progress >= 0.88) {
      // Scene 6: Settle into Grand Tabletop Trio (Left dish)
      const posX = isMobile ? -0.95 : -1.5;
      const posY = isMobile ? -0.05 : -0.18;
      const targetScale = isMobile ? 3.0 : 4.2;
      groupRef.current.position.set(posX, posY, 0);
      groupRef.current.scale.setScalar(targetScale);
      groupRef.current.rotation.x = 0.28;
    } else {
      groupRef.current.scale.setScalar(0.0001);
      groupRef.current.position.set(0, -10, 0);
    }
  });

  return (
    <group ref={groupRef} visible={active}>
      {/* 1. Artisanal Porcelain Cake Stand / Platter */}
      <mesh position={[0, -0.015, 0]}>
        <cylinderGeometry args={[0.15, 0.16, 0.012, 48]} />
        <meshPhysicalMaterial
          color="#1A120B"
          roughness={0.18}
          metalness={0.1}
          clearcoat={0.9}
        />
      </mesh>

      {/* 24K Gold Rim Trim */}
      <mesh position={[0, -0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.145, 0.154, 48]} />
        <meshStandardMaterial color="#B8975C" roughness={0.2} metalness={0.88} />
      </mesh>

      {/* 2. Photorealistic Scanned Strawberry Chocolate Cake */}
      <primitive object={clonedCake} position={[0, 0.002, 0]} />
    </group>
  );
}

useGLTF.preload("/models/cake/strawberry_chocolate_cake.gltf");
