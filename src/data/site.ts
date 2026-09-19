// Real site content, sourced from Harshvardhan's 2026 resume
// (Harshvardhan_Mishra_Resume_2026.docx) and his GitHub profile.
// Keep this in sync if either changes.

export const site = {
  url: "https://harshv.vercel.app",
  name: "Harshvardhan Mishra",
  initials: "HM",
  role: "Frontend Developer",
  roleDetail: "React.js, Next.js & TypeScript",
  tagline: "I build the frontend that CRM systems and warehouses run on.",
  description:
    "Frontend developer building enterprise CRM, ERP, and e-commerce platforms — order management, warehouse & dispatch systems, Shopify + Razorpay commerce, Porter/Bluedart/Shiprocket logistics tracking, and AI automation with OpenAI, Gemini & Perplexity. Currently at Partsklik LLP.",
  location: "Delhi, India",
  status: "Building CRM systems @ Partsklik LLP",
  email: "mharshvardhan40@gmail.com",
  phone: "+91 83680 35050",
  phoneHref: "+918368035050",
  resumeUrl: "/Harshvardhan-Mishra-Resume.pdf",
  portraitSrc: "/harshvardhan-portrait.png",
  github: "https://github.com/HARSH-VARDHAN-MISHRA",
  linkedin: "https://www.linkedin.com/in/harshvardhan-mishra07/",
  education: {
    current: {
      degree: "Master of Computer Applications (MCA)",
      school: "Lovely Professional University",
      period: "2026 — Present",
    },
    completed: {
      degree: "Bachelor of Computer Applications (BCA)",
      school: "IGNOU University, Delhi",
      period: "2022 — 2025",
    },
  },
} as const;

export const navLinks = [
  { label: "About", href: "/#about" },
  { label: "What I Build", href: "/#specialties" },
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
] as const;

export const socialLinks = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
] as const;
