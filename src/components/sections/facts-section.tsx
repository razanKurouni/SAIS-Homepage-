"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { SectionReveal } from "@/components/ui/section-reveal";
import type { HomepageData } from "@/types/sanity";

type FactsSectionProps = {
  section?: HomepageData["facts"];
};

function parseMetricValue(value: string) {
  const trimmed = value.trim();
  const match = trimmed.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return null;
  }

  const [, prefix, numericPart, suffix] = match;
  const decimals = numericPart.includes(".") ? numericPart.split(".")[1]?.length || 0 : 0;

  return {
    prefix,
    suffix,
    target: Number(numericPart),
    decimals,
  };
}

function AnimatedFactValue({ value }: { value: string }) {
  const reducedMotion = useReducedMotion();
  const parsedValue = useMemo(() => parseMetricValue(value), [value]);
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const [displayValue, setDisplayValue] = useState(() => {
    if (!parsedValue) {
      return value;
    }

    if (reducedMotion) {
      return value;
    }

    return `${parsedValue.prefix}0${parsedValue.suffix}`;
  });

  useEffect(() => {
    if (!parsedValue || !isInView) {
      return;
    }

    if (reducedMotion) {
      return;
    }

    const duration = 1650;
    const startTime = performance.now();
    let frameId = 0;

    const update = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = parsedValue.target * eased;
      const formattedValue =
        parsedValue.decimals > 0
          ? currentValue.toFixed(parsedValue.decimals)
          : Math.round(currentValue).toString();

      setDisplayValue(`${parsedValue.prefix}${formattedValue}${parsedValue.suffix}`);

      if (progress < 1) {
        frameId = requestAnimationFrame(update);
      } else {
        setDisplayValue(value);
      }
    };

    frameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frameId);
  }, [isInView, parsedValue, reducedMotion, value]);

  return (
    <p ref={ref} className="facts-section__value">
      {reducedMotion ? value : displayValue}
    </p>
  );
}

export function FactsSection({ section }: FactsSectionProps) {
  if (!section?.heading?.title && !section?.items?.length) {
    return null;
  }

  return (
    <section className="facts-section" aria-labelledby="facts-title">
      <SectionReveal className="facts-section__inner">
        {section.heading?.title ? (
          <div className="facts-section__heading">
            <h2 id="facts-title" className="facts-section__title">
              {section.heading.title}
            </h2>
          </div>
        ) : null}

        <div className="facts-section__grid">
          {(section.items || []).map((item) => (
            <div
              key={`${item.value}-${item.label}`}
              className="facts-section__item"
            >
              <AnimatedFactValue value={item.value} />
              <p className="facts-section__label">{item.label}</p>
            </div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
