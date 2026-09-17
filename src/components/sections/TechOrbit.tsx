"use client";

import { useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { techLogoMap } from "@/components/ui/TechLogos";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import { site } from "@/data/site";

type OrbitNode = { key: string; label: string } & (
  | { kind: "logo"; slug: keyof typeof techLogoMap }
  | { kind: "icon" }
);

const innerRing: OrbitNode[] = [
  { key: "react", kind: "logo", slug: "react", label: "React" },
  { key: "nextdotjs", kind: "logo", slug: "nextdotjs", label: "Next.js" },
  { key: "typescript", kind: "logo", slug: "typescript", label: "TypeScript" },
  { key: "tailwindcss", kind: "logo", slug: "tailwindcss", label: "Tailwind CSS" },
];

const outerRing: OrbitNode[] = [
  { key: "nodedotjs", kind: "logo", slug: "nodedotjs", label: "Node.js" },
  { key: "mongodb", kind: "logo", slug: "mongodb", label: "MongoDB" },
  { key: "mysql", kind: "logo", slug: "mysql", label: "MySQL" },
  { key: "django", kind: "logo", slug: "django", label: "Django" },
  { key: "redux", kind: "logo", slug: "redux", label: "Redux" },
  { key: "shopify", kind: "logo", slug: "shopify", label: "Shopify" },
  { key: "ai", kind: "icon", label: "AI APIs" },
  { key: "git", kind: "logo", slug: "git", label: "Git" },
  { key: "github", kind: "logo", slug: "github", label: "GitHub" },
];

// Same `useSyncExternalStore` shape as CustomCursor's fine-pointer check —
// tracks `prefers-reduced-motion` without ever calling setState from inside
// an effect. These orbit rotations are Framer Motion `animate` loops, not
// CSS animations, so the global reduced-motion rule in globals.css can't
// touch them on its own; the continuous spin needs to be skipped in JS.
function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}
function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}
function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotionSnapshot, getReducedMotionServerSnapshot);
}

function Ring({
  nodes,
  radius,
  duration,
  reverse,
  size,
  reduceMotion,
  ringId,
  entranceDelay,
}: {
  nodes: OrbitNode[];
  radius: number;
  duration: number;
  reverse?: boolean;
  size: string;
  reduceMotion: boolean;
  ringId: string;
  entranceDelay: number;
}) {
  const strokeGradientId = `orbit-stroke-${ringId}`;
  const spokeGradientId = `orbit-spoke-${ringId}`;

  return (
    <>
      {/* Thin gradient-stroke ring (SVG) in place of the old flat dashed
          CSS border — stays fixed while nodes travel around it. */}
      <svg
        aria-hidden
        className="absolute overflow-visible"
        style={{
          left: "50%",
          top: "50%",
          width: `${radius * 2}%`,
          height: `${radius * 2}%`,
          transform: "translate(-50%, -50%)",
        }}
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id={strokeGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.75" />
            <stop offset="50%" stopColor="var(--color-accent-2)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.75" />
          </linearGradient>
          <radialGradient id={spokeGradientId}>
            <stop offset="0%" stopColor="var(--color-accent-2)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="var(--color-accent-2)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="49.5" fill="none" stroke={`url(#${strokeGradientId})`} strokeWidth="0.4" />
      </svg>

      <motion.div
        className="absolute inset-0"
        animate={reduceMotion ? undefined : { rotate: reverse ? -360 : 360 }}
        transition={reduceMotion ? undefined : { duration, repeat: Infinity, ease: "linear" }}
      >
        {/* Spokes from the hub out to each node — drawn inside the same
            rotating layer so they travel with the nodes they connect to. */}
        <svg aria-hidden className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100">
          {nodes.map((node, i) => {
            const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);
            return (
              <line
                key={node.key}
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke={`url(#${spokeGradientId})`}
                strokeWidth="0.3"
              />
            );
          })}
        </svg>

        {nodes.map((node, i) => {
          const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          const icon =
            node.kind === "logo"
              ? (() => {
                  const Logo = techLogoMap[node.slug];
                  return <Logo className="h-[45%] w-[45%]" />;
                })()
              : <Sparkles className="h-[45%] w-[45%] text-accent-2" strokeWidth={1.75} />;

          return (
            <div
              key={node.key}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
            >
              <motion.div
                className="h-full w-full"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: entranceDelay + i * 0.06 }}
              >
                <motion.div
                  className="group relative flex h-full w-full items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-sm transition-colors duration-300 hover:border-accent-soft/70 hover:bg-surface-2 hover:text-accent-2"
                  animate={reduceMotion ? undefined : { rotate: reverse ? 360 : -360 }}
                  transition={reduceMotion ? undefined : { duration, repeat: Infinity, ease: "linear" }}
                  whileHover={{ scale: 1.15 }}
                >
                  {icon}

                  <span className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-border-strong bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted-2 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:px-3 sm:text-[11px]">
                    {node.label}
                  </span>
                </motion.div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </>
  );
}

export default function TechOrbit() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="tech-orbit" className="relative overflow-hidden border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionLabel index="03" label="Tools In Orbit" />
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.1] tracking-tight text-foreground">
            <RevealText text="Everything orbiting" />
            <br />
            <RevealText text="the core stack." delay={0.1} />
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            The frameworks, data layers, and integrations from the skills list above — in one
            picture.
          </p>
        </div>

        <motion.div
          className="relative mx-auto mt-16 aspect-square w-full max-w-[520px]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Soft radial glow field so the diagram doesn't float on bare
              background — same layered-blur idea as GradientAurora. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-3/4 w-3/4 rounded-full bg-accent/10 blur-[100px]" />
            <div className="absolute h-1/2 w-1/2 rounded-full bg-accent-2/10 blur-[80px]" />
          </div>

          <Ring
            nodes={innerRing}
            radius={26}
            duration={26}
            size="clamp(2.75rem, 9vw, 3.5rem)"
            reduceMotion={reduceMotion}
            ringId="inner"
            entranceDelay={0.15}
          />
          <Ring
            nodes={outerRing}
            radius={46}
            duration={38}
            reverse
            size="clamp(2.25rem, 7.5vw, 3rem)"
            reduceMotion={reduceMotion}
            ringId="outer"
            entranceDelay={0.35}
          />

          {/* Center hub — gradient fill + soft pulsing glow behind it. */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-accent/40 blur-2xl"
            />
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="relative flex h-16 w-16 items-center justify-center rounded-full border border-border-strong bg-gradient-to-br from-accent to-accent-2 font-display text-base font-semibold text-foreground shadow-lg sm:h-20 sm:w-20 sm:text-lg"
            >
              {site.initials}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
