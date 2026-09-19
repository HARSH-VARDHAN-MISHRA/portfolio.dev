"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { site } from "@/data/site";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";

const facts = [
  site.location,
  "Frontend Developer @ Partsklik LLP",
  `${site.education.current.degree} (in progress)`,
];

export default function About() {
  return (
    <section id="about" className="relative border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionLabel index="01" label="About" />

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <div>
            <h2 className="max-w-xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.1] tracking-tight text-foreground">
              <RevealText text="I don’t just build screens." />
              <br />
              <RevealText text="I build" delay={0.15} />
              <br />
              <span className="text-gradient">
                <RevealText text="the systems behind them." delay={0.3} />
              </span>
            </h2>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted">
              I&rsquo;m the <strong className="font-semibold text-foreground">frontend engineer</strong>{" "}
              behind Partsklik&rsquo;s <strong className="font-semibold text-foreground">CRM/ERP suite</strong>{" "}
              — the order pipelines, the warehouse &amp; dispatch dashboards, the Shopify and Razorpay
              checkouts, and the{" "}
              <strong className="font-semibold text-foreground">WhatsApp and OCR automation</strong> that
              let AI models act directly inside the system.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              Most of what I ship never has a public URL. It&rsquo;s the layer the business actually
              runs through, which suits me fine —{" "}
              <strong className="font-semibold text-foreground">correctness and uptime</strong> get judged
              here, not just pixels.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-6 font-mono text-xs text-muted-2">
              {facts.map((fact, i) => (
                <span key={fact} className="flex items-center gap-3">
                  {i > 0 && <span className="text-border-strong">·</span>}
                  {fact}
                </span>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-[420px] lg:mx-0 lg:max-w-none"
          >
            <div
              aria-hidden
              className="absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(circle,var(--color-accent),var(--color-accent-2)_55%,transparent_75%)] opacity-25 blur-3xl"
            />
            <Image
              src={site.portraitSrc}
              alt="Portrait of Harshvardhan Mishra"
              width={760}
              height={748}
              sizes="(max-width: 1024px) 60vw, 40vw"
              draggable={false}
              className="relative z-10 h-auto w-full select-none"
              style={{
                maskImage: "linear-gradient(to bottom, black 82%, transparent 99%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 82%, transparent 99%)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
