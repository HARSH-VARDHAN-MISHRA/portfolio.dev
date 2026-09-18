// Real logo files under /public/logos — the actual commerce, payments,
// logistics, AI, and infrastructure providers wired into shipped products
// (see Specialties and Experience for the specifics). Kept separate from
// `specialties.ts`: this is a pure visual credibility strip, not the
// "what each tool does" pitch.
//
// Every file has been trimmed to its tight visible bounding box (the
// originals had wildly inconsistent internal padding — e.g. Gemini's actual
// logo was ~65px tall inside a 320x320 canvas — which is what made them
// render at such different sizes even at the same CSS height). `width`/
// `height` below are each file's real trimmed aspect ratio, passed to
// next/image so it reserves the correct box instead of a generic default.
export type Integration = {
  name: string;
  logo: string;
  width: number;
  height: number;
};

export const integrations: Integration[] = [
  { name: "Shopify", logo: "/logos/shopify.png", width: 3782, height: 1088 },
  { name: "Razorpay", logo: "/logos/razorpay.webp", width: 512, height: 111 },
  { name: "Porter", logo: "/logos/porter.webp", width: 518, height: 86 },
  { name: "Bluedart", logo: "/logos/bluedart.png", width: 3011, height: 450 },
  { name: "Shiprocket", logo: "/logos/shiprocket.png", width: 280, height: 70 },
  { name: "OpenAI", logo: "/logos/openai.png", width: 1798, height: 489 },
  { name: "Gemini", logo: "/logos/logo-google-gemini.png", width: 288, height: 65 },
  { name: "Perplexity", logo: "/logos/perplexity-logo.png", width: 1161, height: 281 },
  { name: "Interakt", logo: "/logos/Interakt.png", width: 3486, height: 888 },
  { name: "Synology", logo: "/logos/synology-logo.png", width: 1162, height: 297 },
];
