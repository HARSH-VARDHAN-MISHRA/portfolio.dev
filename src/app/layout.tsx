import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site } from "@/data/site";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";

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
  title,
  description: site.description,
  metadataBase: new URL("https://example.com"),
  keywords: [
    "Harshvardhan Mishra",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "CRM Development",
    "ERP Systems",
    "Shopify Developer",
    "Delhi",
    "India",
  ],
  authors: [{ name: site.name, url: site.linkedin }],
  creator: site.name,
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description: site.description,
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
        <Preloader />
        <ScrollProgress />
        <NoiseOverlay />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
