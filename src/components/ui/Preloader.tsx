"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { site } from "@/data/site";

gsap.registerPlugin(useGSAP);

const BAR_COUNT = 12;
const LOAD_DURATION = 2.1;

/**
 * A radial "chasing pulse" loader — 12 bars arranged like clock ticks, each
 * lighting up in sequence around the ring so the pulse appears to travel in
 * a loop. Same flow as the familiar Netflix spinner, rebuilt from scratch
 * with this site's own accent color rather than reusing any of their brand
 * assets. A single curtain wipes up to reveal the page once it's done.
 */
export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<Array<HTMLSpanElement | null>>([]);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.delayedCall(0, () => setDone(true));
        return;
      }

      gsap.to(barsRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.08,
          from: 0,
        },
      });

      gsap.delayedCall(LOAD_DURATION, () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          onComplete: () => setDone(true),
        });
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
      <div className="relative h-16 w-16">
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <span
            key={i}
            className="absolute inset-0"
            style={{ transform: `rotate(${(i * 360) / BAR_COUNT}deg)` }}
          >
            <span
              ref={(el) => {
                barsRef.current[i] = el;
              }}
              className="absolute left-1/2 top-0 h-[22%] w-[9%] -translate-x-1/2 scale-50 rounded-full bg-accent opacity-20"
            />
          </span>
        ))}
      </div>
      <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-muted-2">{site.name}</p>
    </div>
  );
}
