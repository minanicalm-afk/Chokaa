import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { QuoteForm } from "@/components/QuoteForm";
import { altFor } from "@/content/media";
import { site } from "@/content/site";
import { paragraphs } from "@/lib/utils";
import { toWorkProject } from "@/lib/work";
import {
  getServiceBySlug,
  listProjectsForService,
  listServiceSlugs,
} from "@/src/db/queries";

const serviceImage: Record<string, string> = {
  "boundary-wall-cost-kenya": "/images/masonry-detail.jpg",
  "cabro-paving-nairobi": "/images/cabro-detail.jpg",
  "home-renovation-nairobi": "/images/kiambu-after.jpg",
  "commercial-fitout-nairobi": "/images/westlands-office.jpg",
  "civil-works": "/images/nakuru-road.jpg",
};

type Params = { slug: string };

export async function generateStaticParams() {
  const rows = await listServiceSlugs();
  return rows.map((row) => ({ slug: row.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return { title: "Services" };
  return {
    title: service.name,
    description: paragraphs(service.description)[0]?.slice(0, 155) ?? site.description,
  };
}

export default async function ServicePage({ params }: { params: Params }) {
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();
  const related = (await listProjectsForService(service.slug)).slice(0, 3).map(toWorkProject);
  const image = serviceImage[service.slug] ?? "/images/masonry-detail.jpg";

  return (
    <main>
      <header className="shell grid items-end gap-10 pb-12 pt-16 md:pt-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow text-muted">{site.address.city} · {site.name}</p>
          <h1 className="mt-4 font-display text-5xl tracking-tight leading-[1.05] md:text-6xl">
            {service.name}
          </h1>
        </div>
        <p className="text-base leading-relaxed text-muted lg:col-span-5">{service.costRange}</p>
      </header>

      <div className="shell">
        <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-limestone">
          <Image
            src={image}
            alt={altFor(image, service.name)}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      <article className="section">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="space-y-5 text-base leading-relaxed md:text-lg lg:col-span-7">
            {paragraphs(service.description).map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
            <p className="text-sm text-muted">
              Indicative only. Final costs depend on site conditions, materials, and scope.
            </p>
          </div>
          <aside className="space-y-10 lg:col-span-5">
            <section>
              <h2 className="font-display text-3xl tracking-tight">What’s included</h2>
              <ul className="mt-4 border-t border-limestone">
                {service.includes.map((item) => (
                  <li key={item} className="border-b border-limestone py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="font-display text-3xl tracking-tight">Typical timeline</h2>
              <p className="mt-3 leading-relaxed text-muted">{service.timeline}</p>
            </section>
          </aside>

          {related.length > 0 ? (
            <div className="lg:col-span-12">
              <h2 className="font-display text-3xl tracking-tight">Related work</h2>
              <div className="mt-8 grid gap-10 md:grid-cols-3">
                {related.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          ) : null}

          <div className="grid gap-10 border-t border-limestone pt-12 lg:col-span-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="font-display text-3xl tracking-tight">Ask for a measured figure.</h2>
              <p className="mt-3 text-muted">
                The form records the page it came from, so we know you were reading about {service.name.toLowerCase()}.
              </p>
            </div>
            <div className="lg:col-span-8">
              <QuoteForm sourcePage={`/services/${service.slug}`} />
            </div>
          </div>
        </div>
      </article>

      <p className="shell pb-16 text-sm text-muted">
        <Link href="/services" className="underline decoration-terracotta underline-offset-4">
          All services
        </Link>
      </p>
    </main>
  );
}
