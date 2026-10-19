import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { altFor } from "@/content/media";
import { credentialLine, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} has built in Kenya since ${site.established}. NCA registered, DOSHS compliant, and insured.`,
};

export default function AboutPage() {
  return (
    <main>
      <header className="shell pb-10 pt-16 md:pt-24">
        <p className="eyebrow text-muted">Since {site.established}</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl tracking-tight leading-[1.05] md:text-7xl">
          A contractor that writes things down.
        </h1>
      </header>

      <div className="shell">
        <div className="relative aspect-[16/7] overflow-hidden rounded-2xl border border-limestone">
          <Image
            src="/images/site-foundation.jpg"
            alt={altFor("/images/site-foundation.jpg", "Foundation ready for concrete")}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_72%]"
          />
        </div>
      </div>

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <div className="space-y-5 text-base leading-relaxed md:text-lg lg:col-span-7">
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">Our story</h2>
            <p>
              {site.name} has been on Kenyan sites since {site.established}. The work is houses, the ground around them, and the occasional floor of an office block. We are based in {site.address.area}, {site.address.city}, and we travel to {site.counties.slice(1).join(", ")} when the job is one we know how to run.
            </p>
            <p>
              The practice is ordinary and, we think, too rare: a scope before a price, a programme before a start date, and a named person on site. Variations are priced before they are built. Retention has a date. If we are the wrong size of firm for the work, we say so at the first meeting.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-limestone lg:col-span-4 lg:col-start-9">
            <Image
              src="/images/masonry-detail.jpg"
              alt={altFor("/images/masonry-detail.jpg", "Stone and plaster detail")}
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-limestone">
        <div className="shell grid gap-10 py-16 md:grid-cols-12 md:py-24">
          <h2 className="font-display text-3xl tracking-tight md:col-span-4 md:text-4xl">Credentials</h2>
          <ul className="md:col-span-8">
            {[
              ["NCA number", site.nca.number],
              ["NCA category", site.nca.category],
              ["Company registration", site.registration.companyNumber],
              ["KRA PIN", site.registration.kraPin],
              ["DOSHS", site.compliance.doshs],
              ["Insurance", site.compliance.insurance],
              ["KRA", site.compliance.kra],
              ["Regions", site.counties.join(", ")],
            ].map(([label, value]) => (
              <li key={label} className="grid gap-2 border-t border-limestone py-4 sm:grid-cols-3">
                <span className="meta text-muted">{label}</span>
                <span className="sm:col-span-2">{value}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted md:col-span-8 md:col-start-5">
            {credentialLine.join(" · ")}. The registration numbers above are placeholders until the firm’s certificates replace them.
          </p>
        </div>
      </section>

      <section className="border-t border-limestone">
        <div className="shell py-16 md:py-24">
          <h2 className="font-display text-3xl tracking-tight md:text-4xl">The people who answer.</h2>
          <p className="mt-4 max-w-xl text-muted">
            Four roles. The names are placeholders for the real certificates and photographs.
          </p>
          <ul className="mt-10 grid gap-px bg-limestone sm:grid-cols-2 lg:grid-cols-4">
            {site.team.map((person) => (
              <li key={person.role} className="bg-ivory p-6">
                <p className="font-display text-5xl tracking-tight text-charcoal">
                  {person.name.split(" ").map((part) => part[0]).join("")}
                </p>
                <h3 className="mt-6 font-display text-2xl tracking-tight">{person.name}</h3>
                <p className="mt-1 text-sm">{person.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{person.qualification}</p>
              </li>
            ))}
          </ul>
          <Link
            href={site.capabilityStatementHref}
            className="mt-10 inline-block text-sm underline decoration-terracotta underline-offset-4"
          >
            Read the capability statement
          </Link>
        </div>
      </section>
    </main>
  );
}
