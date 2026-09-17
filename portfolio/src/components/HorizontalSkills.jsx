import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { flatSkills } from "../data";
import { useReducedMotion } from "../hooks";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalSkills({ skills = flatSkills }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 981px)", () => {
        // Calculate the total horizontal distance to travel
        const getDistance = () => track.scrollWidth - window.innerWidth + 120;

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: true,
            start: "top top",
            end: () => `+=${getDistance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        return () => {
          tween.kill();
        };
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`skills-section ${reduced ? "is-reduced" : ""}`}
      aria-label="Capabilities and Technical Toolchain"
    >
      <div className="skills-sticky">
        {/* Section Header */}
        <div className="skills-head container">
          <div className="skills-meta mono">
            <span className="skills-no">02</span>
            <span>/ CAPABILITIES</span>
            <span className="skills-line" aria-hidden="true" />
            <span className="skills-sub">THE TOOLCHAIN — HORIZONTAL STACK</span>
          </div>
        </div>

        {/* Horizontal Track of Categories */}
        <div ref={trackRef} className="skills-track">
          {skills.map((s, i) => (
            <div className="skill-panel" key={s.cat}>
              <div className="skill-panel-inner">
                <div className="skill-pn mono">
                  {String(i + 1).padStart(2, "0")} —{" "}
                  {String(skills.length).padStart(2, "0")}
                </div>
                <h3 className="skill-title">{s.cat}</h3>
                <div className="skill-cmd mono" data-cursor="CLI">
                  {s.cmd}
                </div>
                <div className="skill-chips">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="chip"
                      data-cursor="TECH"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Outro Transition Card leading to 3D Systems matrix */}
          <div className="skill-panel skill-panel-cta">
            <div className="skill-panel-inner cta-box">
              <div className="skill-pn mono">NEXT STAGE</div>
              <h3 className="skill-title">System Graph</h3>
              <p className="skill-cta-desc">
                Inspect how these languages, neural architectures, and distributed systems intersect in an interactive 3D topology.
              </p>
              <a
                href="#systems"
                className="button button-primary skill-cta-btn"
                data-cursor="3D GRAPH"
              >
                Inspect 3D Matrix <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>

        {/* Track Footer Progress */}
        <div className="skills-foot container">
          <span className="mono foot-hint">DRAG / SCROLL</span>
          <span className="track-bar" aria-hidden="true">
            <i ref={progressRef} />
          </span>
          <span className="mono foot-count">04 STACKS</span>
        </div>
      </div>
    </section>
  );
}
