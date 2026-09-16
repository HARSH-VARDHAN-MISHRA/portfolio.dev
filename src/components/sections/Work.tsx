"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/projects";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import ProjectCard from "@/components/ui/ProjectCard";
import ProjectModal from "@/components/ui/ProjectModal";

// The three big case studies get their own horizontal-scroll section —
// this grid is the rest of the shipped client work.
const clientWork = projects.filter((p) => p.variant === "compact");

export default function Work() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="relative border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionLabel index="04" label="More Work" />
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

        <div className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {clientWork.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={() => setActive(project)} />
          ))}
        </div>
      </div>

      {active && (
        <ProjectModal key={active.id} project={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
