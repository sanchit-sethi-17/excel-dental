"use client";

import { LazyMotion, domAnimation, MotionConfig } from "motion/react";
import { ThemeProvider } from "@/components/theme";

/**
 * LazyMotion + `m` components keep the animation runtime ~6kb instead of the
 * full motion bundle; MotionConfig honours the user's reduced-motion setting.
 * ThemeProvider tracks light/dark and persists the choice.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}
