"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { site } from "@/data/site";
import { GithubLogo } from "@/components/ui/TechLogos";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";

// Real numbers fetched live from GitHub's public API on mount, seeded with
// the actual values at the time this was written so there's never an empty
// flash — and a safe fallback if the API is rate-limited.
const FALLBACK = { public_repos: 73, followers: 11, following: 12 };

export default function GithubStats() {
  const [stats, setStats] = useState(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.github.com/users/HARSH-VARDHAN-MISHRA")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (!cancelled) {
          setStats({
            public_repos: data.public_repos ?? FALLBACK.public_repos,
            followers: data.followers ?? FALLBACK.followers,
            following: data.following ?? FALLBACK.following,
          });
        }
      })
      .catch(() => {
        // Keep the fallback — the API is public and unauthenticated, so it
        // occasionally rate-limits.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const tiles = [
    { label: "Public repos", value: stats.public_repos },
    { label: "Followers", value: stats.followers },
    { label: "Following", value: stats.following },
  ];

  return (
    <section id="open-source" className="relative border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionLabel index="08" label="Open Source" />
        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.1] tracking-tight text-foreground">
            <RevealText text="Live from GitHub," />
            <br />
            <RevealText text="not a screenshot." delay={0.1} />
          </h2>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="link"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm text-foreground transition-colors hover:border-accent-soft/60 hover:text-accent-soft"
          >
            <GithubLogo className="h-4 w-4" />
            @HARSH-VARDHAN-MISHRA
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-surface/60 p-8"
            >
              <div className="font-display text-4xl font-medium text-foreground sm:text-5xl">
                {tile.value}
              </div>
              <div className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-2">
                {tile.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
