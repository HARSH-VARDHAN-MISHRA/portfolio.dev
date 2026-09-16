// Real skills from the 2026 resume + GitHub profile. No proficiency scores —
// the resume doesn't rate them, so grouped, unweighted tags are the honest
// option.

export type SkillGroup = { category: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "JavaScript",
      "Redux / Context API",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "Material UI",
    ],
  },
  {
    category: "Integration & Data",
    items: ["REST APIs", "WebSockets", "Shopify API", "Porter API", "Axios", "MySQL", "MongoDB", "Django"],
  },
  {
    category: "Business Systems",
    items: [
      "CRM Development",
      "ERP Systems",
      "Order & Inventory Management",
      "Warehouse Management",
      "OCR Integration",
      "Business Automation",
    ],
  },
  {
    category: "Tooling",
    items: ["Git", "GitHub", "Vite", "Node.js", "Express.js", "Postman", "Recharts"],
  },
];

// Real, verifiable tools with matching simple-icons slugs — used for the
// logo marquee. `slug` maps to the SVG fetched from simple-icons.
export const marqueeLogos = [
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "TypeScript", slug: "typescript" },
  { name: "JavaScript", slug: "javascript" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Bootstrap", slug: "bootstrap" },
  { name: "Redux", slug: "redux" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "MySQL", slug: "mysql" },
  { name: "Django", slug: "django" },
  { name: "Shopify", slug: "shopify" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
  { name: "Vite", slug: "vite" },
] as const;
