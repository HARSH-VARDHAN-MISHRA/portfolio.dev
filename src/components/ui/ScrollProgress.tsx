"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin progress rail pinned to the top of the viewport, tracking scroll. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    mass: 0.2,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-accent via-accent-soft to-accent-2"
    />
  );
}
