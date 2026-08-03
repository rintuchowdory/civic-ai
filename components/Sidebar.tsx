"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  FileSearch,
  MessagesSquare,
  Languages,
  FileEdit,
  CalendarClock,
  FolderOpen,
  ActivitySquare,
  ScrollText,
  Users,
} from "lucide-react";
import clsx from "clsx";

const nav = [
  { href: "/", label: "Übersicht", icon: LayoutGrid, az: "AZ-00" },
  { href: "/briefe", label: "Briefe analysieren", icon: FileSearch, az: "AZ-01" },
  { href: "/chat", label: "KI-Chat", icon: MessagesSquare, az: "AZ-02" },
  { href: "/uebersetzer", label: "Übersetzer", icon: Languages, az: "AZ-03" },
  { href: "/widerspruch", label: "Widerspruch erstellen", icon: FileEdit, az: "AZ-04" },
  { href: "/fristen", label: "Fristen", icon: CalendarClock, az: "AZ-05" },
  { href: "/dokumente", label: "Dokumente", icon: FolderOpen, az: "AZ-06" },
  { href: "/status", label: "Bearbeitungsstatus", icon: ActivitySquare, az: "AZ-07" },
  { href: "/rechte", label: "Rechte erklärt", icon: ScrollText, az: "AZ-08" },
  { href: "/terminvorbereitung", label: "Terminvorbereitung", icon: Users, az: "AZ-09" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:w-64 shrink-0 flex-col border-r border-ink-line/60 bg-ink-soft/40">
      <div className="px-5 py-6 border-b border-ink-line/60">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold tracking-tight text-paper">
            Civic<span className="text-amtsblau-bright">AI</span>
          </span>
        </div>
        <p className="mt-1 text-[11px] text-paper/45 font-mono">
          Dein digitaler Behördenbegleiter
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3">
        {nav.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "group relative flex items-center gap-3 px-5 py-2.5 text-sm transition-colors",
                active
                  ? "text-paper"
                  : "text-paper/55 hover:text-paper/90"
              )}
            >
              {active && (
                <span className="absolute left-0 top-0 h-full w-[3px] bg-akte-gold" />
              )}
              <Icon size={17} strokeWidth={1.75} className={clsx(active && "text-amtsblau-bright")} />
              <span className="font-body">{item.label}</span>
              <span className="ml-auto font-mono text-[9px] text-paper/25">{item.az}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-4 border-t border-ink-line/60">
        <div className="akte-card px-3 py-2.5">
          <p className="aktenzeichen">Angemeldet als</p>
          <p className="text-sm text-paper/85 mt-0.5">Rintu C.</p>
        </div>
      </div>
    </aside>
  );
}
