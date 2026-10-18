"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { site } from "@/content/site";
import type { WorkProject } from "@/lib/work";

const ProjectMap = dynamic(() => import("@/components/ProjectMap"), {
  ssr: false,
  loading: () => <div className="h-[32rem] border border-limestone bg-limestone/40" />,
});

export function WorkBrowser({ projects }: { projects: WorkProject[] }) {
  const [sector, setSector] = useState<string>("all");
  const [county, setCounty] = useState<string>("all");
  const [view, setView] = useState<"grid" | "map">("grid");

  const visible = useMemo(
    () =>
      projects.filter((project) => {
        if (sector !== "all" && project.sector !== sector) return false;
        if (county !== "all" && project.county !== county) return false;
        return true;
      }),
    [projects, sector, county],
  );

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-limestone pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <FilterRow label="Sector">
            <FilterButton active={sector === "all"} onClick={() => setSector("all")}>
              All
            </FilterButton>
            {site.sectors.map((item) => (
              <FilterButton
                key={item.value}
                active={sector === item.value}
                onClick={() => setSector(item.value)}
              >
                {item.label}
              </FilterButton>
            ))}
          </FilterRow>
          <FilterRow label="County">
            <FilterButton active={county === "all"} onClick={() => setCounty("all")}>
              All
            </FilterButton>
            {site.counties.map((item) => (
              <FilterButton key={item} active={county === item} onClick={() => setCounty(item)}>
                {item}
              </FilterButton>
            ))}
          </FilterRow>
        </div>
        <div className="flex gap-2" role="group" aria-label="View">
          <FilterButton active={view === "grid"} onClick={() => setView("grid")}>
            Grid
          </FilterButton>
          <FilterButton active={view === "map"} onClick={() => setView("map")}>
            Map
          </FilterButton>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="py-20">
          <p className="font-display text-3xl tracking-tight">Nothing in this set.</p>
          <p className="mt-3 max-w-md text-muted">
            No project matches those filters. Clear them to see the full register.
          </p>
          <button
            type="button"
            className="mt-6 text-sm underline decoration-terracotta underline-offset-4"
            onClick={() => {
              setSector("all");
              setCounty("all");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : view === "map" ? (
        <div className="pt-8">
          <ProjectMap projects={visible} />
        </div>
      ) : (
        <div className="grid gap-x-8 gap-y-14 pt-10 sm:grid-cols-2">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="meta mr-2 w-16 text-muted">{label}</span>
      {children}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`border px-3 py-1.5 text-sm transition-colors duration-200 ${
        active
          ? "border-terracotta bg-charcoal text-ivory"
          : "border-limestone bg-transparent text-charcoal hover:border-charcoal"
      }`}
    >
      {children}
    </button>
  );
}
