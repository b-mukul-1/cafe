"use client";

import React, { useRef, Suspense } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { ArtisanalCup } from "./ArtisanalCup";
import { CoffeeBeans } from "./CoffeeBeans";
import { FoodScene } from "./FoodScene";
import { DessertScene } from "./DessertScene";
import { AmbientParticles } from "./AmbientParticles";

interface SceneContentProps {
  progress: number;
}

export function SceneContent({ progress }: SceneContentProps) {
  const { camera, size } = useThree();
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);

  const isMobile = size.width < 768;
  const isTablet = size.width >= 768 && size.width < 1024;

  // Reusable vectors to avoid frame-by-frame GC allocations
  const tempCamVec = useRef(new THREE.Vector3());
  const tempLookVec = useRef(new THREE.Vector3());

  // Dynamically update camera FOV based on screen aspect ratio
  React.useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      const aspect = size.width / Math.max(1, size.height);
      // When aspect is portrait (< 1.0), widen vertical FOV so horizontal view does not crop models
      const targetFov = aspect < 1.0 ? Math.min(62, 45 + (1 - aspect) * 26) : 45;
      if (Math.abs(camera.fov - targetFov) > 0.5) {
        camera.fov = targetFov;
        camera.updateProjectionMatrix();
      }
    }
  }, [camera, size.width, size.height]);

  // 1. Cinematic 6-Scene Camera Path (Catmull-Rom 3D Curve)
  const cameraCurve = React.useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0.85, 3.6),    // 0.0: Intimate Hero Cup
        new THREE.Vector3(0.5, 0.95, 3.4),   // 0.15: Transition to beans
        new THREE.Vector3(1.3, 1.25, 3.1),   // 0.28: Macro single-origin beans
        new THREE.Vector3(0.2, 1.15, 3.2),   // 0.38: Swing to bakery
        new THREE.Vector3(-1.3, 1.10, 2.8),  // 0.48: Flaky buttery croissant
        new THREE.Vector3(-0.4, 1.30, 3.0),  // 0.58: Swing to patisserie
        new THREE.Vector3(1.0, 1.35, 2.9),   // 0.68: Decadent chocolate cake
        new THREE.Vector3(0, 2.1, 4.6),      // 0.80: Grand Cafe Symphony
        new THREE.Vector3(0, 1.15, 3.8),     // 0.90 - 1.0: Tabletop Spread Finale
      ],
      false,
      "centripetal"
    );
  }, []);

  const lookAtCurve = React.useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0.25, 0),
        new THREE.Vector3(0, 0.20, 0),
        new THREE.Vector3(0.1, 0.15, 0),
        new THREE.Vector3(0, 0.10, 0),
        new THREE.Vector3(-0.1, 0.08, 0),
        new THREE.Vector3(0, 0.12, 0),
        new THREE.Vector3(0.1, 0.10, 0),
        new THREE.Vector3(0, 0.20, 0),
        new THREE.Vector3(0, 0.02, 0),       // Focused at tabletop baseline
      ],
      false,
      "centripetal"
    );
  }, []);

  useFrame(() => {
    // Clamp progress safely between 0 and 1
    const p = Math.max(0, Math.min(1, progress));

    // Smoothly calculate target camera position and focal point along Catmull-Rom path
    const rawTargetCam = cameraCurve.getPointAt(p);
    const rawTargetLook = lookAtCurve.getPointAt(p);

    const targetCam = tempCamVec.current.copy(rawTargetCam);
    const targetLook = tempLookVec.current.copy(rawTargetLook);

    // Apply mobile-responsive framing adjustments
    if (isMobile) {
      // 1. Reduce horizontal swing to keep models in the mobile viewport
      targetCam.x *= 0.32;
      // 2. Lift camera and lookAt slightly so models sit gracefully above mobile UI cards
      targetCam.y += 0.24;
      targetLook.y += 0.20;
      // 3. Gentle depth pull-back
      targetCam.z *= 1.12;
    } else if (isTablet) {
      targetCam.x *= 0.65;
      targetCam.z *= 1.05;
    }

    camera.position.lerp(targetCam, isMobile ? 0.24 : 0.12);
    camera.lookAt(targetLook);

    // Warm key light follows focal zone
    if (pointLightRef.current) {
      pointLightRef.current.position.set(targetCam.x * 0.4, targetCam.y + 0.8, targetCam.z * 0.5);
    }
  });

  return (
    <>
      {/* 1. Photorealistic Warm Cafe Environment Reflections */}
      <Suspense fallback={null}>
        <Environment files="/hdri/comfy_cafe_1k.hdr" environmentIntensity={0.65} />
      </Suspense>

      {/* 2. Soft Ambient Lighting */}
      <ambientLight intensity={0.7} color="#FAF5EE" />

      {/* 3. Golden Hour Key Light (disable heavy dynamic shadow map on mobile) */}
      <directionalLight
        ref={dirLightRef}
        position={[4, 6, 4]}
        intensity={1.9}
        color="#FFEAD1"
        castShadow={!isMobile}
      />

      {/* 4. Warm Caramel Rim Light */}
      <directionalLight position={[-4, 3, -3]} intensity={1.2} color="#C9913A" />

      {/* 5. Tracking Specular Highlight */}
      <pointLight ref={pointLightRef} intensity={0.9} distance={7} color="#B8975C" />

      {/* 6. Realistic Tabletop Contact Shadows (cached static bake on mobile to eliminate GPU blur passes) */}
      <ContactShadows
        position={[0, -0.42, 0]}
        opacity={0.65}
        scale={6}
        blur={isMobile ? 1.5 : 2.4}
        far={2.0}
        resolution={isMobile ? 256 : 512}
        frames={isMobile ? 1 : Infinity}
        color="#0A0604"
      />

      {/* 7. Ambient Golden Floating Bokeh Dust (streamlined on mobile) */}
      <AmbientParticles count={isMobile ? 35 : 90} />

      {/* 8. Handcrafted 3D Scene Components with Suspense Boundaries */}
      <Suspense fallback={null}>
        <ArtisanalCup progress={progress} active={true} />
      </Suspense>

      <Suspense fallback={null}>
        <CoffeeBeans progress={progress} active={progress >= 0.12 && progress <= 0.95} />
      </Suspense>

      <Suspense fallback={null}>
        <FoodScene progress={progress} active={progress >= 0.30} />
      </Suspense>

      <Suspense fallback={null}>
        <DessertScene progress={progress} active={progress >= 0.52} />
      </Suspense>
    </>
  );
}
