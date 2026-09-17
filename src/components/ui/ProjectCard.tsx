"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Lock } from "lucide-react";
import { getProjectImage, type Project } from "@/data/projects";

/**
 * The little red/yellow/green window controls used on every preview tile
 * and the modal. Always a <span> — never a real <button> — since the grid
 * tile itself is a <button>, and nested buttons are invalid HTML.
 */
export function TrafficLights({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        role={onClose ? "button" : undefined}
        aria-label={onClose ? "Close" : undefined}
        onClick={
          onClose
            ? (e) => {
                e.stopPropagation();
                onClose();
              }
            : undefined
        }
        className="h-3 w-3 rounded-full bg-[#ff5f57] transition-transform hover:scale-110"
        style={{ cursor: onClose ? "pointer" : "default" }}
        tabIndex={onClose ? 0 : -1}
      />
      <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
      <span className="h-3 w-3 rounded-full bg-[#28c840]" />
    </div>
  );
}

/** Viewport coordinates of the click that opened the modal — used to anchor
 * the "genie" open animation to where the card actually was. */
export type CardOrigin = { x: number; y: number };

export default function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (origin: CardOrigin) => void;
}) {
  const isFeatured = project.variant === "featured";
  const image = getProjectImage(project);

  return (
    <motion.button
      type="button"
      onClick={(e) => onOpen({ x: e.clientX, y: e.clientY })}
      data-cursor="link"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-border bg-surface/60 text-left transition-colors duration-300 hover:border-border-strong"
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: isFeatured ? "16 / 11" : "16 / 12" }}
      >
        {image ? (
          // Plain optimized image. On hover it slowly pans from the top of
          // the real screenshot down to the bottom (object-position is an
          // animatable CSS property), so hovering previews the whole
          // homepage instead of freezing on the top slice forever. The pan
          // itself is gated behind `motion-safe` — reduced-motion visitors
          // just see the static top crop, same as before.
          <Image
            src={image}
            alt={`${project.title} website preview`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top brightness-95 transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:brightness-100 motion-safe:group-hover:object-bottom motion-safe:group-hover:duration-[6000ms] motion-safe:group-hover:ease-linear"
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            style={{
              backgroundColor: project.gradient[0],
              backgroundImage: `radial-gradient(circle at 30% 20%, ${project.gradient[1]}55, transparent 60%), linear-gradient(135deg, ${project.gradient[0]}, color-mix(in srgb, var(--color-background) 85%, transparent) 85%)`,
            }}
          />
        )}
        {!image && <div className="absolute inset-0 bg-grid opacity-30" />}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/10" />

        <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/10 bg-black/25 px-4 py-2.5 backdrop-blur-sm">
          <TrafficLights />
          <span className="truncate pl-3 font-mono text-[10px] text-white/70">{project.title}</span>
        </div>

        {!isFeatured && (
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="font-display text-lg font-medium text-white drop-shadow-sm">
              {project.title}
            </p>
          </div>
        )}

        {project.href === undefined && (
          <div className="absolute right-3 top-11 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white/90 backdrop-blur-sm">
            <Lock className="h-3.5 w-3.5" strokeWidth={2} />
          </div>
        )}
      </div>

      {isFeatured && (
        <div className="flex flex-col gap-3 p-6 sm:p-7">
          <div>
            <h3 className="font-display text-xl font-medium text-foreground sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
              {project.category}
            </p>
          </div>
          <p className="text-sm leading-relaxed text-muted">{project.description}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 font-mono text-[11px] tracking-wide text-muted-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.button>
  );
}
