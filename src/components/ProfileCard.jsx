import { useRef } from "react";
import { identity, metrics } from "../data";

export default function ProfileCard() {
  const cardRef = useRef(null);

  const handlePointerMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <div
      ref={cardRef}
      className="profile-card reveal"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-cursor="PRITAM"
    >
      {/* Topline metadata */}
      <div className="profile-card-topline mono">
        <span className="profile-id-tag">
          <span className="accent">PB</span> / ENGINEER ID // 2028
        </span>
        <span className="profile-live-status">
          <span className="live-ping-dot" />
          <span>ONLINE · DHAKA (UTC+6)</span>
        </span>
      </div>

      {/* Image and quick badges */}
      <div className="profile-media-container">
        <div className="profile-photo-wrapper">
          <img
            src={identity.photo}
            alt={`Portrait of ${identity.name}`}
            className="profile-photo"
            loading="lazy"
            width="480"
            height="580"
          />
          <div className="profile-photo-overlay" />
        </div>

        {/* Floating Telemetry Chips */}
        <div className="profile-chips-overlay mono">
          <div className="profile-chip chip-1">
            <span className="chip-dot" />
            <span>352+ COMMITS / YR</span>
          </div>
          <div className="profile-chip chip-2">
            <span>23 ★ STARS EARNED</span>
          </div>
          <div className="profile-chip chip-3">
            <span>DIU CSE · CLASS OF 2028</span>
          </div>
        </div>
      </div>

      {/* Detailed Info */}
      <div className="profile-details">
        <div className="profile-header-info">
          <div className="profile-names">
            <h3 className="profile-full-name">{identity.name}</h3>
            <span className="profile-handle mono">@{identity.handle}</span>
          </div>
          <p className="profile-role-headline">{identity.role}</p>
        </div>

        <div className="profile-edu-box mono text-xs">
          <span className="accent">INSTITUTION:</span> {identity.education}
          <div className="muted">{identity.educationDetail}</div>
        </div>

        <p className="profile-bio-summary">{identity.bio}</p>

        {/* Action buttons */}
        <div className="profile-actions">
          <a
            href={identity.cvPdf}
            download
            className="button button-primary profile-cv-btn"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="DOWNLOAD"
          >
            <span>Download Official CV (PDF)</span>
            <span aria-hidden="true">↓</span>
          </a>

          <a
            href={identity.profiles.github}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-secondary profile-gh-btn"
            data-cursor="GITHUB"
          >
            <span>GitHub Profile</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
