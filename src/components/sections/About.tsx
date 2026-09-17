"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { site } from "@/data/site";
import SectionLabel from "@/components/ui/SectionLabel";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const facts = [
  { label: "Based in", value: site.location },
  { label: "Currently", value: "Frontend Developer @ Partsklik LLP" },
  { label: "Studying", value: `${site.education.current.degree}, ${site.education.current.school}` },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!headingRef.current) return;

      const mm = gsap.matchMedia();

      /**
       * Everything here — the line mask-in and the word-by-word color scrub —
       * only ever runs when motion is allowed. Under reduced motion this
       * `mm.add` block simply never executes, so the heading is left exactly
       * as authored: full-opacity, full-color, no split markup, no JS-driven
       * state to get stuck mid-transition.
       */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = new SplitText(headingRef.current, { type: "lines, words", mask: "lines" });
        const scrubWords = split.words.filter((word) => !word.closest(".text-gradient"));

        gsap.from(split.lines, {
          yPercent: 110,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.09,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            once: true,
          },
        });

        gsap.set(scrubWords, { color: "var(--color-muted)", opacity: 0.4 });
        gsap.to(scrubWords, {
          color: "var(--color-foreground)",
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "bottom 45%",
            scrub: true,
          },
        });

        return () => split.revert();
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id="about" ref={sectionRef} className="relative border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionLabel index="01" label="About" />

        <h2
          ref={headingRef}
          className="mt-10 max-w-3xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.1] tracking-tight text-foreground"
        >
          I started by building small-business websites.
          <br />
          Three years later, I own the{" "}
          <span className="text-gradient">frontend of enterprise CRM, ERP &amp; e-commerce</span> platforms
          <br />
          — and I&rsquo;m back in school for my Master&rsquo;s.
        </h2>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
          These days that means shipping the order management, warehouse &amp; dispatch tooling, and Shopify
          storefronts that Partsklik LLP runs on — while finishing my Master&rsquo;s on the side.
        </p>

        <dl className="mt-16 grid grid-cols-1 gap-8 border-t border-border pt-10 sm:grid-cols-3">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              <dt className="font-mono text-xs uppercase tracking-[0.15em] text-muted-2">{fact.label}</dt>
              <dd className="mt-2 text-lg text-foreground">{fact.value}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
