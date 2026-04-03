"use client";

import { motion } from "framer-motion";
import GlassPanel from "@/components/ui/GlassPanel";
import { skillsData } from "@/data/content";
import { useStore } from "@/store/useStore";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

function SkillBar({
  name,
  level,
  color,
  delay,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-white/80 group-hover:text-white transition-colors">
          {name}
        </span>
        <span className="text-xs text-white/40 font-mono">{level}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
          }}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-3 rounded-full animate-pulse-glow"
            style={{ background: color, filter: `blur(4px)` }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const { setCurrentSection } = useStore();

  return (
    <GlassPanel
      title="💜 Skills Constellation"
      onClose={() => setCurrentSection("home")}
      className="max-w-4xl w-full mx-auto"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-6"
      >
        {skillsData.categories.map((category, catIdx) => (
          <motion.div
            key={category.name}
            variants={itemVariants}
            className="glass rounded-xl p-5 hover:bg-white/[0.08] transition-colors"
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                style={{ background: `${category.color}22` }}
              >
                {category.icon === "brain"
                  ? "🧠"
                  : category.icon === "code"
                    ? "💻"
                    : category.icon === "smartphone"
                      ? "📱"
                      : "☁️"}
              </div>
              <h3 className="font-bold text-white text-lg">{category.name}</h3>
            </div>

            <div className="space-y-3">
              {category.skills.map((skill, skillIdx) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={category.color}
                  delay={catIdx * 0.15 + skillIdx * 0.08}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </GlassPanel>
  );
}
