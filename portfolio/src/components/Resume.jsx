import {
  experience,
  honors,
  identity,
  metrics,
  projects,
  skillGroups,
  socials,
} from "../data";

export default function Resume() {
  return (
    <main className="resume-page">
      <div className="resume-toolbar">
        <a className="button button-secondary" href="/">
          ← Portfolio
        </a>
        <a
          className="button button-secondary"
          href="/Pritam_Biswas_CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          Download PDF (Official CV) ↗
        </a>
        <button className="button button-primary" onClick={() => window.print()}>
          Print / Save PDF
        </button>
      </div>

      <article className="resume-sheet">
        <header>
          <p className="eyebrow">ENGINEERING / CURRICULUM VITAE</p>
          <h1>{identity.name}</h1>
          <p>{identity.role}</p>
          <p>
            {identity.location} ·{" "}
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
          </p>
          <div className="resume-links">
            {socials.map((social) => (
              <a key={social.label} href={social.href}>
                {social.label}: {social.href}
              </a>
            ))}
            <a href={identity.profiles.website}>
              Portfolio: {identity.profiles.website}
            </a>
          </div>
        </header>

        <section>
          <h2>Profile</h2>
          <p>{identity.bio}</p>
          <p className="resume-metrics">
            {metrics.map((metric) => `${metric.value} ${metric.label}`).join(" · ")}
          </p>
          <small>Metrics reflect the supplied portfolio snapshot.</small>
        </section>

        <section>
          <h2>Education</h2>
          <h3>{identity.education}</h3>
          <p>{identity.educationDetail}</p>
        </section>

        <section>
          <h2>Experience</h2>
          {experience.map((item) => (
            <div className="resume-item" key={item.title}>
              <h3>{item.title}</h3>
              <p className="mono">{item.period}</p>
              <p>{item.detail}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>Selected projects</h2>
          {projects.map((project) => (
            <div className="resume-item" key={project.id}>
              <h3>
                {project.name} — {project.subtitle}
              </h3>
              <p className="mono">
                {project.year} · {project.status}
                {project.openSource ? " · Open Source" : ""}
              </p>
              <p>{project.details}</p>
              <p>
                <strong>Stack:</strong> {project.stack.join(", ")}
              </p>
              <a href={project.github}>{project.github}</a>
            </div>
          ))}
        </section>

        <section>
          <h2>Technical capabilities</h2>
          {skillGroups.map((group) => (
            <p key={group.id}>
              <strong>{group.label}:</strong> {group.skills.join(", ")}
            </p>
          ))}
        </section>

        <section>
          <h2>Honors</h2>
          <ul>
            {honors.map((honor) => (
              <li key={honor}>{honor}</li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}