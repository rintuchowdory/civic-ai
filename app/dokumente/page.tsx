import Topbar from "@/components/Topbar";
import DocumentLibrary from "@/components/DocumentLibrary";

export default function DokumentePage() {
  return (
    <>
      <Topbar kicker="AZ-06 · Archiv" title="Dokumente" />
      <main className="px-5 lg:px-8 py-6">
        <DocumentLibrary />
      </main>
    </>
  );
}
