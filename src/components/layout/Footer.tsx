import { ArrowUp } from "lucide-react";
import { site, socialLinks } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10">
        <div className="flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs tracking-wide text-muted-2">
            © {new Date().getFullYear()} {site.name}. Built with Next.js &amp; Motion.
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="link"
                  className="font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-accent-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#top"
            data-cursor="link"
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-foreground"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
