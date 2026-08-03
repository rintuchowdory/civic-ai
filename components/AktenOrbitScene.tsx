"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Ring, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { vorgaenge } from "@/lib/mock-data";

const statusColor: Record<string, string> = {
  eingegangen: "#C9A66B",
  in_bearbeitung: "#5C82E8",
  frist_laeuft: "#C2453A",
  erledigt: "#5C8A5A",
};

function FileCard({
  index,
  total,
  aktenzeichen,
  status,
  animate,
}: {
  index: number;
  total: number;
  aktenzeichen: string;
  status: string;
  animate: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const angle = (index / total) * Math.PI * 2;
  const radius = 2.6;
  const baseY = Math.sin(index * 1.7) * 0.4;

  useFrame((state) => {
    if (!group.current || !animate) return;
    const t = state.clock.getElapsedTime();
    group.current.position.y = baseY + Math.sin(t * 0.45 + index) * 0.08;
    group.current.rotation.y = t * 0.1 + angle;
  });

  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const color = statusColor[status] ?? "#5C82E8";

  return (
    <group ref={group} position={[x, baseY, z]} rotation={[0, angle, 0]}>
      <RoundedBox args={[0.9, 1.2, 0.04]} radius={0.03} smoothness={2}>
        <meshStandardMaterial color="#F1E9D3" roughness={0.85} metalness={0.05} />
      </RoundedBox>
      <mesh position={[0, 0.46, 0.021]}>
        <boxGeometry args={[0.9, 0.14, 0.005]} />
        <meshStandardMaterial color={color} roughness={0.5} />
      </mesh>
      <Html
        transform
        position={[0, -0.3, 0.031]}
        distanceFactor={5.2}
        style={{ pointerEvents: "none", backfaceVisibility: "hidden" }}
      >
        <span
          style={{
            display: "block",
            width: "118px",
            textAlign: "center",
            color: "#131E33",
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: "12px",
            fontWeight: 500,
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {aktenzeichen}
        </span>
      </Html>
    </group>
  );
}

function Core({ animate }: { animate: boolean }) {
  const ring = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ring.current || !animate) return;
    ring.current.rotation.z = state.clock.getElapsedTime() * 0.045;
  });

  return (
    <group ref={ring}>
      <Ring args={[1.55, 1.6, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#5C82E8" transparent opacity={0.32} side={THREE.DoubleSide} />
      </Ring>
      <Ring args={[1.9, 1.92, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#C9A66B" transparent opacity={0.24} side={THREE.DoubleSide} />
      </Ring>
    </group>
  );
}

export default function AktenOrbitScene() {
  const cards = useMemo(() => vorgaenge, []);
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPreferences = () => {
      setIsMobile(mobileQuery.matches);
      setReduceMotion(motionQuery.matches);
    };

    syncPreferences();
    mobileQuery.addEventListener("change", syncPreferences);
    motionQuery.addEventListener("change", syncPreferences);

    return () => {
      mobileQuery.removeEventListener("change", syncPreferences);
      motionQuery.removeEventListener("change", syncPreferences);
    };
  }, []);

  const animate = !reduceMotion;

  return (
    <Canvas
      camera={{ position: [0, 1.6, 5.4], fov: 42 }}
      dpr={isMobile ? 1 : [1, 1.5]}
      gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
      resize={{ scroll: false, debounce: { scroll: 0, resize: 80 } }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 2]} intensity={1.05} color="#F1E9D3" />
      <pointLight position={[-3, -2, -2]} intensity={0.35} color="#5C82E8" />
      <Core animate={animate} />
      {cards.map((v, i) => (
        <FileCard
          key={v.id}
          index={i}
          total={cards.length}
          aktenzeichen={v.aktenzeichen}
          status={v.status}
          animate={animate}
        />
      ))}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={!reduceMotion}
        autoRotate={animate}
        autoRotateSpeed={isMobile ? 0.22 : 0.42}
        maxPolarAngle={Math.PI / 1.9}
        minPolarAngle={Math.PI / 2.6}
      />
    </Canvas>
  );
}
