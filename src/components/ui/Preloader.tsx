"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { site } from "@/data/site";

gsap.registerPlugin(useGSAP);

/**
 * A straightforward loading screen: a counting percentage, a filling bar,
 * then a single curtain wipes up to reveal the page. No hidden meaning to
 * decode — it's clear what's happening and when it's done.
 */
export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.delayedCall(0, () => setDone(true));
        return;
      }

      const counter = { value: 0 };
      gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: "power4.inOut",
            delay: 0.2,
            onComplete: () => setDone(true),
          });
        },
      }).to(counter, {
        value: 100,
        duration: 1.8,
        onUpdate: () => {
          const v = Math.round(counter.value);
          if (counterRef.current) counterRef.current.textContent = String(v);
          if (barRef.current) barRef.current.style.width = `${v}%`;
        },
      });
    },
    { scope: containerRef }
  );

  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
    >
      <div className="flex items-start font-display text-foreground">
        <span ref={counterRef} className="text-[clamp(3.5rem,14vw,8rem)] font-medium leading-none tabular-nums">
          0
        </span>
        <span className="mt-2 text-xl text-muted sm:mt-3 sm:text-2xl">%</span>
      </div>
      <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-2">{site.name}</p>
      <div className="mt-8 h-px w-40 overflow-hidden bg-border">
        <div ref={barRef} className="h-full bg-gradient-to-r from-accent to-accent-2" style={{ width: "0%" }} />
      </div>
    </div>
  );
}
