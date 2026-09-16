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

    const handlePointerMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const nx = (e.clientX / innerWidth - 0.5) * 120;
      const ny = (e.clientY / innerHeight - 0.5) * 120;

      setHalo1X(nx);
      setHalo1Y(ny);
      setHalo2X(-nx * 0.8);
      setHalo2Y(-ny * 0.8);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div className="ambient-background" aria-hidden="true">
      <div ref={halo1Ref} className="ambient-halo ambient-halo-1" />
      <div ref={halo2Ref} className="ambient-halo ambient-halo-2" />
      <div className="ambient-grid-overlay" />
    </div>
  );
}
