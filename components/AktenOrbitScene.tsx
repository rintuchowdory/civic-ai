"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Ring, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { vorgaenge } from "@/lib/mock-data";

const statusColor: Record<string, string> = {
  eingegangen: "#C9A66B",
  in_bearbeitung: "#5C82E8",
  frist_laeuft: "#C2453A",
  erledigt: "#5C8A5A",
};

function StaticOrbitFallback() {
  return (
    <div className="grid h-full w-full grid-cols-2 gap-4 p-8 place-items-center">
      {vorgaenge.map((v) => {
        const color = statusColor[v.status] ?? "#5C82E8";
        return (
          <div
            key={v.id}
            className="relative flex h-36 w-28 items-end justify-center rounded-sm border border-paper/20 bg-paper/[0.08] p-3 shadow-lg"
            style={{ transform: `rotate(${(v.id.charCodeAt(0) % 7) - 3}deg)` }}
          >
            <div
              className="absolute inset-x-0 top-0 h-2 rounded-t-sm"
              style={{ backgroundColor: color }}
            />
            <span className="font-mono text-[10px] text-paper/80">{v.aktenzeichen}</span>
          </div>
        );
      })}
    </div>
  );
}

function FileCard({
  index,
  total,
  status,
  animate,
}: {
  index: number;
  total: number;
  status: string;
  animate: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const lastFrame = useRef(0);
  const angle = (index / total) * Math.PI * 2;
  const radius = 2.6;
  const baseY = Math.sin(index * 1.7) * 0.4;

  useFrame((state) => {
    if (!group.current || !animate) return;
    const t = state.clock.getElapsedTime();
    if (t - lastFrame.current < 1 / 30) return;
    lastFrame.current = t;

    group.current.position.y = baseY + Math.sin(t * 0.35 + index) * 0.06;
    group.current.rotation.y = t * 0.07 + angle;
  });

  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const color = statusColor[status] ?? "#5C82E8";

  return (
    <group ref={group} position={[x, baseY, z]} rotation={[0, angle, 0]}>
      <RoundedBox args={[0.9, 1.2, 0.04]} radius={0.03} smoothness={1}>
        <meshStandardMaterial color="#F1E9D3" roughness={0.9} metalness={0} />
      </RoundedBox>
      <mesh position={[0, 0.46, 0.021]}>
        <boxGeometry args={[0.9, 0.12, 0.005]} />
        <meshStandardMaterial color={color} roughness={0.65} metalness={0} />
      </mesh>
    </group>
  );
}

function Core({ animate }: { animate: boolean }) {
  const ring = useRef<THREE.Group>(null);
  const lastFrame = useRef(0);

  useFrame((state) => {
    if (!ring.current || !animate) return;
    const t = state.clock.getElapsedTime();
    if (t - lastFrame.current < 1 / 30) return;
    lastFrame.current = t;
    ring.current.rotation.z = t * 0.03;
  });

  return (
    <group ref={ring}>
      <Ring args={[1.55, 1.6, 48]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#5C82E8" transparent opacity={0.28} side={THREE.DoubleSide} />
      </Ring>
      <Ring args={[1.9, 1.92, 48]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#C9A66B" transparent opacity={0.18} side={THREE.DoubleSide} />
      </Ring>
    </group>
  );
}

export default function AktenOrbitScene() {
  const cards = useMemo(() => vorgaenge, []);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const [isFirefox] = useState(() =>
    typeof navigator !== "undefined" && /firefox/i.test(navigator.userAgent),
  );

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(motionQuery.matches);

    syncMotion();
    motionQuery.addEventListener("change", syncMotion);

    return () => motionQuery.removeEventListener("change", syncMotion);
  }, []);

  if (isFirefox || contextLost) {
    return <StaticOrbitFallback />;
  }

  const animate = !reduceMotion;

  return (
    <Canvas
      camera={{ position: [0, 1.6, 5.4], fov: 42 }}
      dpr={1}
      frameloop="always"
      gl={{
        antialias: false,
        powerPreference: "default",
        preserveDrawingBuffer: false,
      }}
      resize={{ scroll: false, debounce: { scroll: 0, resize: 120 } }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(1);
        const canvas = gl.domElement;
        canvas.addEventListener(
          "webglcontextlost",
          (event) => {
            event.preventDefault();
            setContextLost(true);
          },
          { once: true },
        );
      }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 2]} intensity={0.9} color="#F1E9D3" />
      <Core animate={animate} />
      {cards.map((v, i) => (
        <FileCard
          key={v.id}
          index={i}
          total={cards.length}
          status={v.status}
          animate={animate}
        />
      ))}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={!reduceMotion}
        autoRotate={animate}
        autoRotateSpeed={0.25}
        maxPolarAngle={Math.PI / 1.9}
        minPolarAngle={Math.PI / 2.6}
      />
    </Canvas>
  );
}
