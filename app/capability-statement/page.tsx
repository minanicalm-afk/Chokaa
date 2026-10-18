import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Capability statement",
  description: `Registration, personnel, plant, and regions for ${site.legalName}.`,
};

export default function CapabilityPage() {
  return (
    <main className="section">
      <article className="shell max-w-3xl">
        <p className="eyebrow text-muted">Document</p>
        <h1 className="mt-4 font-display text-5xl tracking-tight leading-tight">Capability statement</h1>
        <p className="mt-4 text-muted">{site.legalName} · Est. {site.established}</p>
        <div className="mt-10 space-y-4 text-lg leading-relaxed">
          <p>
            {site.name} is a building contractor working from {site.address.area}, {site.address.city}. The firm takes residential building, renovation, commercial fit-out, boundary and paving work, and small civil packages.
          </p>
          <p>
            NCA {site.nca.number}, category {site.nca.category}. Company number {site.registration.companyNumber}. KRA PIN {site.registration.kraPin}. {site.compliance.doshs}. {site.compliance.insurance}. {site.compliance.kra}.
          </p>
          <p>Regions: {site.counties.join(", ")}.</p>
        </div>
        <h2 className="mt-12 font-display text-3xl tracking-tight">Personnel</h2>
        <ul className="mt-4 space-y-3">
          {site.team.map((person) => (
            <li key={person.role}>
              {person.name}, {person.role}. {person.qualification}.
            </li>
          ))}
        </ul>
        <h2 className="mt-12 font-display text-3xl tracking-tight">Plant</h2>
        <p className="mt-4">{site.plant.join("; ")}.</p>
        <p className="mt-10 text-sm text-muted">
          Replace this page with the signed PDF when the certificates are final. Print this sheet from the browser in the meantime.
        </p>
      </article>
    </main>
  );
}
