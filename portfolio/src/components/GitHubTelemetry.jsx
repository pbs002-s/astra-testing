import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { githubTelemetry as initialTelemetry } from "../data";
import { fetchLiveGitHubTelemetry } from "../services/github";

export default function GitHubTelemetry() {
  const [telemetry, setTelemetry] = useState(initialTelemetry);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const statsContainerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchLiveGitHubTelemetry().then((data) => {
      if (isMounted && data) {
        setTelemetry(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // GSAP Counter Animation
  useEffect(() => {
    const el = statsContainerRef.current;
    if (!el) return;

    const nums = el.querySelectorAll(".telemetry-counter-num");
    nums.forEach((numEl) => {
      const targetVal = parseInt(numEl.getAttribute("data-target"), 10);
      if (isNaN(targetVal)) return;

      const obj = { val: 0 };
      gsap.to(obj, {
        val: targetVal,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: numEl,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => {
          numEl.textContent = Math.round(obj.val);
        },
      });
    });
  }, [telemetry]);

  const categories = [
    { id: "all", label: "All Repos" },
    { id: "systems", label: "Systems & Distributed" },
    { id: "ai", label: "AI & Autonomous" },
    { id: "apps", label: "Apps & Web" },
    { id: "algorithms", label: "Algorithms" },
  ];

  const filteredRepos =
    filter === "all"
      ? telemetry.repos
      : telemetry.repos.filter((repo) => repo.category === filter);

  return (
    <div className="telemetry-wrapper reveal">
      {/* Live Status Bar */}
      <div className="telemetry-api-status-bar mono text-xs">
        <div className="api-status-indicator">
          <span className={`live-radar-dot ${telemetry.isLive ? "is-live" : "is-fallback"}`} />
          <span>
            {telemetry.isLive
              ? telemetry.fromCache
                ? "GITHUB REST API: VERIFIED CACHE SNAPSHOT"
                : "GITHUB REST API: LIVE STREAM CONNECTED"
              : "GITHUB REST API: BASELINE TELEMETRY ACTIVE"}
          </span>
        </div>
        <div className="api-metadata muted">
          {telemetry.lastUpdated && <span>SYNCED {telemetry.lastUpdated} · </span>}
          <span>RATE LIMIT SHIELD: ACTIVE</span>
        </div>
      </div>

      {/* Telemetry Header Stat Cards */}
      <div ref={statsContainerRef} className="telemetry-stats-grid">
        <div className="telemetry-stat-card">
          <span className="mono text-xs muted">ACTIVITY INDEX</span>
          <div className="telemetry-stat-num">
            <span
              className="telemetry-counter-num"
              data-target={telemetry.contributionsTotal}
            >
              {telemetry.contributionsTotal}
            </span>
            +
          </div>
          <span className="mono text-xs accent">COMMITS &amp; PRs / 1 YEAR</span>
        </div>

        <div className="telemetry-stat-card">
          <span className="mono text-xs muted">COMMUNITY STARS</span>
          <div className="telemetry-stat-num">
            <span
              className="telemetry-counter-num"
              data-target={telemetry.totalStars}
            >
              {telemetry.totalStars}
            </span>{" "}
            ★
          </div>
          <span className="mono text-xs muted">ACROSS REPOSITORIES</span>
        </div>

        <div className="telemetry-stat-card">
          <span className="mono text-xs muted">PUBLIC REPOSITORIES</span>
          <div className="telemetry-stat-num">
            <span
              className="telemetry-counter-num"
              data-target={telemetry.publicRepos}
            >
              {telemetry.publicRepos}
            </span>
          </div>
          <span className="mono text-xs muted">PRODUCTION &amp; OSS</span>
        </div>

        <div className="telemetry-stat-card">
          <span className="mono text-xs muted">GITHUB PROFILE</span>
          <div className="telemetry-stat-num text-lg">@{telemetry.username}</div>
          <a
            href={`https://github.com/${telemetry.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-xs text-link"
            data-cursor="GITHUB"
          >
            VIEW ON GITHUB ↗
          </a>
        </div>
      </div>

      {/* Language breakdown bar */}
      <div className="lang-bar-container">
        <div className="lang-bar-header mono text-xs">
          <span>PRIMARY LANGUAGES (BY VOLUME)</span>
          <span className="muted">TYPESCRIPT DOMINANT · KOTLIN SECONDARY</span>
        </div>
        <div className="lang-bar" role="progressbar" aria-label="Language distribution">
          {telemetry.languages.map((lang) => (
            <div
              key={lang.name}
              className="lang-segment"
              style={{
                width: `${lang.percent}%`,
                backgroundColor: lang.color,
              }}
              title={`${lang.name}: ${lang.percent}%`}
            />
          ))}
        </div>
        <div className="lang-legend">
          {telemetry.languages.map((lang) => (
            <div key={lang.name} className="lang-legend-item mono text-xs">
              <span
                className="lang-dot"
                style={{ backgroundColor: lang.color }}
              />
              <span>{lang.name}</span>
              <span className="muted">{lang.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="telemetry-filters">
        <span className="mono text-xs muted">FILTER REPOSITORIES:</span>
        <div className="filter-pills" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={filter === cat.id}
              className={`filter-pill mono ${
                filter === cat.id ? "is-active" : ""
              }`}
              onClick={() => setFilter(cat.id)}
              data-cursor="FILTER"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Repos Grid */}
      <div className="telemetry-repos-grid">
        {filteredRepos.map((repo) => (
          <a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="telemetry-repo-card"
            data-cursor="REPO"
          >
            <div className="repo-card-topline">
              <span className="repo-name mono">{repo.name}</span>
              <div className="repo-badges">
                {repo.commits !== undefined && (
                  <span className="commit-badge mono">
                    {repo.commits} commits
                  </span>
                )}
                {repo.stars > 0 && (
                  <span className="star-badge mono">★ {repo.stars}</span>
                )}
              </div>
            </div>

            <p className="repo-desc">{repo.desc}</p>

            <div className="repo-card-footer mono text-xs">
              <span className="repo-lang">
                <span
                  className="lang-dot"
                  style={{ backgroundColor: repo.langColor }}
                />
                {repo.lang}
              </span>
              <span className="repo-link-arrow">INSPECT ↗</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
