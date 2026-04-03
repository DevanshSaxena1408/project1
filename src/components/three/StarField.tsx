"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function useCircleTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.3)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function StarLayer({
  count,
  radius,
  size,
  speed,
  color,
}: {
  count: number;
  radius: number;
  size: number;
  speed: number;
  color: string;
}) {
  const ref = useRef<THREE.Points>(null);
  const texture = useCircleTexture();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius + Math.random() * radius * 0.5;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = size * (0.5 + Math.random());
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [count, radius, size]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed;
      ref.current.rotation.x += delta * speed * 0.25;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={size}
        color={color}
        map={texture}
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function TwinkleStars() {
  const ref = useRef<THREE.Points>(null);
  const texture = useCircleTexture();
  const count = 200;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 12 + Math.random() * 30;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.PointsMaterial;
      mat.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 1.2) * 0.25;
      ref.current.rotation.y += 0.00015;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.3}
        color="#e1f5fe"
        map={texture}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CosmicDust() {
  const ref = useRef<THREE.Points>(null);
  const texture = useCircleTexture();
  const count = 400;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#1a237e"),
      new THREE.Color("#311b92"),
      new THREE.Color("#0d47a1"),
      new THREE.Color("#4a148c"),
      new THREE.Color("#1565c0"),
      new THREE.Color("#283593"),
    ];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = -20 - Math.random() * 50;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.005;
      ref.current.rotation.y += delta * 0.002;
    }
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={3.5}
        vertexColors
        map={texture}
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function AuroraRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.3;
      ref.current.rotation.z += 0.001;
      const mat = ref.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.04 + Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, -30]} rotation={[Math.PI / 4, 0, 0]}>
      <torusGeometry args={[35, 12, 16, 64]} />
      <meshBasicMaterial
        color="#4fc3f7"
        transparent
        opacity={0.04}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════ */
/* 3D Shooting Stars                           */
/* ═══════════════════════════════════════════ */
function ShootingStars3D() {
  const count = 8;
  const ref = useRef<THREE.Group>(null);
  const starsData = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 40 + 10,
        -20 - Math.random() * 30
      ),
      velocity: new THREE.Vector3(
        -(0.3 + Math.random() * 0.5),
        -(0.2 + Math.random() * 0.3),
        0
      ),
      resetTime: Math.random() * 20,
      timer: Math.random() * 20,
    }));
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    starsData.forEach((star, i) => {
      star.timer += delta;
      if (star.timer > star.resetTime + 3) {
        star.position.set(
          (Math.random() - 0.5) * 80 + 20,
          (Math.random() - 0.5) * 40 + 15,
          -20 - Math.random() * 30
        );
        star.resetTime = Math.random() * 15 + 5;
        star.timer = 0;
      }
      if (star.timer > star.resetTime) {
        const progress = star.timer - star.resetTime;
        star.position.x += star.velocity.x * delta * 60;
        star.position.y += star.velocity.y * delta * 60;
        const child = ref.current!.children[i] as THREE.Mesh;
        if (child) {
          child.position.copy(star.position);
          const mat = child.material as THREE.MeshBasicMaterial;
          mat.opacity = progress < 0.3 ? progress / 0.3 : Math.max(0, 1 - (progress - 0.3) / 2.5);
        }
      }
    });
  });

  return (
    <group ref={ref}>
      {starsData.map((_, i) => (
        <mesh key={i} position={[100, 100, -50]}>
          <planeGeometry args={[2.5, 0.03]} />
          <meshBasicMaterial
            color="#4fc3f7"
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════ */
/* Nebula fog — distant colored clouds         */
/* ═══════════════════════════════════════════ */
function NebulaFog() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.03) * 0.05;
    }
  });

  const nebulae = useMemo(
    () => [
      { pos: [-30, 15, -60] as [number, number, number], color: "#1a237e", size: 25, opacity: 0.025 },
      { pos: [35, -10, -55] as [number, number, number], color: "#4a148c", size: 20, opacity: 0.02 },
      { pos: [-20, -20, -70] as [number, number, number], color: "#0d47a1", size: 30, opacity: 0.018 },
      { pos: [25, 20, -65] as [number, number, number], color: "#311b92", size: 22, opacity: 0.022 },
    ],
    []
  );

  return (
    <group ref={ref}>
      {nebulae.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[n.size, 16, 16]} />
          <meshBasicMaterial
            color={n.color}
            transparent
            opacity={n.opacity}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function StarField() {
  return (
    <group>
      <StarLayer count={5000} radius={55} size={0.05} speed={0.0008} color="#ffffff" />
      <StarLayer count={2500} radius={40} size={0.08} speed={0.002} color="#e3f2fd" />
      <StarLayer count={1000} radius={25} size={0.14} speed={0.004} color="#b3e5fc" />
      <StarLayer count={600} radius={50} size={0.03} speed={0.001} color="#e8eaf6" />
      <StarLayer count={300} radius={18} size={0.2} speed={0.006} color="#4fc3f7" />
      <TwinkleStars />
      <CosmicDust />
      <AuroraRing />
      <ShootingStars3D />
      <NebulaFog />
    </group>
  );
}
