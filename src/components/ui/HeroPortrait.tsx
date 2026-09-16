"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { site } from "@/data/site";

/**
 * The real portrait. Kept deliberately calm: one slow idle float, and a
 * gentle scroll-linked drift/fade as the hero scrolls away. No pointer-tilt —
 * that read as gimmicky on a photo, so it's gone. The image itself fades
 * into transparency at the bottom edge (mask-image) instead of ending in a
 * hard rectangular cut line.
 */
export default function HeroPortrait() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 900], [0, -60]);
  const parallaxOpacity = useTransform(scrollY, [0, 700], [1, 0.35]);

  return (
    <motion.div
      style={{ y: parallaxY, opacity: parallaxOpacity }}
      className="relative mx-auto w-full max-w-[260px] sm:max-w-[320px] lg:mx-0 lg:max-w-[400px]"
    >
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(circle,var(--color-accent),var(--color-accent-2)_55%,transparent_75%)] opacity-30 blur-3xl"
          />

          <Image
            src={site.portraitSrc}
            alt="Portrait of Harshvardhan Mishra"
            width={760}
            height={748}
            preload
            sizes="(max-width: 1024px) 55vw, 400px"
            draggable={false}
            className="relative z-10 h-auto w-full select-none"
            style={{
              maskImage: "linear-gradient(to bottom, black 78%, transparent 98%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent 98%)",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
