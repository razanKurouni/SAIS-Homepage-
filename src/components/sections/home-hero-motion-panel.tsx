import type { ReactNode } from "react";

type HomeHeroMotionPanelProps = {
  children: ReactNode;
};

export function HomeHeroMotionPanel({ children }: HomeHeroMotionPanelProps) {
  return (
    <div className="home-hero__scroll-motion">
      <div className="home-hero__entry-motion">
        {children}
      </div>
    </div>
  );
}
