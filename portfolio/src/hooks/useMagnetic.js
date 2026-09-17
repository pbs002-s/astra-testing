import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../hooks";

/**
 * Magnetic hover effect hook. Pulls element toward pointer on hover
 * and springs back on leave. Disabled on touch and prefers-reduced-motion.
 *
 * @param {number} strength - Pull strength factor (default 0.35)
 * @returns {React.RefObject}
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    // Only enable for fine pointers (mouse)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let rect = null;

    const setX = gsap.quickTo(el, "x", { duration: 0.28, ease: "power2.out" });
    const setY = gsap.quickTo(el, "y", { duration: 0.28, ease: "power2.out" });

    const onPointerEnter = () => {
      rect = el.getBoundingClientRect();
    };

    const onPointerMove = (e) => {
      if (!rect) rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;

      setX(dx);
      setY(dy);
    };

    const onPointerLeave = () => {
      rect = null;
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
      });
    };

    el.addEventListener("pointerenter", onPointerEnter);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", onPointerLeave);

    return () => {
      el.removeEventListener("pointerenter", onPointerEnter);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength, reduced]);

  return ref;
}

export default useMagnetic;
