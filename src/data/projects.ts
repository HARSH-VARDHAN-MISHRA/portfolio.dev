// Real projects only. "featured" gets full case-study detail; "compact" is
// for the client-site tiles — both open the same detail modal.
//
// The Partsklik entry matches the 2026 resume's "Key Impact" line: 4
// CRM/ERP & B2B platforms — 3 internal CRMs (Partsklik, Kuber TurboTech,
// Partsklik Plus) plus Kuber TurboTech's own multi-tenant retailer
// ordering portal, counted as the 4th.
// Live client sites use real screenshots captured from the actual URLs.

export type Project = {
  id: string;
  variant: "featured" | "compact";
  title: string;
  period: string;
  category: string;
  description: string;
  tags: string[];
  href?: string;
  linkLabel?: string;
  /**
   * Real screenshot path. Only needed when it deviates from the standard
   * `/projects/${id}.png` convention every "compact" entry follows — use
   * `getProjectImage(project)` to read it instead of `project.image`
   * directly. "featured" entries intentionally have no screenshot and fall
   * back to the gradient tile / CaseStudies' own hand-picked visual.
   */
  image?: string;
  gradient: [string, string];
};

/**
 * Every "compact" (client-site) entry's screenshot lives at
 * `/projects/${id}.png` — that's the whole convention, so new entries don't
 * need to repeat it. Set `image` explicitly only when a project's screenshot
 * deviates from that path. "featured" entries stay imageless.
 */
export function getProjectImage(project: Project): string | undefined {
  if (project.image) return project.image;
  return project.variant === "compact" ? `/projects/${project.id}.png` : undefined;
}

export const projects: Project[] = [
  {
    id: "partsklik-platform",
    variant: "featured",
    title: "Enterprise CRM/ERP & B2B Platform Suite",
    period: "2024 — Present",
    category: "CRM, ERP & B2B · Partsklik LLP",
    description:
      "Frontend for 4 CRM/ERP & B2B platforms — Partsklik, Kuber TurboTech, and Partsklik Plus, plus Kuber TurboTech's own multi-tenant B2B ordering portal for regional retail stores. Covers the full order lifecycle: enquiries, proforma invoicing, inventory, warehouse ops, and dispatch. Shopify (2 stores) + Razorpay for commerce, Porter/Bluedart/Shiprocket for logistics tracking, and OpenAI/Gemini/Perplexity for OCR and WhatsApp automation — all real-time over WebSockets.",
    tags: ["React.js", "Next.js", "Shopify API", "Razorpay", "OpenAI", "WebSockets"],
    linkLabel: "Private client system",
    gradient: ["#6D5EF9", "#22D3EE"],
  },
  {
    id: "surpriso",
    variant: "featured",
    title: "Surpriso",
    period: "2024",
    category: "Academic Capstone · IGNOU BCA",
    description:
      "A full-stack e-commerce application built as a BCA capstone project — separate admin panel, backend server, and customer-facing storefront.",
    tags: ["JavaScript", "Node.js", "Full Stack"],
    href: "https://github.com/HARSH-VARDHAN-MISHRA/Surpriso_IGNOU_PROJECT",
    linkLabel: "View on GitHub",
    gradient: ["#22D3EE", "#8C7DFF"],
  },
  {
    id: "dwarka-housing",
    variant: "featured",
    title: "Dwarka Housing",
    period: "2024",
    category: "Full-Stack Real Estate Platform",
    description:
      "A full-stack real estate listing platform with separate admin, client, and server layers for managing property listings end to end.",
    tags: ["React.js", "Node.js", "MongoDB"],
    href: "https://github.com/HARSH-VARDHAN-MISHRA/Dwarka-Housing",
    linkLabel: "View on GitHub",
    gradient: ["#F5B942", "#6D5EF9"],
  },
  {
    id: "naxodent",
    variant: "compact",
    title: "Naxodent",
    period: "2025",
    category: "Shopify Storefront",
    description: "A dental-care D2C storefront — clinically-positioned product pages and checkout on Shopify.",
    tags: ["Shopify"],
    href: "https://naxodent.in/",
    linkLabel: "Open live site",
    gradient: ["#134e4a", "#0f766e"],
  },
  {
    id: "surjeet-india",
    variant: "compact",
    title: "Surjeet India",
    period: "2025",
    category: "Business Website",
    description: "A corporate marketing site for an industrial manufacturing business.",
    tags: ["React.js"],
    href: "https://surjeetindia.com/",
    linkLabel: "Open live site",
    gradient: ["#1e3a8a", "#1d4ed8"],
  },
  {
    id: "cleanzo-laundry",
    variant: "compact",
    title: "FreshFold (Cleanzo)",
    period: "2025",
    category: "Service Business Website",
    description: "A doorstep laundry & dry-cleaning booking site with service pricing and pickup scheduling.",
    tags: ["Next.js"],
    href: "https://cleanzo-laundry.vercel.app/",
    linkLabel: "Open live site",
    gradient: ["#14532d", "#166534"],
  },
  {
    id: "zapioev",
    variant: "compact",
    title: "Zapioev",
    period: "2025",
    category: "Business Website",
    description: "A responsive marketing and services website.",
    tags: ["React.js"],
    href: "https://www.zapioev.in/",
    linkLabel: "Open live site",
    gradient: ["#4c1d95", "#5b21b6"],
  },
  {
    id: "spiritual-lifestyle",
    variant: "compact",
    title: "Spiritual Lifestyle",
    period: "2025",
    category: "E-Commerce Website",
    description: "A lifestyle and wellness products storefront.",
    tags: ["E-Commerce"],
    href: "https://spiritualllifestyle.com/",
    linkLabel: "Open live site",
    gradient: ["#78350f", "#92400e"],
  },
  {
    id: "adroil-seals",
    variant: "compact",
    title: "Adroil Seals",
    period: "2024",
    category: "Business Website",
    description: "An industrial seals & components manufacturer's product and enquiry site.",
    tags: ["React.js"],
    href: "https://adroilseals.com/",
    linkLabel: "Open live site",
    gradient: ["#164e63", "#155e75"],
  },
  {
    id: "matachitanewali",
    variant: "compact",
    title: "Matachitanewali",
    period: "2024",
    category: "Personal Project",
    description: "A devotional/religious content website, built and deployed independently.",
    tags: ["HTML", "CSS"],
    href: "https://harsh-vardhan-mishra.github.io/Matachitanewali/",
    linkLabel: "Open live site",
    gradient: ["#7c2d12", "#9a3412"],
  },
  {
    id: "german-purje",
    variant: "compact",
    title: "German Purje",
    period: "2024",
    category: "Business Website",
    description: "A responsive brand/product website.",
    tags: ["React.js"],
    href: "https://www.germanpurje.com/",
    linkLabel: "Open live site",
    gradient: ["#312e81", "#3730a3"],
  },
  {
    id: "turbowale",
    variant: "compact",
    title: "Turbowale",
    period: "2024",
    category: "Business Website",
    description: "An automotive parts & services business website.",
    tags: ["React.js"],
    href: "https://turbowale.com/",
    linkLabel: "Open live site",
    gradient: ["#7f1d1d", "#991b1b"],
  },
];
