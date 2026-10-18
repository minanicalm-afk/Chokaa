import type { Metadata } from "next";
import { MpesaPayButton } from "@/components/MpesaPayButton";
import { QuoteForm } from "@/components/QuoteForm";
import { site, telHref, whatsappHref } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Request a quote from ${site.name} in ${site.address.area}, ${site.address.city}. WhatsApp, phone, or the form.`,
};

export default function ContactPage() {
  const shortcode = process.env.MPESA_SHORTCODE;

  return (
    <main className="section">
      <div className="shell">
        <p className="eyebrow text-muted">Studio</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl tracking-tight leading-[1.05] md:text-7xl">
          Start with the plot.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Tell us where it is, what you want built, and the band you are working inside. We reply within one business day.
        </p>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <QuoteForm sourcePage="/contact" />
          </div>
          <aside className="space-y-8 lg:col-span-5">
            <div>
              <p className="meta text-muted">Visit and call</p>
              <address className="mt-4 not-italic text-lg leading-relaxed">
                {site.address.line1}
                <br />
                {site.address.area}, {site.address.city}
                <br />
                <a href={telHref()} className="underline decoration-limestone underline-offset-4">
                  {site.phone.display}
                </a>
                <br />
                <a href={`mailto:${site.email}`} className="underline decoration-limestone underline-offset-4">
                  {site.email}
                </a>
              </address>
            </div>
            <a href={whatsappHref()} className="block border border-limestone p-6">
              <p className="meta text-muted">WhatsApp</p>
              <p className="mt-3 font-display text-3xl tracking-tight">Most clients start on WhatsApp.</p>
              <p className="mt-3 text-sm underline decoration-terracotta underline-offset-4">Message us</p>
            </a>
            <iframe
              title="Map showing the studio in Westlands, Nairobi"
              src={site.mapEmbedUrl}
              className="h-72 w-full border border-limestone"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <MpesaPayButton amount={site.consultationFeeKes} shortcode={shortcode} />
          </aside>
        </div>
      </div>
    </main>
  );
}
