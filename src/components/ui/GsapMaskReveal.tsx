"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

type GsapMaskRevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

/**
 * A literal masked reveal: GSAP's SplitText splits the text into lines and
 * wraps each one in its own overflow-hidden mask (via SplitText's `mask`
 * option), then each line slides up out of that mask as it scrolls into
 * view — a different technique from RevealText's per-word version, driven
 * by ScrollTrigger instead of viewport-intersection state.
 */
export default function GsapMaskReveal({ children, as: Tag = "div", className }: GsapMaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = new SplitText(ref.current, { type: "lines", mask: "lines" });
      gsap.from(split.lines, {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.09,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });

      return () => split.revert();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
