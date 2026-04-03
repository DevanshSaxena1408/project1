"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/store/useStore";
import type { Planet } from "@/data/content";

interface PlanetMeshProps {
  planet: Planet;
  onClick: () => void;
}

export default function PlanetMesh({ planet, onClick }: PlanetMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { setHoveredPlanet } = useStore();

  const orbitParticles = useMemo(() => {
    const count = 30;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const radius = planet.size * 2.5;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.3;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.2;
      positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.3;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [planet.size]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      const targetScale = hovered ? 1.12 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.08
      );
    }
    if (atmosphereRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.03 + 1;
      atmosphereRef.current.scale.set(pulse, pulse, pulse);
      const mat = atmosphereRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = hovered ? 0.18 : 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.08;
    }
    if (glowRef.current) {
      const glow = Math.sin(state.clock.elapsedTime * 2) * 0.04 + 1;
      glowRef.current.scale.set(glow, glow, glow);
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef} position={planet.position}>
        {/* Outer atmosphere glow */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[planet.size * 1.6, 32, 32]} />
          <meshBasicMaterial
            color={planet.color}
            transparent
            opacity={hovered ? 0.12 : 0.04}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Inner atmosphere */}
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[planet.size * 1.15, 32, 32]} />
          <meshBasicMaterial
            color={planet.color}
            transparent
            opacity={0.08}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Main planet sphere */}
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onPointerEnter={(e) => {
            e.stopPropagation();
            setHovered(true);
            setHoveredPlanet(planet.id);
            document.body.style.cursor = "pointer";
          }}
          onPointerLeave={() => {
            setHovered(false);
            setHoveredPlanet(null);
            document.body.style.cursor = "none";
          }}
        >
          <sphereGeometry args={[planet.size, 64, 64]} />
          <meshStandardMaterial
            color={planet.color}
            emissive={planet.emissive}
            emissiveIntensity={hovered ? 0.5 : 0.25}
            roughness={0.65}
            metalness={0.2}
          />
        </mesh>

        {/* Surface highlight - gives 3D depth */}
        <mesh position={[planet.size * 0.3, planet.size * 0.3, planet.size * 0.6]}>
          <sphereGeometry args={[planet.size * 0.35, 16, 16]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Ring for Saturn */}
        {planet.hasRing && (
          <mesh ref={ringRef} rotation={[Math.PI / 3, 0.2, 0]}>
            <ringGeometry args={[planet.size * 1.4, planet.size * 2.2, 80]} />
            <meshBasicMaterial
              color={planet.ringColor}
              transparent
              opacity={0.35}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )}

        {/* Orbit ring particles */}
        {hovered && (
          <points geometry={orbitParticles} rotation={[Math.PI / 2, 0, 0]}>
            <pointsMaterial
              size={0.06}
              color={planet.color}
              transparent
              opacity={0.5}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </points>
        )}

        {/* Label */}
        <Text
          position={[0, planet.size + 0.7, 0]}
          fontSize={0.35}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
          font={undefined}
        >
          {planet.label}
          <meshBasicMaterial
            color="white"
            transparent
            opacity={hovered ? 1 : 0.6}
          />
        </Text>

        {/* Hover description */}
        {hovered && (
          <Text
            position={[0, planet.size + 1.2, 0]}
            fontSize={0.18}
            color="#4fc3f7"
            anchorX="center"
            anchorY="middle"
          >
            {planet.description}
          </Text>
        )}

        {/* Point light from planet */}
        <pointLight
          color={planet.color}
          intensity={hovered ? 0.6 : 0.15}
          distance={planet.size * 5}
        />
      </group>
    </Float>
  );
}
