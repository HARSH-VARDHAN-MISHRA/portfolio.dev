"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Lock, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import SectionLabel from "@/components/ui/SectionLabel";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const featured = projects.filter((p) => p.variant === "featured");

/**
 * A GSAP ScrollTrigger horizontal-scroll gallery: the section pins itself,
 * and vertical scrolling drives horizontal movement across the three
 * case-study panels until the pin releases. Below the `lg` breakpoint, and
 * for prefers-reduced-motion, this never activates at all — `gsap.matchMedia`
 * skips creating the pin/scrub entirely rather than just disabling it, so
 * mobile just gets a plain vertical stack of full-width panels.
 */
export default function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="case-studies"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-border bg-background lg:h-screen"
    >
      <div ref={trackRef} className="flex flex-col lg:h-full lg:w-fit lg:flex-row">
        {featured.map((project, i) => (
          <article
            key={project.id}
            className="relative flex w-full shrink-0 flex-col justify-center overflow-hidden border-b border-border px-6 py-24 sm:px-10 lg:h-full lg:w-screen lg:border-b-0 lg:border-l"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 20%, ${project.gradient[0]}, transparent 55%), radial-gradient(circle at 80% 80%, ${project.gradient[1]}, transparent 55%)`,
              }}
            />

            <div className="relative mx-auto w-full max-w-3xl">
              <SectionLabel index={`0${i + 1}`} label="Case Study" />

              <h3 className="mt-8 max-w-2xl font-display text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.05] tracking-tight text-foreground">
                {project.title}
              </h3>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                {project.category} — {project.period}
              </p>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">{project.description}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 font-mono text-[11px] tracking-wide text-muted-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10">
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-cursor="link"
                    className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-3 text-sm text-foreground transition-colors hover:border-accent-soft/60 hover:text-accent-soft"
                  >
                    {project.linkLabel ?? "View project"}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-2">
                    <Lock className="h-4 w-4" />
                    {project.linkLabel}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
