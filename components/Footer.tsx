import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { site, telHref } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-limestone bg-white pb-24">
      <div className="shell py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-xl font-semibold tracking-tight">{site.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{site.description}</p>
            <Link href="/contact" className="btn-primary mt-6">
              Request a quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="md:col-span-3">
            <p className="text-sm font-medium">Visit</p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.area}, {site.address.city}
                </span>
              </li>
              <li>
                <a href={telHref()} className="inline-flex items-center gap-2.5 hover:underline">
                  <Phone className="h-4 w-4 text-muted" aria-hidden="true" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2.5 hover:underline">
                  <Mail className="h-4 w-4 text-muted" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-sm font-medium">Explore</p>
            <nav aria-label="Footer" className="mt-4 grid grid-cols-2 gap-y-2.5 text-sm">
              {site.nav.map((item) => (
                <Link key={item.href} href={item.href} className="text-muted hover:text-charcoal">
                  {item.label}
                </Link>
              ))}
              <Link href="/contact" className="text-muted hover:text-charcoal">
                Contact
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-limestone pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}
          </p>
          <p>
            {site.nca.number} · {site.counties.join(" · ")}
          </p>
        </div>
      </div>
    </footer>
  );
}
