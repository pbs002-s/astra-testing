import { useEffect } from "react";

export default function ShowreelModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Engineering Showreel"
      onClick={onClose}
    >
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title mono">
            <span className="accent">●</span> REEL / SYSTEM WORKFLOWS &amp; ARCHITECTURE
          </div>
          <button
            className="modal-close-button mono"
            onClick={onClose}
            aria-label="Close modal"
          >
            CLOSE [ESC] ✕
          </button>
        </div>

        <div className="modal-video-wrapper">
          <video
            className="modal-video"
            controls
            autoPlay
            playsInline
            src="/videos/motion-reel.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="modal-footer mono text-xs">
          <span>SOURCE: PRITAM BISWAS MOTION REEL · 2026 ARCHIVES</span>
          <a
            href="/videos/motion-reel.mp4"
            target="_blank"
            rel="noopener noreferrer"
            download
            className="text-link"
          >
            DOWNLOAD MP4 ↗
          </a>
        </div>
      </div>
    </div>
  );
}
