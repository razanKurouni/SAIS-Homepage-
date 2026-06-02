import { CtaLink } from "@/components/ui/cta-link";
import type { HomepageData } from "@/types/sanity";

type CtaBandProps = {
  section?: HomepageData["ctaBand"];
};

export function CtaBand({ section }: CtaBandProps) {
  if (!section?.text) {
    return null;
  }

  return (
    <section className="rounded-lg bg-[color:var(--sais-accent)] px-6 py-8 text-center text-white">
      <p className="mx-auto max-w-2xl text-sm leading-7">{section.text}</p>
      {section.ctas && section.ctas.length > 0 && (
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {section.ctas.map((cta) => (
            <CtaLink key={`${cta.label}-${cta.href}`} cta={cta} />
          ))}
        </div>
      )}
    </section>
  );
}
