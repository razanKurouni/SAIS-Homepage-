import Link from "next/link";
import type { Cta } from "@/types/sanity";

type CtaLinkProps = {
  cta: Cta;
  className?: string;
};

const variantClasses: Record<NonNullable<Cta["variant"]>, string> = {
  primary: "bg-white text-[color:var(--sais-primary)] hover:bg-[#eef8f8]",
  secondary: "bg-[color:var(--sais-accent)] text-white hover:bg-[color:var(--sais-accent)]",
  ghost: "border border-white/70 text-white hover:bg-white/10",
};

export function CtaLink({ cta, className = "" }: CtaLinkProps) {
  const variant = cta.variant || "primary";

  return (
    <Link
      href={cta.href || "#"}
      target={cta.openInNewTab ? "_blank" : undefined}
      rel={cta.openInNewTab ? "noreferrer" : undefined}
      className={`inline-flex h-9 w-[var(--sais-button-width)] min-w-[var(--sais-button-width)] items-center justify-center rounded-full px-[18px] text-[.9rem] font-semibold transition ${variantClasses[variant]} ${className}`}
    >
      {cta.label}
    </Link>
  );
}
