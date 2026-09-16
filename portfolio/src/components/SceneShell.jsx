import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { useVisibility } from "../hooks";

const Scene = lazy(() => import("./Scene"));

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") || canvas.getContext("webgl");

    if (!gl) return false;

    // Release the probe instead of consuming an additional WebGL context.
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

function Fallback({ kind }) {
  return (
    <div className={`scene-fallback ${kind}`} aria-hidden="true">
      <svg viewBox="0 0 500 400" fill="none">
        <g stroke="currentColor" strokeWidth="1">
          <path d="M250 35 405 145 355 325 145 325 95 145Z" />
          <path d="m250 35 105 290L95 145h310L145 325Z" />
          <path d="m250 35-105 290 260-180-50 180L95 145Z" />
          <ellipse cx="250" cy="200" rx="205" ry="100" />
          <ellipse cx="250" cy="200" rx="110" ry="178" />
        </g>
        <circle cx="250" cy="200" r="5" fill="#BE123C" />
      </svg>
      <span className="mono">ENGINEERING MATRIX / STATIC VIEW</span>
    </div>
  );
}

class SceneBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn("WebGL enhancement unavailable:", error.message);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function SceneShell({ kind, ...props }) {
  const ref = useRef(null);
  const { near, active } = useVisibility(ref);
  const [supported, setSupported] = useState(null);
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    if (near && supported === null) {
      setSupported(supportsWebGL());
    }
  }, [near, supported]);

  const fallback = <Fallback kind={kind} />;

  return (
    <div
      ref={ref}
      className={`scene-shell scene-${kind}`}
      aria-hidden="true"
    >
      {supported && !contextLost ? (
        <SceneBoundary fallback={fallback}>
          <Suspense fallback={fallback}>
            <Scene
              {...props}
              kind={kind}
              active={active}
              onContextLost={() => setContextLost(true)}
            />
          </Suspense>
        </SceneBoundary>
      ) : (
        fallback
      )}
    </div>
  );
}