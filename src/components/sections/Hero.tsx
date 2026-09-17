"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, FileDown } from "lucide-react";
import { site } from "@/data/site";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import GradientAurora from "@/components/ui/GradientAurora";
import ParticleField from "@/components/ui/ParticleField";
import HeroPortrait from "@/components/ui/HeroPortrait";
import TypewriterText from "@/components/ui/TypewriterText";

const BUILDS = ["CRM Platforms", "ERP Systems", "Shopify Stores", "WhatsApp Automation", "AI Workflows"] as const;

export default function Hero() {
  const { scrollY } = useScroll();
  // The background drifts slower than the page scrolls — real parallax
  // depth, not just a static backdrop behind the content.
  const auroraY = useTransform(scrollY, [0, 900], [0, 160]);
  const particleY = useTransform(scrollY, [0, 900], [0, 60]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-grid"
    >
      <motion.div style={{ y: auroraY }} className="absolute inset-0">
        <GradientAurora />
      </motion.div>
      <motion.div style={{ y: particleY }} className="absolute inset-0">
        <ParticleField className="opacity-70" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-10 px-6 pt-32 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pb-4 lg:pt-24">
        <div className="order-2 lg:order-1 lg:border-l lg:border-border lg:pl-10">
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
              className="h-px w-8 origin-left bg-border-strong"
            />
            {site.status}
          </motion.div>

          <h1 className="max-w-xl font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-foreground">
            <RevealText text="I build the frontend" />
            <br />
            <RevealText text="that CRM systems and" delay={0.15} />
            <br />
            <span className="text-gradient">
              <RevealText text="warehouses run on." delay={0.3} />
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
            className="mt-6 flex items-center gap-2 font-mono text-sm text-accent-2 sm:text-base"
          >
            <span className="text-muted-2">Currently building</span>
            <TypewriterText words={BUILDS} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
            className="mt-6 max-w-lg text-balance text-base leading-relaxed text-muted sm:text-lg"
          >
            {site.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
            className="mt-10 flex flex-wrap items-center gap-4"
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
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="order-1 flex justify-center lg:order-2 lg:justify-end"
        >
          <HeroPortrait />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 pb-10 sm:px-10"
      >
        <p className="max-w-[16rem] text-xs leading-relaxed text-muted-2">
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
