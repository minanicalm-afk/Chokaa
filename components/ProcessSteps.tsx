import { site } from "@/content/site";

export function ProcessSteps() {
  return (
    <ol className="relative mt-12 grid gap-10 md:grid-cols-4">
      <li
        aria-hidden="true"
        className="absolute left-0 right-0 top-3 hidden h-px bg-limestone md:block"
      />
      {site.process.map((step, index) => (
        <li key={step.name} className="relative md:pr-6">
          <span className="relative z-10 inline-flex h-6 items-center bg-ivory pr-3">
            <span className="meta text-muted">{String(index + 1).padStart(2, "0")}</span>
          </span>
          <h3 className="mt-4 font-display text-2xl tracking-tight">{step.name}</h3>
          <p className="meta mt-2 text-muted">{step.duration}</p>
          <p className="mt-3 text-base leading-relaxed text-charcoal">{step.summary}</p>
        </li>
      ))}
    </ol>
  );
}
