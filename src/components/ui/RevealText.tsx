"use client";

import { motion } from "motion/react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";

type RevealTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
};

/**
 * Splits `text` into words and reveals them with a clipped upward slide,
 * staggered per word. Triggers once the element scrolls into view.
 */
export default function RevealText({
  text,
  as: Tag = "span",
  className,
  stagger = 0.045,
  delay = 0,
  once = true,
}: RevealTextProps) {
  const words = text.split(" ");

  return (
    <Tag className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.15em] pr-[0.28em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once, margin: "-10% 0px" }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * stagger,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
