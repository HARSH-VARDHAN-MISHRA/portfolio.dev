"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Lock, ArrowUpRight, LayoutDashboard, ShoppingBag, Layers, type LucideIcon } from "lucide-react";
import { projects, getProjectImage } from "@/data/projects";
import SectionLabel from "@/components/ui/SectionLabel";
import { TrafficLights } from "@/components/ui/ProjectCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const featured = projects.filter((p) => p.variant === "featured");

type CaseKind = "crm" | "ecommerce" | "other";

/**
 * Hand-picked badge/icon/visual `kind` per case study, rather than one
 * derived from free-text category strings (fragile to edits). Naxodent has
 * a real screenshot (see `getProjectImage`), so its `kind` only matters for
 * the badge icon — the other two still fall back to `CaseVisual`'s abstract
 * skeleton since they're private/imageless.
 */
const CASE_META: Record<string, { kind: CaseKind; badge: string; Icon: LucideIcon }> = {
  "partsklik-platform": { kind: "crm", badge: "CRM, ERP & B2B", Icon: LayoutDashboard },
  naxodent: { kind: "ecommerce", badge: "E-Commerce", Icon: ShoppingBag },
  surpriso: { kind: "other", badge: "Full-Stack Capstone", Icon: Layers },
};

/**
 * Product visual for a case study — a real screenshot when one exists
 * (`image`, e.g. Naxodent's live storefront), otherwise the same
 * browser-chrome frame (TrafficLights language shared with the Work grid)
 * around an abstract, kind-specific skeleton layout, so a private CRM
 * dashboard still reads differently from a storefront grid or a listings
 * feed at a glance.
 */
function CaseVisual({
  kind,
  gradient,
  image,
  title,
}: {
  kind: CaseKind;
  gradient: [string, string];
  image?: string;
  title: string;
}) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-surface/60 sm:aspect-[16/11]">
      {image ? (
        <Image
          src={image}
          alt={`${title} website preview`}
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover object-top"
        />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 15%, ${gradient[0]}, transparent 60%), radial-gradient(circle at 85% 85%, ${gradient[1]}, transparent 55%)`,
            }}
          />
          <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />
        </>
      )}

      <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/10 bg-black/25 px-4 py-2.5 backdrop-blur-sm">
        <TrafficLights />
        <span className="truncate pl-3 font-mono text-[10px] text-white/60">
          {image ? title.toLowerCase().replace(/\s+/g, "") + ".com" : "private.internal"}
        </span>
      </div>

      {!image && (
      <div aria-hidden className="absolute inset-0 flex items-center p-6 pt-14 sm:p-8 sm:pt-16">
        {kind === "crm" && (
          <div className="grid w-full grid-cols-3 gap-3">
            <div className="col-span-1 space-y-2.5">
              <div className="h-2 w-3/4 rounded-full bg-white/20" />
              <div className="h-2 w-1/2 rounded-full bg-white/10" />
              <div className="h-2 w-2/3 rounded-full bg-white/10" />
              <div className="h-2 w-1/2 rounded-full bg-white/10" />
              <div className="h-2 w-1/3 rounded-full bg-white/10" />
            </div>
            <div className="col-span-2 space-y-3">
              <div className="flex gap-2">
                <div className="h-12 flex-1 rounded-lg bg-white/10" />
                <div className="h-12 flex-1 rounded-lg bg-white/10" />
                <div className="h-12 flex-1 rounded-lg bg-white/10" />
              </div>
              <div className="flex h-20 items-end gap-1.5 rounded-lg bg-white/5 p-2.5">
                {[40, 65, 30, 80, 55, 90, 45, 70].map((h, idx) => (
                  <div key={idx} className="flex-1 rounded-t-sm bg-white/25" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {kind === "ecommerce" && (
          <div className="grid w-full grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="space-y-1.5 rounded-lg bg-white/5 p-2">
                <div className="aspect-square w-full rounded-md bg-white/15" />
                <div className="h-1.5 w-3/4 rounded-full bg-white/20" />
                <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        )}

        {kind === "other" && (
          <div className="w-full space-y-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                <div className="h-11 w-16 shrink-0 rounded-md bg-white/15" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-2 w-3/4 rounded-full bg-white/20" />
                  <div className="h-2 w-1/2 rounded-full bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      )}
    </div>
  );
}

/**
 * A GSAP ScrollTrigger horizontal-scroll gallery: the section pins itself,
 * and vertical scrolling drives horizontal movement across the featured
 * case-study panels until the pin releases. A progress rail tracks which
 * panel is active, and each panel's content reveals in sync with the
 * horizontal scrub via `containerAnimation` rather than just appearing.
 *
 * Below the `lg` breakpoint, and for prefers-reduced-motion, the pin/scrub
 * never activates at all — `gsap.matchMedia` skips creating it entirely
 * rather than just disabling it — so mobile gets a plain vertical stack of
 * cards with its own (much lighter) reveal-on-scroll.
 */
export default function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<Array<HTMLSpanElement | null>>([]);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const panels = gsap.utils.toArray<HTMLElement>(".case-panel", track);
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.min(featured.length - 1, Math.round(self.progress * (featured.length - 1)));
              dotsRef.current.forEach((dot, i) => {
                if (!dot) return;
                dot.classList.toggle("w-6", i === idx);
                dot.classList.toggle("bg-foreground", i === idx);
                dot.classList.toggle("w-2", i !== idx);
                dot.classList.toggle("bg-border-strong", i !== idx);
              });
            },
          },
        });

        panels.forEach((panel) => {
          gsap.fromTo(
            panel.querySelectorAll(".case-reveal"),
            { opacity: 0, y: 32 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.06,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left 75%",
                end: "left 35%",
                scrub: true,
              },
            }
          );
        });
      });

      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        panels.forEach((panel) => {
          gsap.fromTo(
            panel.querySelectorAll(".case-reveal"),
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.06,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            }
          );
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
      {/* Progress rail — mirrors which panel is currently pinned in view. */}
      <div className="pointer-events-none absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-end gap-2.5 lg:flex xl:right-10">
        {featured.map((project, i) => (
          <span
            key={project.id}
            ref={(el) => {
              dotsRef.current[i] = el;
            }}
            className={`h-2 rounded-full bg-border-strong transition-[width,background-color] duration-300 ${
              i === 0 ? "w-6 bg-foreground" : "w-2"
            }`}
          />
        ))}
      </div>

      <div ref={trackRef} className="flex flex-col lg:h-full lg:w-fit lg:flex-row">
        {featured.map((project, i) => {
          const meta = CASE_META[project.id] ?? { kind: "other" as const, badge: project.category, Icon: Layers };
          const { Icon } = meta;
          const image = getProjectImage(project);

          return (
            <article
              key={project.id}
              className="case-panel relative flex w-full shrink-0 flex-col justify-center overflow-hidden border-b border-border px-6 py-20 sm:px-10 sm:py-24 lg:h-full lg:w-screen lg:border-b-0 lg:border-l"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-6 right-4 select-none font-display text-[7rem] font-bold leading-none text-foreground/[0.035] sm:right-10 sm:text-[10rem] lg:text-[13rem]"
              >
                0{i + 1}
              </span>

              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage: `radial-gradient(circle at 15% 15%, ${project.gradient[0]}, transparent 55%), radial-gradient(circle at 85% 85%, ${project.gradient[1]}, transparent 55%)`,
                }}
              />

              <div className="relative mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
                <div className="max-w-xl">
                  <div className="case-reveal">
                    <SectionLabel index={`0${i + 1}`} label="Case Study" />
                  </div>

                  <div className="case-reveal mt-6 inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-3.5 py-1.5">
                    <Icon className="h-3.5 w-3.5 text-accent-2" strokeWidth={2} />
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">{meta.badge}</span>
                  </div>

                  <h3 className="case-reveal mt-6 font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-medium leading-[1.05] tracking-tight text-foreground">
                    {project.title}
                  </h3>
                  <p className="case-reveal mt-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-2">
                    {project.category} — {project.period}
                  </p>

                  <p className="case-reveal mt-5 text-base leading-relaxed text-muted">{project.description}</p>

                  <div className="case-reveal mt-7 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 font-mono text-[11px] tracking-wide text-muted-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="case-reveal mt-8">
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

                <div className="case-reveal">
                  <CaseVisual kind={meta.kind} gradient={project.gradient} image={image} title={project.title} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
