"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { cafeConfig } from "@/config/cafe.config";
import { ProceduralCup } from "./ProceduralCup";
import { ProceduralBeans } from "./ProceduralBeans";
import { ProceduralBurger } from "./ProceduralBurger";
import { ProceduralDessert } from "./ProceduralDessert";

interface SceneContentProps {
  progress: number;
}

export function SceneContent({ progress }: SceneContentProps) {
  const { camera } = useThree();
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);

  // Smooth camera interpolation based on scroll steps
  const steps = cafeConfig.scene3D.steps;

  useFrame(() => {
    // Find active step range
    let currentStep = steps[0];
    let nextStep = steps[1];
    let stepProgress = 0;

    for (let i = 0; i < steps.length - 1; i++) {
      if (progress >= steps[i].scrollProgressStart && progress <= steps[i + 1].scrollProgressStart) {
        currentStep = steps[i];
        nextStep = steps[i + 1];
        const range = nextStep.scrollProgressStart - currentStep.scrollProgressStart;
        stepProgress = range > 0 ? (progress - currentStep.scrollProgressStart) / range : 0;
        break;
      } else if (progress > steps[steps.length - 1].scrollProgressStart) {
        currentStep = steps[steps.length - 1];
        nextStep = steps[steps.length - 1];
        stepProgress = 1;
      }
    }

    // Interpolate camera position
    const targetCamX = THREE.MathUtils.lerp(currentStep.cameraPosition[0], nextStep.cameraPosition[0], stepProgress);
    const targetCamY = THREE.MathUtils.lerp(currentStep.cameraPosition[1], nextStep.cameraPosition[1], stepProgress);
    const targetCamZ = THREE.MathUtils.lerp(currentStep.cameraPosition[2], nextStep.cameraPosition[2], stepProgress);

    camera.position.set(targetCamX, targetCamY, targetCamZ);

    // Interpolate camera lookAt
    const targetLookX = THREE.MathUtils.lerp(currentStep.cameraLookAt[0], nextStep.cameraLookAt[0], stepProgress);
    const targetLookY = THREE.MathUtils.lerp(currentStep.cameraLookAt[1], nextStep.cameraLookAt[1], stepProgress);
    const targetLookZ = THREE.MathUtils.lerp(currentStep.cameraLookAt[2], nextStep.cameraLookAt[2], stepProgress);

    camera.lookAt(targetLookX, targetLookY, targetLookZ);

    // Warm light tracking
    if (pointLightRef.current) {
      pointLightRef.current.position.set(targetCamX * 0.5, targetCamY + 1.0, targetCamZ * 0.5);
    }
  });

  return (
    <>
      {/* Subtle warm amber ambient lighting */}
      <ambientLight intensity={1.2} color="#F5EFE6" />

      {/* Directional Key Light (warm sun/crema feel) */}
      <directionalLight
        ref={dirLightRef}
        position={[5, 8, 5]}
        intensity={2.2}
        color="#FFEAD1"
      />

      {/* Rim light (golden glow) */}
      <directionalLight position={[-4, 4, -4]} intensity={1.5} color="#C98A4C" />

      {/* Soft Fill Point Light */}
      <pointLight ref={pointLightRef} intensity={1.0} distance={8} color="#E5B070" />

      {/* Procedural Models (active based on scroll storytelling) */}
      <ProceduralCup progress={progress} active={true} />
      <ProceduralBeans progress={progress} active={progress >= 0.12} />
      <ProceduralBurger progress={progress} active={progress >= 0.32} />
      <ProceduralDessert progress={progress} active={progress >= 0.55} />
    </>
  );
}
