import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { altFor } from "@/content/media";
import { site } from "@/content/site";
import { formatDate } from "@/lib/utils";
import { listInsights } from "@/src/db/queries";
import { imageForInsight } from "@/content/insight-images";

export const metadata: Metadata = {
  title: "Insights",
  description: `Notes on cost, NCA categories, and contracts from ${site.name}.`,
};

export default async function InsightsPage() {
  const insights = await listInsights();

  return (
    <main className="section">
      <div className="shell">
        <p className="eyebrow text-muted">Field notes</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl tracking-tight leading-[1.05] md:text-7xl">
          Things worth knowing before you sign.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Short articles on what a wall costs, how to read an NCA category, and the questions a contract should already answer.
        </p>
        <ul className="mt-14 border-t border-limestone">
          {insights.map((insight) => (
            <li key={insight.id} className="border-b border-limestone">
              <Link href={`/insights/${insight.slug}`} className="grid gap-6 py-8 md:grid-cols-12">
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-limestone md:col-span-4">
                  <Image
                    src={imageForInsight(insight.slug)}
                    alt={altFor(imageForInsight(insight.slug), insight.title)}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="md:col-span-8">
                  <p className="meta text-muted">
                    {formatDate(insight.publishedAt)} · {insight.readingTime} min
                  </p>
                  <h2 className="mt-3 font-display text-3xl tracking-tight md:text-4xl">{insight.title}</h2>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
                    {insight.excerpt}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
