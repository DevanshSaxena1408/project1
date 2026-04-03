"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";

const navItems = [
  { id: "hero", label: "Home", icon: "~", color: "#4fc3f7" },
  { id: "about", label: "About", icon: "01", color: "#4fc3f7" },
  { id: "experience", label: "Experience", icon: "02", color: "#ff7043" },
  { id: "projects", label: "Projects", icon: "03", color: "#ffab40" },
  { id: "skills", label: "Skills", icon: "04", color: "#b388ff" },
  { id: "contact", label: "Contact", icon: "05", color: "#e0e0e0" },
];

export default function Navbar() {
  const { introComplete, activeScrollSection } = useStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!introComplete) return null;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${scrolled ? "backdrop-blur-xl bg-[#030014]/60" : ""}`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo — terminal style */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection("hero")}
          >
            <span className="text-[#4fc3f7] font-mono text-sm opacity-50 group-hover:opacity-100 transition-opacity">$</span>
            <span className="text-lg font-bold text-gradient">Devansh</span>
            <motion.span
              className="text-[#4fc3f7] font-mono text-sm"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              _
            </motion.span>
          </motion.div>

          {/* Desktop nav — code-tab style */}
          <div className="hidden md:flex items-center gap-0.5 glass rounded-full px-2 py-1.5">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 font-mono ${
                  activeScrollSection === item.id
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeScrollSection === item.id && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full"
                    style={{ background: `${item.color}15` }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span className="text-[10px] opacity-40">{item.icon}</span>
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                useStore.getState().setSoundEnabled(!useStore.getState().soundEnabled)
              }
              className="glass rounded-full w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              title="Toggle Sound"
            >
              {useStore.getState().soundEnabled ? "🔊" : "🔇"}
            </motion.button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden mt-3 flex justify-center">
          <div className="flex items-center gap-1 glass rounded-full px-2 py-1.5 overflow-x-auto max-w-full">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-colors ${
                  activeScrollSection === item.id
                    ? "bg-white/10 text-white"
                    : "text-white/40"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
}
