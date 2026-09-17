"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ExternalLink, Lock } from "lucide-react";
import { getProjectImage, type Project } from "@/data/projects";
import { TrafficLights, type CardOrigin } from "@/components/ui/ProjectCard";

// A macOS-Dock "genie" reads as originating from a point, with a brief
// non-uniform squash/stretch rather than a uniform scale. We don't do a full
// shared-element FLIP transition — that, combined with AnimatePresence's
// exit-removal, proved unreliable in testing — but anchoring `transformOrigin`
// to the clicked card (see `origin` prop below) and giving scaleY its own
// slightly bouncier timing than scaleX gets close enough to read as "genie-ish"
// while staying simple and reliable.
const genieOpen = {
  default: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  scaleY: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const },
  scaleX: { duration: 0.38, ease: [0.34, 1.15, 0.64, 1] as const },
};
const genieClose = { duration: 0.2, ease: "easeIn" as const };
const CLOSE_MS = 220; // slightly longer than genieClose, so the fade is never cut off

export default function ProjectModal({
  project,
  origin,
  onClose,
}: {
  project: Project;
  /** Viewport coordinates of the card click that opened this modal — used
   * to anchor the genie animation's transform-origin. Optional so the modal
   * still works (falling back to a centered scale) without it. */
  origin?: CardOrigin | null;
  onClose: () => void;
}) {
  // Starts true so Motion's initial→animate transition plays the "open"
  // animation on mount by itself — no effect-driven state kickoff needed.
  const [visible, setVisible] = useState(true);
  const image = getProjectImage(project);

  const panelRef = useRef<HTMLDivElement>(null);
  const [transformOrigin, setTransformOrigin] = useState("50% 50%");

  // Runs before paint, so the panel's very first frame already scales from
  // the right spot instead of snapping to it a frame later.
  useLayoutEffect(() => {
    if (!origin || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    setTransformOrigin(`${origin.x - rect.left}px ${origin.y - rect.top}px`);
  }, [origin]);

  const requestClose = () => {
    setVisible(false);
    // A plain timer (not onAnimationComplete) actually unmounts this modal —
    // reliable regardless of animation-callback timing.
    setTimeout(onClose, CLOSE_MS);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && requestClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={visible ? { duration: 0.25 } : genieClose}
      onClick={requestClose}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md sm:p-10"
    >
      <motion.div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scaleX: 0.6, scaleY: 0.4 }}
        animate={
          visible
            ? { opacity: 1, scaleX: 1, scaleY: 1 }
            : { opacity: 0, scaleX: 0.75, scaleY: 0.55 }
        }
        transition={visible ? genieOpen : genieClose}
        style={{ transformOrigin }}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-2xl"
      >
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: image ? "16 / 10" : "16 / 9" }}>
          {image ? (
            <Image
              src={image}
              alt={`${project.title} website preview`}
              fill
              sizes="640px"
              className="object-cover object-top"
            />
          ) : (
            <>
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: project.gradient[0],
                  backgroundImage: `radial-gradient(circle at 30% 20%, ${project.gradient[1]}55, transparent 60%), linear-gradient(135deg, ${project.gradient[0]}, color-mix(in srgb, var(--color-background) 85%, transparent) 85%)`,
                }}
              />
              <div className="absolute inset-0 bg-grid opacity-30" />
            </>
          )}

          <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/10 bg-black/30 px-4 py-2.5 backdrop-blur-sm">
            <TrafficLights onClose={requestClose} />
            <span className="truncate pl-3 font-mono text-[11px] text-white/80">{project.title}</span>
          </div>

          {project.href === undefined && (
            <div className="absolute right-4 top-14 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white/90 backdrop-blur-sm">
              <Lock className="h-4 w-4" strokeWidth={2} />
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
          transition={{ duration: 0.4, delay: visible ? 0.15 : 0, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4 p-6 sm:p-8"
        >
          <div>
            <h3 className="font-display text-2xl font-medium text-foreground sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted">
              {project.category} — {project.period}
            </p>
          </div>

          <p className="text-sm leading-relaxed text-muted">{project.description}</p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[11px] tracking-wide text-muted-2"
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="link"
                className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-4 py-2 text-sm text-foreground transition-colors hover:border-accent-soft/60 hover:text-accent-soft"
              >
                {project.linkLabel ?? "View project"}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-2">
                <Lock className="h-3.5 w-3.5" />
                {project.linkLabel}
              </span>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
