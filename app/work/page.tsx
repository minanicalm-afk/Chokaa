import type { Metadata } from "next";
import { WorkBrowser } from "@/components/WorkBrowser";
import { site } from "@/content/site";
import { toWorkProject } from "@/lib/work";
import { listProjects } from "@/src/db/queries";

export const metadata: Metadata = {
  title: "Work",
  description: `Houses, boundary walls, cabro drives, renovations, and fit-outs by ${site.name} across Kenya.`,
};

export default async function WorkPage() {
  const projects = (await listProjects()).map(toWorkProject);

  return (
    <main className="section">
      <div className="shell">
        <p className="eyebrow text-muted">Drawing register</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl tracking-tight leading-[1.05] md:text-7xl">
          Work, by place and by kind.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Seven jobs from Runda to Nyali. Filter by what was built and by county. The map uses the same set — a pin is a case study, not a sales pin.
        </p>
        <div className="mt-12">
          <WorkBrowser projects={projects} />
        </div>
      </div>
    </main>
  );
}
