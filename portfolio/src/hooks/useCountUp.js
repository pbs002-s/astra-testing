import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks";

/**
 * Animated number count-up hook triggered on viewport entry.
 * Respects prefers-reduced-motion.
 *
 * @param {string|number} rawTarget - e.g. "352+", "100%", "23"
 * @param {number} duration - Animation duration in seconds (default 1.6s)
 * @returns {{ ref: React.RefObject, value: string }}
 */
export function useCountUp(rawTarget, duration = 1.6) {
  const reduced = useReducedMotion();
  const ref = useRef(null);

  const str = String(rawTarget ?? "");
  const match = str.match(/^([^0-9.]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  const prefix = match ? match[1] : "";
  const targetNum = match ? parseFloat(match[2]) : 0;
  const suffix = match ? match[3] : "";
  const decimals =
    match && match[2].includes(".") ? match[2].split(".")[1].length : 0;

  const [currentVal, setCurrentVal] = useState(() => (reduced ? targetNum : 0));
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (reduced) {
      setCurrentVal(targetNum);
      return;
    }

    const element = ref.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setCurrentVal(targetNum);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          const startTime = performance.now();
          const durationMs = duration * 1000;

          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            // Smooth ease out expo curve
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const val = targetNum * ease;

            setCurrentVal(val);

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setCurrentVal(targetNum);
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [targetNum, duration, reduced]);

  const formattedValue = `${prefix}${
    decimals > 0 ? currentVal.toFixed(decimals) : Math.round(currentVal)
  }${suffix}`;

  return { ref, value: formattedValue };
}

export default useCountUp;
