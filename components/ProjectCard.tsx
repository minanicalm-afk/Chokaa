import Image from "next/image";
import Link from "next/link";
import { altFor } from "@/content/media";
import { site } from "@/content/site";
import type { WorkProject } from "@/lib/work";

export function sectorLabel(sector: string) {
  return site.sectors.find((item) => item.value === sector)?.label ?? sector;
}

export function ProjectCard({
  project,
  large = false,
}: {
  project: WorkProject;
  large?: boolean;
}) {
  const alt = altFor(project.coverImage, `${project.name}, ${project.location}`);
  const annotation = [project.scope[0], project.duration].filter(Boolean).join(" · ");

  return (
    <article className="group">
      <Link href={`/work/${project.slug}`} className="block">
        <div
          className={`relative overflow-hidden border border-limestone ${large ? "aspect-[3/2]" : "aspect-[4/3]"}`}
        >
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={alt}
              fill
              sizes={large ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
              className="object-cover transition duration-300 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
            />
          ) : null}
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl tracking-tight text-charcoal underline decoration-transparent decoration-1 underline-offset-8 transition group-hover:decoration-terracotta md:text-3xl">
            {project.name}
          </h3>
          {project.status === "ongoing" ? (
            <span className="meta shrink-0 text-muted">Ongoing</span>
          ) : null}
        </div>
        <p className="meta mt-2 text-muted">
          {sectorLabel(project.sector)} · {project.location} · {project.year}
        </p>
        <p className="mt-2 text-sm text-charcoal">
          {[project.role, project.contractBand, project.duration].filter(Boolean).join(" · ")}
        </p>
        {annotation ? (
          <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-muted opacity-0 transition-all duration-300 ease-out group-hover:max-h-24 group-hover:opacity-100 motion-reduce:max-h-24 motion-reduce:opacity-100">
            {annotation}
          </p>
        ) : null}
      </Link>
    </article>
  );
}
