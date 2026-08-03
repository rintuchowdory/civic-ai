"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  FileSearch,
  MessagesSquare,
  CalendarClock,
  FolderOpen,
} from "lucide-react";
import clsx from "clsx";

const items = [
  { href: "/", label: "Übersicht", icon: LayoutGrid },
  { href: "/briefe", label: "Briefe", icon: FileSearch },
  { href: "/chat", label: "Chat", icon: MessagesSquare },
  { href: "/fristen", label: "Fristen", icon: CalendarClock },
  { href: "/dokumente", label: "Dokumente", icon: FolderOpen },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-ink-soft/95 backdrop-blur border-t border-ink-line/60 flex justify-around py-2">
      {items.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "flex flex-col items-center gap-0.5 px-2 py-1 text-[10px]",
              active ? "text-amtsblau-bright" : "text-paper/45"
            )}
          >
            <Icon size={18} strokeWidth={1.75} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
