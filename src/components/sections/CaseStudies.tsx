"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Lock, ArrowRight, LayoutDashboard, ShoppingBag, Layers, type LucideIcon } from "lucide-react";
import { projects, getProjectImage, type Project } from "@/data/projects";
import SectionLabel from "@/components/ui/SectionLabel";
import { TrafficLights } from "@/components/ui/ProjectCard";

// Only the Partsklik platform suite is a real single-project deep-dive —
// it's the one entry that's still `variant: "featured"`. The other two
// case-study slots are category roll-ups (below) so they scale as more
// client sites get added, instead of pinning the spotlight on one project.
const singleCase = projects.find((p) => p.id === "partsklik-platform")!;

type CaseKind = "crm" | "ecommerce" | "other";

/**
 * A category roll-up: instead of one project, it references a handful of
 * real (already-shipped) compact projects by id and shows their actual
 * screenshots as a small gallery — so "E-Commerce" or "Business Websites"
 * reads as a practice area, not a single client name, and absorbs new
 * client sites over time without needing its own new case study.
 */
type CategoryCase = {
  id: string;
  badge: string;
  kind: CaseKind;
  Icon: LucideIcon;
  title: string;
  category: string;
  period: string;
  description: string;
  tags: string[];
  projectIds: string[];
  ctaLabel: string;
};

const categoryCases: CategoryCase[] = [
  {
    id: "ecommerce-category",
    badge: "E-Commerce",
    kind: "ecommerce",
    Icon: ShoppingBag,
    title: "Shopify Storefronts",
    category: "Shopify · Partsklik LLP",
    period: "2024",
    description:
      "Shopify storefronts built as part of Partsklik's multi-channel commerce integration — from automotive parts to lifestyle brands, each store plugs into the same central catalog and order sync, with Razorpay wired in for payments.",
    tags: ["Shopify", "E-Commerce", "Razorpay"],
    projectIds: ["german-purje", "turbowale"],
    ctaLabel: "Browse Shopify stores",
  },
  {
    id: "business-category",
    badge: "Business Websites",
    kind: "other",
    Icon: Layers,
    title: "Business & Service Websites",
    category: "Business Websites · Multiple Clients",
    period: "2024 — 2025",
    description:
      "Marketing sites, service bookings, and enquiry-driven sites for real businesses — from plain HTML/CSS/JS to Next.js and PHP, each one shipped fast and built to turn visitors into leads.",
    tags: ["Next.js", "JavaScript", "PHP"],
    projectIds: ["cleanzo-laundry", "surjeet-india", "zapioev"],
    ctaLabel: "Browse business sites",
  },
];

/**
 * Product visual for the single deep-dive case study — a browser-chrome
 * frame (TrafficLights language shared with the Work grid) around an
 * abstract, kind-specific skeleton layout, since Partsklik is a private
 * system with no public screenshot.
 */
function CaseVisual({ kind, gradient }: { kind: CaseKind; gradient: [string, string] }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-surface/60 sm:aspect-[16/11]">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 15%, ${gradient[0]}, transparent 60%), radial-gradient(circle at 85% 85%, ${gradient[1]}, transparent 55%)`,
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/10 bg-black/25 px-4 py-2.5 backdrop-blur-sm">
        <TrafficLights />
        <span className="truncate pl-3 font-mono text-[10px] text-white/60">private.internal</span>
      </div>

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
      </div>
    </div>
  );
}

/**
 * A category case study's visual: the same overall browser-chrome frame and
 * bounding box as `CaseVisual` (so all three panels carry the same visual
 * weight), with a real-screenshot collage inside instead of one hero image —
 * 2 references sit side by side; a 3rd, odd one out gets a bigger primary
 * tile with the other two stacked beside it, like an editorial photo grid
 * rather than three equal, disconnected squares.
 */
function CategoryVisual({ projectIds, chromeLabel }: { projectIds: string[]; chromeLabel: string }) {
  const items = projectIds
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p));

  return (
    <div className="relative flex aspect-[4/3] w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/60 sm:aspect-[16/11]">
      <div className="flex items-center justify-between border-b border-white/10 bg-black/25 px-4 py-2.5 backdrop-blur-sm">
        <TrafficLights />
        <span className="truncate pl-3 font-mono text-[10px] text-white/60">{chromeLabel}</span>
      </div>

      <div className={`grid flex-1 gap-1 ${items.length >= 3 ? "grid-cols-2 grid-rows-2" : "grid-cols-2"}`}>
        {items.map((item, idx) => {
          const isPrimary = items.length >= 3 && idx === 0;
          const image = getProjectImage(item);
          return (
            <div
              key={item.id}
              className={`group/thumb relative overflow-hidden ${isPrimary ? "row-span-2" : ""}`}
            >
              {image && (
                <Image
                  src={image}
                  alt={`${item.title} website preview`}
                  fill
                  sizes="(max-width: 1024px) 50vw, 22vw"
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover/thumb:scale-[1.06]"
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent transition-opacity duration-300 group-hover/thumb:opacity-80" />
              <span className="absolute inset-x-0 bottom-0 truncate p-2.5 font-mono text-[10px] uppercase tracking-wide text-white/90 sm:p-3">
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const revealProps = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative overflow-hidden border-t border-border bg-background">
      <motion.article {...revealProps} className="relative flex flex-col overflow-hidden border-b border-border px-6 py-20 sm:px-10 sm:py-24">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-6 right-4 select-none font-display text-[7rem] font-bold leading-none text-foreground/[0.035] sm:right-10 sm:text-[10rem] lg:text-[13rem]"
        >
          01
        </span>

        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(circle at 15% 15%, ${singleCase.gradient[0]}, transparent 55%), radial-gradient(circle at 85% 85%, ${singleCase.gradient[1]}, transparent 55%)`,
          }}
        />

        <div className="relative mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="max-w-xl">
            <SectionLabel index="01" label="Case Study" />

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-3.5 py-1.5">
              <LayoutDashboard className="h-3.5 w-3.5 text-accent-2" strokeWidth={2} />
              <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">CRM, ERP &amp; B2B</span>
            </div>

            <h3 className="mt-6 font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-medium leading-[1.05] tracking-tight text-foreground">
              {singleCase.title}
            </h3>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-2">
              {singleCase.category} — {singleCase.period}
            </p>

            <p className="mt-5 text-base leading-relaxed text-muted">{singleCase.description}</p>

            <div className="mt-7 flex flex-wrap gap-2">
              {singleCase.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[11px] tracking-wide text-muted-2"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-2">
                <Lock className="h-4 w-4" />
                {singleCase.linkLabel}
              </span>
            </div>
          </div>

          <CaseVisual kind="crm" gradient={singleCase.gradient} />
        </div>
      </motion.article>

      {categoryCases.map((item, i) => {
        const panelIndex = i + 1;
        return (
          <motion.article
            key={item.id}
            {...revealProps}
            className="relative flex flex-col overflow-hidden border-b border-border px-6 py-20 last:border-none sm:px-10 sm:py-24"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-6 right-4 select-none font-display text-[7rem] font-bold leading-none text-foreground/[0.035] sm:right-10 sm:text-[10rem] lg:text-[13rem]"
            >
              0{panelIndex + 1}
            </span>

            <div aria-hidden className="absolute inset-0 bg-grid opacity-[0.04]" />

            <div className="relative mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
              <div className="max-w-xl">
                <SectionLabel index={`0${panelIndex + 1}`} label="Case Study" />

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-3.5 py-1.5">
                  <item.Icon className="h-3.5 w-3.5 text-accent-2" strokeWidth={2} />
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">{item.badge}</span>
                </div>

                <h3 className="mt-6 font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-medium leading-[1.05] tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-2">
                  {item.category} — {item.period}
                </p>

                <p className="mt-5 text-base leading-relaxed text-muted">{item.description}</p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[11px] tracking-wide text-muted-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8">
                  <a
                    href="#work"
                    data-cursor="link"
                    className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-3 text-sm text-foreground transition-colors hover:border-accent-soft/60 hover:text-accent-soft"
                  >
                    {item.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <CategoryVisual projectIds={item.projectIds} chromeLabel={`${item.projectIds.length} live sites`} />
            </div>
          </motion.article>
        );
      })}
    </section>
  );
}
