import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProcurementForm } from "@/components/ProcurementForm";
import { altFor } from "@/content/media";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Procurement",
  description: `NCA, KRA, DOSHS, insurance, and personnel facts for tender committees evaluating ${site.name}.`,
};

const facts: Array<[string, string]> = [
  ["NCA registration", `${site.nca.number} · ${site.nca.category}`],
  ["Company registration", site.registration.companyNumber],
  ["KRA PIN", `${site.registration.kraPin} · ${site.compliance.kra}`],
  ["DOSHS", site.compliance.doshs],
  ["Insurance", site.compliance.insurance],
  ["Regions of operation", site.counties.join(", ")],
  ["References", "Available on request, against a named tender."],
];

export default function ProcurementPage() {
  return (
    <main className="section">
      <div className="shell">
        <p className="eyebrow text-muted">Tender committees</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl tracking-tight leading-[1.05] md:text-7xl">
          For procurement teams.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          The facts a bid needs, in one place. Numbers marked as placeholders will be replaced with the registered certificates before a live tender.
        </p>

        <div className="mt-10 grid items-end gap-8 lg:grid-cols-12">
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-limestone lg:col-span-7">
            <Image
              src="/images/nakuru-road.jpg"
              alt={altFor("/images/nakuru-road.jpg", "Access road and drain")}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover object-[center_70%]"
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-sm leading-relaxed text-muted">
              Civil works, houses, and fit-outs. The photograph is an access road and drain of the kind named in a typical civil bill.
            </p>
            <Link href={site.capabilityStatementHref} className="btn-primary mt-6">
              Open the capability statement
            </Link>
          </div>
        </div>

        <dl className="mt-14 border-t border-limestone">
          {facts.map(([label, value]) => (
            <div key={label} className="grid gap-2 border-b border-limestone py-5 md:grid-cols-12">
              <dt className="meta text-muted md:col-span-4">{label}</dt>
              <dd className="text-lg md:col-span-8">{value}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl tracking-tight">Key personnel</h2>
            <ul className="mt-6 space-y-5">
              {site.team.map((person) => (
                <li key={person.role}>
                  <p className="font-display text-2xl tracking-tight">{person.name}</p>
                  <p className="text-sm">{person.role}</p>
                  <p className="text-sm text-muted">{person.qualification}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="font-display text-3xl tracking-tight">Plant and equipment</h2>
            <ul className="mt-6 border-t border-limestone">
              {site.plant.map((item) => (
                <li key={item} className="border-b border-limestone py-3">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">
              Hired plant is named in the programme for the specific tender. This list is the standing set.
            </p>
          </div>
        </section>

        <section className="mt-20 grid gap-10 border-t border-limestone pt-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-3xl tracking-tight">Request the full bid pack.</h2>
            <p className="mt-3 leading-relaxed text-muted">
              Name, organisation, email, and the tender reference. We send the pack to the address you give.
            </p>
          </div>
          <div className="lg:col-span-8">
            <ProcurementForm />
          </div>
        </section>
      </div>
    </main>
  );
}
