"use client";

import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";
import { experience, education } from "@/data/experience";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";

export default function Experience() {
  return (
    <section id="experience" className="relative border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionLabel index="07" label="Experience" />
        <h2 className="mt-10 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.1] tracking-tight text-foreground">
          <RevealText text="Where I've built it." />
        </h2>

        <div className="relative mt-16">
          <div className="absolute left-0 top-2 hidden h-[calc(100%-2rem)] w-px bg-border sm:block" />

          <div className="flex flex-col">
            {experience.map((entry, i) => (
              <motion.div
                key={entry.company}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                className="grid grid-cols-1 gap-4 border-b border-border py-10 first:pt-0 last:border-none sm:grid-cols-[220px_1fr] sm:gap-10"
              >
                <div className="relative flex items-start gap-4 sm:pl-6">
                  <span className="absolute left-0 top-1.5 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-background bg-accent-2 sm:block" />
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
                    {entry.period}
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-xl font-medium text-foreground sm:text-2xl">
                      {entry.role}
                    </h3>
                    <span className="text-sm text-accent-2">{entry.company}</span>
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                    {entry.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 font-mono text-[11px] tracking-wide text-muted-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted-2">Education</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-[220px_1fr] sm:gap-8">
            {/* Decorative motif — abstract gradient-blob panel, not a real photo of
                either institution, since site policy rules out fetching/fabricating
                real university images. */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden overflow-hidden rounded-2xl border border-border bg-surface/60 sm:block"
            >
              <div aria-hidden className="absolute inset-0">
                <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-accent/30 blur-[80px] mix-blend-screen" />
                <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-accent-2/25 blur-[80px] mix-blend-screen" />
              </div>
              <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />
              <div className="relative flex h-full min-h-[220px] items-center justify-center">
                <GraduationCap className="h-14 w-14 text-foreground/70" strokeWidth={1} />
              </div>
            </motion.div>

            <div className="flex flex-col gap-5">
              {education.map((entry, i) => (
                <motion.div
                  key={entry.degree}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                  className="rounded-2xl border border-border bg-surface/60 p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg font-medium text-foreground sm:text-xl">
                        {entry.degree}
                      </p>
                      <p className="mt-1 text-sm text-muted">{entry.school}</p>
                    </div>
                    <span
                      className={
                        entry.status === "In progress"
                          ? "shrink-0 rounded-full border border-accent-2/30 bg-accent-2/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-accent-2"
                          : "shrink-0 rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-2"
                      }
                    >
                      {entry.status}
                    </span>
                  </div>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-2">
                    {entry.period}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
