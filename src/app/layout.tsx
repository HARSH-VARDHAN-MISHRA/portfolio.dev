import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site } from "@/data/site";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import SmoothScroll from "@/components/ui/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // The theme-init script sets data-theme on the client before hydration
      // (to avoid a flash of the wrong theme), which will always differ from
      // the server's markup — that mismatch is expected here, not a bug.
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`try {
            var t = localStorage.getItem('theme');
            if (t === 'light') document.documentElement.setAttribute('data-theme', 'light');
          } catch (e) {}`}
        </Script>
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
