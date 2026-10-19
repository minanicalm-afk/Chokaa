import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { sectorLabel } from "@/components/ProjectCard";
import { altFor } from "@/content/media";
import { site } from "@/content/site";
import { paragraphs } from "@/lib/utils";
import { getNextProject, getProjectBySlug, listProjectSlugs } from "@/src/db/queries";

type Params = { slug: string };

export async function generateStaticParams() {
  const rows = await listProjectSlugs();
  return rows.map((row) => ({ slug: row.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Work" };
  const description = paragraphs(project.summary)[0]?.slice(0, 155) ?? site.description;
  return {
    title: project.name,
    description,
    openGraph: project.coverImage ? { images: [project.coverImage] } : undefined,
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();
  const next = await getNextProject(project.slug);
  const facts = [
    ["Role", project.role],
    ["Duration", project.duration],
    ["Contract band", project.contractBand],
    ["Status", project.status === "ongoing" ? "Ongoing" : "Completed"],
    ["County", project.county],
  ] as const;

  return (
    <main>
      {project.coverImage ? (
        <div className="relative h-[70vh] min-h-[28rem] border-b border-limestone">
          <Image
            src={project.coverImage}
            alt={altFor(project.coverImage, `${project.name}, ${project.location}`)}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <article className="section">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <header className="lg:col-span-8">
            <p className="meta text-muted">
              {sectorLabel(project.sector)} · {project.location} · {project.year}
            </p>
            <h1 className="mt-4 font-display text-5xl tracking-tight leading-[1.05] md:text-7xl">
              {project.name}
            </h1>
            <div className="mt-8 space-y-5 text-base leading-relaxed md:text-lg">
              {paragraphs(project.summary).map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </header>

          <aside className="h-fit border border-limestone p-6 lg:sticky lg:top-28 lg:col-span-4">
            <p className="meta text-muted">Title block</p>
            <dl className="mt-4">
              {facts.map(([label, value]) =>
                value ? (
                  <div key={label} className="grid grid-cols-2 gap-3 border-t border-limestone py-3 text-sm">
                    <dt className="text-muted">{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ) : null,
              )}
            </dl>
          </aside>

          <div className="lg:col-span-8">
            <h2 className="font-display text-3xl tracking-tight">Scope</h2>
            <ul className="mt-6 border-t border-limestone">
              {project.scope.map((item) => (
                <li key={item} className="border-b border-limestone py-3 text-base leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {project.gallery.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-12">
              {project.gallery.map((src) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-limestone">
                  <Image
                    src={src}
                    alt={altFor(src, `${project.name}, ${project.location}`)}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}

          {project.beforeImage && project.afterImage ? (
            <div className="lg:col-span-8">
              <h2 className="font-display text-3xl tracking-tight">Before and after</h2>
              <p className="mt-3 max-w-xl text-muted">
                The same elevation. The line between the two photographs is a plumb line — drag it.
              </p>
              <div className="mt-6">
                <BeforeAfterSlider
                  before={project.beforeImage}
                  after={project.afterImage}
                  beforeAlt={altFor(project.beforeImage, `Before, ${project.name}`)}
                  afterAlt={altFor(project.afterImage, `After, ${project.name}`)}
                />
              </div>
            </div>
          ) : null}

          <div className="border-t border-limestone pt-10 lg:col-span-8">
            <h2 className="font-display text-3xl tracking-tight">Have a similar project?</h2>
            <p className="mt-3 max-w-xl text-muted">
              Tell us the place and the band. We will say whether it sits in the work we do.
            </p>
            <Link href="/contact" className="btn-primary mt-6">
              Request a quote
            </Link>
          </div>

          {next ? (
            <div className="border-t border-limestone pt-10 lg:col-span-12">
              <p className="meta text-muted">Next project</p>
              <Link href={`/work/${next.slug}`} className="mt-3 inline-block font-display text-4xl tracking-tight underline decoration-transparent underline-offset-8 hover:decoration-terracotta">
                {next.name}
              </Link>
              <p className="meta mt-2 text-muted">
                {next.location} · {next.year}
              </p>
            </div>
          ) : null}
        </div>
      </article>
    </main>
  );
}
