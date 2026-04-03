"use client";

import { motion } from "framer-motion";
import GlassPanel from "@/components/ui/GlassPanel";
import { experienceData } from "@/data/content";
import { useStore } from "@/store/useStore";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function ExperienceSection() {
  const { setCurrentSection } = useStore();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <GlassPanel
      title="🔴 Experience Timeline"
      onClose={() => setCurrentSection("home")}
      className="max-w-3xl w-full mx-auto"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#4fc3f7] via-[#b388ff] to-[#f48fb1] opacity-30" />

        <div className="space-y-6">
          {experienceData.map((exp, idx) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className="relative pl-14"
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-4 top-4 w-5 h-5 rounded-full border-2 z-10"
                style={{
                  borderColor: exp.color,
                  background:
                    expanded === exp.id ? exp.color : "rgba(3, 0, 20, 0.8)",
                }}
                whileHover={{ scale: 1.3 }}
              />

              {/* Comet trail glow */}
              <motion.div
                className="absolute left-[22px] top-6 w-1 rounded-full opacity-20"
                style={{
                  background: exp.color,
                  height: expanded === exp.id ? "100%" : "0%",
                }}
                animate={{ height: expanded === exp.id ? "90%" : "0%" }}
                transition={{ duration: 0.5 }}
              />

              {/* Card */}
              <motion.div
                className="glass rounded-xl p-5 cursor-pointer hover:bg-white/[0.08] transition-all"
                onClick={() =>
                  setExpanded(expanded === exp.id ? null : exp.id)
                }
                whileHover={{ x: 4 }}
                data-cursor="pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {exp.company}
                    </h3>
                    <p style={{ color: exp.color }} className="font-medium text-sm">
                      {exp.role}
                    </p>
                  </div>
                  <span className="text-white/40 text-sm font-mono shrink-0">
                    {exp.period}
                  </span>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: expanded === exp.id ? "auto" : 0,
                    opacity: expanded === exp.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-white/60 text-sm leading-relaxed mb-3 pt-2">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs rounded-full font-medium"
                        style={{
                          background: `${exp.color}15`,
                          color: exp.color,
                          border: `1px solid ${exp.color}30`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {expanded !== exp.id && (
                  <p className="text-white/30 text-xs mt-2">
                    Click to expand
                  </p>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </GlassPanel>
  );
}
