"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, MapPin, Building2 } from "lucide-react";
import { site } from "@/data/site";
import { GithubLogo } from "@/components/ui/TechLogos";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";

type GithubProfile = {
  name: string;
  bio: string;
  location: string;
  company: string;
  avatar_url: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
};

// Real values fetched live from GitHub's public API on mount, seeded with
// the actual profile at the time this was written so there's never an empty
// flash — and a safe fallback if the API is rate-limited (it's public and
// unauthenticated, so it occasionally is).
const FALLBACK: GithubProfile = {
  name: "Harsh Vardhan Mishra",
  bio: "Hi there! 👋 I'm Harsh Vardhan Mishra, a dedicated Mern Stack Web Developer with a flair for creating dynamic and user-centric web solutions.",
  location: "New Delhi, India",
  company: "Partsklik LLP",
  avatar_url: "https://avatars.githubusercontent.com/u/138967484?v=4",
  public_repos: 74,
  public_gists: 0,
  followers: 11,
  following: 12,
  created_at: "2023-07-08T07:29:38Z",
};

export default function GithubStats() {
  const [profile, setProfile] = useState(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    fetch("https://api.github.com/users/HARSH-VARDHAN-MISHRA")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (cancelled) return;
        setProfile({
          name: data.name ?? FALLBACK.name,
          bio: (data.bio ?? FALLBACK.bio).trim(),
          location: (data.location ?? FALLBACK.location).replace(/\s*,\s*/g, ", "),
          company: data.company ?? FALLBACK.company,
          avatar_url: data.avatar_url ?? FALLBACK.avatar_url,
          public_repos: data.public_repos ?? FALLBACK.public_repos,
          public_gists: data.public_gists ?? FALLBACK.public_gists,
          followers: data.followers ?? FALLBACK.followers,
          following: data.following ?? FALLBACK.following,
          created_at: data.created_at ?? FALLBACK.created_at,
        });
      })
      .catch(() => {
        // Keep the fallback.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const memberSince = new Date(profile.created_at).getFullYear();

  const tiles = [
    { label: "Public repos", value: profile.public_repos },
    { label: "Followers", value: profile.followers },
    { label: "Following", value: profile.following },
    { label: "On GitHub since", value: memberSince },
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

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex flex-col gap-5 rounded-2xl border border-border bg-surface/60 p-6 sm:flex-row sm:items-center sm:p-8"
        >
          {/* Plain <img>, not next/image: it's a small avatar fetched from a
              third-party API at runtime, already served off GitHub's own
              CDN — not worth requiring a next.config.ts remotePatterns entry
              (and the server restart that entails) just to re-optimize it. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatar_url}
            alt={`${profile.name}'s GitHub avatar`}
            width={88}
            height={88}
            className="h-16 w-16 shrink-0 rounded-2xl border border-border-strong sm:h-20 sm:w-20"
          />
          <div>
            <p className="font-display text-lg font-medium text-foreground sm:text-xl">{profile.name}</p>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">{profile.bio}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-2">
              {profile.location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
                  {profile.location}
                </span>
              )}
              {profile.company && (
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                  {profile.company}
                </span>
              )}
            </div>
          </div>
        </motion.div>

        <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-surface/60 p-6 sm:p-8"
            >
              <div className="font-display text-3xl font-medium text-foreground sm:text-5xl">
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
