"use client";

import { useMemo, useState } from "react";
import { projects, type Project } from "@/data/projects";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import ProjectCard, { type CardOrigin } from "@/components/ui/ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";

// The three big case studies get their own horizontal-scroll section —
// this grid is the rest of the shipped client work.
const clientWork = projects.filter((p) => p.variant === "compact");

const ALL_FILTER = "All";

export default function Work() {
  const [active, setActive] = useState<Project | null>(null);
  const [origin, setOrigin] = useState<CardOrigin | null>(null);
  const [filter, setFilter] = useState<string>(ALL_FILTER);

  // Pills are derived straight from each project's `category` — the site
  // owner keeps adding new client sites over time, so new categories show up
  // as filter options automatically with zero extra wiring.
  const filters = useMemo(
    () => [ALL_FILTER, ...Array.from(new Set(clientWork.map((p) => p.category)))],
    []
  );

  const visibleWork =
    filter === ALL_FILTER ? clientWork : clientWork.filter((p) => p.category === filter);

  const openProject = (project: Project, cardOrigin: CardOrigin) => {
    setOrigin(cardOrigin);
    setActive(project);
  };

  return (
    <section id="work" className="relative border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionLabel index="05" label="More Work" />
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.1] tracking-tight text-foreground">
            <RevealText text="Real client sites," />
            <br />
            <RevealText text="shipped and live." delay={0.1} />
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Click any tile for a full preview and a link to the live site.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => {
            const isActive = f === filter;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={isActive}
                className={`rounded-full border px-3 py-1 font-mono text-[11px] tracking-wide transition-colors duration-200 ${
                  isActive
                    ? "border-accent-soft/60 bg-accent-soft/10 text-foreground"
                    : "border-border text-muted-2 hover:border-border-strong hover:text-foreground"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleWork.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={(cardOrigin) => openProject(project, cardOrigin)}
            />
          ))}
        </div>
      </div>

      {active && (
        <ProjectModal
          key={active.id}
          project={active}
          origin={origin}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
}
