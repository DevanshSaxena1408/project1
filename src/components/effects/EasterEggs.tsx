"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Confetti() {
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3,
    size: 4 + Math.random() * 8,
    color: ["#4fc3f7", "#b388ff", "#f48fb1", "#ffab40", "#66bb6a"][
      Math.floor(Math.random() * 5)
    ],
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 50,
            opacity: [1, 1, 0],
            rotate: p.rotation + 720,
            x: (Math.random() - 0.5) * 200,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeIn" as const,
          }}
        />
      ))}
    </div>
  );
}

export default function EasterEggs() {
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const konamiCode = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "KeyB", "KeyA",
  ];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === konamiCode[konamiProgress]) {
        const next = konamiProgress + 1;
        setKonamiProgress(next);
        if (next === konamiCode.length) {
          setShowConfetti(true);
          setShowSecret(true);
          setKonamiProgress(0);
          setTimeout(() => setShowConfetti(false), 5000);
          setTimeout(() => setShowSecret(false), 8000);
        }
      } else {
        setKonamiProgress(0);
      }
    },
    [konamiProgress]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {showConfetti && <Confetti />}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[201] glass-strong rounded-2xl p-6 text-center max-w-sm"
          >
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-lg font-bold text-gradient mb-2">
              Secret Unlocked!
            </h3>
            <p className="text-white/60 text-sm">
              You found the Konami Code easter egg! Devansh appreciates curious
              explorers like you. You clearly have great taste in portfolios.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
