// Real skills from the current resume + GitHub profile. No proficiency
// scores — the resume doesn't rate them, so grouped, unweighted tags are
// the honest option.

export type SkillGroup = { category: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Redux / Context API",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "Material UI",
    ],
  },
  {
    category: "E-Commerce, Payments & Logistics",
    items: ["Shopify API", "Razorpay", "Porter API", "Bluedart API", "Shiprocket API"],
  },
  {
    category: "AI & Automation",
    items: ["OpenAI API", "Google Gemini API", "Perplexity API", "OCR Integration", "WhatsApp Automation"],
  },
  {
    category: "Business Systems",
    items: [
      "CRM & ERP Development",
      "Order & Inventory Management",
      "Warehouse Management",
      "Multi-tenant Business Platforms",
      "Business Automation",
    ],
  },
  {
    category: "Tools & Backend",
    items: [
      "Git",
      "GitHub",
      "Vite",
      "Node.js",
      "Express.js",
      "REST APIs",
      "WebSockets",
      "Axios",
      "Postman",
      "Recharts",
      "MySQL",
      "MongoDB",
      "Django",
      "Synology NAS",
    ],
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
  { name: "Razorpay", slug: "razorpay" },
  { name: "OpenAI", slug: "openai" },
  { name: "Gemini", slug: "googlegemini" },
  { name: "Perplexity", slug: "perplexity" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
  { name: "Vite", slug: "vite" },
] as const;
