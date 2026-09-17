import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AmbientBackground() {
  const halo1Ref = useRef(null);
  const halo2Ref = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const halo1 = halo1Ref.current;
    const halo2 = halo2Ref.current;
    if (!halo1 || !halo2) return;

    const setHalo1X = gsap.quickTo(halo1, "x", { duration: 1.8, ease: "power2.out" });
    const setHalo1Y = gsap.quickTo(halo1, "y", { duration: 1.8, ease: "power2.out" });

    const setHalo2X = gsap.quickTo(halo2, "x", { duration: 2.6, ease: "power2.out" });
    const setHalo2Y = gsap.quickTo(halo2, "y", { duration: 2.6, ease: "power2.out" });

    let rafId = null;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 120;
      targetY = (e.clientY / innerHeight - 0.5) * 120;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setHalo1X(targetX);
          setHalo1Y(targetY);
          setHalo2X(-targetX * 0.8);
          setHalo2Y(-targetY * 0.8);
          rafId = null;
        });
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div className="ambient-background" aria-hidden="true">
      <div ref={halo1Ref} className="ambient-halo ambient-halo-1" />
      <div ref={halo2Ref} className="ambient-halo ambient-halo-2" />
      <div className="ambient-grid-overlay" />
    </div>
  );
}
