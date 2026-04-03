"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function AstronautBody() {
  const groupRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);

  const visorMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#1a237e",
        metalness: 0.9,
        roughness: 0.1,
        envMapIntensity: 2,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.85,
      }),
    []
  );

  const suitMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#e8e8e8",
        roughness: 0.6,
        metalness: 0.1,
      }),
    []
  );

  const accentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#4fc3f7",
        emissive: "#4fc3f7",
        emissiveIntensity: 0.5,
        roughness: 0.3,
        metalness: 0.5,
      }),
    []
  );

  const jetpackFireMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#ff9800",
        transparent: true,
        opacity: 0.7,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(t * 0.8) * 0.15 + 0.3;
      leftArmRef.current.rotation.x = Math.sin(t * 0.6) * 0.1;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -Math.sin(t * 0.8 + 1) * 0.15 - 0.3;
      rightArmRef.current.rotation.x = Math.sin(t * 0.6 + 1) * 0.1;
    }
    if (leftLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }
    if (rightLegRef.current) {
      rightLegRef.current.rotation.x = -Math.sin(t * 0.5) * 0.1;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
    }
  });

  return (
    <group ref={groupRef} scale={0.35}>
      {/* Helmet */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <primitive object={suitMaterial} attach="material" />
      </mesh>

      {/* Visor */}
      <mesh position={[0, 1.8, 0.35]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <primitive object={visorMaterial} attach="material" />
      </mesh>

      {/* Visor glow ring */}
      <mesh position={[0, 1.8, 0.15]}>
        <torusGeometry args={[0.52, 0.03, 16, 32]} />
        <primitive object={accentMaterial} attach="material" />
      </mesh>

      {/* Body / Torso */}
      <mesh position={[0, 0.7, 0]}>
        <capsuleGeometry args={[0.55, 0.8, 16, 16]} />
        <primitive object={suitMaterial} attach="material" />
      </mesh>

      {/* Chest accent stripe */}
      <mesh position={[0, 0.9, 0.5]}>
        <boxGeometry args={[0.6, 0.08, 0.1]} />
        <primitive object={accentMaterial} attach="material" />
      </mesh>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[0.7, 1.0, 0]}>
        <mesh position={[0.2, -0.3, 0]}>
          <capsuleGeometry args={[0.18, 0.6, 8, 8]} />
          <primitive object={suitMaterial} attach="material" />
        </mesh>
        {/* Glove */}
        <mesh position={[0.25, -0.75, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[-0.7, 1.0, 0]}>
        <mesh position={[-0.2, -0.3, 0]}>
          <capsuleGeometry args={[0.18, 0.6, 8, 8]} />
          <primitive object={suitMaterial} attach="material" />
        </mesh>
        <mesh position={[-0.25, -0.75, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>
      </group>

      {/* Left Leg */}
      <group ref={leftLegRef} position={[0.3, -0.1, 0]}>
        <mesh position={[0, -0.5, 0]}>
          <capsuleGeometry args={[0.2, 0.7, 8, 8]} />
          <primitive object={suitMaterial} attach="material" />
        </mesh>
        {/* Boot */}
        <mesh position={[0, -1.0, 0.05]}>
          <boxGeometry args={[0.25, 0.2, 0.35]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[-0.3, -0.1, 0]}>
        <mesh position={[0, -0.5, 0]}>
          <capsuleGeometry args={[0.2, 0.7, 8, 8]} />
          <primitive object={suitMaterial} attach="material" />
        </mesh>
        <mesh position={[0, -1.0, 0.05]}>
          <boxGeometry args={[0.25, 0.2, 0.35]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>
      </group>

      {/* Jetpack */}
      <mesh position={[0, 0.7, -0.55]}>
        <boxGeometry args={[0.6, 0.8, 0.3]} />
        <meshStandardMaterial color="#9e9e9e" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Jetpack nozzles */}
      <mesh position={[0.15, 0.15, -0.6]}>
        <cylinderGeometry args={[0.08, 0.12, 0.2, 8]} />
        <meshStandardMaterial color="#616161" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.15, 0.15, -0.6]}>
        <cylinderGeometry args={[0.08, 0.12, 0.2, 8]} />
        <meshStandardMaterial color="#616161" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Jetpack fire */}
      <mesh position={[0.15, -0.05, -0.6]} scale={[1, 1.5, 1]}>
        <coneGeometry args={[0.07, 0.3, 8]} />
        <primitive object={jetpackFireMaterial} attach="material" />
      </mesh>
      <mesh position={[-0.15, -0.05, -0.6]} scale={[1, 1.5, 1]}>
        <coneGeometry args={[0.07, 0.3, 8]} />
        <primitive object={jetpackFireMaterial} attach="material" />
      </mesh>
    </group>
  );
}

interface AstronautProps {
  position?: [number, number, number];
}

export default function Astronaut({ position = [3, -0.5, 2] }: AstronautProps) {
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <group position={position}>
        <AstronautBody />
        {/* Subtle point light from visor */}
        <pointLight
          position={[0, 0.65, 0.3]}
          color="#4fc3f7"
          intensity={0.5}
          distance={3}
        />
      </group>
    </Float>
  );
}
