import { site } from "@/data/site";
import SectionLabel from "@/components/ui/SectionLabel";
import GsapMaskReveal from "@/components/ui/GsapMaskReveal";

const facts = [
  { label: "Based in", value: site.location },
  { label: "Currently", value: "Frontend Developer @ Partsklik LLP" },
  { label: "Studying", value: `${site.education.current.degree}, ${site.education.current.school}` },
];

export default function About() {
  return (
    <section id="about" className="relative border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionLabel index="01" label="About" />

        <GsapMaskReveal
          as="h2"
          className="mt-10 max-w-4xl font-display text-[clamp(2.1rem,6vw,4.25rem)] font-medium leading-[1.12] tracking-tight text-foreground"
        >
          <span className="text-muted">I started by building</span>
          <br />
          <span className="text-muted">small-business websites.</span>
          <br />
          Three years later, I own the
          <br />
          <span className="text-gradient">frontend of enterprise CRM &amp; ERP</span>
          <br />
          platforms — and I&rsquo;m back in school
          <br />
          for my Master&rsquo;s.
        </GsapMaskReveal>

        <dl className="mt-16 grid grid-cols-1 gap-8 border-t border-border pt-10 sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="font-mono text-xs uppercase tracking-[0.15em] text-muted-2">{fact.label}</dt>
              <dd className="mt-2 text-lg text-foreground">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
