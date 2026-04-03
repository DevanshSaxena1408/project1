"use client";

import { useEffect, useRef } from "react";

export default function ParticleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      color: string;
    }[] = [];

    let mouseX = 0;
    let mouseY = 0;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let animId: number;

    const colors = ["#4fc3f7", "#b388ff", "#f48fb1", "#ffffff"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;

      const dx = mouseX - prevMouseX;
      const dy = mouseY - prevMouseY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 3) {
        const count = Math.min(Math.floor(speed / 8), 3);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: mouseX + (Math.random() - 0.5) * 4,
            y: mouseY + (Math.random() - 0.5) * 4,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1 - 0.5,
            life: 1,
            maxLife: 30 + Math.random() * 20,
            size: Math.random() * 2 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles = particles.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1 / p.maxLife;
        p.size *= 0.98;

        if (p.life <= 0 || p.size < 0.1) return false;

        ctx.save();
        ctx.globalAlpha = p.life * 0.6;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return true;
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9997] pointer-events-none"
    />
  );
}
