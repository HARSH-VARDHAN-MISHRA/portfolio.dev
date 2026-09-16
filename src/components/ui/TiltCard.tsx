"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. Keep this small — 6-10 reads as premium, 20+ reads as a toy. */
  strength?: number;
  /** Adds a cursor-tracked specular highlight sweeping across the surface. */
  glare?: boolean;
};

/**
 * A real, physical 3D tilt — not a CSS `:hover { transform }` fake. Rotation
 * is driven by pointer position within the card via motion values, smoothed
 * through a spring so it settles instead of snapping, and always resets to
 * flat on pointer leave.
 */
export default function TiltCard({ children, className, strength = 8, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5); // 0..1 across the card
  const py = useMotionValue(0.5);

  const springConfig = { stiffness: 220, damping: 20, mass: 0.6 };
  const spx = useSpring(px, springConfig);
  const spy = useSpring(py, springConfig);

  const rotateX = useTransform(spy, [0, 1], [strength, -strength]);
  const rotateY = useTransform(spx, [0, 1], [-strength, strength]);
  const glareX = useTransform(spx, [0, 1], ["-20%", "120%"]);
  const glareY = useTransform(spy, [0, 1], ["-20%", "120%"]);
  // Computed unconditionally (Rules of Hooks) even when `glare` is off — the
  // resulting motion value just goes unused in that case.
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(360px circle at ${gx} ${gy}, color-mix(in srgb, var(--color-foreground) 14%, transparent), transparent 60%)`
  );

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn("relative", className)}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
          style={{ background: glareBackground }}
        />
      )}
    </motion.div>
  );
}
