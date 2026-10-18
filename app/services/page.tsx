import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlueprintHover, blueprintForSlug } from "@/components/BlueprintHover";
import { Estimator } from "@/components/Estimator";
import { altFor } from "@/content/media";
import { site } from "@/content/site";
import { firstSentence } from "@/lib/utils";
import { listServices } from "@/src/db/queries";

const serviceImage: Record<string, string> = {
  "boundary-wall-cost-kenya": "/images/karen-drive.jpg",
  "cabro-paving-nairobi": "/images/cabro-detail.jpg",
  "home-renovation-nairobi": "/images/kiambu-after.jpg",
  "commercial-fitout-nairobi": "/images/westlands-office.jpg",
  "civil-works": "/images/nakuru-road.jpg",
};

export const metadata: Metadata = {
  title: "Services",
  description: `Boundary walls, cabro, renovation, fit-out, and civil works by ${site.name}. Indicative bands, not guesses.`,
};

export default async function ServicesPage() {
  const services = await listServices();

  return (
    <main>
      <header className="shell pb-8 pt-16 md:pt-24">
        <p className="eyebrow text-muted">Scope of work</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl tracking-tight leading-[1.05] md:text-7xl">
          Five kinds of work, priced as bands.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          We publish ranges so you can tell, early, whether a job is in the right order of cost. A range is not a tender. Soil, access, and what you leave out will move it.
        </p>
      </header>

      <div className="shell">
        {services.map((service, index) => {
          const image = serviceImage[service.slug] ?? "/images/masonry-detail.jpg";
          const imageFirst = index % 2 === 0;
          return (
            <article
              key={service.id}
              className="group grid items-center gap-8 border-t border-limestone py-12 lg:grid-cols-12 lg:py-16"
            >
              <div className={`relative aspect-[16/10] border border-limestone lg:col-span-7 ${imageFirst ? "" : "lg:order-2"}`}>
                <Image
                  src={image}
                  alt={altFor(image, service.name)}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="relative lg:col-span-5">
                <BlueprintHover kind={blueprintForSlug(service.slug)} />
                <p className="meta text-muted">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 font-display text-4xl tracking-tight">{service.name}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                  {firstSentence(service.description)}
                </p>
                <p className="mt-4 text-sm text-charcoal">{service.costRange}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm underline decoration-terracotta underline-offset-4"
                >
                  View service
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <section className="section border-t border-limestone">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-4xl tracking-tight">A first number, before a site visit.</h2>
            <p className="mt-4 text-muted leading-relaxed">
              Choose the work, enter a quantity, and the server returns a band in Kenyan shillings. Leave a phone number only if you want the figure kept.
            </p>
          </div>
          <div className="lg:col-span-8">
            <Estimator />
          </div>
        </div>
      </section>
    </main>
  );
}
