"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useStore } from "@/store/useStore";

/* Pre-generated star data to avoid Math.random() in render */
const STAR_DATA = Array.from({ length: 60 }, () => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: 2 + Math.random() * 3,
  delay: Math.random() * 2,
}));

/* Terminal-style code lines that type out during loading */
const bootLines = [
  { text: "$ initializing space-environment...", color: "#4fc3f7" },
  { text: "  ✓ loading star-field [5000 particles]", color: "#66bb6a" },
  { text: "  ✓ compiling planet-shaders", color: "#66bb6a" },
  { text: "  ✓ deploying astronaut-guide v3.0", color: "#66bb6a" },
  { text: "  ✓ mounting solar-system.tsx", color: "#66bb6a" },
  { text: "$ npm run launch --mode=portfolio", color: "#b388ff" },
  { text: "  → Ready on https://devansh.space", color: "#ffab40" },
];

function TerminalBoot({ progress }: { progress: number }) {
  const visibleLines = Math.floor((progress / 100) * bootLines.length);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div
      ref={containerRef}
      className="font-mono text-xs sm:text-sm max-w-md w-full mx-auto text-left px-4 overflow-hidden"
      style={{ maxHeight: "180px" }}
    >
      {bootLines.slice(0, visibleLines).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-1.5 leading-relaxed"
          style={{ color: line.color }}
        >
          {line.text}
        </motion.div>
      ))}
      {visibleLines < bootLines.length && (
        <span className="text-[#4fc3f7] animate-pulse">█</span>
      )}
    </div>
  );
}

export default function LoadingScreen() {
  const { isLoading, setIsLoading, setLoadingProgress, loadingProgress } =
    useStore();
  const [dots, setDots] = useState("");

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 12 + 4;
      if (progress >= 100) {
        progress = 100;
        setLoadingProgress(100);
        clearInterval(progressInterval);
        setTimeout(() => setIsLoading(false), 800);
      } else {
        setLoadingProgress(Math.floor(progress));
      }
    }, 350);

    return () => {
      clearInterval(dotInterval);
      clearInterval(progressInterval);
    };
  }, [setIsLoading, setLoadingProgress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030014]"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Background stars */}
          <div className="absolute inset-0 overflow-hidden">
            {STAR_DATA.map((star, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-0.5 bg-white rounded-full"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                }}
                animate={{
                  opacity: [0.1, 0.8, 0.1],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  delay: star.delay,
                }}
              />
            ))}
          </div>

          {/* Dev-themed header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-4xl">🧑‍🚀</span>
              <span className="text-white/15 text-2xl">×</span>
              <span className="text-4xl">💻</span>
            </div>
            <motion.div
              className="font-mono text-xs text-white/30 tracking-wider"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              &lt;Portfolio /&gt;
            </motion.div>
          </motion.div>

          {/* Terminal boot messages */}
          <TerminalBoot progress={loadingProgress} />

          {/* Progress bar */}
          <div className="mt-8 w-64 max-w-[80%]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/40 text-xs font-mono">
                Building{dots}
              </span>
              <span className="text-[#4fc3f7] text-xs font-mono font-bold">
                {loadingProgress}%
              </span>
            </div>
            <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${loadingProgress}%`,
                  background:
                    "linear-gradient(90deg, #4fc3f7, #b388ff, #f48fb1)",
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Bottom tag */}
          <motion.p
            className="text-white/15 text-xs font-mono mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            powered by Next.js · Three.js · React
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
