'use client';

import React, { useRef, useMemo, useEffect, useLayoutEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import * as THREE from 'three';

/**
 * Cinematic 3D background, scroll-driven like joseph-san.com.
 *
 * Performance notes (kept "buttery smooth" despite the effects):
 *  - One passive scroll listener + one spring-damped value (no React state churn in the loop).
 *  - Every heavy renderable uses INSTANCED meshes (single draw call each): a 90-node
 *    data grid and a 150-star field.
 *  - Geometries/materials are memoized once.
 *  - DPR is capped at 1.5; GPU prefers "high-performance".
 *  - Postprocessing passes are intentionally low-strength (bloom is the only "heavy" pass).
 */

const SECTION_COUNT = 6;
const NODE_COUNT = 90;
const PARTICLE_COUNT = 150;

// Easing matching joseph-san's in-out curve.
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

// Palette: website / software-development themed accents (gold/cyan/violet/emerald).
const PALETTE = ['#fbbf24', '#22d3ee', '#a855f7', '#34d399', '#8b5cf6', '#c084fc'];

// ---------------------------------------------------------------
// Static scene data, precomputed once at import time.
// Doing this at module scope (not inside useMemo) keeps the components
// pure — React's render must not call Math.random — and avoids
// recomputing geometry every mount.
// ---------------------------------------------------------------
interface NodeData {
  targets: THREE.Vector3[];
  scatters: THREE.Vector3[];
  sections: number[];
  colors: THREE.Color[];
}

function makeNodeData(): NodeData {
  const targets: THREE.Vector3[] = [];
  const scatters: THREE.Vector3[] = [];
  const sections: number[] = [];
  const colors: THREE.Color[] = [];

  const add = (t: THREE.Vector3, sec: number, c: string) => {
    targets.push(t);
    scatters.push(
      t.clone().add(
        new THREE.Vector3(
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 5,
          -11 - Math.random() * 7
        )
      )
    );
    sections.push(sec);
    colors.push(new THREE.Color(c));
  };

  for (let i = 0; i < 30; i++) {
    add(
      new THREE.Vector3(-3.8 + (Math.random() - 0.5) * 0.6, -2.2 + i * 0.15, -3 + (Math.random() - 0.5) * 0.6),
      1.0,
      PALETTE[i % PALETTE.length]
    );
  }
  for (let i = 0; i < 30; i++) {
    const a = (i / 30) * Math.PI * 2;
    add(
      new THREE.Vector3(Math.cos(a) * 2.6 + 0.2, Math.sin(a) * 2.6, -8 + (Math.random() - 0.5)),
      2.2,
      PALETTE[(i + 1) % PALETTE.length]
    );
  }
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 6; j++) {
      add(
        new THREE.Vector3(
          -3.2 + i * 1.6 + (Math.random() - 0.5) * 0.3,
          -1.5 + j * 0.7 + (Math.random() - 0.5) * 0.3,
          -15 + (Math.random() - 0.5) * 0.5
        ),
        3.6,
        PALETTE[(i + j) % PALETTE.length]
      );
    }
  }

  return { targets, scatters, sections, colors };
}

const NODE_DATA: NodeData = makeNodeData();

function makeStarPositions(): number[] {
  const arr: number[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    arr.push((Math.random() - 0.5) * 32, (Math.random() - 0.5) * 22, -6 - Math.random() * 28);
  }
  return arr;
}

const STAR_POSITIONS = makeStarPositions();

// ---------------------------------------------------------------
// Module-level scroll store.
// Updated by a single passive listener + a single useFrame. Zero React
// re-renders, so the 60fps loop stays free of jank.
// ---------------------------------------------------------------
const scrollStore = {
  raw: 0,
  smooth: 0,
  delta: 0,
  progress: 0, // 0..1 across the whole document
  section: 0, // progress * (SECTION_COUNT - 1), a float "scene index"
  max: 1,
};

function useScrollTicker() {
  useEffect(() => {
    const measure = () => {
      scrollStore.max = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
    };
    const onScroll = () => {
      scrollStore.raw = window.scrollY;
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, []);

  useFrame(() => {
    scrollStore.delta = scrollStore.raw - scrollStore.smooth;
    // Spring-damped scroll (mirrors joseph-san's 0.06 lerp feel).
    scrollStore.smooth += (scrollStore.raw - scrollStore.smooth) * 0.06;
    scrollStore.progress = clamp(scrollStore.smooth / scrollStore.max, 0, 1);
    scrollStore.section = scrollStore.progress * (SECTION_COUNT - 1);
  });

  return scrollStore;
}

// ---------------------------------------------------------------
// Camera: cinematic waypoints, one per section.
// Camera config matches joseph-san: fov 45, near 0.1, far 1000, start (0, 0.5, 7).
// Precomputed as Vector3 so the render loop does zero allocations.
// ---------------------------------------------------------------
const cameraWaypoints = [
  { pos: new THREE.Vector3(0, 0.5, 8), lookAt: new THREE.Vector3(0, 0, -2) },
  { pos: new THREE.Vector3(0.6, 1.1, 6.2), lookAt: new THREE.Vector3(0.3, 0.2, -4) },
  { pos: new THREE.Vector3(-3.0, 0.4, 5.8), lookAt: new THREE.Vector3(-2.0, 0, -6) },
  { pos: new THREE.Vector3(3.2, -0.3, 6.0), lookAt: new THREE.Vector3(1.8, -0.2, -8) },
  { pos: new THREE.Vector3(0, -0.9, 6.2), lookAt: new THREE.Vector3(0, -0.6, -10) },
  { pos: new THREE.Vector3(0, 0.5, 8), lookAt: new THREE.Vector3(0, 0, -12) },
];

const _tmpLook = new THREE.Vector3();

function CameraRig() {
  const { camera } = useThree();

  useFrame(() => {
    const p = clamp(scrollStore.section, 0, SECTION_COUNT - 1);
    const idx = Math.min(Math.floor(p), SECTION_COUNT - 2);
    const eased = easeInOutCubic(clamp(p - idx, 0, 1));

    camera.position.lerpVectors(
      cameraWaypoints[idx].pos,
      cameraWaypoints[idx + 1].pos,
      eased
    );

    _tmpLook.copy(cameraWaypoints[idx].lookAt).lerp(cameraWaypoints[idx + 1].lookAt, eased);
    camera.lookAt(_tmpLook);
    camera.updateMatrixWorld();
  });

  return null;
}

// ---------------------------------------------------------------
// Lights: ambient + two colored points + a scroll-reactive spotlight.
// ---------------------------------------------------------------
function CinematicLights() {
  const spotRef = useRef<THREE.PointLight>(null!);
  const spotColor = useMemo(() => new THREE.Color(PALETTE[0]), []);

  useFrame(() => {
    if (!spotRef.current) return;
    const s = scrollStore.section;

    // The spotlight orbits ahead of the camera, cycling palette per section.
    const phase = performance.now() * 0.0003;
    const radius = 4 + Math.sin(phase) * 0.6;
    const a = s * 0.9;
    spotRef.current.position.set(
      Math.cos(a + phase) * radius,
      0.4 + Math.sin(phase * 0.7) * 0.3,
      Math.sin(a + phase) * radius
    );

    // Shift spotlight hue across sections for a living, cinematic feel.
    spotColor.set(PALETTE[Math.floor(s) % PALETTE.length]);
    spotRef.current.color.lerpColors(spotRef.current.color, spotColor, 0.04);
  });

  return (
    <>
      <ambientLight intensity={0.45} color="#9ca3af" />
      <directionalLight
        position={[6, 10, 6]}
        intensity={0.9}
        color="#fbbf24"
        castShadow
      />
      <pointLight position={[5, 5, 5]} intensity={0.7} color="#fbbf24" />
      <pointLight position={[-5, -3, 3]} intensity={0.45} color="#22d3ee" />
      <pointLight ref={spotRef} intensity={0.6} color="#a855f7" distance={22} />
    </>
  );
}

// ---------------------------------------------------------------
// Data nodes: the signature joseph-san "scatter -> formation" reveal.
// 90 instanced icosahedra, scattered behind the camera, that fly into
// 3 code-themed clusters (column / ring / grid) as you scroll into each section.
// One draw call → negligible cost.
// ---------------------------------------------------------------
function DataNodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  const { targets, scatters, sections, colors } = NODE_DATA;

  const geo = useMemo(() => new THREE.IcosahedronGeometry(0.16, 0), []);
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        emissive: '#ffffff',
        emissiveIntensity: 0.28,
        toneMapped: true,
      }),
    []
  );

  // Enable per-instance vertex colors (one draw call, many colors).
  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (mesh) {
      mesh.instanceColor = new THREE.InstancedBufferAttribute(
        new Float32Array(NODE_COUNT * 3),
        3
      );
    }
  }, []);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const time = performance.now() * 0.001;
    const scroll = scrollStore.section;

    for (let i = 0; i < NODE_COUNT; i++) {
      const t = (scroll - sections[i]) / 1.3; // each cluster unfolds over ~1.3 section-units
      const k = clamp(t, 0, 1);
      const eased = k * k * (3 - 2 * k);

      // Fly in from the scattered position, then idle with a subtle wave.
      const tx = THREE.MathUtils.lerp(scatters[i].x, targets[i].x, eased) + Math.sin(time * 0.5 + i) * 0.03 * eased;
      const ty = THREE.MathUtils.lerp(scatters[i].y, targets[i].y, eased) + Math.cos(time * 0.4 + i * 1.3) * 0.03 * eased;
      const tz = THREE.MathUtils.lerp(scatters[i].z, targets[i].z, eased);

      dummy.position.set(tx, ty, tz);
      // Pop scale on reveal.
      dummy.scale.setScalar(clamp(eased * 0.9 + 0.1, 0, 1));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      color.copy(colors[i]).multiplyScalar(0.7 + eased * 0.35);
      mesh.setColorAt(i, color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geo, mat, NODE_COUNT]} />;
}

// ---------------------------------------------------------------
// Starfield: a distant field of instanced stars that breathe with scroll.
// ---------------------------------------------------------------
function Starfield() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const positions = STAR_POSITIONS;

  const geo = useMemo(() => new THREE.SphereGeometry(0.022, 6, 6), []);
  const mat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#6366f1', transparent: true, opacity: 0.55, depthWrite: false }),
    []
  );

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const time = performance.now() * 0.0003;
    const pulse = 1 + scrollStore.delta * 0.02;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const s = 0.5 + 0.5 * Math.sin(time + i * 0.9);
      dummy.position.set(
        positions[i * 3],
        positions[i * 3 + 1] + Math.sin(time * 0.4 + i) * 0.18 * s,
        positions[i * 3 + 2]
      );
      dummy.scale.setScalar(s * 0.9 * pulse);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geo, mat, PARTICLE_COUNT]} />;
}

// ---------------------------------------------------------------
// Central code sphere + a torus knot: slow rotation, scroll-reactive.
// ---------------------------------------------------------------
const MemoizedIcosahedron = React.memo(function Icosahedron() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.35, 1), []);
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1a1a2e',
        roughness: 0.22,
        metalness: 0.82,
        emissive: '#0a0a1f',
        emissiveIntensity: 0.45,
      }),
    []
  );

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.07;
    meshRef.current.rotation.y += delta * 0.11;
    const s = scrollStore.progress;
    meshRef.current.position.y = 0.6 + Math.sin(s * Math.PI) * 0.12;
  });

  return <mesh ref={meshRef} args={[geo, mat]} position={[0, 0.5, -1]} />;
});

const MemoizedTorusKnot = React.memo(function TorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const geo = useMemo(() => new THREE.TorusKnotGeometry(0.5, 0.15, 64, 8), []);
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2a2a3e',
        roughness: 0.28,
        metalness: 0.92,
        emissive: '#141428',
        emissiveIntensity: 0.5,
      }),
    []
  );

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x -= delta * 0.1;
    meshRef.current.rotation.z += delta * 0.08;
    const sp = scrollStore.smooth;
    meshRef.current.position.set(
      2.4 + Math.sin(sp * 0.0002) * 0.2,
      -0.7 + Math.cos(sp * 0.00015) * 0.12,
      -0.6
    );
  });

  return <mesh ref={meshRef} args={[geo, mat]} position={[2.5, -0.8, -0.5]} />;
});

const MemoizedSphere = React.memo(function Sphere({
  pos,
  color,
  emissive,
}: {
  pos: [number, number, number];
  color: string;
  emissive: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const geo = useMemo(() => new THREE.SphereGeometry(0.3, 16, 16), []);
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.15,
        metalness: 0.3,
        emissive,
        emissiveIntensity: 0.55,
      }),
    [color, emissive]
  );

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.position.y =
      pos[1] + Math.sin(performance.now() * 0.0009 + pos[0]) * 0.12;
  });

  return <mesh ref={meshRef} args={[geo, mat]} position={pos} />;
});

function SceneContent() {
  useScrollTicker();
  return (
    <>
      <CameraRig />
      <CinematicLights />
      <MemoizedIcosahedron />
      <MemoizedTorusKnot />
      <MemoizedSphere pos={[1.5, 1.2, -3]} color="#fbbf24" emissive="#fbbf24" />
      <MemoizedSphere pos={[-2, -0.8, -3]} color="#22d3ee" emissive="#22d3ee" />
      <DataNodes />
      <Starfield />
      <Preload all />

          <EffectComposer multisampling={0}>
        <Bloom
          mipmapBlur
          intensity={0.45}
          luminanceThreshold={0.75}
          luminanceSmoothing={0.05}
          radius={0.9}
        />
        <ChromaticAberration offset={[0.0005, 0.0005]} />
        <Noise opacity={0.025} />
        <Vignette offset={0.35} darkness={0.35} />
      </EffectComposer>
    </>
  );
}

// ---------------------------------------------------------------
// Scroll progress bar (mirrors the reference's right-edge scroll line).
// ---------------------------------------------------------------
function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const apply = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const pct = clamp(window.scrollY / max, 0, 1);
      if (ref.current) ref.current.style.transform = `scaleY(${pct})`;
    };
    apply();
    window.addEventListener('scroll', apply, { passive: true });
    window.addEventListener('resize', apply);
    return () => {
      window.removeEventListener('scroll', apply);
      window.removeEventListener('resize', apply);
    };
  }, []);
  return (
    <div className="fixed right-1 top-0 h-svh w-[3px] z-[50] bg-white/10">
      <div ref={ref} className="w-full h-1 bg-amber-400/80 origin-top transition-transform duration-150" />
    </div>
  );
}

function SceneFallback() {
  return (
    <div className="fixed inset-0 z-0 bg-[#0a0a0a]" aria-hidden="true" />
  );
}

export default function Scene3D({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          backgroundColor: '#0a0a0a',
        }}
      >
        <Suspense fallback={<SceneFallback />}>
          <Canvas
            dpr={[1, 1.5]}
            frameloop="always"
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: 'high-performance',
            }}
            camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0.5, 8] }}
            onCreated={({ scene, gl }) => {
              gl.toneMapping = THREE.NeutralToneMapping;
              gl.toneMappingExposure = 0.9;
              scene.background = new THREE.Color('#0a0a0a');
              scene.fog = new THREE.FogExp2('#0a0a0a', 0.03);
            }}
          >
            <SceneContent />
          </Canvas>
        </Suspense>
      </div>

      <ScrollProgress />

      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </>
  );
}
