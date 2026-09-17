import { useEffect, useState } from "react";
import { identity } from "../data";

const ROLES = [
  "Full-Stack Engineer",
  "App & Web Developer",
  "AI Systems & Transformer Explorer",
  "Autonomous Agent Builder",
  "Competitive Programmer (LeetCode & Codeforces)",
  "Distributed Architecture Specialist",
];

export default function RoleTypewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    if (!isDeleting && displayText === currentRole) {
      // Pause at full word
      const timeout = setTimeout(() => setIsDeleting(true), 2400);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === "") {
      // Switch to next word
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? currentRole.slice(0, prev.length - 1)
          : currentRole.slice(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <div className="role-typewriter mono" aria-label={`Current specialization: ${ROLES[roleIndex]}`}>
      <span className="typewriter-prefix muted">DISCIPLINE //</span>
      <span className="typewriter-text">{displayText}</span>
      <span className="typewriter-caret" aria-hidden="true">▍</span>
    </div>
  );
}
