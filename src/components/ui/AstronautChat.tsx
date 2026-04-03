"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { astronautMessages } from "@/data/content";
import { useState, useEffect, useRef } from "react";

interface ChatMessage {
  id: number;
  text: string;
  sender: "astronaut" | "user";
}

export default function AstronautChat() {
  const { isChatOpen, setIsChatOpen, currentSection } = useStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdRef = useRef(0);

  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      addAstronautMessage(
        astronautMessages.welcome[0]
      );
      setTimeout(() => {
        addAstronautMessage(
          astronautMessages.welcome[1]
        );
      }, 1200);
    }
  }, [isChatOpen]);

  useEffect(() => {
    if (currentSection !== "home" && isChatOpen) {
      const sectionMessages =
        astronautMessages[currentSection] || astronautMessages.idle;
      addAstronautMessage(sectionMessages[0]);
    }
  }, [currentSection]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function addAstronautMessage(text: string) {
    setIsTyping(true);
    setTimeout(() => {
      messageIdRef.current += 1;
      setMessages((prev) => [
        ...prev,
        { id: messageIdRef.current, text, sender: "astronaut" },
      ]);
      setIsTyping(false);
    }, 800 + Math.random() * 500);
  }

  function handleSend() {
    if (!input.trim()) return;
    messageIdRef.current += 1;
    setMessages((prev) => [
      ...prev,
      { id: messageIdRef.current, text: input, sender: "user" },
    ]);
    const userInput = input.toLowerCase();
    setInput("");

    setTimeout(() => {
      let response: string;
      if (
        userInput.includes("project") ||
        userInput.includes("work") ||
        userInput.includes("built")
      ) {
        response =
          "Devansh has built amazing projects! Check out Medicare (AI healthcare), DevMatch (developer matching), RideEase (transportation), and MindfulVista (mental wellness). Click Saturn to explore them all! 🪐";
      } else if (
        userInput.includes("skill") ||
        userInput.includes("tech") ||
        userInput.includes("stack")
      ) {
        response =
          "Devansh is skilled in AI/LLM, Full Stack Web Dev, Android, and Cloud! From Python to React, LangChain to Kubernetes — he's a true polyglot. Visit Neptune for details! 💜";
      } else if (
        userInput.includes("experience") ||
        userInput.includes("job") ||
        userInput.includes("work")
      ) {
        response =
          "Devansh has worked at Nokia as an AI Developer, interned at Intel Unnati, founded Pixadora, and volunteered at NayePankh Foundation. Head to Mars to learn more! 🔴";
      } else if (
        userInput.includes("contact") ||
        userInput.includes("hire") ||
        userInput.includes("email")
      ) {
        response =
          "Great choice! You can reach Devansh via email, LinkedIn, or GitHub. Click the Moon to send a message directly! 🌙";
      } else if (
        userInput.includes("hello") ||
        userInput.includes("hi") ||
        userInput.includes("hey")
      ) {
        response =
          "Hey there, Explorer! 👋 Welcome aboard! I'm here to help you navigate Devansh's universe. What would you like to know?";
      } else {
        response =
          "Interesting question! Try exploring the planets — each one holds different aspects of Devansh's profile. You can ask me about projects, skills, experience, or how to contact Devansh! 🚀";
      }
      addAstronautMessage(response);
    }, 500);
  }

  return (
    <AnimatePresence>
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          transition={{ type: "spring", bounce: 0.2 }}
          className="fixed bottom-24 right-8 z-50 w-80 sm:w-96 glass-strong rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧑‍🚀</span>
              <div>
                <h3 className="text-sm font-bold text-white">
                  Astronaut Guide
                </h3>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/40 text-xs">Online</span>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsChatOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-colors text-sm"
              data-cursor="pointer"
            >
              ✕
            </motion.button>
          </div>

          {/* Messages */}
          <div className="h-72 overflow-y-auto p-4 space-y-3 scroll-smooth">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#4fc3f7]/20 text-white rounded-br-md"
                      : "bg-white/5 text-white/80 rounded-bl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white/5 px-4 py-2 rounded-2xl rounded-bl-md flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 bg-white/40 rounded-full"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#4fc3f7]/50 placeholder:text-white/20"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-xl bg-[#4fc3f7]/20 flex items-center justify-center text-[#4fc3f7] hover:bg-[#4fc3f7]/30 transition-colors"
                data-cursor="pointer"
              >
                ↑
              </motion.button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
