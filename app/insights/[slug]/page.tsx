import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { imageForInsight } from "@/content/insight-images";
import { altFor } from "@/content/media";
import { site } from "@/content/site";
import { formatDate, paragraphs } from "@/lib/utils";
import { getInsightBySlug, listInsightSlugs } from "@/src/db/queries";

type Params = { slug: string };

export async function generateStaticParams() {
  const rows = await listInsightSlugs();
  return rows.map((row) => ({ slug: row.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const insight = await getInsightBySlug(params.slug);
  if (!insight) return { title: "Insights" };
  return { title: insight.title, description: insight.excerpt };
}

export default async function InsightPage({ params }: { params: Params }) {
  const insight = await getInsightBySlug(params.slug);
  if (!insight) notFound();

  return (
    <main className="section">
      <article className="shell">
        <header className="mx-auto max-w-3xl">
          <p className="eyebrow text-muted">
            <Link href="/insights" className="underline decoration-limestone underline-offset-4">
              Insights
            </Link>
          </p>
          <h1 className="mt-4 font-display text-4xl tracking-tight leading-tight md:text-6xl">
            {insight.title}
          </h1>
          <p className="meta mt-6 text-muted">
            {site.name} · {formatDate(insight.publishedAt)} · {insight.readingTime} min read
          </p>
          <div className="relative mt-8 aspect-[3/2] border border-limestone">
            <Image
              src={imageForInsight(insight.slug)}
              alt={altFor(imageForInsight(insight.slug), insight.title)}
              fill
              priority
              sizes="(min-width: 768px) 48rem, 100vw"
              className="object-cover"
            />
          </div>
        </header>
        <div className="mx-auto mt-12 max-w-3xl space-y-6 text-lg leading-relaxed">
          {paragraphs(insight.body).map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
        <aside className="mx-auto mt-16 max-w-3xl border-t border-limestone pt-8">
          <h2 className="font-display text-3xl tracking-tight">If this is your project, start with a band.</h2>
          <p className="mt-3 text-muted">
            A quote from this page is marked so we know which note you were reading.
          </p>
          <Link href="/contact" className="mt-6 inline-block bg-charcoal px-5 py-3 text-sm text-ivory">
            Request a quote
          </Link>
        </aside>
      </article>
    </main>
  );
}
