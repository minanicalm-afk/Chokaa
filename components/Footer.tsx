import Link from "next/link";
import { credentialLine, site, telHref } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-limestone pb-20">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl tracking-tight">{site.name}</p>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">
              {site.description}
            </p>
            <p className="meta mt-6 text-muted">{site.counties.join(" · ")}</p>
          </div>

          <div className="md:col-span-3">
            <p className="meta text-muted">Studio</p>
            <address className="mt-4 not-italic text-base leading-relaxed">
              {site.address.line1}
              <br />
              {site.address.area}, {site.address.city}
              <br />
              <a href={telHref()} className="underline decoration-limestone underline-offset-4 hover:decoration-terracotta">
                {site.phone.display}
              </a>
              <br />
              <a
                href={`mailto:${site.email}`}
                className="underline decoration-limestone underline-offset-4 hover:decoration-terracotta"
              >
                {site.email}
              </a>
            </address>
          </div>

          <div className="md:col-span-4">
            <p className="meta text-muted">Register</p>
            <ul className="mt-4 space-y-1 text-base leading-relaxed">
              {credentialLine.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {site.nca.category}. {site.compliance.kra}.
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-ochre pt-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-charcoal underline decoration-transparent decoration-1 underline-offset-4 hover:decoration-terracotta"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="text-sm text-charcoal underline decoration-transparent decoration-1 underline-offset-4 hover:decoration-terracotta"
              >
                Contact
              </Link>
            </nav>
            <p className="text-sm text-muted">
              © {year} {site.legalName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
