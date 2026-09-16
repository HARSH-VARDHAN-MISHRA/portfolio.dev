import { site } from "@/data/site";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";

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

        <h2 className="mt-10 max-w-4xl font-display text-[clamp(2.1rem,6vw,4.25rem)] font-medium leading-[1.12] tracking-tight text-foreground">
          <RevealText text="I started by building" className="text-muted" />
          <br />
          <RevealText text="small-business websites." delay={0.08} className="text-muted" />
          <br />
          <RevealText text="Three years later, I own the" delay={0.2} />
          <br />
          <span className="text-gradient">
            <RevealText text="frontend of enterprise CRM & ERP" delay={0.32} />
          </span>
          <br />
          <RevealText text="platforms — and I'm back in school" delay={0.44} />
          <br />
          <RevealText text="for my Master's." delay={0.56} />
        </h2>

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
