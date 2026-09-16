import { cn } from "@/lib/utils";

type SectionLabelProps = {
  index: string;
  label: string;
  className?: string;
};

/** Small monospace eyebrow used to open every major section. */
export default function SectionLabel({ index, label, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted", className)}>
      <span className="text-accent-2">{index}</span>
      <span className="h-px w-8 bg-border-strong" />
      <span>{label}</span>
    </div>
  );
}
