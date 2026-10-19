import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { CredentialStrip } from "@/components/CredentialStrip";
import { ProcessSteps } from "@/components/ProcessSteps";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { altFor } from "@/content/media";
import { site, whatsappHref } from "@/content/site";
import { firstSentence, formatDate } from "@/lib/utils";
import { toWorkProject } from "@/lib/work";
import {
  getFeaturedTestimonial,
  listInsights,
  listProjects,
  listServices,
} from "@/src/db/queries";

export default async function HomePage() {
  const [featured, services, insights, testimonial] = await Promise.all([
    listProjects({ featured: true }),
    listServices(),
    listInsights(),
    getFeaturedTestimonial(),
  ]);
  const [lead, ...rest] = featured.map(toWorkProject);
  const latest = insights.slice(0, 3);

  return (
    <main>
      <section>
        <div className="relative h-[62vh] min-h-[280px] max-h-[720px] bg-limestone">
          <Image
            src="/images/runda-house.jpg"
            alt={altFor("/images/runda-house.jpg", "Completed house in Runda")}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_62%]"
          />
        </div>
        <div className="border-b border-limestone">
          <div className="shell py-10 md:py-16">
            <p className="eyebrow text-muted">
              {site.address.city} · Est. {site.established}
            </p>
            <h1 className="rise mt-4 max-w-4xl font-display text-5xl tracking-tight leading-[1.05] text-charcoal md:text-7xl">
              {site.tagline}
            </h1>
            <div className="rule-draw mt-6 h-px w-40 bg-terracotta" aria-hidden="true" />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/work" className="btn-line">
                View our work
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-primary">
                Request a quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CredentialStrip />

      <section className="section">
        <div className="shell">
          <SectionHeading eyebrow="Selected work" title="Recent drawings, built.">
            <p>
              Houses, walls, drives, and fit-outs in Nairobi, Kiambu, Nakuru, and on the coast.
              Each one has a scope, a duration, and a contract band — not a slogan.
            </p>
          </SectionHeading>
          {lead ? (
            <div className="mt-14 grid items-start gap-x-8 gap-y-14 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <ProjectCard project={lead} large />
              </div>
              <div className="flex flex-col gap-14 lg:col-span-5 lg:pt-28">
                {rest.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          ) : null}
          <Link href="/work" className="mt-12 inline-flex items-center gap-2 text-sm underline decoration-terracotta underline-offset-4">
            The full register <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="border-t border-limestone">
        <div className="shell py-16 md:py-24">
          <SectionHeading eyebrow="Services" title="What we take on." />
          <ul className="mt-10 border-b border-limestone">
            {services.map((service) => (
              <li key={service.id} className="border-t border-limestone">
                <Link
                  href={`/services/${service.slug}`}
                  className="group grid items-baseline gap-3 py-6 md:grid-cols-12"
                >
                  <span className="font-display text-2xl tracking-tight md:col-span-4 md:text-3xl">
                    {service.name}
                  </span>
                  <span className="text-base leading-relaxed text-muted md:col-span-7">
                    {firstSentence(service.description)}
                  </span>
                  <ArrowRight
                    className="hidden h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 md:col-span-1 md:justify-self-end md:inline"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section border-t border-limestone">
        <div className="shell">
          <SectionHeading eyebrow="How a job runs" title="Consult, approve, build, hand over.">
            <p>Four steps, with a duration you can hold us to. The programme is written down.</p>
          </SectionHeading>
          <ProcessSteps />
        </div>
      </section>

      {testimonial ? (
        <section className="bg-charcoal text-ivory">
          <div className="shell py-20 md:py-28">
            <blockquote>
              <p className="max-w-4xl font-display text-3xl leading-tight tracking-tight md:text-5xl">
                {testimonial.quote}
              </p>
              <footer className="meta mt-8 text-limestone">
                {testimonial.clientName} · {testimonial.projectLocation}
              </footer>
            </blockquote>
            <div className="mt-10 h-px w-24 bg-ochre" aria-hidden="true" />
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Insights" title="Notes from site." />
          </div>
          <ul className="lg:col-span-8">
            {latest.map((insight) => (
              <li key={insight.id} className="border-t border-limestone">
                <Link href={`/insights/${insight.slug}`} className="grid gap-2 py-6 md:grid-cols-12">
                  <span className="meta text-muted md:col-span-3">{formatDate(insight.publishedAt)}</span>
                  <span className="md:col-span-9">
                    <span className="block font-display text-2xl tracking-tight">{insight.title}</span>
                    <span className="mt-2 block text-muted">{insight.excerpt}</span>
                    <span className="meta mt-3 block text-muted">{insight.readingTime} min read</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-limestone">
        <div className="shell grid gap-8 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-5">
            <Image
              src="/images/site-foundation.jpg"
              alt={altFor("/images/site-foundation.jpg", "Foundation on red soil")}
              width={1200}
              height={675}
              className="h-auto w-full rounded-2xl border border-limestone object-cover"
            />
          </div>
          <div className="flex flex-col justify-end md:col-span-6 md:col-start-7">
            <h2 className="font-display text-4xl tracking-tight leading-tight md:text-5xl">
              Have a plot, a budget, and a vision?
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
              Start with the plot and the band you have in mind. We will tell you, plainly, whether we are the right contractor.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Start a conversation
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href={whatsappHref()} className="btn-line">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
