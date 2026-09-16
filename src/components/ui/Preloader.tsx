"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/data/site";

const NAME = site.name;

/**
 * A one-time intro screen: the name holds, then dissolves character-by-
 * character into "vapour" (blur + drift + fade, staggered) before the real
 * page underneath is revealed. Skips straight to done for
 * prefers-reduced-motion, and never blocks first paint of the page itself —
 * it's an overlay, not a gate on rendering.
 */
export default function Preloader() {
  const [phase, setPhase] = useState<"hold" | "vapour" | "done">("hold");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => setPhase("done"), 0);
      return () => clearTimeout(id);
    }
    const toVapour = setTimeout(() => setPhase("vapour"), 700);
    const toDone = setTimeout(() => setPhase("done"), 700 + 1100);
    return () => {
      clearTimeout(toVapour);
      clearTimeout(toDone);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
        >
          <h1 className="font-display text-[clamp(1.8rem,6vw,4rem)] font-medium tracking-tight text-foreground">
            {NAME.split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                animate={
                  phase === "vapour"
                    ? {
                        opacity: 0,
                        y: -28 - Math.abs(Math.sin(i * 1.7)) * 20,
                        x: Math.sin(i * 2.3) * 14,
                        filter: "blur(10px)",
                      }
                    : { opacity: 1, y: 0, x: 0, filter: "blur(0px)" }
                }
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.025 }}
              >
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
