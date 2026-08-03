import type { Metadata } from "next";
import "@fontsource/barlow-condensed/500.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "CivicAI — Dein digitaler Behördenbegleiter",
  description:
    "CivicAI hilft dir, Behördenbriefe zu verstehen, Fristen einzuhalten und Anträge sicher zu stellen.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 min-w-0 pb-16 lg:pb-0">{children}</div>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
