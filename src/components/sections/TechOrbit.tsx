"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { techLogoMap } from "@/components/ui/TechLogos";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import { site } from "@/data/site";

type OrbitNode = { key: string; label: string } & (
  | { kind: "logo"; slug: keyof typeof techLogoMap }
  | { kind: "icon" }
);

const innerRing: OrbitNode[] = [
  { key: "react", kind: "logo", slug: "react", label: "React" },
  { key: "nextdotjs", kind: "logo", slug: "nextdotjs", label: "Next.js" },
  { key: "typescript", kind: "logo", slug: "typescript", label: "TypeScript" },
  { key: "tailwindcss", kind: "logo", slug: "tailwindcss", label: "Tailwind CSS" },
];

const outerRing: OrbitNode[] = [
  { key: "nodedotjs", kind: "logo", slug: "nodedotjs", label: "Node.js" },
  { key: "mongodb", kind: "logo", slug: "mongodb", label: "MongoDB" },
  { key: "mysql", kind: "logo", slug: "mysql", label: "MySQL" },
  { key: "django", kind: "logo", slug: "django", label: "Django" },
  { key: "redux", kind: "logo", slug: "redux", label: "Redux" },
  { key: "shopify", kind: "logo", slug: "shopify", label: "Shopify" },
  { key: "ai", kind: "icon", label: "AI APIs" },
  { key: "git", kind: "logo", slug: "git", label: "Git" },
  { key: "github", kind: "logo", slug: "github", label: "GitHub" },
];

function Ring({
  nodes,
  radius,
  duration,
  reverse,
  size,
}: {
  nodes: OrbitNode[];
  radius: number;
  duration: number;
  reverse?: boolean;
  size: number;
}) {
  return (
    <>
      <div
        aria-hidden
        className="absolute rounded-full border border-dashed border-border-strong/60"
        style={{
          left: "50%",
          top: "50%",
          width: `${radius * 2}%`,
          height: `${radius * 2}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {nodes.map((node, i) => {
          const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          return (
            <motion.div
              key={node.key}
              title={node.label}
              className="absolute flex items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-sm"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: size,
                height: size,
                marginLeft: -size / 2,
                marginTop: -size / 2,
              }}
              animate={{ rotate: reverse ? 360 : -360 }}
              transition={{ duration, repeat: Infinity, ease: "linear" }}
            >
              {node.kind === "logo" ? (
                <>{(() => { const Logo = techLogoMap[node.slug]; return <Logo className="h-[45%] w-[45%]" />; })()}</>
              ) : (
                <Sparkles className="h-[45%] w-[45%] text-accent-2" strokeWidth={1.75} />
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}

export default function TechOrbit() {
  return (
    <section id="tech-orbit" className="relative overflow-hidden border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionLabel index="03" label="Tools In Orbit" />
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.1] tracking-tight text-foreground">
            <RevealText text="Everything orbiting" />
            <br />
            <RevealText text="the core stack." delay={0.1} />
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            The frameworks, data layers, and integrations from the skills list above — in one
            picture.
          </p>
        </div>

        <div className="relative mx-auto mt-16 aspect-square w-full max-w-[520px]">
          <Ring nodes={innerRing} radius={26} duration={26} size={56} />
          <Ring nodes={outerRing} radius={46} duration={38} reverse size={48} />

          <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-surface font-display text-lg text-foreground shadow-lg">
            {site.initials}
          </div>
        </div>
      </div>
    </section>
  );
}
