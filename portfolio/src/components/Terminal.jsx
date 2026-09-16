import { useEffect, useRef, useState } from "react";
import { identity, projects, skillGroups } from "../data";

const initialLines = [
  {
    id: 0,
    type: "system",
    text: "PB / CONNECT — local portfolio console",
  },
  {
    id: 1,
    type: "output",
    text: 'Type "help" for commands. Nothing here executes on your device.',
  },
];

export default function Terminal() {
  const [command, setCommand] = useState("");
  const [lines, setLines] = useState(initialLines);
  const [history, setHistory] = useState([]);
  const historyIndex = useRef(-1);
  const sequence = useRef(2);
  const outputRef = useRef(null);

  useEffect(() => {
    const output = outputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [lines]);

  function responseFor(input) {
    switch (input.toLowerCase()) {
      case "help":
        return [
          "about · projects · skills · github · leetcode · codeforces",
          "email · resume · clear · npm i @pritam/connect",
          "↑ / ↓ browse command history. Links below are directly clickable.",
        ];

      case "about":
        return [identity.role, identity.location, identity.bio];

      case "projects":
        return projects.map((project) => `${project.name} → ${project.github}`);

      case "skills":
        return skillGroups.map(
          (group) => `${group.label}: ${group.skills.join(", ")}`,
        );

      case "github":
        return [identity.profiles.github];

      case "leetcode":
        return [identity.profiles.leetcode];

      case "codeforces":
        return [identity.profiles.codeforces];

      case "email":
      case "npm i @pritam/connect":
        return [
          "Connection details ready. No package was installed.",
          `Email: ${identity.email}`,
          `GitHub: ${identity.profiles.github}`,
          identity.availability,
        ];

      case "resume":
        return [
          "Open the Résumé / CV link in the header.",
          "The print-ready page supports your browser’s Save as PDF option.",
        ];

      default:
        return [`Unknown command: ${input}`, 'Try "help".'];
    }
  }

  function submit(event) {
    event.preventDefault();
    const input = command.trim();
    if (!input) return;

    setHistory((previous) => [...previous.slice(-49), input]);
    historyIndex.current = -1;
    setCommand("");

    if (input.toLowerCase() === "clear") {
      setLines([]);
      return;
    }

    const next = [
      {
        id: sequence.current++,
        type: "command",
        text: `$ ${input}`,
      },
      ...responseFor(input).map((text) => ({
        id: sequence.current++,
        type: "output",
        text,
      })),
    ];

    // Bound the DOM size even after a long console session.
    setLines((previous) => [...previous, ...next].slice(-80));
  }

  function onKeyDown(event) {
    if (!["ArrowUp", "ArrowDown"].includes(event.key) || !history.length) {
      return;
    }

    event.preventDefault();

    if (event.key === "ArrowUp") {
      historyIndex.current = Math.min(
        historyIndex.current + 1,
        history.length - 1,
      );
    } else {
      historyIndex.current = Math.max(historyIndex.current - 1, -1);
    }

    setCommand(
      historyIndex.current < 0
        ? ""
        : history[history.length - 1 - historyIndex.current],
    );
  }

  return (
    <div className="terminal">
      <div className="terminal-title mono">
        <span className="terminal-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>pritam@dhaka: ~/connect</span>
        <span>LOCAL</span>
      </div>

      <div
        ref={outputRef}
        className="terminal-output"
        role="log"
        aria-label="Portfolio console output"
        aria-live="polite"
        aria-relevant="additions"
        tabIndex={0}
      >
        {lines.map((line) => (
          <p key={line.id} className={`terminal-line ${line.type}`}>
            {line.text}
          </p>
        ))}
      </div>

      <form onSubmit={submit} className="terminal-form">
        <span aria-hidden="true" className="terminal-prompt">
          $
        </span>
        <label className="sr-only" htmlFor="console-command">
          Portfolio console command
        </label>
        <input
          id="console-command"
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder="npm i @pritam/connect"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          maxLength={160}
          enterKeyHint="send"
        />
        <button type="submit" aria-label="Run portfolio console command">
          ↵
        </button>
      </form>
    </div>
  );
}