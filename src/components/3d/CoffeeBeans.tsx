"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

interface CoffeeBeansProps {
  progress: number;
  active: boolean;
}

export function CoffeeBeans({ progress, active }: CoffeeBeansProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { size } = useThree();
  const isMobile = size.width < 768;
  const beanCount = isMobile ? 18 : 36;

  // 1. Parametric Arabica Coffee Bean Geometry with authentic longitudinal furrow
  const beanGeometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, isMobile ? 18 : 32, isMobile ? 14 : 24);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);

      // Elongate into typical coffee bean oval ratio
      y *= 1.38;
      x *= 0.88;
      z *= 0.62;

      // Flat face with S-curve furrow along the crease (z > 0)
      if (z > 0) {
        z *= 0.42;
        // Natural curved Arabica seam
        const seamX = 0.08 * Math.sin(y * 2.2);
        const distFromSeam = Math.abs(x - seamX);
        const furrowDepth = Math.exp(-Math.pow(distFromSeam * 7.5, 2)) * 0.36 * Math.max(0, 1 - Math.pow(y / 1.38, 2));
        z -= furrowDepth;
      }

      pos.setXYZ(i, x, y, z);
    }

    geo.computeVertexNormals();
    return geo;
  }, [isMobile]);

  // 2. Randomized organic bean transforms
  const beansData = useMemo(() => {
    return Array.from({ length: beanCount }, (_, i) => {
      const radius = 1.0 + Math.random() * 1.6;
      const angle = (i / beanCount) * Math.PI * 2;
      const yOffset = (Math.random() - 0.5) * 1.4;
      const scale = 0.09 + Math.random() * 0.05;
      const rotSpeed = (Math.random() - 0.5) * 1.5;
      const tumbleAxis = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();

      // Roasted shade variation (from medium dark to dark French roast)
      const colorChoices = ["#2A160D", "#351C11", "#1E1009", "#3C2114", "#2E180E"];
      const color = colorChoices[i % colorChoices.length];

      return { radius, angle, yOffset, scale, rotSpeed, tumbleAxis, color };
    });
  }, [beanCount]);

  useFrame((state, delta) => {
    if (!groupRef.current || !active) return;

    // Gentle global orbit rotation
    groupRef.current.rotation.y += delta * 0.25;

    // Scene progression (Scene 1: 0.18 -> 0.40)
    let beanScale = 0;
    if (progress >= 0.15 && progress <= 0.45) {
      if (progress < 0.22) {
        beanScale = (progress - 0.15) / 0.07;
      } else if (progress > 0.38) {
        beanScale = 1 - (progress - 0.38) / 0.07;
      } else {
        beanScale = 1;
      }
    } else if (progress >= 0.76 && progress < 0.88) {
      // Symphony orbit
      beanScale = ((progress - 0.76) / 0.12) * 0.7;
    } else if (progress >= 0.88) {
      // Grand finale: scattered gently around the tabletop dishes
      beanScale = 0.55;
    }

    groupRef.current.scale.setScalar(Math.max(0.0001, beanScale));
  });

  return (
    <group ref={groupRef} visible={active}>
      {beansData.map((b, i) => {
        const x = Math.cos(b.angle) * b.radius;
        const z = Math.sin(b.angle) * b.radius;

        return (
          <group key={i} position={[x, b.yOffset, z]} scale={b.scale}>
            <mesh geometry={beanGeometry} rotation={[Math.sin(i) * 3, Math.cos(i) * 3, i * 0.5]}>
              <meshStandardMaterial
                color={b.color}
                roughness={0.32}
                metalness={0.12}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
