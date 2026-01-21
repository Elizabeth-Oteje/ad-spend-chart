"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export default function CountUp({
  to,
  from = 0,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
}: CountUpProps) {
  const count = useMotionValue(from);
  const rounded = useSpring(count, {
    damping: 15,
    stiffness: 100,
  });
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      count.set(to);
    }
  }, [count, isInView, to]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent =
          prefix + latest.toFixed(decimals) + suffix;
      }
    });
  }, [rounded, prefix, suffix, decimals]);

  return <span ref={ref}>{prefix}{from.toFixed(decimals)}{suffix}</span>;
}
