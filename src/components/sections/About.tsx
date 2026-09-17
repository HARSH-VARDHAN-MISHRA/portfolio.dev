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
       * The per-line mask reveal below only ever runs when motion is
       * allowed. Under reduced motion this `mm.add` block simply never
       * executes, so the heading is left exactly as authored: full-opacity,
       * no split markup, no JS-driven state to get stuck mid-transition.
       */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!headingRef.current) return;

        // A SECOND SplitText call (e.g. `type: "words"`) on top of an
        // already `mask: "lines"`-split element corrupts the existing line
        // structure — every word ends up back-detected as its own separate
        // "line" (confirmed empirically). So this stays a single split —
        // one clean per-line reveal, rather than layering a second
        // scroll-scrubbed color pass on top that fought the reveal's own
        // timing and read as janky/half-finished.
        const lineSplit = new SplitText(headingRef.current, { type: "lines", mask: "lines" });

        gsap.from(lineSplit.lines, {
          yPercent: 115,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            once: true,
          },
        });

        return () => lineSplit.revert();
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
