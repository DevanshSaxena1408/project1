"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Preload } from "@react-three/drei";
import * as THREE from "three";
import StarField from "./StarField";
import PlanetMesh from "./PlanetMesh";
import Astronaut from "./Astronaut";
import { planets } from "@/data/content";
import { useStore } from "@/store/useStore";

/* ═══════════════════════════════════════════ */
/* Sun — glowing center of the solar system   */
/* ═══════════════════════════════════════════ */
function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const raysRef = useRef<THREE.Group>(null);

  const sunMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#fff8e1",
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
    if (coronaRef.current) {
      const pulse = 1 + Math.sin(t * 2) * 0.06;
      coronaRef.current.scale.set(pulse, pulse, pulse);
      const mat = coronaRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.12 + Math.sin(t * 3) * 0.04;
    }
    if (raysRef.current) {
      raysRef.current.rotation.z += 0.003;
    }
  });

  return (
    <group position={[0, 0, -8]}>
      {/* Core sun sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <primitive object={sunMaterial} attach="material" />
      </mesh>
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial
          color="#ffcc02"
          transparent
          opacity={0.25}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Corona */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#ff9800"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Outer halo */}
      <mesh>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial
          color="#ff6f00"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Sun light */}
      <pointLight color="#fff8e1" intensity={2} distance={50} />
      <pointLight color="#ff9800" intensity={0.8} distance={30} />
      {/* Light rays (rotating ring particles) */}
      <group ref={raysRef}>
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * 2.8,
                Math.sin(angle) * 2.8,
                0,
              ]}
              rotation={[0, 0, angle]}
            >
              <planeGeometry args={[1.5, 0.06]} />
              <meshBasicMaterial
                color="#ffcc02"
                transparent
                opacity={0.08}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════ */
/* Orbit paths — faint rings showing orbits   */
/* ═══════════════════════════════════════════ */
function OrbitPaths() {
  return (
    <group position={[0, 0, -8]}>
      {planets.map((planet) => {
        const dx = planet.position[0];
        const dy = planet.position[1];
        const dz = planet.position[2] - (-8);
        const radius = Math.sqrt(dx * dx + dy * dy + dz * dz);
        return (
          <mesh key={planet.id} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius - 0.02, radius + 0.02, 128]} />
            <meshBasicMaterial
              color={planet.color}
              transparent
              opacity={0.06}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* ═══════════════════════════════════════════ */
/* Camera Controller — cinematic drift        */
/* ═══════════════════════════════════════════ */
function CameraController() {
  const drift = useRef({ time: 0 });

  useFrame((state) => {
    drift.current.time += 0.002;
    const t = drift.current.time;
    state.camera.position.x = Math.sin(t * 0.3) * 0.6;
    state.camera.position.y = Math.cos(t * 0.25) * 0.4;
    state.camera.rotation.z = Math.sin(t * 0.15) * 0.008;
  });

  return null;
}

/* ═══════════════════════════════════════════ */
/* Scene Lights                                */
/* ═══════════════════════════════════════════ */
function SceneLights() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.intensity =
        0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[10, 10, 5]} intensity={0.7} color="#ffffff" />
      <pointLight position={[-10, -5, -10]} intensity={0.35} color="#4fc3f7" />
      <pointLight ref={lightRef} position={[10, 5, -5]} intensity={0.3} color="#b388ff" />
      <pointLight position={[0, 8, -15]} intensity={0.15} color="#f48fb1" />
      <pointLight position={[-5, -8, 10]} intensity={0.1} color="#00e5ff" />
    </>
  );
}

/* ═══════════════════════════════════════════ */
/* Planet System                               */
/* ═══════════════════════════════════════════ */
function PlanetSystem() {
  const { introComplete } = useStore();

  if (!introComplete) return null;

  const handlePlanetClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <group>
      <Sun />
      <OrbitPaths />
      {planets.map((planet) => (
        <PlanetMesh
          key={planet.id}
          planet={planet}
          onClick={() => handlePlanetClick(planet.id)}
        />
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════ */
/* Floating code particles (developer feel)    */
/* ═══════════════════════════════════════════ */
function CodeParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 60;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.008;
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.08}
        color="#00e5ff"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════ */
/* Scene Astronaut (3D, in the canvas)         */
/* ═══════════════════════════════════════════ */
function SceneAstronaut() {
  const { introComplete } = useStore();
  if (!introComplete) return null;
  return <Astronaut position={[4.5, -1.5, 3]} />;
}

/* ═══════════════════════════════════════════ */
/* Main SpaceScene                             */
/* ═══════════════════════════════════════════ */
export default function SpaceScene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60, near: 0.1, far: 200 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <StarField />
          <CameraController />
          <PlanetSystem />
          <CodeParticles />
          <SceneAstronaut />
          <Environment preset="night" />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
