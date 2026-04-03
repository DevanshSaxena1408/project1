"use client";

import { motion } from "framer-motion";
import GlassPanel from "@/components/ui/GlassPanel";
import { siteConfig } from "@/data/content";
import { useStore } from "@/store/useStore";
import { useState } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ContactSection() {
  const { setCurrentSection } = useStore();
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <GlassPanel
      title="🌙 Contact"
      onClose={() => setCurrentSection("home")}
      className="max-w-2xl w-full mx-auto"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Intro */}
        <motion.div variants={itemVariants} className="text-center">
          <p className="text-white/60 leading-relaxed">
            Ready to start a conversation? Send a message and it&apos;ll rocket
            straight to my inbox! 🚀
          </p>
        </motion.div>

        {/* Contact Links */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-3"
        >
          {[
            {
              label: "Email",
              icon: "📧",
              href: `mailto:${siteConfig.email}`,
              value: siteConfig.email,
            },
            {
              label: "LinkedIn",
              icon: "💼",
              href: siteConfig.linkedin,
              value: "Connect",
            },
            {
              label: "GitHub",
              icon: "🐙",
              href: siteConfig.github,
              value: "Follow",
            },
          ].map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="glass rounded-xl p-4 text-center hover:bg-white/[0.08] transition-colors block"
              data-cursor="pointer"
            >
              <div className="text-2xl mb-2">{link.icon}</div>
              <div className="text-white font-medium text-sm">
                {link.label}
              </div>
              <div className="text-white/40 text-xs mt-0.5">{link.value}</div>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#4fc3f7]/50 focus:ring-1 focus:ring-[#4fc3f7]/20 transition-all placeholder:text-white/20"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#4fc3f7]/50 focus:ring-1 focus:ring-[#4fc3f7]/20 transition-all placeholder:text-white/20"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#4fc3f7]/50 focus:ring-1 focus:ring-[#4fc3f7]/20 transition-all resize-none placeholder:text-white/20"
              placeholder="Tell me about your project..."
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 25px rgba(79, 195, 247, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#4fc3f7] to-[#b388ff] text-white font-bold text-base relative overflow-hidden group"
            data-cursor="pointer"
            disabled={sent}
          >
            {sent ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center justify-center gap-2"
              >
                🚀 Message Sent!
              </motion.span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                🚀 Launch Message
              </span>
            )}
          </motion.button>
        </motion.form>

        {/* Download Resume */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="glass rounded-xl px-6 py-3 text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
            data-cursor="pointer"
          >
            📋 Download Mission Briefing (Resume)
          </motion.button>
        </motion.div>
      </motion.div>
    </GlassPanel>
  );
}
