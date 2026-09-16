import { cn } from "@/lib/utils";

type GradientAuroraProps = {
  className?: string;
};

/**
 * Soft, slow-drifting color blobs used behind hero/section content.
 * Pure CSS (blur + mix-blend-screen) — no canvas/WebGL cost.
 */
export default function GradientAurora({ className }: GradientAuroraProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        data-aurora
        className="animate-float absolute -left-40 top-[-10%] h-[520px] w-[520px] rounded-full bg-accent/30 blur-[140px] mix-blend-screen"
      />
      <div
        data-aurora
        className="animate-float absolute right-[-15%] top-[15%] h-[460px] w-[460px] rounded-full bg-accent-2/20 blur-[140px] mix-blend-screen"
        style={{ animationDelay: "-2s" }}
      />
      <div
        data-aurora
        className="animate-float absolute bottom-[-15%] left-[20%] h-[420px] w-[420px] rounded-full bg-warn/10 blur-[150px] mix-blend-screen"
        style={{ animationDelay: "-4s" }}
      />
    </div>
  );
}
