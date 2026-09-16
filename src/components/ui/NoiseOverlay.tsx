/**
 * A fixed, animated film-grain texture layered over the whole page.
 * Pure SVG turbulence + CSS keyframes — no images, no runtime cost beyond
 * a cheap transform animation, and it never intercepts pointer events.
 */
export default function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.035] mix-blend-soft-light"
    >
      <svg className="h-[300%] w-[300%] animate-grain" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
}
