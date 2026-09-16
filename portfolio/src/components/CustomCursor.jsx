import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on pointer devices that support hover
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || reducedMotion) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Use GSAP quickTo for 120fps hardware-accelerated fluid follow
    const setDotX = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    const setRingX = gsap.quickTo(ring, "x", { duration: 0.22, ease: "power3.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.22, ease: "power3.out" });

    const onPointerMove = (e) => {
      if (!isVisible) setIsVisible(true);
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Dynamic hover listeners for links, buttons, cards
    const onMouseOver = (e) => {
      const target = e.target;
      const interactive = target.closest("a, button, [role='button'], .project-card, .telemetry-repo-card, .skill-trigger, .profile-card, canvas");

      if (interactive) {
        setIsHovered(true);
        const label = interactive.getAttribute("data-cursor");
        if (label) {
          setCursorText(label);
        } else if (interactive.tagName === "A" && interactive.getAttribute("target") === "_blank") {
          setCursorText("↗");
        } else {
          setCursorText("");
        }
      } else {
        setIsHovered(false);
        setCursorText("");
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
  }, [isVisible]);

  return (
    <div
      className={`custom-cursor-container ${isVisible ? "is-visible" : ""} ${
        isHovered ? "is-hovered" : ""
      } ${isClicking ? "is-clicking" : ""} ${cursorText ? "has-text" : ""}`}
      aria-hidden="true"
    >
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring">
        {cursorText && <span className="cursor-label mono">{cursorText}</span>}
      </div>
    </div>
  );
}
