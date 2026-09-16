import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type MarqueeProps = {
  items: ReactNode[];
  className?: string;
  reverse?: boolean;
};

/** An infinite horizontal ticker — duplicates its items once for a seamless loop. */
export default function Marquee({ items, className, reverse }: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      {[0, 1].map((dupe) => (
        <div
          key={dupe}
          aria-hidden={dupe === 1}
          className={cn(
            "flex shrink-0 items-center gap-10 pr-10 [animation-play-state:running] group-hover:[animation-play-state:paused]",
            reverse ? "animate-marquee [animation-direction:reverse]" : "animate-marquee"
          )}
        >
          {items.map((item, i) => (
            <div key={i} className="shrink-0">
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
