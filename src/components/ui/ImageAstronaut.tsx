"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface ImageAstronautProps {
  size?: number;
  speech?: string;
  speechPosition?: "left" | "right" | "top";
  className?: string;
  delay?: number;
  mood?: "happy" | "excited" | "thinking" | "waving" | "idle";
  enableMouseFollow?: boolean;
  flyTo?: { x: number; y: number };
}

function TypewriterBubble({
  text,
  position,
  delay = 0,
}: {
  text: string;
  position: "left" | "right" | "top";
  delay?: number;
}) {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setDisplayText("");
    setStarted(false);
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  useEffect(() => {
    if (!started) return;
    let idx = 0;
    const interval = setInterval(() => {
      if (idx <= text.length) {
        setDisplayText(text.slice(0, idx));
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [started, text]);

  if (!started && !displayText) return null;

  const positionClasses =
    position === "right"
      ? "left-full ml-3 top-1/4"
      : position === "left"
        ? "right-full mr-3 top-1/4"
        : "bottom-full mb-3 left-1/2 -translate-x-1/2";

  const arrowClasses =
    position === "right"
      ? "absolute top-6 -left-1.5 w-3 h-3 glass-strong rotate-45"
      : position === "left"
        ? "absolute top-6 -right-1.5 w-3 h-3 glass-strong rotate-45"
        : "absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 glass-strong rotate-45";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay / 1000 }}
      className={`absolute ${positionClasses} w-[220px] sm:w-[260px] z-20`}
    >
      <div className="speech-bubble relative">
        <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
          {displayText}
          {displayText.length < text.length && (
            <span className="animate-pulse text-[#4fc3f7]">|</span>
          )}
        </p>
        <div className={arrowClasses} />
      </div>
    </motion.div>
  );
}

export default function ImageAstronaut({
  size = 280,
  speech,
  speechPosition = "right",
  className = "",
  delay = 0,
  mood = "happy",
  enableMouseFollow = false,
}: ImageAstronautProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (!enableMouseFollow) return;
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX.set((e.clientX - cx) * 0.04);
      mouseY.set((e.clientY - cy) * 0.03);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [enableMouseFollow, mouseX, mouseY]);

  const moodAnimation = {
    happy: { rotate: [0, 2, -2, 0], scale: [1, 1.02, 1] },
    excited: { rotate: [-3, 3, -3, 3, 0], scale: [1, 1.06, 0.98, 1.04, 1] },
    thinking: { rotate: [0, -5, 0], scale: [1, 0.98, 1] },
    waving: { rotate: [0, 3, -3, 0], scale: [1, 1.03, 1] },
    idle: { rotate: [0, 1, -1, 0], scale: [1, 1.01, 1] },
  };

  const moodTransition = {
    happy: { duration: 4, repeat: Infinity, ease: "easeInOut" as const },
    excited: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
    thinking: { duration: 5, repeat: Infinity, ease: "easeInOut" as const },
    waving: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
    idle: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: delay / 1000, type: "spring", bounce: 0.3 }}
    >
      {/* Glow behind astronaut */}
      <div
        className="absolute inset-0 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(79,195,247,0.3) 0%, rgba(179,136,255,0.2) 40%, transparent 70%)",
          width: size * 1.2,
          height: size * 1.2,
          left: -size * 0.1,
          top: -size * 0.1,
        }}
      />

      {/* Sparkles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.7,
          }}
        />
      ))}

      {/* Speech bubble */}
      {speech && (
        <TypewriterBubble
          text={speech}
          position={speechPosition}
          delay={delay + 500}
        />
      )}

      {/* Astronaut image */}
      <motion.div
        animate={moodAnimation[mood]}
        transition={moodTransition[mood]}
        style={{
          x: enableMouseFollow ? smoothX : 0,
          y: enableMouseFollow ? smoothY : 0,
        }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
          style={{ width: size, height: size }}
        >
          <Image
            src="/astronaut.png"
            alt="Astronaut Guide"
            width={size}
            height={size}
            className="drop-shadow-2xl select-none pointer-events-none"
            style={{
              filter: "drop-shadow(0 0 20px rgba(79,195,247,0.3)) drop-shadow(0 0 40px rgba(179,136,255,0.15))",
              objectFit: "contain",
            }}
            priority
          />

          {/* Visor reflection shimmer */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-20 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
              backgroundSize: "200% 200%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </motion.div>

      {/* Ground reflection */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full blur-2xl opacity-15"
        style={{
          width: size * 0.5,
          height: size * 0.06,
          bottom: -size * 0.05,
          background: "radial-gradient(ellipse, #4fc3f7, transparent)",
        }}
      />
    </motion.div>
  );
}
