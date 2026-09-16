import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import { skillGroups } from "../data";

const ACCENT = "#BE123C";

// Gentle, bounded deformation; this changes geometry, not DOM layout.
// One small shader and one particle draw call keep the hero inexpensive.
const vertexShader = `
  uniform float uTime;
  varying float vContour;

  void main() {
    float wave = sin(position.x * 3.4 + uTime * 0.55)
               * cos(position.y * 2.8 - uTime * 0.35);

    vec3 displaced = position + normal * wave * 0.045;
    vContour = wave * 0.5 + 0.5;

    gl_Position = projectionMatrix
                * modelViewMatrix
                * vec4(displaced, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uInk;
  uniform vec3 uAccent;
  varying float vContour;

  void main() {
    vec3 color = mix(uInk, uAccent, vContour * 0.22);
    gl_FragColor = vec4(color, 0.25);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function makeParticles(count) {
  let seed = 580;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const azimuth = random() * Math.PI * 2;
    const elevation = Math.acos(2 * random() - 1);
    const radius = 2.0 + random() * 1.25;

    positions[index * 3] =
      radius * Math.sin(elevation) * Math.cos(azimuth);
    positions[index * 3 + 1] =
      radius * Math.sin(elevation) * Math.sin(azimuth);
    positions[index * 3 + 2] = radius * Math.cos(elevation);
  }

  return positions;
}

function ContextGuard({ onContextLost }) {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    const handleLoss = (event) => {
      event.preventDefault();
      onContextLost();
    };

    canvas.addEventListener("webglcontextlost", handleLoss);
    return () =>
      canvas.removeEventListener("webglcontextlost", handleLoss);
  }, [gl, onContextLost]);

  return null;
}

function Core({ theme, reduced, active, interactionRef }) {
  const group = useRef(null);
  const particles = useRef(null);
  const elapsed = useRef(0);
  const targetCamera = useMemo(() => new THREE.Vector3(), []);
  const targetLook = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);
  const positions = useMemo(() => makeParticles(150), []);
  const ink = theme === "dark" ? "#F4F4F3" : "#111113";

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uInk: { value: new THREE.Color(ink) },
      uAccent: { value: new THREE.Color(ACCENT) },
    }),
    [ink],
  );

  useFrame(({ camera }, delta) => {
    if (!group.current || !active) return;

    if (reduced) {
      camera.position.set(0, 0, 6.5);
      camera.lookAt(0, 0, 0);
      group.current.rotation.set(0.25, -0.35, 0);
      return;
    }

    // Equivalent to lerp factor 0.05 at 60fps, but frame-rate independent.
    // Clamping delta avoids jumps after a suspended browser tab resumes.
    const dt = Math.min(delta, 0.05);
    const damping = 1 - Math.pow(0.95, dt * 60);
    const input = interactionRef.current;
    const depth = input.scroll;

    elapsed.current += dt;
    uniforms.uTime.value = elapsed.current;

    const rx = input.y * 0.22 + depth * 0.18 + 0.2;
    const ry = input.x * 0.34 + elapsed.current * 0.075;

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      rx,
      damping,
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      ry,
      damping,
    );

    group.current.position.y =
      Math.sin(elapsed.current * 0.55) * 0.07;

    // Scroll progresses the camera through a compact spatial trajectory.
    // The canvas pauses when offscreen; later sections use normal DOM flow.
    targetCamera.set(depth * 0.7, depth * -0.25, 6.5 + depth * 1.5);
    targetLook.set(depth * -0.15, depth * 0.1, 0);
    camera.position.lerp(targetCamera, damping);
    look.lerp(targetLook, damping);
    camera.lookAt(look);

    if (particles.current) {
      particles.current.rotation.y = -elapsed.current * 0.025;
    }
  });

  return (
    <>
      <group ref={group} rotation={[0.25, -0.35, 0]}>
        <mesh>
          <icosahedronGeometry args={[1.45, 2]} />
          <shaderMaterial
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
            wireframe
            transparent
            depthWrite={false}
          />
        </mesh>

        <mesh rotation={[0.25, 0.3, 0.2]}>
          <icosahedronGeometry args={[1.64, 0]} />
          <meshBasicMaterial
            color={ink}
            wireframe
            transparent
            opacity={0.64}
          />
        </mesh>

        <mesh rotation={[Math.PI / 2.7, 0.3, -0.3]}>
          <torusGeometry args={[2.13, 0.006, 4, 100]} />
          <meshBasicMaterial color={ink} transparent opacity={0.35} />
        </mesh>

        <mesh rotation={[0.3, Math.PI / 2.5, 0.4]}>
          <torusGeometry args={[2.3, 0.006, 4, 100]} />
          <meshBasicMaterial color={ink} transparent opacity={0.2} />
        </mesh>

        <mesh position={[1.5, 0.8, 0.3]}>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshBasicMaterial color={ACCENT} />
        </mesh>

        <mesh>
          <octahedronGeometry args={[0.38, 0]} />
          <meshBasicMaterial color={ACCENT} wireframe />
        </mesh>
      </group>

      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={ink}
          size={0.023}
          transparent
          opacity={0.34}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </>
  );
}

function SkillMatrix({ theme, selected, onSelect, reduced, active }) {
  const group = useRef(null);
  const ink = theme === "dark" ? "#F4F4F3" : "#111113";
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    if (!group.current || reduced || !active) return;
    elapsed.current += Math.min(delta, 0.05);
    group.current.rotation.y = Math.sin(elapsed.current * 0.18) * 0.1;
    group.current.rotation.x = Math.cos(elapsed.current * 0.15) * 0.04;
  });

  const connections = useMemo(() => {
    const result = [];
    skillGroups.forEach((a, i) => {
      skillGroups.slice(i + 1).forEach((b) => {
        result.push({ a, b });
      });
    });
    return result;
  }, []);

  return (
    <group ref={group}>
      {connections.map(({ a, b }) => {
        const highlighted = selected === a.id || selected === b.id;
        return (
          <Line
            key={`${a.id}-${b.id}`}
            points={[a.position, b.position]}
            color={highlighted ? ACCENT : ink}
            transparent
            opacity={highlighted ? 0.48 : 0.12}
            lineWidth={1}
          />
        );
      })}

      <mesh rotation={[0.4, 0.4, 0]}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshBasicMaterial
          color={ink}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      {skillGroups.map((skill) => {
        const isSelected = selected === skill.id;

        return (
          <group key={skill.id} position={skill.position}>
            {/* Larger invisible hit areas make the nodes usable on touch. */}
            <mesh
              onPointerOver={(event) => {
                event.stopPropagation();
                onSelect(skill.id);
              }}
              onClick={(event) => {
                event.stopPropagation();
                onSelect(skill.id);
              }}
            >
              <sphereGeometry args={[0.55, 12, 12]} />
              <meshBasicMaterial
                transparent
                opacity={0}
                depthWrite={false}
                colorWrite={false}
              />
            </mesh>

            <mesh
              rotation={[0.5, 0.3, 0.2]}
              scale={isSelected ? 1.14 : 1}
            >
              <icosahedronGeometry args={[0.3, 0]} />
              <meshBasicMaterial
                color={isSelected ? ACCENT : ink}
                wireframe
                transparent
                opacity={isSelected ? 1 : 0.65}
              />
            </mesh>

            {isSelected && (
              <mesh rotation={[0.25, 0, 0]}>
                <torusGeometry args={[0.49, 0.008, 4, 48]} />
                <meshBasicMaterial color={ACCENT} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

export default function Scene({
  kind,
  theme,
  reduced,
  active,
  interactionRef,
  selected,
  onSelect,
  onContextLost,
}) {
  const [dpr, setDpr] = useState(() =>
    Math.min(window.devicePixelRatio || 1, 2),
  );

  return (
    <Canvas
      dpr={dpr}
      frameloop={active && !reduced ? "always" : "demand"}
      camera={{
        position: [0, 0, kind === "hero" ? 6.5 : 5.6],
        fov: kind === "hero" ? 45 : 43,
        near: 0.1,
        far: 30,
      }}
      gl={{
        alpha: true,
        antialias: dpr < 1.5,
        powerPreference: "high-performance",
        stencil: false,
      }}
      style={{ touchAction: "pan-y" }}
    >
      <ContextGuard onContextLost={onContextLost} />

      <PerformanceMonitor
        bounds={() => [45, 58]}
        flipflops={2}
        onDecline={() => setDpr(1)}
        onFallback={() => setDpr(1)}
      >
        {kind === "hero" ? (
          <Core
            theme={theme}
            reduced={reduced}
            active={active}
            interactionRef={interactionRef}
          />
        ) : (
          <SkillMatrix
            theme={theme}
            selected={selected}
            onSelect={onSelect}
            reduced={reduced}
            active={active}
          />
        )}
      </PerformanceMonitor>
    </Canvas>
  );
}