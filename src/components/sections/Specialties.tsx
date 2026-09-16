"use client";

import { motion } from "motion/react";
import { Store, MessageCircle, Sparkles, Radio, type LucideIcon } from "lucide-react";
import { specialties, type Specialty } from "@/data/specialties";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import TiltCard from "@/components/ui/TiltCard";

const icons: Record<Specialty["icon"], LucideIcon> = {
  store: Store,
  whatsapp: MessageCircle,
  ai: Sparkles,
  realtime: Radio,
};

export default function Specialties() {
  return (
    <section id="specialties" className="relative border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionLabel index="02" label="What I Build" />
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.1] tracking-tight text-foreground">
            <RevealText text="Beyond the frontend —" />
            <br />
            <RevealText text="systems that run themselves." delay={0.1} />
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            The specific tools and integrations I reach for when a business needs more than a
            static website.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {specialties.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              >
                <TiltCard
                  strength={5}
                  className="group flex flex-col gap-5 rounded-2xl border border-border bg-surface/60 p-8 transition-colors duration-500 hover:border-accent-soft/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent-2 transition-colors duration-500 group-hover:border-accent-soft/60 group-hover:text-accent-soft">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-2">
                      {item.tools}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-medium text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                  </div>

                  <div className="mt-auto flex gap-3 border-t border-border pt-5">
                    <span className="mt-0.5 font-mono text-xs text-accent-2">→</span>
                    <p className="text-sm leading-relaxed text-foreground/90">{item.build}</p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
