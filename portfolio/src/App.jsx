import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  experience,
  honors,
  identity,
  metrics,
  projects,
  skillGroups,
  socials,
} from "./data";
import {
  useReducedMotion,
  useTheme,
  useCountUp,
  useMagnetic,
} from "./hooks";
import SceneShell from "./components/SceneShell";
import ProjectCard from "./components/ProjectCard";
import Terminal from "./components/Terminal";
import Resume from "./components/Resume";
import GitHubTelemetry from "./components/GitHubTelemetry";
import ShowreelModal from "./components/ShowreelModal";
import CustomCursor from "./components/CustomCursor";
import AmbientBackground from "./components/AmbientBackground";
import RoleTypewriter from "./components/RoleTypewriter";
import ProfileCard from "./components/ProfileCard";
import SkillsMarquee from "./components/SkillsMarquee";
import HorizontalSkills from "./components/HorizontalSkills";

gsap.registerPlugin(ScrollTrigger);

const navigation = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "systems", label: "Systems" },
  { id: "log", label: "Log" },
  { id: "contact", label: "Contact" },
];

function MagneticLink({ children, className, href, ...props }) {
  const ref = useMagnetic(0.35);
  return (
    <a ref={ref} className={className} href={href} {...props}>
      {children}
    </a>
  );
}

function MagneticButton({ children, className, onClick, type = "button", ...props }) {
  const ref = useMagnetic(0.35);
  return (
    <button ref={ref} className={className} onClick={onClick} type={type} {...props}>
      {children}
    </button>
  );
}

function MetricItem({ metric }) {
  const { ref, value } = useCountUp(metric.value);
  return (
    <div className="metric" ref={ref}>
      <dt>{metric.label}</dt>
      <dd>{value}</dd>
      <span className="mono">{metric.detail}</span>
    </div>
  );
}

function ThemeIcon({ theme }) {
  return theme === "dark" ? (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.4 1.4m11.2 11.2L19 19M5 19l1.4-1.4M17.6 6.4 19 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Header({ theme, toggleTheme, activeSection, isScrolled, progressBarRef }) {
  return (
    <>
      <div
        ref={progressBarRef}
        className="scroll-progress-bar"
        aria-hidden="true"
      />
      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <a href="#top" className="logo" aria-label="Pritam Biswas, back to top" data-cursor="PB.">
          PB<span>.</span>
        </a>

        <div className="availability">
          <span className="availability-dot" aria-hidden="true" />
          <span>{identity.availability}</span>
        </div>

        <nav aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? "location" : undefined}
              data-cursor="NAV"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="icon-button theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            data-cursor="THEME"
          >
            <ThemeIcon theme={theme} />
          </button>
          <MagneticLink
            className="header-pill-btn header-cv-btn"
            href="/Pritam_Biswas_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            aria-label="Download official CV PDF"
            title="Download official CV PDF"
            data-cursor="CV"
          >
            <span>CV PDF</span>
            <span aria-hidden="true">↓</span>
          </MagneticLink>
          <MagneticLink
            className="header-pill-btn header-resume-btn"
            href="/?resume=1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open print-ready résumé in a new tab"
            data-cursor="RÉSUMÉ"
          >
            <span>Résumé</span>
            <span aria-hidden="true">↗</span>
          </MagneticLink>
        </div>
      </header>
    </>
  );
}

function SectionHeading({ index, eyebrow, title, accent, children }) {
  return (
    <div className="section-heading reveal">
      <div>
        <p className="eyebrow">
          <span>{index}</span> / {eyebrow}
        </p>
        <h2>
          {title} <em>{accent}</em>
        </h2>
      </div>
      {children && <p className="section-description">{children}</p>}
    </div>
  );
}

function Portfolio() {
  const root = useRef(null);
  const heroRef = useRef(null);
  const interaction = useRef({ x: 0, y: 0, scroll: 0 });
  const drag = useRef(null);
  const [theme, toggleTheme] = useTheme();
  const reduced = useReducedMotion();
  const [activeSection, setActiveSection] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("ai");
  const [isReelOpen, setIsReelOpen] = useState(false);
  const progressBarRef = useRef(null);
  const isScrolledRef = useRef(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const activeSkill = skillGroups.find((group) => group.id === selectedSkill);

  // Active section observer
  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // GSAP Section Reveals
  useEffect(() => {
    if (reduced) return;

    const context = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: element,
              start: "top 92%",
              once: true,
            },
          },
        );
      });
    }, root);

    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      context.revert();
    };
  }, [reduced]);

  // Lenis Smooth Scroll Integration
  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    const onScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", onScroll);

    const ticker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, [reduced]);

  // Hero Parallax Scroll
  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.to(".hero-visual", {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);


  // GSAP Hero Kinetic Stagger Entrance
  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-topline", {
        y: -18,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.from(".hero-eyebrow, .role-typewriter", {
        y: 20,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.25,
      });

      gsap.from("#hero-title", {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        delay: 0.4,
      });

      gsap.from(".hero-subtitle", {
        y: 22,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        delay: 0.6,
      });

      gsap.from(".hero-actions .button", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: "power3.out",
        delay: 0.75,
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  // Scroll & Resize Handler
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      // Global scroll progress updated via direct DOM transform (zero re-renders)
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      const shouldBeScrolled = scrollY > 45;
      if (shouldBeScrolled !== isScrolledRef.current) {
        isScrolledRef.current = shouldBeScrolled;
        setIsScrolled(shouldBeScrolled);
      }

      if (reduced) return;

      const hero = heroRef.current;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      interaction.current.scroll = Math.max(
        0,
        Math.min(1, -rect.top / Math.max(rect.height, 1)),
      );

      if (window.scrollY < 200) setActiveSection("");
    };

    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [reduced]);

  function moveHero(event) {
    if (reduced) return;

    if (event.pointerType === "touch") {
      if (!drag.current) return;
      interaction.current.x = Math.max(
        -1,
        Math.min(1, (event.clientX - drag.current.x) / 150),
      );
      interaction.current.y = Math.max(
        -1,
        Math.min(1, (event.clientY - drag.current.y) / 200),
      );
      return;
    }

    const rect = heroRef.current.getBoundingClientRect();
    interaction.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    interaction.current.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
  }

  function resetHero() {
    drag.current = null;
    interaction.current.x = 0;
    interaction.current.y = 0;
  }

  return (
    <div ref={root} className="site-wrapper">
      <CustomCursor />
      <AmbientBackground />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        isScrolled={isScrolled}
        progressBarRef={progressBarRef}
      />

      <main id="main" tabIndex={-1}>
        <section
          id="top"
          ref={heroRef}
          className="hero container"
          aria-labelledby="hero-title"
          onPointerMove={moveHero}
          onPointerDown={(event) => {
            if (event.pointerType === "touch") {
              drag.current = { x: event.clientX, y: event.clientY };
            }
          }}
          onPointerUp={resetHero}
          onPointerCancel={resetHero}
          onPointerLeave={resetHero}
        >
          <div className="hero-topline mono">
            <span>PRITAM BISWAS / {identity.handle}</span>
            <span className="location">
              <span aria-hidden="true">⌖</span> DHAKA, BD · UTC+6
            </span>
          </div>

          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              ENGINEERING &amp; AI SYSTEMS · 2026
            </p>

            <RoleTypewriter />

            <h1 id="hero-title">
              Pritam Biswas
              <br />
              <em>Full-Stack</em> Engineer
              <br />
              &amp; <em>AI</em> Explorer<span className="accent">.</span>
            </h1>

            <p className="hero-subtitle">
              Second-year CSE undergraduate shipping production-grade, distributed,
              and AI-integrated software solo end-to-end — from building an 11.3M PyTorch transformer
              and autonomous coding agent to multi-tenant platforms and clinical AI models.
            </p>

            <div className="hero-actions flex flex-wrap gap-3">
              <MagneticLink
                className="button button-primary"
                href="#work"
                data-cursor="WORK"
              >
                Explore selected works <span aria-hidden="true">↘</span>
              </MagneticLink>
              <MagneticButton
                type="button"
                className="button button-secondary flex items-center gap-2"
                onClick={() => setIsReelOpen(true)}
                data-cursor="PLAY"
              >
                <span className="accent" aria-hidden="true">▷</span> Watch showreel
              </MagneticButton>
              <MagneticLink
                className="button button-secondary"
                href="#contact"
                data-cursor="SHELL"
              >
                Inspect terminal / code <span aria-hidden="true">⌘</span>
              </MagneticLink>
            </div>
          </div>

          <div className="hero-visual" data-cursor="3D ORB">
            <SceneShell
              kind="hero"
              theme={theme}
              reduced={reduced}
              interactionRef={interaction}
            />
            <div className="visual-label mono">
              <span className="accent">01 / PROCEDURAL CORE</span>
              <span>
                {reduced
                  ? "STATIC / REDUCED MOTION"
                  : "POINTER-REACTIVE / SCROLL-LINKED"}
              </span>
            </div>
            <span className="axis-label axis-top mono" aria-hidden="true">
              Y+
            </span>
            <span className="axis-label axis-right mono" aria-hidden="true">
              X+
            </span>
          </div>

          <div className="hero-bottom">
            <p className="mono muted">
              SOFTWARE IS A SYSTEM.
              <br />
              EVERY DETAIL IS A DECISION.
            </p>
            <a href="#work" className="scroll-cue mono" data-cursor="SCROLL">
              SCROLL TO INSPECT <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <div className="metrics-section container">
          <dl className="metrics-grid">
            {metrics.map((metric) => (
              <MetricItem key={metric.label} metric={metric} />
            ))}
          </dl>
          <p className="metrics-note mono">
            PORTFOLIO METRICS / VERIFIED REPOSITORY &amp; COMPETITIVE SNAPSHOT
          </p>
        </div>

        <SkillsMarquee />

        <section
          id="work"
          className="section container"
          aria-labelledby="work-title"
        >
          <div id="work-title">
            <SectionHeading
              index="01"
              eyebrow="SELECTED WORK / 2025–2026"
              title="Built from"
              accent="the inside out."
            >
              Seven systems. Real architectural decisions. From token-level
              intelligence to the infrastructure people actually use.
            </SectionHeading>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                reduced={reduced}
              />
            ))}
          </div>

          {/* Live GitHub Telemetry & Real Commit Activity */}
          <div className="telemetry-section-header reveal">
            <p className="eyebrow">OPEN SOURCE ECOSYSTEM &amp; REPOSITORIES</p>
            <h3 className="telemetry-section-title">
              Live GitHub <em>Telemetry</em>
            </h3>
            <p className="section-description">
              Direct REST API connection calculating live repository commits, community stars, and primary tech distributions.
            </p>
          </div>

          <GitHubTelemetry />

          <div className="section-endnote mono">
            <span>ARCHITECTURE → IMPLEMENTATION → DELIVERY</span>
            <a
              href={identity.profiles.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="GITHUB"
            >
              ALL REPOSITORIES ↗
            </a>
          </div>
        </section>

        <HorizontalSkills />

        <section
          id="systems"
          className="section systems-section"
          aria-labelledby="systems-title"
        >
          <div className="container">
            <div id="systems-title">
              <SectionHeading
                index="03"
                eyebrow="CAPABILITY MATRIX &amp; 3D TOPOLOGY"
                title="Four domains."
                accent="One unified mindset."
              >
                Intelligence, interfaces, infrastructure, and the foundations
                connecting them. Select a node to inspect the underlying graph.
              </SectionHeading>
            </div>

            <div className="systems-layout reveal">
              <div className="matrix-panel">
                <div className="panel-topline mono">
                  <span>DOMAIN GRAPH / 04 NODES</span>
                  <span className="accent">CONNECTED</span>
                </div>

                <div className="matrix-visual" data-cursor="SELECT">
                  <SceneShell
                    kind="skills"
                    theme={theme}
                    reduced={reduced}
                    selected={selectedSkill}
                    onSelect={setSelectedSkill}
                  />

                  <span className="matrix-label label-core mono">CORE</span>
                  <span className="matrix-label label-front mono">
                    INTERFACES
                  </span>
                  <span className="matrix-label label-back mono">SYSTEMS</span>
                  <span className="matrix-label label-ai mono">
                    INTELLIGENCE
                  </span>
                </div>

                <div className="matrix-selection" aria-live="polite">
                  <p className="eyebrow">{activeSkill.short} / ACTIVE DOMAIN</p>
                  <h3>{activeSkill.domain}</h3>
                  <p>{activeSkill.description}</p>
                </div>

                <p className="matrix-hint mono">
                  HOVER / TAP NODES · OR SELECT A DOMAIN FROM THE LIST
                </p>
              </div>

              <div className="skill-list">
                {skillGroups.map((group, index) => (
                  <div
                    className={`skill-group ${
                      selectedSkill === group.id ? "is-selected" : ""
                    }`}
                    key={group.id}
                  >
                    <button
                      className="skill-trigger"
                      aria-pressed={selectedSkill === group.id}
                      onClick={() => setSelectedSkill(group.id)}
                      onPointerEnter={(event) => {
                        if (event.pointerType === "mouse") {
                          setSelectedSkill(group.id);
                        }
                      }}
                      onFocus={() => setSelectedSkill(group.id)}
                      data-cursor="NODE"
                    >
                      <span className="mono">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{group.label}</span>
                      <span aria-hidden="true">↗</span>
                    </button>

                    <ul className="skill-tags">
                      {group.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="log"
          className="section container"
          aria-labelledby="log-title"
        >
          <div id="log-title">
            <SectionHeading
              index="04"
              eyebrow="ENGINEERING LOG &amp; PROFILE"
              title="Always building."
              accent="Always learning."
            >
              Formal academic rigor, continuous competitive problem solving, and hands-on systems delivery.
            </SectionHeading>
          </div>

          <div className="log-layout">
            {/* Authentic Developer Portrait & Detailed Info Card */}
            <ProfileCard />

            <ol className="timeline">
              <li className="timeline-item reveal">
                <div className="timeline-meta mono">
                  <span>CLASS OF 2028</span>
                  <span>EDUCATION</span>
                </div>
                <h3>Daffodil International University</h3>
                <p>B.Tech in Computer Science &amp; Engineering</p>
                <span className="mono muted">{identity.educationDetail}</span>
              </li>

              {experience.map((item) => (
                <li className="timeline-item reveal" key={item.title}>
                  <div className="timeline-meta mono">
                    <span>{item.period}</span>
                    <span>{item.type}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>

                  {item.type === "PRACTICE" && (
                    <div className="timeline-links">
                      <a
                        href={identity.profiles.leetcode}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="LEETCODE"
                      >
                        LeetCode profile ↗
                      </a>
                      <a
                        href={identity.profiles.codeforces}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="CODEFORCES"
                      >
                        Codeforces profile ↗
                      </a>
                    </div>
                  )}
                </li>
              ))}

              <li className="timeline-item reveal">
                <div className="timeline-meta mono">
                  <span>RECOGNITION</span>
                  <span>HONORS</span>
                </div>
                <h3>Science, recognized.</h3>
                <ul className="honors-list">
                  {honors.map((honor) => (
                    <li key={honor}>{honor}</li>
                  ))}
                </ul>
              </li>
            </ol>
          </div>
        </section>

        <section
          id="contact"
          className="section contact-section"
          aria-labelledby="contact-title"
        >
          <div className="container">
            <div className="contact-layout">
              <div className="contact-copy reveal">
                <p className="eyebrow">05 / OPEN A CONNECTION</p>
                <h2 id="contact-title">
                  A difficult problem?
                  <br />
                  <em>Let’s build.</em>
                </h2>
                <p>
                  Available for select software engineering roles, distributed systems, and AI projects.
                  Bring a meaningful challenge — I’ll bring an end-to-end mindset.
                </p>

                <a
                  className="contact-email"
                  href={`mailto:${identity.email}`}
                  data-cursor="MAIL"
                >
                  {identity.email} <span aria-hidden="true">↗</span>
                </a>

                <div className="social-links" aria-label="Social profiles">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label}, opens in a new tab`}
                      data-cursor={social.mark}
                    >
                      <span className="social-mark mono" aria-hidden="true">
                        {social.mark}
                      </span>
                      {social.label}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="reveal">
                <Terminal />
                <p className="console-note mono">
                  NO TRACKERS. NO CONTACT DATABASE. JUST A DIRECT CONNECTION.
                </p>
              </div>
            </div>

            <footer className="site-footer mono">
              <a className="logo" href="#top" aria-label="Back to top" data-cursor="TOP">
                PB<span>.</span>
              </a>
              <span>
                © {new Date().getFullYear()} {identity.name.toUpperCase()}
              </span>
              <span>DHAKA, BANGLADESH</span>
              <a href="#top" data-cursor="TOP">BACK TO TOP ↑</a>
            </footer>
          </div>
        </section>
      </main>

      <ShowreelModal
        isOpen={isReelOpen}
        onClose={() => setIsReelOpen(false)}
      />
    </div>
  );
}

export default function App() {
  const isResume = new URLSearchParams(window.location.search).get("resume") === "1";
  return isResume ? <Resume /> : <Portfolio />;
}