import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
};

export function SectionReveal({ children, className = "" }: SectionRevealProps) {
  return (
    <Reveal className={className} threshold={0.18}>
      {children}
    </Reveal>
  );
}
