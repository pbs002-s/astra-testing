import { useState } from "react";
import { marqueeWords } from "../data";
import { useReducedMotion } from "../hooks";

/**
 * Continuous auto-scrolling technology marquee ticker.
 * Complies with WCAG 2.2.2 (Pause/Play button).
 * Respects prefers-reduced-motion.
 */
export default function SkillsMarquee({ words = marqueeWords }) {
  const reduced = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate words for a seamless infinite loop
  const displayWords = [...words, ...words];

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <div
      className={`marquee ${isPaused || reduced ? "is-paused" : ""}`}
      aria-label="Technology stack ticker"
      role="region"
    >
      <div className="marquee-fade marquee-fade-left" aria-hidden="true" />

      <div
        className="marquee-track"
        aria-hidden="true"
        style={{
          animationPlayState: isPaused || reduced ? "paused" : "running",
        }}
      >
        {displayWords.map((word, idx) => {
          const isSpecial = idx % 3 === 1;
          const isAccent = idx % 5 === 0;
          return (
            <span
              key={`${word}-${idx}`}
              className={`marquee-item ${isSpecial ? "item-outline" : ""} ${
                isAccent ? "item-accent" : ""
              }`}
            >
              {word}
              <span className="marquee-bullet" aria-hidden="true">
                ✦
              </span>
            </span>
          );
        })}
      </div>

      <div className="marquee-fade marquee-fade-right" aria-hidden="true" />

      {/* WCAG 2.2.2 Play/Pause Control */}
      <button
        type="button"
        className="marquee-pause"
        onClick={togglePause}
        aria-label={
          isPaused ? "Play technology marquee" : "Pause technology marquee"
        }
        aria-pressed={isPaused}
        title={isPaused ? "Play marquee" : "Pause marquee"}
        data-cursor={isPaused ? "PLAY" : "PAUSE"}
      >
        {isPaused ? (
          <span aria-hidden="true">▶</span>
        ) : (
          <span aria-hidden="true">❚❚</span>
        )}
      </button>
    </div>
  );
}
