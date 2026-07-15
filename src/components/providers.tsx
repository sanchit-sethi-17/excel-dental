"use client";

import { LazyMotion, domAnimation, MotionConfig } from "motion/react";

/**
 * LazyMotion + `m` components keep the animation runtime ~6kb instead of the
 * full motion bundle; MotionConfig honours the user's reduced-motion setting.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
