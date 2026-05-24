import { useEffect, useRef, useState } from "react";

export const useCounter = (
  targetValue: number,
  options?: {
    duration?: number;
    start?: number;
    easeFn?: (t: number) => number;
  }
) => {
  const [count, setCount] = useState(options?.start || 0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          const duration = options?.duration || 2000;
          const startValue = options?.start || 0;
          const startTime = Date.now();

          const easeFn =
            options?.easeFn ||
            ((t: number) => {
              // easeOutQuad
              return 1 - (1 - t) * (1 - t);
            });

          const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = easeFn(progress);
            const value = Math.floor(
              startValue + (targetValue - startValue) * easeProgress
            );

            setCount(value);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          animate();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [targetValue, options]);

  return { count, ref };
};
