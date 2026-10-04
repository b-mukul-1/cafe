"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { SteamShader } from "./SteamShader";

interface ArtisanalCupProps {
  progress: number;
  active: boolean;
}

export function ArtisanalCup({ progress, active }: ArtisanalCupProps) {
  const groupRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();
  const isMobile = size.width < 768;

  // Load high-resolution crema swirl texture
  const cremaTexture = useLoader(THREE.TextureLoader, "/textures/crema.png");
  cremaTexture.wrapS = THREE.ClampToEdgeWrapping;
  cremaTexture.wrapT = THREE.ClampToEdgeWrapping;

  // 1. Ceramic Cup Lathe Geometry (Handcrafted profile)
  const cupGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    // Foot ring
    points.push(new THREE.Vector2(0.0, 0.0));
    points.push(new THREE.Vector2(0.38, 0.0));
    points.push(new THREE.Vector2(0.40, 0.04));
    points.push(new THREE.Vector2(0.48, 0.08));
    // Outer parabolic body curve
    points.push(new THREE.Vector2(0.56, 0.25));
    points.push(new THREE.Vector2(0.66, 0.52));
    points.push(new THREE.Vector2(0.74, 0.80));
    points.push(new THREE.Vector2(0.77, 0.94));
    // Thick rounded artisanal sipping lip
    points.push(new THREE.Vector2(0.765, 0.98));
    points.push(new THREE.Vector2(0.745, 1.0));
    points.push(new THREE.Vector2(0.715, 0.98));
    points.push(new THREE.Vector2(0.685, 0.94));
    // Inner wall curve (parabolic espresso basin)
    points.push(new THREE.Vector2(0.655, 0.80));
    points.push(new THREE.Vector2(0.585, 0.52));
    points.push(new THREE.Vector2(0.46, 0.25));
    points.push(new THREE.Vector2(0.28, 0.12));
    points.push(new THREE.Vector2(0.0, 0.10));

    return new THREE.LatheGeometry(points, isMobile ? 36 : 64);
  }, [isMobile]);

  // 2. Ceramic Saucer Lathe Geometry
  const saucerGeometry = useMemo(() => {
    const points: THREE.Vector2[] = [];
    // Center recess / cup-well
    points.push(new THREE.Vector2(0.0, 0.0));
    points.push(new THREE.Vector2(0.44, 0.01));
    points.push(new THREE.Vector2(0.48, 0.04));
    // Floor
    points.push(new THREE.Vector2(0.78, 0.06));
    // Flared upward brim
    points.push(new THREE.Vector2(1.08, 0.14));
    points.push(new THREE.Vector2(1.22, 0.22));
    // Rounded outer edge
    points.push(new THREE.Vector2(1.24, 0.24));
    points.push(new THREE.Vector2(1.21, 0.22));
    points.push(new THREE.Vector2(1.02, 0.11));
    // Saucer foot ring
    points.push(new THREE.Vector2(0.72, 0.0));
    points.push(new THREE.Vector2(0.68, 0.0));
    points.push(new THREE.Vector2(0.0, 0.02));

    return new THREE.LatheGeometry(points, isMobile ? 36 : 64);
  }, [isMobile]);

  // 3. Ergonomic Ceramic Handle (Tube along 3D Catmull-Rom curve)
  const handleGeometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.72, 0.78, 0),
      new THREE.Vector3(0.96, 0.82, 0),
      new THREE.Vector3(1.12, 0.64, 0),
      new THREE.Vector3(1.05, 0.42, 0),
      new THREE.Vector3(0.78, 0.32, 0),
      new THREE.Vector3(0.58, 0.30, 0),
    ]);
    return new THREE.TubeGeometry(curve, isMobile ? 18 : 32, 0.065, isMobile ? 10 : 16, false);
  }, [isMobile]);

  useFrame((state, delta) => {
    if (!groupRef.current || !active) return;

    // Subtle organic breathing tilt
    const elapsed = state.clock.elapsedTime;
    groupRef.current.rotation.y = elapsed * 0.18;

    // Gentle crema liquid surface swirl
    if (liquidRef.current) {
      liquidRef.current.rotation.z = Math.sin(elapsed * 0.4) * 0.05;
    }

    // Scroll cinematic progression:
    // Scene 0 (Hero): Cup sits center stage, steam rises generously
    // Scene 1 (Beans): Cup glides left, tilts slightly to reveal crema
    // Scene 2-3: Moves back
    // Scene 4 (Symphony): Orbits back in
    if (progress < 0.20) {
      const t = progress / 0.20;
      const posY = isMobile ? (0.05 + t * 0.12) : (-0.15 + t * 0.15);
      groupRef.current.position.set(0, posY, 0);
      groupRef.current.rotation.x = t * 0.15;
      const baseScale = isMobile ? 0.84 : 1.0;
      groupRef.current.scale.setScalar(baseScale * (1.0 + (1 - t) * 0.08));
    } else if (progress < 0.38) {
      const t = (progress - 0.20) / 0.18;
      const posX = isMobile ? (-0.28 * t) : (-0.65 * t);
      const posY = isMobile ? 0.12 : 0;
      groupRef.current.position.set(posX, posY, -0.4 * t);
      groupRef.current.rotation.x = 0.15 + t * 0.12;
      groupRef.current.rotation.z = -0.12 * t;
      const baseScale = isMobile ? 0.82 : 1.0;
      groupRef.current.scale.setScalar(baseScale * (1.0 - t * 0.1));
    } else if (progress < 0.80) {
      // Resting off-center in background
      groupRef.current.position.set(-2.5, -0.5, -2);
      groupRef.current.scale.setScalar(0.001);
    } else if (progress < 0.88) {
      // Symphony orbit (0.76 -> 0.88)
      const t = (progress - 0.76) / 0.12;
      const angle = t * Math.PI * 2;
      const orbitX = isMobile ? 1.05 : 1.7;
      const orbitZ = isMobile ? 0.85 : 1.3;
      const symScale = isMobile ? 0.52 : 0.72;
      groupRef.current.position.set(
        Math.cos(angle) * orbitX,
        (isMobile ? 0.20 : 0.05) + Math.sin(angle * 2) * 0.15,
        Math.sin(angle) * orbitZ
      );
      groupRef.current.rotation.x = 0.2;
      groupRef.current.scale.setScalar(symScale);
    } else {
      // Scene 6: Settle into Grand Tabletop Trio (Center dish)
      const targetY = isMobile ? 0.0 : -0.15;
      const targetScale = isMobile ? 0.62 : 0.80;
      groupRef.current.position.set(0, targetY, 0.3);
      groupRef.current.rotation.x = 0.22;
      groupRef.current.scale.setScalar(targetScale);
    }
  });

  // Calculate steam intensity based on scroll (max at hero, fades during later scenes)
  const steamIntensity = progress < 0.25 ? 1.0 : progress < 0.45 ? 0.6 : 0.0;

  return (
    <group ref={groupRef} visible={active}>
      {/* 1. Artisanal Ceramic Saucer */}
      <mesh geometry={saucerGeometry} position={[0, -0.32, 0]}>
        <meshPhysicalMaterial
          color="#1A120B"
          roughness={0.16}
          metalness={0.08}
          clearcoat={isMobile ? 0 : 1.0}
          clearcoatRoughness={0.06}
          reflectivity={isMobile ? 0.5 : 0.85}
        />
      </mesh>

      {/* Gold Rim Accent on Saucer */}
      <mesh position={[0, -0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.15, 1.20, isMobile ? 32 : 64]} />
        <meshStandardMaterial color="#B8975C" roughness={0.22} metalness={0.85} />
      </mesh>

      {/* 2. Artisanal Ceramic Cup Body */}
      <mesh geometry={cupGeometry} position={[0, -0.28, 0]}>
        <meshPhysicalMaterial
          color="#1A120B"
          roughness={0.16}
          metalness={0.08}
          clearcoat={isMobile ? 0 : 1.0}
          clearcoatRoughness={0.06}
          reflectivity={isMobile ? 0.5 : 0.85}
        />
      </mesh>

      {/* Inner Ceramic Porcelain Lining */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.67, 0.46, 0.82, isMobile ? 24 : 48, 1, true]} />
        <meshPhysicalMaterial
          color="#FAF5EE"
          roughness={0.25}
          metalness={0.05}
          clearcoat={isMobile ? 0 : 0.6}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* 3. Ergonomic Ceramic Handle */}
      <mesh geometry={handleGeometry} position={[0, -0.28, 0]}>
        <meshPhysicalMaterial
          color="#1A120B"
          roughness={0.16}
          metalness={0.08}
          clearcoat={isMobile ? 0 : 1.0}
          clearcoatRoughness={0.06}
        />
      </mesh>

      {/* 4. Delicate 24K Gold Rim Trim */}
      <mesh position={[0, 0.71, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.70, 0.75, isMobile ? 32 : 64]} />
        <meshStandardMaterial color="#B8975C" roughness={0.2} metalness={0.88} />
      </mesh>

      {/* 5. Photorealistic Espresso Crema Liquid Surface */}
      <mesh ref={liquidRef} position={[0, 0.58, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.67, isMobile ? 32 : 64]} />
        <meshStandardMaterial
          map={cremaTexture}
          roughness={0.18}
          metalness={0.12}
        />
      </mesh>

      {/* 6. GPU-Animated Rising Steam */}
      {steamIntensity > 0 && (
        <SteamShader position={[0, 0.65, 0]} intensity={steamIntensity} scale={1.1} />
      )}
    </group>
  );
}
