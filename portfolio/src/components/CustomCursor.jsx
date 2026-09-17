import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const containerRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    // Only enable on pointer devices that support hover
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || reducedMotion) return;

    const container = containerRef.current;
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    const label = labelRef.current;
    if (!container || !dot || !ring || !label) return;

    // GSAP quickTo for 120fps hardware-accelerated follow
    const setDotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    const setRingX = gsap.quickTo(ring, "x", { duration: 0.18, ease: "power3.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.18, ease: "power3.out" });

    let isVisible = false;

    const onPointerMove = (e) => {
      if (!isVisible) {
        isVisible = true;
        container.classList.add("is-visible");
      }
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    const onMouseDown = () => container.classList.add("is-clicking");
    const onMouseUp = () => container.classList.remove("is-clicking");
    const onMouseLeave = () => {
      isVisible = false;
      container.classList.remove("is-visible");
    };
    const onMouseEnter = () => {
      isVisible = true;
      container.classList.add("is-visible");
    };

    // Fast delegation for interactive elements without React re-renders
    const onMouseOver = (e) => {
      const target = e.target;
      if (!target || typeof target.closest !== "function") return;

      const interactive = target.closest(
        "a, button, [role='button'], .project-card, .telemetry-repo-card, .skill-trigger, .profile-card, canvas"
      );

      if (interactive) {
        container.classList.add("is-hovered");
        const customText = interactive.getAttribute("data-cursor");
        if (customText) {
          label.textContent = customText;
          container.classList.add("has-text");
        } else if (interactive.tagName === "A" && interactive.getAttribute("target") === "_blank") {
          label.textContent = "↗";
          container.classList.add("has-text");
        } else {
          label.textContent = "";
          container.classList.remove("has-text");
        }
      } else {
        container.classList.remove("is-hovered", "has-text");
        label.textContent = "";
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="custom-cursor-container"
      aria-hidden="true"
    >
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label mono" />
      </div>
    </div>
  );
}
