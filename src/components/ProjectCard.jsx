import { useEffect, useRef } from "react";
import gsap from "gsap";

function ArchitectureDiagram({ project, index }) {
  return (
    <div className="project-diagram" aria-hidden="true">
      <div className="diagram-meta mono">
        <span>FIG. {String(index + 1).padStart(2, "0")}</span>
        <span>{project.spec}</span>
      </div>

      <svg viewBox="0 0 480 138" fill="none">
        <path
          d="M24 69H456M240 15V123"
          stroke="currentColor"
          strokeOpacity=".09"
          strokeDasharray="3 6"
        />

        <path
          d="M126 69H193M287 69H354"
          stroke="currentColor"
          strokeOpacity=".5"
        />

        <path
          d="m186 65 7 4-7 4m161-8 7 4-7 4"
          stroke="currentColor"
          strokeOpacity=".6"
        />

        {[80, 240, 400].map((x, i) => (
          <g key={x}>
            <rect
              x={x - 46}
              y="42"
              width="92"
              height="54"
              rx="3"
              stroke={i === 1 ? "#BE123C" : "currentColor"}
              strokeOpacity={i === 1 ? ".8" : ".25"}
              fill={i === 1 ? "rgba(190,18,60,.06)" : "none"}
            />
            <text
              x={x}
              y="73"
              textAnchor="middle"
              fill="currentColor"
              fontSize="9"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing=".3"
            >
              {project.diagram[i]}
            </text>
          </g>
        ))}

        <circle cx="160" cy="69" r="2.5" fill="#BE123C" />
        <circle cx="320" cy="69" r="2.5" fill="#BE123C" />
      </svg>
    </div>
  );
}

export default function ProjectCard({ project, index, reduced }) {
  const ref = useRef(null);
  const motion = useRef(null);

  useEffect(() => {
    if (reduced) return;

    const element = ref.current;
    const context = gsap.context(() => {
      gsap.set(element, { transformPerspective: 1000 });
      motion.current = {
        x: gsap.quickTo(element, "rotationX", {
          duration: 0.45,
          ease: "power3.out",
        }),
        y: gsap.quickTo(element, "rotationY", {
          duration: 0.45,
          ease: "power3.out",
        }),
      };
    }, element);

    return () => {
      motion.current = null;
      context.revert();
    };
  }, [reduced]);

  function handleMove(event) {
    if (
      reduced ||
      event.pointerType !== "mouse" ||
      !motion.current
    ) {
      return;
    }

    // Measure the non-transformed wrapper so the input does not feed back
    // into the rotated element's bounding box.
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    motion.current.x(-y * 5);
    motion.current.y(x * 5);
  }

  function reset() {
    motion.current?.x(0);
    motion.current?.y(0);
  }

  return (
    <div
      className={`project-wrapper reveal ${index < 2 ? "featured" : ""}`}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <article
        ref={ref}
        className="project-card"
        aria-labelledby={`project-${project.id}`}
      >
        <ArchitectureDiagram project={project} index={index} />

        <div className="project-body">
          <div className="project-topline mono">
            <span>{project.category}</span>
            <span className="status-pill">
              <span
                className={
                  project.status === "RESEARCH"
                    ? "status-dot research"
                    : "status-dot"
                }
              />
              {project.status}
            </span>
          </div>

          <h3 id={`project-${project.id}`}>{project.name}</h3>
          <p className="project-subtitle">{project.subtitle}</p>
          <p className="project-description">{project.details}</p>

          {project.id === "medical-llm" && (
            <p className="research-note mono">
              Research project · not a clinical diagnostic service.
            </p>
          )}

          <ul className="tags" aria-label={`${project.name} technology stack`}>
            {project.stack.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>

          <div className="project-footer">
            <span className="mono muted">
              {project.year}
              {project.openSource ? " / OPEN SOURCE" : ""}
            </span>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
              aria-label={`Inspect ${project.name} repository on GitHub, opens in a new tab`}
            >
              Inspect repository <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}