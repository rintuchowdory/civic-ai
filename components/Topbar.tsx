import { Bell, Search } from "lucide-react";

export default function Topbar({ title, kicker }: { title: string; kicker?: string }) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-ink-line/60 bg-ink/70 backdrop-blur px-5 lg:px-8 py-4 sticky top-0 z-20">
      <div>
        {kicker && <p className="label-eyebrow">{kicker}</p>}
        <h1 className="font-display text-2xl font-semibold text-paper tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-paper/[0.04] border border-paper/10 rounded-sm px-3 py-1.5">
          <Search size={15} className="text-paper/40" />
          <input
            placeholder="Vorgang, Aktenzeichen, Behörde…"
            className="bg-transparent text-sm placeholder:text-paper/35 outline-none w-52"
          />
        </div>
        <button
          aria-label="Benachrichtigungen"
          className="relative p-2 rounded-sm border border-paper/10 hover:border-paper/25 transition-colors"
        >
          <Bell size={16} className="text-paper/70" />
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-stempel border border-ink" />
        </button>
      </div>
    </header>
  );
}
