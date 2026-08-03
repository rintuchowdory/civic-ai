"use client";

import { useMemo, useRef } from "react";
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
}: {
  index: number;
  total: number;
  aktenzeichen: string;
  status: string;
}) {
  const group = useRef<THREE.Group>(null);
  const angle = (index / total) * Math.PI * 2;
  const radius = 2.6;
  const baseY = Math.sin(index * 1.7) * 0.4;

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.position.y = baseY + Math.sin(t * 0.6 + index) * 0.12;
    group.current.rotation.y = t * 0.15 + angle;
  });

  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const color = statusColor[status] ?? "#5C82E8";

  return (
    <group ref={group} position={[x, baseY, z]}>
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

function Core() {
  const ring = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ring.current) return;
    ring.current.rotation.z = state.clock.getElapsedTime() * 0.08;
  });

  return (
    <group ref={ring}>
      <Ring args={[1.55, 1.6, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#5C82E8" transparent opacity={0.35} side={THREE.DoubleSide} />
      </Ring>
      <Ring args={[1.9, 1.92, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#C9A66B" transparent opacity={0.2} side={THREE.DoubleSide} />
      </Ring>
    </group>
  );
}

export default function AktenOrbitScene() {
  const cards = useMemo(() => vorgaenge, []);

  return (
    <Canvas
      camera={{ position: [0, 1.6, 5.4], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      resize={{ scroll: false, debounce: { scroll: 0, resize: 50 } }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 2]} intensity={1.1} color="#F1E9D3" />
      <pointLight position={[-3, -2, -2]} intensity={0.4} color="#5C82E8" />
      <Core />
      {cards.map((v, i) => (
        <FileCard
          key={v.id}
          index={i}
          total={cards.length}
          aktenzeichen={v.aktenzeichen}
          status={v.status}
        />
      ))}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        maxPolarAngle={Math.PI / 1.9}
        minPolarAngle={Math.PI / 2.6}
      />
    </Canvas>
  );
}
