"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { siteConfig } from "@/data/content";

function TypewriterText({
  text,
  delay = 0,
  speed = 40,
  className = "",
}: {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

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
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span className={className}>
      {displayText}
      {started && displayText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}

/* Code-themed floating snippets in the background */
function FloatingCodeSnippets() {
  const snippets = [
    "const mission = 'started';",
    "async deploy() { ... }",
    "import { future } from 'ai';",
    "<Portfolio />",
    "fn build_dream()",
    "git push origin main",
    "npm run launch",
    "class Developer { }",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {snippets.map((code, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs whitespace-nowrap"
          style={{
            left: `${5 + (i * 12) % 85}%`,
            top: `${10 + (i * 11) % 75}%`,
            color: ["#4fc3f7", "#b388ff", "#66bb6a", "#ffab40"][i % 4],
            opacity: 0.06,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.04, 0.1, 0.04],
          }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut",
          }}
        >
          {code}
        </motion.div>
      ))}
    </div>
  );
}

export default function IntroSequence() {
  const { isLoading, introComplete, setIntroComplete } = useStore();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (isLoading || introComplete) return;
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 3500),
      setTimeout(() => setPhase(4), 5500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isLoading, introComplete]);

  if (isLoading || introComplete) return null;

  const handleStartMission = () => {
    setIntroComplete(true);
  };

  const handleQuickView = () => {
    setIntroComplete(true);
    setTimeout(() => {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center"
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <FloatingCodeSnippets />

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
          {/* Astronaut */}
          {phase >= 1 && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 1.2, bounce: 0.4 }}
              className="text-8xl mb-6"
            >
              🧑‍🚀
            </motion.div>
          )}

          {/* Terminal-style greeting */}
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-2"
            >
              <span className="text-[#66bb6a] font-mono text-sm">
                &gt; console.log(&quot;Hello, Explorer!&quot;)
              </span>
            </motion.div>
          )}

          {/* Name & Title */}
          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-3">
                <span className="text-white/50 font-mono text-lg md:text-xl block mb-2">
                  {"// "}
                </span>
                <span className="text-white">I&apos;m </span>
                <span className="text-gradient">{siteConfig.name}</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/70">
                <TypewriterText
                  text={siteConfig.title}
                  delay={200}
                  speed={50}
                />
              </p>
            </motion.div>
          )}

          {/* Tagline with code flavor */}
          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="mb-10"
            >
              <p className="text-white/40 text-sm md:text-base max-w-md">
                {siteConfig.tagline}
              </p>
              <div className="flex items-center justify-center gap-3 mt-4">
                {["React", "AI/ML", "Three.js", "Next.js"].map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2 + i * 0.15 }}
                    className="px-2.5 py-1 text-xs font-mono rounded-full border border-white/10 text-white/35"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA Buttons */}
          {phase >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(79, 195, 247, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartMission}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#4fc3f7] to-[#b388ff] text-white font-bold text-lg hover:shadow-lg transition-shadow relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  🚀 Start Mission
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#b388ff] to-[#f48fb1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleQuickView}
                className="px-8 py-4 rounded-full glass text-white/80 font-medium text-lg hover:text-white hover:bg-white/10 transition-all"
              >
                ⚡ Quick View
              </motion.button>
            </motion.div>
          )}

          {/* Hint */}
          {phase >= 4 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0.3] }}
              transition={{ delay: 2, duration: 2, repeat: Infinity }}
              className="text-white/30 text-xs mt-8 font-mono"
            >
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              press &quot;Start Mission&quot; to explore the universe_
            </motion.p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
