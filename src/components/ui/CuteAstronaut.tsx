"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface CuteAstronautProps {
  size?: number;
  speech?: string;
  speechPosition?: "left" | "right";
  className?: string;
  delay?: number;
  mood?: "waving" | "presenting" | "thinking" | "idle";
}

function TypewriterBubble({
  text,
  position,
  delay = 0,
}: {
  text: string;
  position: "left" | "right";
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
    }, 30);
    return () => clearInterval(interval);
  }, [started, text]);

  if (!started && !displayText) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay / 1000 }}
      className={`absolute ${position === "right" ? "-right-4 translate-x-full" : "-left-4 -translate-x-full"} top-1/4 max-w-[280px] sm:max-w-[320px]`}
    >
      <div className="glass-strong rounded-2xl px-5 py-4 relative">
        <p className="text-white/90 text-sm leading-relaxed">
          {displayText}
          {displayText.length < text.length && (
            <span className="animate-pulse text-[#4fc3f7]">|</span>
          )}
        </p>
        <div
          className={`absolute top-8 ${position === "right" ? "-left-2" : "-right-2"} w-4 h-4 glass-strong rotate-45`}
        />
      </div>
    </motion.div>
  );
}

function Sparkle({
  x,
  y,
  delay,
  size,
}: {
  x: number;
  y: number;
  delay: number;
  size: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0.3, 1, 0.3],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"
          fill="#4fc3f7"
          opacity={0.8}
        />
      </svg>
    </motion.div>
  );
}

export default function CuteAstronaut({
  size = 300,
  speech,
  speechPosition = "right",
  className = "",
  delay = 0,
  mood = "waving",
}: CuteAstronautProps) {
  const scale = size / 300;

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: delay / 1000 }}
    >
      {/* Sparkles */}
      <Sparkle x={-10 * scale} y={20 * scale} delay={0} size={16 * scale} />
      <Sparkle
        x={size + 5 * scale}
        y={40 * scale}
        delay={0.8}
        size={12 * scale}
      />
      <Sparkle
        x={size * 0.8}
        y={-10 * scale}
        delay={1.6}
        size={14 * scale}
      />
      <Sparkle x={-5 * scale} y={size * 0.7} delay={2.2} size={10 * scale} />

      {/* Speech bubble */}
      {speech && (
        <TypewriterBubble
          text={speech}
          position={speechPosition}
          delay={delay + 600}
        />
      )}

      {/* Astronaut SVG */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: size, height: size * 1.1 }}
      >
        <svg
          viewBox="0 0 200 320"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="visorGrad" cx="35%" cy="35%">
              <stop offset="0%" stopColor="#2d3a8c" />
              <stop offset="50%" stopColor="#1a1f5c" />
              <stop offset="100%" stopColor="#0d1030" />
            </radialGradient>
            <radialGradient id="visorReflect" cx="25%" cy="25%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0f0f5" />
              <stop offset="100%" stopColor="#d8d8e0" />
            </linearGradient>
            <linearGradient
              id="flameGrad"
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ff9800" />
              <stop offset="40%" stopColor="#ff5722" />
              <stop offset="100%" stopColor="rgba(255,87,34,0)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="softShadow">
              <feDropShadow
                dx="2"
                dy="4"
                stdDeviation="3"
                floodColor="#000"
                floodOpacity="0.15"
              />
            </filter>
          </defs>

          <g filter="url(#softShadow)">
            {/* Antenna */}
            <motion.g
              animate={{ rotate: [-3, 3, -3] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ originX: "100px", originY: "35px" }}
            >
              <line
                x1="100"
                y1="35"
                x2="100"
                y2="12"
                stroke="#c0c0c8"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="100" cy="10" r="7" fill="#ffab40" filter="url(#glow)">
                <animate
                  attributeName="r"
                  values="7;8.5;7"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </motion.g>

            {/* Backpack (behind body) */}
            <rect
              x="76"
              y="150"
              width="48"
              height="58"
              rx="14"
              fill="#b8b8c0"
            />
            <rect
              x="82"
              y="210"
              width="10"
              height="14"
              rx="3"
              fill="#8a8a94"
            />
            <rect
              x="108"
              y="210"
              width="10"
              height="14"
              rx="3"
              fill="#8a8a94"
            />

            {/* Jetpack flames */}
            <motion.g
              animate={{ opacity: [0.5, 1, 0.5], scaleY: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ originX: "87px", originY: "224px" }}
            >
              <ellipse
                cx="87"
                cy="232"
                rx="5"
                ry="12"
                fill="url(#flameGrad)"
                opacity={0.8}
              />
            </motion.g>
            <motion.g
              animate={{ opacity: [0.5, 1, 0.5], scaleY: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.15,
              }}
              style={{ originX: "113px", originY: "224px" }}
            >
              <ellipse
                cx="113"
                cy="232"
                rx="5"
                ry="12"
                fill="url(#flameGrad)"
                opacity={0.8}
              />
            </motion.g>

            {/* Left Leg */}
            <rect
              x="74"
              y="220"
              width="22"
              height="52"
              rx="11"
              fill="url(#suitGrad)"
            />
            <rect
              x="70"
              y="260"
              width="30"
              height="20"
              rx="8"
              fill="#4fc3f7"
            />

            {/* Right Leg */}
            <rect
              x="104"
              y="220"
              width="22"
              height="52"
              rx="11"
              fill="url(#suitGrad)"
            />
            <rect
              x="100"
              y="260"
              width="30"
              height="20"
              rx="8"
              fill="#4fc3f7"
            />

            {/* Body */}
            <rect
              x="62"
              y="142"
              width="76"
              height="85"
              rx="28"
              fill="url(#suitGrad)"
            />
            <rect
              x="72"
              y="160"
              width="56"
              height="5"
              rx="2.5"
              fill="#4fc3f7"
            />
            <rect
              x="72"
              y="170"
              width="56"
              height="5"
              rx="2.5"
              fill="#4fc3f7"
              opacity={0.4}
            />
            {/* Badge */}
            <circle
              cx="88"
              cy="185"
              r="8"
              fill="none"
              stroke="#4fc3f7"
              strokeWidth="1.5"
              opacity={0.6}
            />
            <circle cx="88" cy="185" r="3" fill="#4fc3f7" opacity={0.4} />

            {/* Left Arm */}
            <motion.g
              animate={
                mood === "waving"
                  ? { rotate: [-15, 25, -15] }
                  : mood === "presenting"
                    ? { rotate: [-30, -25, -30] }
                    : { rotate: [0, 5, 0] }
              }
              transition={{
                duration: mood === "waving" ? 1.2 : 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ originX: "62px", originY: "155px" }}
            >
              <rect
                x="32"
                y="148"
                width="34"
                height="52"
                rx="14"
                fill="url(#suitGrad)"
              />
              <circle cx="49" cy="205" r="12" fill="#4fc3f7" />
            </motion.g>

            {/* Right Arm */}
            <motion.g
              animate={
                mood === "presenting"
                  ? { rotate: [25, 35, 25] }
                  : { rotate: [-5, 5, -5] }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              style={{ originX: "138px", originY: "155px" }}
            >
              <rect
                x="134"
                y="148"
                width="34"
                height="52"
                rx="14"
                fill="url(#suitGrad)"
              />
              <circle cx="151" cy="205" r="12" fill="#4fc3f7" />
            </motion.g>

            {/* Helmet */}
            <circle cx="100" cy="85" r="58" fill="url(#suitGrad)" />
            <circle
              cx="100"
              cy="85"
              r="55"
              fill="none"
              stroke="#c8c8d0"
              strokeWidth="1"
            />

            {/* Visor */}
            <ellipse cx="100" cy="88" rx="42" ry="36" fill="url(#visorGrad)" />
            <ellipse
              cx="100"
              cy="88"
              rx="42"
              ry="36"
              fill="url(#visorReflect)"
            />

            {/* Visor shine arc */}
            <path
              d="M 68 72 Q 78 60 95 65"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />

            {/* Eyes */}
            <motion.g
              animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                times: [0, 0.45, 0.5, 0.55, 1],
              }}
              style={{ originX: "100px", originY: "82px" }}
            >
              {/* Left eye */}
              <circle cx="84" cy="82" r="8" fill="white" />
              <circle cx="86" cy="80" r="5" fill="#1a1a2e" />
              <circle cx="88" cy="78" r="2" fill="white" />

              {/* Right eye */}
              <circle cx="116" cy="82" r="8" fill="white" />
              <circle cx="118" cy="80" r="5" fill="#1a1a2e" />
              <circle cx="120" cy="78" r="2" fill="white" />
            </motion.g>

            {/* Blush */}
            <circle cx="74" cy="96" r="6" fill="rgba(255,150,160,0.25)" />
            <circle cx="126" cy="96" r="6" fill="rgba(255,150,160,0.25)" />

            {/* Mouth */}
            <path
              d="M 91 100 Q 100 110 109 100"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Star on visor reflection */}
            <motion.g
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              <circle cx="72" cy="70" r="1.5" fill="white" />
              <circle cx="130" cy="100" r="1" fill="white" opacity={0.5} />
            </motion.g>

            {/* Helmet accent ring */}
            <ellipse
              cx="100"
              cy="130"
              rx="38"
              ry="8"
              fill="none"
              stroke="#4fc3f7"
              strokeWidth="2"
              opacity={0.3}
            />
          </g>
        </svg>
      </motion.div>

      {/* Ground glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full blur-2xl opacity-20"
        style={{
          width: size * 0.6,
          height: size * 0.08,
          background:
            "radial-gradient(ellipse, #4fc3f7 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
