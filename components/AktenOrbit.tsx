"use client";

import dynamic from "next/dynamic";

const AktenOrbitScene = dynamic(() => import("./AktenOrbitScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <p className="font-mono text-[11px] text-paper/30">Lade 3D-Visualisierung…</p>
    </div>
  ),
});

export default function AktenOrbit() {
  return (
    <div className="relative h-full w-full">
      <AktenOrbitScene />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink-soft/60 to-transparent" />
    </div>
  );
}
