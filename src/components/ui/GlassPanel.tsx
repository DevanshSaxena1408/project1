"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
  title?: string;
}

export default function GlassPanel({
  children,
  className = "",
  onClose,
  title,
}: GlassPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`glass-strong rounded-2xl overflow-hidden ${className}`}
    >
      {(title || onClose) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          {title && (
            <h2 className="text-xl font-bold text-gradient">{title}</h2>
          )}
          {onClose && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors"
              data-cursor="pointer"
            >
              ✕
            </motion.button>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
    </motion.div>
  );
}
