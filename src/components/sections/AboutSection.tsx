"use client";

import { motion } from "framer-motion";
import GlassPanel from "@/components/ui/GlassPanel";
import { aboutData, siteConfig } from "@/data/content";
import { useStore } from "@/store/useStore";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AboutSection() {
  const { setCurrentSection } = useStore();

  return (
    <GlassPanel
      title="🌍 About Me"
      onClose={() => setCurrentSection("home")}
      className="max-w-3xl w-full mx-auto"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Profile Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4fc3f7] to-[#b388ff] flex items-center justify-center text-4xl shrink-0">
            🧑‍🚀
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{siteConfig.name}</h3>
            <p className="text-[#4fc3f7] font-medium">{siteConfig.title}</p>
          </div>
        </motion.div>

        {/* Intro */}
        <motion.div variants={itemVariants}>
          <p className="text-white/70 leading-relaxed text-base">
            {aboutData.intro}
          </p>
        </motion.div>

        {/* Education */}
        <motion.div variants={itemVariants}>
          <h4 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3">
            Education
          </h4>
          {aboutData.education.map((edu, i) => (
            <div key={i} className="glass rounded-xl p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-semibold text-white">{edu.degree}</h5>
                  <p className="text-white/50 text-sm">{edu.institution}</p>
                </div>
                <span className="text-[#4fc3f7] text-sm font-mono">
                  {edu.year}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Founder Story */}
        <motion.div variants={itemVariants}>
          <h4 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3">
            Founder Story
          </h4>
          <div className="glass rounded-xl p-4 border-l-2 border-[#b388ff]">
            <p className="text-white/70 leading-relaxed text-sm">
              {aboutData.founderStory}
            </p>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-3"
        >
          {[
            { label: "Projects", value: "10+", icon: "🚀" },
            { label: "Experience", value: "3+ yrs", icon: "💼" },
            { label: "Tech Stack", value: "20+", icon: "⚡" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-xl p-4 text-center"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-white/40 text-xs">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </GlassPanel>
  );
}
