import type { Metadata } from "next";
import { Fraunces, Poppins, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import SmoothScroll from "@/components/ui/SmoothScroll";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
  display: "swap",
});

const title = `${site.name} — ${site.role} (${site.roleDetail})`;

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  alternates: {
    canonical: site.url,
  },
  keywords: [
    "Harshvardhan Mishra",
    "Frontend Developer",
    "Frontend Developer Delhi",
    "Frontend Developer India",
    "React Developer",
    "React.js Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Tailwind CSS Developer",
    "Redux Developer",
    "Node.js Developer",
    "Full Stack Developer",
    "CRM Development",
    "CRM Developer",
    "ERP Systems",
    "ERP Developer",
    "E-commerce Developer",
    "Shopify Developer",
    "Shopify API Integration",
    "Porter API Integration",
    "WhatsApp Automation",
    "AI Workflow Automation",
    "Business Automation",
    "WebSocket Real-Time Systems",
    "Warehouse Management Systems",
    "Order Management Systems",
    "Partsklik LLP",
    "Partsklik",
    "Kuber TurboTech",
    "Partsklik Plus",
    "Naxodent",
    "German Purje",
    "Surjeet India",
    "Adroil Seals",
    "Turbowale",
    "Cleanzo",
    "Zapioev",
    "Harshvardhan Mishra portfolio",
    "Delhi",
    "India",
  ],
  authors: [{ name: site.name, url: site.linkedin }],
  creator: site.name,
  publisher: site.name,
  applicationName: `${site.name} Portfolio`,
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title,
    description: site.description,
    url: site.url,
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
};

// Person structured data: ties the name to LinkedIn/GitHub (`sameAs`) and
// names the actual companies/platforms worked on, so search engines have a
// chance of surfacing this site as an entity result for those queries —
// not something on-page keywords alone can do.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: `${site.url}${site.portraitSrc}`,
  jobTitle: site.role,
  description: site.description,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Delhi", addressCountry: "IN" },
  worksFor: { "@type": "Organization", name: "Partsklik LLP" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: site.education.current.school },
    { "@type": "CollegeOrUniversity", name: site.education.completed.school },
  ],
  sameAs: [site.linkedin, site.github],
  knowsAbout: skillGroups.flatMap((group) => group.items),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // The theme-init script sets data-theme on the client before hydration
      // (to avoid a flash of the wrong theme), which will always differ from
      // the server's markup — that mismatch is expected here, not a bug.
      suppressHydrationWarning
      className={`${fraunces.variable} ${poppins.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`try {
            var t = localStorage.getItem('theme');
            if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
          } catch (e) {}`}
        </Script>
        {/* Plain script tag, not next/script — this needs to be present in
            the initial HTML for crawlers, not deferred/hydrated. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body>
        <SmoothScroll />
        <Preloader />
        <ScrollProgress />
        <NoiseOverlay />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
