"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Lock } from "lucide-react";
import type { Project } from "@/data/projects";
import DistortImage from "@/components/ui/DistortImage";

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

export default function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const isFeatured = project.variant === "featured";

  return (
    <motion.button
      type="button"
      onClick={onOpen}
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
        {project.image ? (
          <>
            {/* Plain optimized image — the real content, and the fallback
                whenever WebGL is unavailable or reduced-motion is set. */}
            <Image
              src={project.image}
              alt={`${project.title} website preview`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            {/* Same image, re-fetched at the same optimized size, drawn into
                a WebGL canvas on top — invisible until it draws, so it
                degrades to the plain image above with zero extra markup. */}
            <DistortImage
              src={`/_next/image?url=${encodeURIComponent(project.image)}&w=828&q=75`}
              className="absolute inset-0 h-full w-full"
            />
          </>
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            style={{
              backgroundColor: project.gradient[0],
              backgroundImage: `radial-gradient(circle at 30% 20%, ${project.gradient[1]}55, transparent 60%), linear-gradient(135deg, ${project.gradient[0]}, color-mix(in srgb, var(--color-background) 85%, transparent) 85%)`,
            }}
          />
        )}
        {!project.image && <div className="absolute inset-0 bg-grid opacity-30" />}
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
