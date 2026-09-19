"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, FileDown } from "lucide-react";
import { site } from "@/data/site";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import GradientAurora from "@/components/ui/GradientAurora";
import ParticleField from "@/components/ui/ParticleField";
import TypewriterText from "@/components/ui/TypewriterText";

const BUILDS = [
  "CRM Platforms",
  "ERP Systems",
  "Shopify Stores",
  "Razorpay Payments",
  "WhatsApp Automation",
  "AI Workflows",
] as const;

export default function Hero() {
  const { scrollY } = useScroll();
  // The background drifts slower than the page scrolls — real parallax
  // depth, not just a static backdrop behind the content.
  const auroraY = useTransform(scrollY, [0, 900], [0, 160]);
  const particleY = useTransform(scrollY, [0, 900], [0, 60]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between bg-grid"
    >
      {/* Decorative layers get their own overflow-hidden wrapper — clipping
          the section itself instead would also clip real content (the CTA
          row, in particular) whenever it's taller than the viewport on
          shorter screens, pushing it out of view with no way to scroll to it. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div style={{ y: auroraY }} className="absolute inset-0">
          <GradientAurora />
        </motion.div>
        <motion.div style={{ y: particleY }} className="absolute inset-0">
          <ParticleField className="opacity-70" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 pt-32 text-center sm:px-10 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="h-px w-8 origin-right bg-border-strong"
          />
          {site.status}
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="h-px w-8 origin-left bg-border-strong"
          />
        </motion.div>

        <h1 className="max-w-3xl font-display text-[clamp(2rem,4.6vw,3.85rem)] font-medium leading-[1.1] tracking-tight text-foreground">
          <RevealText text="From CRM to checkout" />
          <br />
          <RevealText text="to delivery —" delay={0.15} />
          <br />
          <span className="text-gradient">
            <RevealText text="I build the frontend businesses run on." delay={0.3} />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
          className="mt-6 flex items-center justify-center gap-2 font-mono text-sm text-accent-2 sm:text-base"
        >
          <span className="text-muted-2">Currently building</span>
          <TypewriterText words={BUILDS} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          className="mx-auto mt-6 max-w-lg text-balance text-base leading-relaxed text-muted sm:text-lg"
        >
          {site.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#specialties">What I build</MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Get in touch
          </MagneticButton>
          <MagneticButton href={site.resumeUrl} target="_blank" rel="noreferrer noopener" variant="ghost">
            <FileDown className="h-4 w-4" />
            Resume
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-3 px-6 pb-10 text-center sm:px-10"
      >
        <p className="max-w-sm text-xs leading-relaxed text-muted-2">
          {site.role}, {site.roleDetail} — {site.location}.
        </p>

        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Scroll
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-8 w-5 items-start justify-center rounded-full border border-border-strong p-1"
          >
            <ArrowDown className="h-3 w-3 text-accent-2" />
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
