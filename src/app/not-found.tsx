import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MagneticButton from "@/components/ui/MagneticButton";
import GradientAurora from "@/components/ui/GradientAurora";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-grid px-6 text-center">
          <GradientAurora />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

          <div className="relative z-10 flex flex-col items-center">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Error 404</span>

            <h1 className="mt-6 font-display text-[clamp(4rem,14vw,9rem)] font-medium leading-none tracking-tight text-gradient">
              404
            </h1>

            <h2 className="mt-6 max-w-md font-display text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl">
              This route isn&rsquo;t wired up.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              The page you&rsquo;re looking for doesn&rsquo;t exist, or it moved. Let&rsquo;s get you
              back on track.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href="/">Back to home</MagneticButton>
              <MagneticButton href="/#contact" variant="ghost">
                Get in touch
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
