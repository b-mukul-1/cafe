"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";

interface SteamShaderProps {
  position?: [number, number, number];
  intensity?: number;
  scale?: number;
}

const SteamVertexShader = `
  varying vec2 vUv;
  varying float vElevation;
  uniform float uTime;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Organic rising curl displacement
    float curlFactor = smoothstep(0.0, 1.0, uv.y);
    float angle = uTime * 1.2 + pos.y * 2.5;
    pos.x += sin(angle) * 0.08 * curlFactor;
    pos.z += cos(angle * 0.85) * 0.08 * curlFactor;
    
    // Slight expansion as steam rises
    pos.x *= (1.0 + curlFactor * 0.6);
    pos.z *= (1.0 + curlFactor * 0.6);

    vElevation = pos.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const SteamFragmentShader = `
  uniform float uTime;
  uniform sampler2D uNoiseMap;
  uniform float uIntensity;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // Flowing texture coordinates
    vec2 flowUv1 = vec2(vUv.x * 1.5, vUv.y * 0.8 - uTime * 0.28);
    vec2 flowUv2 = vec2(vUv.x * 2.0 + 0.35, vUv.y * 1.2 - uTime * 0.42);

    float noise1 = texture2D(uNoiseMap, flowUv1).r;
    float noise2 = texture2D(uNoiseMap, flowUv2).g;
    float combinedNoise = (noise1 * 0.6 + noise2 * 0.4);

    // Fade in at bottom (rim), fade out at top (dissipate)
    float verticalShape = sin(vUv.y * 3.14159);
    verticalShape = pow(verticalShape, 0.7);

    // Horizontal soft falloff
    float horizontalShape = 1.0 - pow(abs(vUv.x - 0.5) * 2.0, 2.0);
    horizontalShape = clamp(horizontalShape, 0.0, 1.0);

    float alpha = combinedNoise * verticalShape * horizontalShape * uIntensity * 0.45;

    // Warm steam tint (crema cream #FAF5EE)
    vec3 steamColor = vec3(0.98, 0.96, 0.93);

    gl_FragColor = vec4(steamColor, alpha);
  }
`;

export function SteamShader({ position = [0, 0.6, 0], intensity = 1.0, scale = 1.0 }: SteamShaderProps) {
  const meshRef1 = useRef<THREE.Mesh>(null);
  const meshRef2 = useRef<THREE.Mesh>(null);
  const { size } = useThree();
  const isMobile = size.width < 768;

  // Load steam noise texture
  const noiseTexture = useLoader(THREE.TextureLoader, "/textures/steam-noise.png");
  noiseTexture.wrapS = THREE.RepeatWrapping;
  noiseTexture.wrapT = THREE.RepeatWrapping;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uNoiseMap: { value: noiseTexture },
      uIntensity: { value: intensity },
    }),
    [noiseTexture, intensity]
  );

  useFrame((state, delta) => {
    uniforms.uTime.value += delta;
    uniforms.uIntensity.value = intensity;

    if (meshRef1.current) {
      meshRef1.current.rotation.y += delta * 0.15;
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.y -= delta * 0.12;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Primary steam plume */}
      <mesh ref={meshRef1} position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.35, 0.15, 1.1, isMobile ? 16 : 24, isMobile ? 14 : 24, true]} />
        <shaderMaterial
          vertexShader={SteamVertexShader}
          fragmentShader={SteamFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={isMobile ? THREE.FrontSide : THREE.DoubleSide}
        />
      </mesh>

      {/* Cross-axial billow for 3D fullness (desktop only to eliminate alpha overdraw stutter on mobile) */}
      {!isMobile && (
        <mesh ref={meshRef2} position={[0, 0.55, 0]} rotation={[0, Math.PI / 3, 0]}>
          <cylinderGeometry args={[0.3, 0.12, 1.2, 24, 24, true]} />
          <shaderMaterial
            vertexShader={SteamVertexShader}
            fragmentShader={SteamFragmentShader}
            uniforms={uniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
}
