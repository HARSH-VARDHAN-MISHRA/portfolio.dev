"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Copy, Phone, FileDown } from "lucide-react";
import { site } from "@/data/site";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import GradientAurora from "@/components/ui/GradientAurora";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

const links = [
  { label: "GitHub", href: site.github, icon: GithubIcon },
  { label: "LinkedIn", href: site.linkedin, icon: LinkedinIcon },
  { label: site.phone, href: `tel:${site.phoneHref}`, icon: Phone },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — the mailto link still works as a fallback.
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-border py-28 sm:py-40">
      <GradientAurora className="opacity-60" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center sm:px-10">
        <div className="flex justify-center">
          <SectionLabel index="10" label="Contact" />
        </div>

        <h2 className="mx-auto mt-10 max-w-3xl font-display text-[clamp(2.2rem,6vw,5rem)] font-medium leading-[1.05] tracking-tight text-foreground">
          <RevealText text="Got a system worth" />
          <br />
          <span className="text-gradient">
            <RevealText text="building right?" delay={0.12} />
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted"
        >
          Currently building CRM, e-commerce, and automation platforms at Partsklik LLP in Delhi —
          always open to a good conversation about frontend, automation, or your next project.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href={`mailto:${site.email}`}>{site.email}</MagneticButton>
          <MagneticButton variant="ghost" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy email"}
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-14 flex max-w-xl flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-border pt-10"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
              data-cursor="link"
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </a>
          ))}
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="link"
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
          >
            <FileDown className="h-4 w-4" />
            Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
