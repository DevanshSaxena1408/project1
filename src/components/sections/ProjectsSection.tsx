"use client";

import { motion } from "framer-motion";
import GlassPanel from "@/components/ui/GlassPanel";
import { projectsData } from "@/data/content";
import { useStore } from "@/store/useStore";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function ProjectIcon({ icon, color }: { icon: string; color: string }) {
  const iconMap: Record<string, string> = {
    heart: "❤️",
    users: "👥",
    car: "🚗",
    sparkle: "✨",
  };
  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
      style={{ background: `${color}20` }}
    >
      {iconMap[icon] || "🚀"}
    </div>
  );
}

export default function ProjectsSection() {
  const { setCurrentSection } = useStore();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const selected = projectsData.find((p) => p.id === selectedProject);

  return (
    <GlassPanel
      title="🪐 Projects"
      onClose={() => setCurrentSection("home")}
      className="max-w-4xl w-full mx-auto"
    >
      {selected ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.button
            whileHover={{ x: -4 }}
            onClick={() => setSelectedProject(null)}
            className="text-white/50 hover:text-white text-sm mb-4 flex items-center gap-1"
            data-cursor="pointer"
          >
            ← Back to all projects
          </motion.button>

          <div className="flex items-center gap-4 mb-6">
            <ProjectIcon icon={selected.icon} color={selected.color} />
            <div>
              <h3 className="text-2xl font-bold text-white">
                {selected.name}
              </h3>
              <p style={{ color: selected.color }} className="font-medium">
                {selected.tagline}
              </p>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed mb-6">
            {selected.description}
          </p>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3">
              Key Features
            </h4>
            <div className="grid gap-2">
              {selected.features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-lg p-3 flex items-center gap-3"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: selected.color }}
                  />
                  <span className="text-white/80 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-3">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {selected.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 text-sm rounded-full font-medium"
                  style={{
                    background: `${selected.color}15`,
                    color: selected.color,
                    border: `1px solid ${selected.color}30`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-4"
        >
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => setSelectedProject(project.id)}
              className="glass rounded-xl p-5 cursor-pointer hover:bg-white/[0.08] transition-all group"
              data-cursor="pointer"
            >
              <div className="flex items-start gap-4 mb-3">
                <ProjectIcon icon={project.icon} color={project.color} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-lg group-hover:text-gradient transition-all">
                    {project.name}
                  </h3>
                  <p
                    style={{ color: project.color }}
                    className="text-sm font-medium"
                  >
                    {project.tagline}
                  </p>
                </div>
              </div>

              <p className="text-white/50 text-sm leading-relaxed mb-3 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-xs rounded-full text-white/50"
                    style={{ background: `${project.color}10` }}
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-2 py-0.5 text-xs rounded-full text-white/30">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>

              <div className="mt-3 text-right">
                <span className="text-white/30 text-xs group-hover:text-white/60 transition-colors">
                  View details →
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </GlassPanel>
  );
}
