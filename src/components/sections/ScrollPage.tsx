"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useStore } from "@/store/useStore";
import {
  siteConfig,
  planets,
  aboutData,
  skillsData,
  experienceData,
  projectsData,
} from "@/data/content";

/* ========================================= */
/* Scroll Progress Bar                        */
/* ========================================= */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}

/* ========================================= */
/* Section Observer                           */
/* ========================================= */
function SectionObserver({ id, children }: { id: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });
  const { setActiveScrollSection, setVisiblePlanetCount } = useStore();

  useEffect(() => {
    if (inView) {
      setActiveScrollSection(id);
      const idx = planets.findIndex((p) => p.id === id);
      if (idx >= 0) setVisiblePlanetCount(idx + 1);
      else if (id === "hero") setVisiblePlanetCount(0);
    }
  }, [inView, id, setActiveScrollSection, setVisiblePlanetCount]);

  return <div ref={ref} id={id}>{children}</div>;
}

/* ========================================= */
/* Animated Counter                           */
/* ========================================= */
function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");
  const numericPart = parseInt(value.replace(/\D/g, "")) || 0;

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = numericPart;
    const duration = 1500;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start) + suffix);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, numericPart, value, suffix]);

  return <span ref={ref}>{inView ? display : "0"}</span>;
}

/* ========================================= */
/* Code Comment Header (developer feel)       */
/* ========================================= */
function CodeSectionHeader({
  label,
  title,
  color,
  subtitle,
}: {
  label: string;
  title: string;
  color: string;
  subtitle?: string;
}) {
  return (
    <>
      <motion.div variants={itemVariants} className="flex items-center gap-3 mb-3">
        <div className="w-10 h-1 rounded" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
        <span className="text-sm font-mono tracking-widest uppercase" style={{ color }}>
          {label}
        </span>
      </motion.div>
      <motion.div variants={itemVariants} className="mb-2">
        <span className="text-white/15 font-mono text-xs">{"// "}</span>
        <span className="text-white/25 font-mono text-xs">{label.toLowerCase()}.tsx</span>
      </motion.div>
      <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-2 text-white">
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={itemVariants} className="text-white/30 text-sm font-mono mb-8">
          {subtitle}
        </motion.p>
      )}
    </>
  );
}

/* ========================================= */
/* Floating code snippets in sections         */
/* ========================================= */
function FloatingCode({ snippets, color }: { snippets: string[]; color: string }) {
  return (
    <>
      {snippets.map((code, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs pointer-events-none select-none whitespace-nowrap"
          style={{
            left: `${5 + (i * 30) % 80}%`,
            top: `${15 + (i * 25) % 65}%`,
            color,
            opacity: 0.04,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.03, 0.07, 0.03],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "easeInOut",
          }}
        >
          {code}
        </motion.div>
      ))}
    </>
  );
}

/* ========================================= */
/* Section Variants                           */
/* ========================================= */
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const, staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ========================================= */
/* HERO                                       */
/* ========================================= */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <SectionObserver id="hero">
      <section ref={ref} className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 py-24">
        {/* Dev-themed floating snippets */}
        <FloatingCode
          snippets={[
            "const skills = ['AI', 'Web', 'Cloud'];",
            "export default function Portfolio()",
            "await deploy(nextProject);",
            "// crafting the future",
            "git commit -m 'initial'",
            "<Canvas><Stars /></Canvas>",
          ]}
          color="#4fc3f7"
        />

        <motion.div style={{ y, opacity }} className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center lg:text-left z-10 order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "60px" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-[2px] bg-gradient-to-r from-[#4fc3f7] to-transparent mb-6 mx-auto lg:mx-0"
            />

            {/* Terminal-style greeting */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-4"
            >
              <span className="text-[#66bb6a] text-xs font-mono">
                ~/portfolio $
              </span>
              <span className="text-[#4fc3f7] text-sm font-mono ml-2 tracking-[0.15em]">
                whoami
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-5 leading-[1.1]">
              <span className="text-white">I&apos;m </span>
              <span className="text-gradient">{siteConfig.name}</span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-3"
            >
              <p className="text-xl md:text-2xl text-white/50 font-light">
                {siteConfig.title}
              </p>
            </motion.div>

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-2 mb-8 justify-center lg:justify-start"
            >
              {["AI/ML", "Full Stack", "Three.js", "LLMs", "Cloud"].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  className="px-3 py-1 text-xs font-mono rounded-full border border-white/10 text-white/30 hover:text-white/60 hover:border-[#4fc3f7]/30 transition-all cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-white/30 text-base md:text-lg mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              {siteConfig.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#about"
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(79,195,247,0.3)" }}
                whileTap={{ scale: 0.96 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#4fc3f7] to-[#b388ff] text-white font-bold text-lg shadow-lg shadow-[#4fc3f7]/15 relative overflow-hidden group inline-block text-center"
                onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                <span className="relative z-10">Explore My Universe</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#b388ff] to-[#f48fb1] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="px-8 py-4 rounded-full glass text-white/60 font-medium text-lg hover:text-white hover:bg-white/5 transition-all inline-block text-center gradient-border"
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>

          {/* TODO: Left for adding the new astronaut image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, type: "spring", bounce: 0.2 }}
            className="flex justify-center lg:justify-end relative order-1 lg:order-2"
          >
            <div className="w-[320px] h-[320px]" />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span className="text-white/25 text-xs tracking-[0.2em] uppercase font-mono">scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/15 flex justify-center pt-1.5">
            <motion.div
              className="w-1 h-1.5 rounded-full bg-[#4fc3f7]"
              animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>
    </SectionObserver>
  );
}

/* ========================================= */
/* ABOUT                                      */
/* ========================================= */
function AboutScrollSection() {
  return (
    <SectionObserver id="about">
      <section className="min-h-screen flex items-center py-24 px-6 relative">
        <div className="section-ambient section-ambient-blue" />
        <FloatingCode
          snippets={["class Developer {", "  skills: string[];", "  passion = 'AI';", "}"]}
          color="#4fc3f7"
        />
        <div className="max-w-6xl w-full mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* TODO: Left for adding the new astronaut image */}
            <motion.div
              className="lg:col-span-2 flex justify-center lg:sticky lg:top-28"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-[260px] h-[260px]" />
            </motion.div>

            {/* Content */}
            <motion.div
              className="lg:col-span-3"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <CodeSectionHeader
                label="About"
                title="Who am I?"
                color="#4fc3f7"
                subtitle="const developer = new Developer();"
              />

              <motion.p variants={itemVariants} className="text-white/55 leading-relaxed mb-8 text-lg">
                {aboutData.intro}
              </motion.p>

              {aboutData.education.map((edu, i) => (
                <motion.div key={i} variants={itemVariants} className="glass rounded-xl p-5 mb-4 hover:bg-white/[0.06] transition-colors group">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-semibold text-white group-hover:text-[#4fc3f7] transition-colors">{edu.degree}</h5>
                      <p className="text-white/40 text-sm">{edu.institution}</p>
                    </div>
                    <span className="text-[#4fc3f7] text-sm font-mono">{edu.year}</span>
                  </div>
                </motion.div>
              ))}

              <motion.div variants={itemVariants} className="glass rounded-xl p-5 border-l-2 border-[#b388ff] mb-8 relative overflow-hidden">
                <div className="absolute top-2 right-3 text-white/10 font-mono text-xs">founder.md</div>
                <h4 className="text-[#b388ff] text-sm font-semibold mb-2 uppercase tracking-wider">Founder Story</h4>
                <p className="text-white/55 text-sm leading-relaxed">{aboutData.founderStory}</p>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
                {[
                  { label: "Projects", value: "10+", icon: "🚀" },
                  { label: "Experience", value: "3+", icon: "💼", suffix: "+" },
                  { label: "Tech Stack", value: "20+", icon: "⚡" },
                ].map((stat) => (
                  <div key={stat.label} className="glass rounded-xl p-4 text-center hover:bg-white/[0.06] transition-colors group">
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{stat.icon}</div>
                    <div className="text-xl font-bold text-white">
                      <AnimatedCounter value={stat.value} suffix="+" />
                    </div>
                    <div className="text-white/35 text-xs mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </SectionObserver>
  );
}

/* ========================================= */
/* EXPERIENCE                                 */
/* ========================================= */
function ExperienceScrollSection() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <SectionObserver id="experience">
      <section className="min-h-screen flex items-center py-24 px-6 relative">
        <div className="section-ambient section-ambient-orange" />
        <FloatingCode
          snippets={["async function buildCareer()", "  await learn(newSkill);", "  experience.push(role);"]}
          color="#ff7043"
        />
        <div className="max-w-6xl w-full mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Content */}
            <motion.div
              className="lg:col-span-3 order-2 lg:order-1"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <CodeSectionHeader
                label="Experience"
                title="My Journey"
                color="#ff7043"
                subtitle="// career.map(role => grow(role))"
              />

              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#4fc3f7] via-[#b388ff] to-[#f48fb1] opacity-20" />
                <div className="space-y-5">
                  {experienceData.map((exp) => (
                    <motion.div key={exp.id} variants={itemVariants} className="relative pl-12">
                      <motion.div
                        className="absolute left-2.5 top-5 w-4 h-4 rounded-full border-2 z-10 transition-colors"
                        style={{
                          borderColor: exp.color,
                          background: expanded === exp.id ? exp.color : "rgba(3,0,20,0.9)",
                        }}
                        whileHover={{ scale: 1.5 }}
                      />
                      <div
                        className="glass rounded-xl p-5 cursor-pointer hover:bg-white/[0.06] transition-all group"
                        onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-gradient-inline transition-colors">{exp.company}</h3>
                            <p style={{ color: exp.color }} className="font-medium text-sm">{exp.role}</p>
                          </div>
                          <span className="text-white/35 text-sm font-mono shrink-0">{exp.period}</span>
                        </div>
                        <motion.div
                          animate={{ height: expanded === exp.id ? "auto" : 0, opacity: expanded === exp.id ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-white/50 text-sm leading-relaxed mb-3 pt-2">{exp.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {exp.tech.map((t) => (
                              <span key={t} className="px-3 py-1 text-xs rounded-full font-mono font-medium" style={{ background: `${exp.color}12`, color: exp.color, border: `1px solid ${exp.color}25` }}>
                                {t}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                        {expanded !== exp.id && (
                          <p className="text-white/20 text-xs mt-2 font-mono">
                            <span className="text-white/10">{'>'}</span> click to expand
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* TODO: Left for adding the new astronaut image */}
            <motion.div
              className="lg:col-span-2 flex justify-center lg:sticky lg:top-28 order-1 lg:order-2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-[240px] h-[240px]" />
            </motion.div>
          </div>
        </div>
      </section>
    </SectionObserver>
  );
}

/* ========================================= */
/* PROJECTS                                   */
/* ========================================= */
function ProjectsScrollSection() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const selected = projectsData.find((p) => p.id === selectedProject);
  const iconMap: Record<string, string> = { heart: "❤️", users: "👥", car: "🚗", sparkle: "✨" };

  return (
    <SectionObserver id="projects">
      <section className="min-h-screen flex items-center py-24 px-6 relative">
        <div className="section-ambient section-ambient-gold" />
        <FloatingCode
          snippets={["npm run build", "deploy --production", "const innovation = true;"]}
          color="#ffab40"
        />
        <div className="max-w-6xl w-full mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <motion.div
              className="flex-1"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <CodeSectionHeader
                label="Projects"
                title="Things I've Built"
                color="#ffab40"
                subtitle="// projects.forEach(p => showcase(p))"
              />
            </motion.div>
            {/* TODO: Left for adding the new astronaut image */}
            <div className="w-[180px] h-[180px]" />
          </div>

          {/* Detail view */}
          {selected ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-strong rounded-2xl p-6 md:p-8 max-w-3xl mx-auto relative overflow-hidden"
            >
              {/* Code-style file header */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-white/[0.02] border-b border-white/[0.05] flex items-center px-4 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="text-white/20 text-xs font-mono ml-3">{selected.id}.tsx</span>
              </div>

              <div className="pt-6">
                <button onClick={() => setSelectedProject(null)} className="text-white/40 hover:text-white text-sm mb-5 flex items-center gap-1 transition-colors font-mono">
                  ← cd ..
                </button>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl" style={{ background: `${selected.color}18` }}>
                    {iconMap[selected.icon] || "🚀"}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selected.name}</h3>
                    <p style={{ color: selected.color }} className="font-medium text-sm">{selected.tagline}</p>
                  </div>
                </div>
                <p className="text-white/60 leading-relaxed mb-6">{selected.description}</p>
                <h4 className="text-xs font-semibold text-white/35 uppercase tracking-widest mb-3 font-mono">{"// Key Features"}</h4>
                <div className="grid gap-2 mb-6">
                  {selected.features.map((f, i) => (
                    <motion.div key={f} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-lg p-3 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ background: selected.color }} />
                      <span className="text-white/70 text-sm">{f}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.tech.map((t) => (
                    <span key={t} className="px-3 py-1.5 text-sm rounded-full font-mono font-medium" style={{ background: `${selected.color}12`, color: selected.color, border: `1px solid ${selected.color}25` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 gap-5"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {projectsData.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
                  onClick={() => setSelectedProject(project.id)}
                  className="glass rounded-xl p-6 cursor-pointer hover:bg-white/[0.06] transition-all group gradient-border relative overflow-hidden"
                >
                  {/* File tab */}
                  <div className="absolute top-0 right-0 px-3 py-1 bg-white/[0.02] rounded-bl-lg">
                    <span className="text-white/15 text-xs font-mono">{project.id}.tsx</span>
                  </div>
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform" style={{ background: `${project.color}18` }}>
                      {iconMap[project.icon] || "🚀"}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-white text-lg">{project.name}</h3>
                      <p style={{ color: project.color }} className="text-sm font-medium">{project.tagline}</p>
                    </div>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-0.5 text-xs rounded-full text-white/40 font-mono" style={{ background: `${project.color}08` }}>{t}</span>
                    ))}
                    {project.tech.length > 3 && <span className="px-2 py-0.5 text-xs rounded-full text-white/20 font-mono">+{project.tech.length - 3}</span>}
                  </div>
                  <div className="mt-4 text-right">
                    <span className="text-white/20 text-xs group-hover:text-[#4fc3f7] transition-colors font-mono">view details →</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </SectionObserver>
  );
}

/* ========================================= */
/* SKILLS                                     */
/* ========================================= */
function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-white/60 group-hover:text-white transition-colors font-mono">{name}</span>
        <span className="text-xs text-white/30 font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" as const }}
          className="h-full rounded-full relative"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}66)` }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-2 rounded-full animate-pulse-glow" style={{ background: color, filter: "blur(3px)" }} />
        </motion.div>
      </div>
    </div>
  );
}

function SkillsScrollSection() {
  return (
    <SectionObserver id="skills">
      <section className="min-h-screen flex items-center py-24 px-6 relative">
        <div className="section-ambient section-ambient-purple" />
        <FloatingCode
          snippets={["import { AI, Web, Cloud } from '@skills';", "expertise.level = 'senior';", "stack.push('Three.js');"]}
          color="#b388ff"
        />
        <div className="max-w-6xl w-full mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Content */}
            <motion.div
              className="lg:col-span-3"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <CodeSectionHeader
                label="Skills"
                title="Technical Arsenal"
                color="#b388ff"
                subtitle="// skills.sort((a, b) => b.level - a.level)"
              />

              <div className="grid sm:grid-cols-2 gap-5">
                {skillsData.categories.map((category) => (
                  <motion.div
                    key={category.name}
                    variants={itemVariants}
                    className="glass rounded-xl p-5 hover:bg-white/[0.06] transition-colors relative overflow-hidden"
                  >
                    {/* File tab indicator */}
                    <div className="absolute top-0 right-0 h-px w-16" style={{ background: `linear-gradient(90deg, transparent, ${category.color}40)` }} />
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ background: `${category.color}18` }}>
                        {category.icon === "brain" ? "🧠" : category.icon === "code" ? "💻" : category.icon === "smartphone" ? "📱" : "☁️"}
                      </div>
                      <h3 className="font-bold text-white">{category.name}</h3>
                    </div>
                    <div className="space-y-3">
                      {category.skills.map((skill) => (
                        <SkillBar key={skill.name} name={skill.name} level={skill.level} color={category.color} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* TODO: Left for adding the new astronaut image */}
            <motion.div
              className="lg:col-span-2 flex justify-center lg:sticky lg:top-28"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-[230px] h-[230px]" />
            </motion.div>
          </div>
        </div>
      </section>
    </SectionObserver>
  );
}

/* ========================================= */
/* CONTACT                                    */
/* ========================================= */
function ContactScrollSection() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); };

  return (
    <SectionObserver id="contact">
      <section className="min-h-screen flex items-center py-24 px-6 relative">
        <div className="section-ambient section-ambient-silver" />
        <FloatingCode
          snippets={["await sendMessage(recruiter);", "new Connection().establish();", "// let's build together"]}
          color="#e0e0e0"
        />
        <div className="max-w-5xl w-full mx-auto">
          {/* Header + Astronaut */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center md:text-left flex-1"
              variants={sectionVariants}
            >
              <CodeSectionHeader
                label="Contact"
                title="Let's Connect"
                color="#e0e0e0"
                subtitle="// Ready to collaborate?"
              />
            </motion.div>
            {/* TODO: Left for adding the new astronaut image */}
            <div className="w-[180px] h-[180px]" />
          </div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              {[
                { label: "Email", icon: "📧", href: `mailto:${siteConfig.email}`, value: siteConfig.email },
                { label: "LinkedIn", icon: "💼", href: siteConfig.linkedin, value: "Connect with me" },
                { label: "GitHub", icon: "🐙", href: siteConfig.github, value: "View my code" },
              ].map((link) => (
                <motion.a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ x: 6, scale: 1.01 }} whileTap={{ scale: 0.98 }}
                  className="glass rounded-xl p-5 flex items-center gap-4 hover:bg-white/[0.06] transition-colors block group"
                >
                  <div className="text-2xl">{link.icon}</div>
                  <div>
                    <div className="text-white font-medium group-hover:text-[#4fc3f7] transition-colors">{link.label}</div>
                    <div className="text-white/35 text-sm font-mono">{link.value}</div>
                  </div>
                </motion.a>
              ))}

              {/* Terminal-style status */}
              <motion.div variants={itemVariants} className="glass rounded-xl p-4 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-[#28c840] animate-pulse" />
                  <span className="text-white/40 text-xs font-mono">status: available for hire</span>
                </div>
                <div className="text-white/20 text-xs font-mono">
                  <span className="text-[#4fc3f7]">$</span> response_time: &lt; 24h
                </div>
              </motion.div>
            </motion.div>

            {/* Form — styled as a code editor */}
            <motion.form variants={itemVariants} onSubmit={handleSubmit} className="glass-strong rounded-2xl overflow-hidden">
              {/* Editor tab bar */}
              <div className="h-8 bg-white/[0.02] border-b border-white/[0.05] flex items-center px-4 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="text-white/20 text-xs font-mono ml-3">message.tsx</span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-white/35 text-xs uppercase tracking-wider block mb-2 font-mono">{"// your name"}</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#4fc3f7]/40 focus:ring-1 focus:ring-[#4fc3f7]/15 transition-all placeholder:text-white/15"
                    placeholder="const name = '...'" required />
                </div>
                <div>
                  <label className="text-white/35 text-xs uppercase tracking-wider block mb-2 font-mono">{"// your email"}</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#4fc3f7]/40 focus:ring-1 focus:ring-[#4fc3f7]/15 transition-all placeholder:text-white/15"
                    placeholder="const email = '...'" required />
                </div>
                <div>
                  <label className="text-white/35 text-xs uppercase tracking-wider block mb-2 font-mono">{"// your message"}</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4}
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#4fc3f7]/40 focus:ring-1 focus:ring-[#4fc3f7]/15 transition-all resize-none placeholder:text-white/15"
                    placeholder="const message = '...'" required />
                </div>
                <motion.button type="submit" disabled={sent}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(79,195,247,0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#4fc3f7] to-[#b388ff] text-white font-bold font-mono relative overflow-hidden group"
                >
                  {sent ? "✓ message.send() // success!" : "$ npm run send-message"}
                </motion.button>
              </div>
            </motion.form>
          </motion.div>

          {/* Footer */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center mt-20 pt-8 border-t border-white/[0.05]"
          >
            <p className="text-white/15 text-sm font-mono">
              {'<'} Built by {siteConfig.name} {'/'}{'>'}
              <span className="text-white/10"> — Powered by Next.js · Three.js · React</span>
            </p>
          </motion.div>
        </div>
      </section>
    </SectionObserver>
  );
}

/* ========================================= */
/* MAIN SCROLL PAGE                           */
/* ========================================= */
export default function ScrollPage() {
  const { introComplete } = useStore();
  if (!introComplete) return null;

  return (
    <div className="relative z-10">
      <ScrollProgress />

      {/* Shooting stars */}
      <div className="shooting-stars-container">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={`shooting-star shooting-star-${i + 1}`} />
        ))}
      </div>

      <HeroSection />
      <div className="section-divider max-w-4xl" />
      <AboutScrollSection />
      <div className="section-divider max-w-4xl" />
      <ExperienceScrollSection />
      <div className="section-divider max-w-4xl" />
      <ProjectsScrollSection />
      <div className="section-divider max-w-4xl" />
      <SkillsScrollSection />
      <div className="section-divider max-w-4xl" />
      <ContactScrollSection />
    </div>
  );
}
