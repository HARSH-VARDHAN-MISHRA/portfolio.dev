// Real work history + education, from the 2026 resume — condensed to the
// tightest bullets per role rather than reproducing every line.

export type ExperienceEntry = {
  period: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
};

export const experience: ExperienceEntry[] = [
  {
    period: "Sep 2024 — Present",
    role: "Frontend Developer (React.js / Next.js)",
    company: "Partsklik LLP",
    description:
      "Lead frontend architecture for three enterprise automation platforms — a multi-location store system with role-based access, a dispatch-aware sales engine with live stock validation, Shopify + Porter API integration, OTP auth, and real-time KPI dashboards.",
    tags: ["React.js", "Next.js", "Shopify API", "Porter API", "WebSockets"],
  },
  {
    period: "Sep 2023 — Sep 2024",
    role: "Frontend Developer",
    company: "DigiIndia Solutions",
    description:
      "Delivered 35+ responsive, SEO-friendly websites across healthcare, e-commerce, and education, plus dynamic dashboards and role-based systems — collaborating on API integration and performance.",
    tags: ["React.js", "Tailwind CSS", "Bootstrap", "REST APIs"],
  },
];

export type EducationEntry = {
  period: string;
  degree: string;
  school: string;
  status: "In progress" | "Completed";
};

export const education: EducationEntry[] = [
  {
    period: "2025 — Present",
    degree: "Master of Computer Applications (MCA)",
    school: "Lovely Professional University",
    status: "In progress",
  },
  {
    period: "2022 — 2025",
    degree: "Bachelor of Computer Applications (BCA)",
    school: "IGNOU University, Delhi",
    status: "Completed",
  },
];
