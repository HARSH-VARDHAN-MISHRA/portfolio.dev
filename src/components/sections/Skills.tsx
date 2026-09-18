"use client";

import { motion } from "motion/react";
import { skillGroups, marqueeLogos } from "@/data/skills";
import { techLogoMap } from "@/components/ui/TechLogos";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import Marquee from "@/components/ui/Marquee";

export default function Skills() {
  return (
    <section id="skills" className="relative border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionLabel index="06" label="Skills & Tools" />
        <h2 className="mt-10 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.1] tracking-tight text-foreground">
          <RevealText text="The stack behind the systems." />
        </h2>
      </div>

      <div className="mt-14 border-y border-border py-8">
        <Marquee
          items={marqueeLogos.map((tool) => {
            const Logo = techLogoMap[tool.slug];
            return (
              <div
                key={tool.slug}
                className="flex items-center gap-3 text-muted-2 transition-colors hover:text-foreground"
                title={tool.name}
              >
                <Logo className="h-7 w-7 sm:h-8 sm:w-8" />
                <span className="font-display text-xl font-medium sm:text-2xl">{tool.name}</span>
              </div>
            );
          })}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <div key={group.category}>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-2">
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: gi * 0.05 + i * 0.03 }}
                    className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
