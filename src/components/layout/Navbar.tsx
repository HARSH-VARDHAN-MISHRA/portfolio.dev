"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks, site, socialLinks } from "@/data/site";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const menu = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          // Rendered via portal straight into <body> — nesting this inside
          // <header> put it inside a `backdrop-blur` ancestor once `open`
          // was true, which creates a new containing block for `fixed`
          // descendants and collapsed this overlay down to the header's
          // own height instead of the full viewport.
          className="fixed inset-0 z-30 flex flex-col justify-center bg-background px-6 sm:px-10"
        >
          <ul className="flex flex-col">
            {navLinks.map((link, i) => (
              <li key={link.href} className="overflow-hidden border-b border-border py-1 first:border-t">
                <motion.a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "110%" }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  data-cursor="link"
                  className="group flex items-baseline gap-4 py-3 sm:py-4"
                >
                  <span className="font-mono text-xs text-accent-2 sm:text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-4xl font-medium text-foreground transition-transform duration-300 group-hover:translate-x-3 group-hover:text-accent-soft sm:text-6xl">
                    {link.label}
                  </span>
                </motion.a>
              </li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1 + navLinks.length * 0.05, duration: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-between gap-6"
          >
            <a
              href={`mailto:${site.email}`}
              data-cursor="link"
              className="font-mono text-sm text-muted transition-colors hover:text-foreground"
            >
              {site.email}
            </a>
            <div className="flex flex-wrap items-center gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="link"
                  className="font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={site.resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setOpen(false)}
                data-cursor="link"
                className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-foreground transition-colors hover:border-accent-soft/60 hover:text-accent-soft"
              >
                Resume
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <a href="#top" data-cursor="link" className="font-display text-lg font-semibold tracking-tight">
          {site.initials}
          <span className="text-accent-2">.</span>
        </a>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            data-cursor="link"
            className="relative z-50 flex items-center gap-2 rounded-full border border-border py-2 pl-4 pr-2 font-mono text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-border-strong"
          >
            {open ? "Close" : "Menu"}
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background">
              {open ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
            </span>
          </button>
        </div>
      </nav>

      {mounted && createPortal(menu, document.body)}
    </header>
  );
}
