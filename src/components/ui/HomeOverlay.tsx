"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { planets } from "@/data/content";

export default function HomeOverlay() {
  const { currentSection, introComplete, showHints, hoveredPlanet } = useStore();

  if (!introComplete || currentSection !== "home") return null;

  const hovered = planets.find((p) => p.id === hoveredPlanet);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-10 pointer-events-none"
      >
        {/* Planet info tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 glass-strong rounded-xl px-5 py-3 text-center"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: hovered.color }}
                />
                <span className="font-bold text-white">{hovered.label}</span>
                <span className="text-white/40 text-sm">
                  — {hovered.description}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom hints */}
        {showHints && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
            <motion.p
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-white/50 text-sm mb-2"
            >
              🪐 Click on a planet to explore
            </motion.p>
            <motion.p
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="text-white/30 text-xs"
            >
              or use the navigation bar above
            </motion.p>
          </div>
        )}

        {/* Floating chat button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, type: "spring" }}
          className="fixed bottom-8 right-8 pointer-events-auto"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => useStore.getState().setIsChatOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4fc3f7] to-[#b388ff] flex items-center justify-center text-2xl shadow-lg shadow-[#4fc3f7]/20 hover:shadow-[#4fc3f7]/40 transition-shadow"
            data-cursor="pointer"
            title="Chat with Astronaut Guide"
          >
            🧑‍🚀
          </motion.button>
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-[#030014]"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
