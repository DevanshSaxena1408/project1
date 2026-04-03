"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);
  const isHovering = useRef(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 25, stiffness: 200 };
  const trailSpringX = useSpring(trailX, springConfig);
  const trailSpringY = useSpring(trailY, springConfig);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "pointer"
      ) {
        isHovering.current = true;
        dotRef.current?.classList.add("scale-[2]");
        ringRef.current?.classList.add("scale-150", "opacity-100");
        // Show code cursor label
        if (codeRef.current) {
          codeRef.current.style.opacity = "1";
        }
      }
    };

    const handleMouseOut = () => {
      isHovering.current = false;
      dotRef.current?.classList.remove("scale-[2]");
      ringRef.current?.classList.remove("scale-150", "opacity-100");
      if (codeRef.current) {
        codeRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  return (
    <>
      {/* Main dot */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 bg-[#4fc3f7] rounded-full pointer-events-none z-[9999] transition-transform duration-200 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Trail ring */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-[#4fc3f7]/50 rounded-full pointer-events-none z-[9998] transition-all duration-200 opacity-60"
        style={{
          x: trailSpringX,
          y: trailSpringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Code label on hover */}
      <motion.div
        ref={codeRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997] font-mono text-[8px] text-[#4fc3f7]/60 transition-opacity duration-200"
        style={{
          x: trailSpringX,
          y: trailSpringY,
          translateX: "10px",
          translateY: "-20px",
          opacity: 0,
        }}
      >
        click()
      </motion.div>
    </>
  );
}
