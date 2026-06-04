import Link from "next/link";
import type { Cta } from "@/types/sanity";

type CtaLinkProps = {
  cta: Cta;
  className?: string;
};

export function CtaLink({ cta, className = "" }: CtaLinkProps) {
  const variant = cta.variant || "primary";

  return (
    <Link
      href={cta.href || "#"}
      target={cta.openInNewTab ? "_blank" : undefined}
      rel={cta.openInNewTab ? "noreferrer" : undefined}
      className={`cta-link cta-link--${variant} ${className}`}
    >
      {cta.label}
    </Link>
  );
}
