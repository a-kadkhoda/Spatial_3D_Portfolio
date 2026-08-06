"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface SceneProps {
  index: number;
  pointerRef: React.RefObject<{ x: number; y: number }>;
  opacity?: number;
  reducedMotion?: boolean;
}

const BG = 0x05060c;
const STAR_WHITE = 0xdce6ff;
const ACCENT = "#FF6B4D";
const ACCENT_2 = "#FFB36B";

const STAR_VERTEX = `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  varying float vTw;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float tw = 0.55 + 0.45 * sin(uTime * (0.5 + fract(aPhase) * 0.9) + aPhase);
    vTw = tw;
    gl_PointSize = min(aSize * (0.7 + 0.5 * tw) * (320.0 / -mv.z), 7.0);
    gl_Position = projectionMatrix * mv;
  }
`;

const STAR_FRAGMENT = `
  uniform vec3 uColor;
  uniform float uOp;
  varying float vTw;
  void main() {
    vec2 c = gl_PointCoord - vec2(0.5);
    float d = length(c);
    float m = smoothstep(0.5, 0.08, d);
    if (m < 0.01) discard;
    gl_FragColor = vec4(uColor, uOp * m * vTw);
  }
`;

function makeRng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface StarsProps {
  count: number;
  color: THREE.ColorRepresentation;
  sizeMin: number;
  sizeMax: number;
  op: number;
  still: boolean;
  seed: number;
}

function Stars({
  count,
  color,
  sizeMin,
  sizeMax,
  op,
  still,
  seed,
}: StarsProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const [positions, sizes, phases] = useMemo(() => {
    const random = makeRng(seed);
    const p = new Float32Array(count * 3);
    const s = new Float32Array(count);
    const ph = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      p[i * 3] = (random() - 0.5) * 560;
      p[i * 3 + 1] = (random() - 0.5) * 320;
      p[i * 3 + 2] = 100 - random() * 800;
      s[i] = sizeMin + random() * (sizeMax - sizeMin);
      ph[i] = random() * Math.PI * 2;
    }
    return [p, s, ph];
  }, [count, sizeMin, sizeMax, seed]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uOp: { value: op },
    }),
    [color, op],
  );

  useFrame(({ clock }) => {
    if (still || !materialRef.current) return;
    materialRef.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={STAR_VERTEX}
        fragmentShader={STAR_FRAGMENT}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface WireframeProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  opacity: number;
  still: boolean;
  spin: (mesh: THREE.Mesh, t: number) => void;
  children: React.ReactNode;
}

function Wireframe({
  position,
  rotation = [0, 0, 0],
  color,
  opacity,
  still,
  spin,
  children,
}: WireframeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (still || !meshRef.current) return;
    spin(meshRef.current, clock.elapsedTime);
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      {children}
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

function CameraRig({
  index,
  pointerRef,
  still,
}: Pick<SceneProps, "index" | "pointerRef"> & { still: boolean }) {
  useFrame(({ camera }) => {
    const targetZ = 40 - index * 70;
    camera.position.z += (targetZ - camera.position.z) * 0.045;

    const pointer = still ? { x: 0, y: 0 } : (pointerRef.current ?? { x: 0, y: 0 });
    camera.position.x += (pointer.x * 7 - camera.position.x) * 0.06;
    camera.position.y += (-pointer.y * 5 - camera.position.y) * 0.06;
  });

  return null;
}

export default function Scene({
  index,
  pointerRef,
  opacity = 0.5,
  reducedMotion = false,
}: SceneProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onVisibility = () =>
      setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const scale = useMemo(() => {
    const lowPower =
      window.innerWidth < 900 || (navigator.hardwareConcurrency ?? 8) <= 4;
    return lowPower ? 0.45 : 1;
  }, []);

  return (
    <Canvas
      frameloop={visible ? "always" : "never"}
      dpr={[1, 2]}
      camera={{ fov: 62, near: 0.1, far: 1400, position: [0, 0, 40] }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      fallback={null}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        opacity,
        transition: "opacity .5s ease",
      }}
    >
      <fogExp2 attach="fog" args={[BG, 0.0024]} />

      <CameraRig index={index} pointerRef={pointerRef} still={reducedMotion} />

      <Stars
        count={Math.round(1500 * scale)}
        color={STAR_WHITE}
        sizeMin={0.6}
        sizeMax={2.4}
        op={0.85}
        still={reducedMotion}
        seed={0x5eed}
      />
      <Stars
        count={Math.round(420 * scale)}
        color={ACCENT}
        sizeMin={1}
        sizeMax={3}
        op={0.9}
        still={reducedMotion}
        seed={0xa11a}
      />

      <Wireframe
        position={[36, 9, -160]}
        color={ACCENT}
        opacity={0.3}
        still={reducedMotion}
        spin={(mesh, t) => {
          mesh.rotation.y = t * 0.12;
          mesh.rotation.x = t * 0.07;
        }}
      >
        <icosahedronGeometry args={[15, 1]} />
      </Wireframe>

      <Wireframe
        position={[-38, -10, -330]}
        color={ACCENT_2}
        opacity={0.24}
        still={reducedMotion}
        spin={(mesh, t) => {
          mesh.rotation.y = -t * 0.1;
          mesh.rotation.z = t * 0.05;
        }}
      >
        <octahedronGeometry args={[11, 0]} />
      </Wireframe>

      <Wireframe
        position={[0, 2, -540]}
        rotation={[1.15, 0, 0]}
        color={ACCENT}
        opacity={0.3}
        still={reducedMotion}
        spin={(mesh, t) => {
          mesh.rotation.z = t * 0.06;
        }}
      >
        <torusGeometry args={[19, 0.14, 8, 100]} />
      </Wireframe>
    </Canvas>
  );
}
