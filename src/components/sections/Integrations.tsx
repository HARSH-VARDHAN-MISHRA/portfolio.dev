"use client";

import Image from "next/image";
import { integrations, type Integration } from "@/data/integrations";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import Marquee from "@/components/ui/Marquee";
import GradientAurora from "@/components/ui/GradientAurora";

/**
 * Fixed-height white tile, logo capped to a shared max-height and left to
 * scale by `object-contain` — every source file was trimmed to its tight
 * visible bounding box first (see integrations.ts), so a capped height now
 * actually produces comparable visual weight across a square app icon and a
 * wide wordmark lockup, instead of one swallowing the other in padding.
 */
function LogoTile({ item }: { item: Integration }) {
  return (
    // The heavy dark ambient shadow (`shadow-[...]`/`ring-black/5`) reads as
    // a clean lift against the site's near-black dark background, but on
    // the light theme's near-white page it just looks like a smudge under a
    // barely-visible card — `data-logo-tile` is a hook for a lighter,
    // bordered treatment scoped to `[data-theme="light"]` in globals.css.
    <div
      data-logo-tile
      className="flex h-20 items-center justify-center rounded-2xl bg-white px-8 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.45)] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-0.5"
    >
      <Image
        src={item.logo}
        alt={item.name}
        width={item.width}
        height={item.height}
        className="h-7 w-auto object-contain sm:h-8"
      />
    </div>
  );
}

export default function Integrations() {
  const mid = Math.ceil(integrations.length / 2);
  const rowA = integrations.slice(0, mid);
  const rowB = integrations.slice(mid);

  return (
    <section id="integrations" className="relative overflow-hidden border-t border-border py-28 sm:py-36">
      <GradientAurora />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10">
        <SectionLabel index="03" label="Integrations" />
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.1] tracking-tight text-foreground">
            <RevealText text="Not just listed —" />
            <br />
            <RevealText text="actually wired in." delay={0.1} />
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Every logo here is a live integration in a shipped product, not a badge collection.
          </p>
        </div>
      </div>

      <div className="relative mt-16 flex flex-col gap-6">
        <Marquee items={rowA.map((item) => <LogoTile key={item.name} item={item} />)} />
        <Marquee reverse items={rowB.map((item) => <LogoTile key={item.name} item={item} />)} />
      </div>
    </section>
  );
}
