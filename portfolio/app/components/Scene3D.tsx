'use client';

import React, { useRef, useMemo, useLayoutEffect, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import * as THREE from 'three';

const SECTION_COUNT = 6;
const NODE_COUNT = 60;
const PARTICLE_COUNT = 80;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

const TECH_PALETTE = ['#22d3ee', '#a855f7', '#34d399', '#6366f1', '#3b82f6', '#818cf8'];

interface NodeData {
  targets: THREE.Vector3[];
  scatters: THREE.Vector3[];
  sections: number[];
  colors: number[];
}

function makeNodeData(): NodeData {
  const targets: THREE.Vector3[] = [];
  const scatters: THREE.Vector3[] = [];
  const sections: number[] = [];
  const colors: number[] = [];

  const add = (t: THREE.Vector3, sec: number, c: number) => {
    targets.push(t);
    scatters.push(
      t.clone().add(
        new THREE.Vector3(
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
          -10 - Math.random() * 6
        )
      )
    );
    sections.push(sec);
    colors.push(c);
  };

  const col = (hex: string) => new THREE.Color(hex).getHex();

  for (let i = 0; i < 30; i++) {
    add(
      new THREE.Vector3(-3.2 + (Math.random() - 0.5) * 0.8, -2.0 + i * 0.14, -3 + (Math.random() - 0.5) * 0.8),
      1.0,
      col(TECH_PALETTE[i % TECH_PALETTE.length])
    );
  }
  for (let i = 0; i < 15; i++) {
    const a = (i / 15) * Math.PI * 2;
    add(
      new THREE.Vector3(Math.cos(a) * 2.2 + 0.2, Math.sin(a) * 2.2, -7 + (Math.random() - 0.5)),
      2.2,
      col(TECH_PALETTE[(i + 2) % TECH_PALETTE.length])
    );
  }
  for (let i = 0; i < 15; i++) {
    add(
      new THREE.Vector3(
        -2.4 + i * 0.35 + (Math.random() - 0.5) * 0.2,
        -1.2 + Math.random() * 2.4,
        -12 + (Math.random() - 0.5) * 0.8
      ),
      3.6,
      col(TECH_PALETTE[(i + 3) % TECH_PALETTE.length])
    );
  }

  return { targets, scatters, sections, colors };
}

const NODE_DATA: NodeData = makeNodeData();

const TECH_CHARS = ['<', '>', '/', '{', '}', '[', ']', '(', ')', '#', '*', ';', '='];

function makeParticleData(): { positions: number[]; chars: string[] } {
  const positions: number[] = [];
  const chars: string[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions.push(
      (Math.random() - 0.5) * 28,
      (Math.random() - 0.5) * 20,
      -5 - Math.random() * 25
    );
    chars.push(TECH_CHARS[Math.floor(Math.random() * TECH_CHARS.length)]);
  }
  return { positions, chars };
}

const PARTICLE_DATA = makeParticleData();

const scrollStore = {
  raw: 0,
  smooth: 0,
  progress: 0,
  section: 0,
  max: 1,
};

function useScrollTicker(invalidate: () => void) {
  useEffect(() => {
    const measure = () => {
      scrollStore.max = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
    };
    const onScroll = () => {
      scrollStore.raw = window.scrollY;
      invalidate();
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, [invalidate]);

  useFrame(() => {
    scrollStore.smooth += (scrollStore.raw - scrollStore.smooth) * 0.08;
    scrollStore.progress = clamp(scrollStore.smooth / scrollStore.max, 0, 1);
    scrollStore.section = scrollStore.progress * (SECTION_COUNT - 1);
  });

  return scrollStore;
}

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

function TechLights() {
  return (
    <>
      <ambientLight intensity={0.3} color="#1e1b4b" />
      <directionalLight position={[6, 10, 6]} intensity={0.7} color="#6366f1" />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#22d3ee" />
      <pointLight position={[-5, -3, 3]} intensity={0.35} color="#a855f7" />
    </>
  );
}

function TechNodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  const { targets, scatters, sections, colors } = NODE_DATA;

  const geo = useMemo(() => new THREE.OctahedronGeometry(0.12, 0), []);
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#22d3ee',
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
      }),
    []
  );

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
      const t = (scroll - sections[i]) / 1.3;
      const k = clamp(t, 0, 1);
      const eased = k * k * (3 - 2 * k);

      const tx = THREE.MathUtils.lerp(scatters[i].x, targets[i].x, eased) + Math.sin(time * 0.4 + i) * 0.04 * eased;
      const ty = THREE.MathUtils.lerp(scatters[i].y, targets[i].y, eased) + Math.cos(time * 0.35 + i * 1.2) * 0.04 * eased;
      const tz = THREE.MathUtils.lerp(scatters[i].z, targets[i].z, eased);

      dummy.position.set(tx, ty, tz);
      dummy.scale.setScalar(clamp(eased * 0.8 + 0.2, 0, 1));
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      color.setHex(colors[i]);
      color.multiplyScalar(0.6 + eased * 0.4);
      mesh.setColorAt(i, color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geo, mat, NODE_COUNT]} />;
}

function TechParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { positions } = PARTICLE_DATA;

  const geo = useMemo(() => new THREE.PlaneGeometry(0.18, 0.18), []);
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#818cf8',
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        side: THREE.DoubleSide,
      }),
    []
  );

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const time = performance.now() * 0.0003;
    const pulse = 1 + scrollStore.smooth * 0.0004;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const s = 0.4 + 0.6 * Math.sin(time + i * 1.1);
      dummy.position.set(
        positions[i * 3],
        positions[i * 3 + 1] + Math.sin(time * 0.3 + i) * 0.2 * s,
        positions[i * 3 + 2]
      );
      dummy.rotation.set(time * 0.5 + i, time * 0.3 + i, 0);
      dummy.scale.setScalar(s * 0.7 * pulse);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={meshRef} args={[geo, mat, PARTICLE_COUNT]} />;
}

const MemoizedWireTorus = React.memo(function WireTorus() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const geo = useMemo(() => new THREE.TorusKnotGeometry(0.55, 0.13, 64, 8), []);
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#6366f1',
        wireframe: true,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      }),
    []
  );

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.07;
    meshRef.current.rotation.y += delta * 0.11;
    meshRef.current.rotation.z += delta * 0.04;

    const t = performance.now() * 0.001;
    const angle = t * 0.4;
    meshRef.current.position.x = Math.cos(angle) * 1.2;
    meshRef.current.position.z = -1 + Math.sin(angle) * 1.2;
  });

  return <mesh ref={meshRef} args={[geo, mat]} position={[0, 0.5, -1]} />;
});

const MemoizedWireIco = React.memo(function WireIco() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.2, 1), []);
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#22d3ee',
        wireframe: true,
        transparent: true,
        opacity: 0.2,
        depthWrite: false,
      }),
    []
  );

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x -= delta * 0.05;
    meshRef.current.rotation.z += delta * 0.06;

    const t = performance.now() * 0.001;
    const angle = -t * 0.3;
    meshRef.current.position.x = Math.cos(angle) * 1.5;
    meshRef.current.position.z = -1 + Math.sin(angle) * 1.5;
  });

  return <mesh ref={meshRef} args={[geo, mat]} position={[0, 0.5, -1]} />;
});

const MemoizedFloatingHex = React.memo(function FloatingHex({
  pos,
  color,
  scale,
}: {
  pos: [number, number, number];
  color: string;
  scale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const geo = useMemo(() => new THREE.OctahedronGeometry(0.18, 0), []);
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
        depthWrite: false,
      }),
    [color]
  );

  useFrame(() => {
    if (!meshRef.current) return;
    const t = performance.now() * 0.001;
    meshRef.current.position.y =
      pos[1] + Math.sin(t * 0.8 + pos[0]) * 0.15;
    meshRef.current.rotation.x += 0.008;
    meshRef.current.rotation.y += 0.012;

    const orbit = t * 0.25 + pos[0] * 2;
    meshRef.current.position.x = pos[0] + Math.cos(orbit) * 0.25;
    meshRef.current.position.z = pos[2] + Math.sin(orbit) * 0.25;
  });

  return <mesh ref={meshRef} args={[geo, mat]} position={pos} scale={scale} />;
});

function FloatingHex({
  pos,
  color,
  scale,
}: {
  pos: [number, number, number];
  color: string;
  scale: number;
}) {
  return <MemoizedFloatingHex pos={pos} color={color} scale={scale} />;
}

function SceneContent({ invalidate }: { invalidate: () => void }) {
  useScrollTicker(invalidate);
  return (
    <>
      <CameraRig />
      <TechLights />
      <MemoizedWireIco />
      <MemoizedWireTorus />
      <FloatingHex pos={[2.0, 1.0, -3]} color="#a855f7" scale={1.2} />
      <FloatingHex pos={[-2.2, -0.6, -3]} color="#34d399" scale={1} />
      <FloatingHex pos={[1.0, -1.4, -4]} color="#fbbf24" scale={0.9} />
      <TechNodes />
      <TechParticles />
      <Preload all />
    </>
  );
}

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
    <div className="fixed right-1 top-0 h-svh w-[3px] z-[50] bg-white/5">
      <div
        ref={ref}
        className="w-full h-1 bg-cyan-400/70 origin-top"
        style={{ transition: 'transform 0.1s linear' }}
      />
    </div>
  );
}

function SceneFallback() {
  return (
    <div className="fixed inset-0 z-0 bg-[#0a0a0f]" aria-hidden="true" />
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
          backgroundColor: '#0a0a0f',
        }}
      >
        <Suspense fallback={<SceneFallback />}>
          <Canvas
            dpr={[1, 1]}
            frameloop="always"
            gl={{
              antialias: true,
              alpha: false,
              powerPreference: 'high-performance',
            }}
            camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0.5, 8] }}
            onCreated={({ gl }) => {
              gl.toneMapping = THREE.NeutralToneMapping;
              gl.toneMappingExposure = 0.9;
            }}
          >
            <SceneContent invalidate={() => {}} />
          </Canvas>
        </Suspense>
      </div>

      <ScrollProgress />

      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </>
  );
}
