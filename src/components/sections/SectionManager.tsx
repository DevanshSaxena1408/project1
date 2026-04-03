"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";

export default function SectionManager() {
  const { currentSection, introComplete, setCurrentSection } = useStore();

  if (!introComplete || currentSection === "home") return null;

  const sectionMap: Record<string, React.ReactNode> = {
    about: <AboutSection />,
    experience: <ExperienceSection />,
    projects: <ProjectsSection />,
    skills: <SkillsSection />,
    contact: <ContactSection />,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-30"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-[#030014]/60 backdrop-blur-sm"
          onClick={() => setCurrentSection("home")}
        />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4 md:p-8 overflow-y-auto">
          <div className="w-full max-h-[90vh] overflow-y-auto py-20 scrollbar-thin">
            {sectionMap[currentSection]}
          </div>
        </div>

        {/* Floating chat button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="fixed bottom-8 right-8 z-50"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => useStore.getState().setIsChatOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-[#4fc3f7] to-[#b388ff] flex items-center justify-center text-2xl shadow-lg shadow-[#4fc3f7]/20"
            data-cursor="pointer"
          >
            🧑‍🚀
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
