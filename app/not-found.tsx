import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell section">
      <p className="eyebrow text-muted">404</p>
      <h1 className="mt-5 max-w-3xl font-display text-5xl tracking-tight leading-[1.05] md:text-7xl">
        That page is not available.
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
        It may have moved, or it has not been published yet.
      </p>
      <Link
        href="/"
        className="mt-10 inline-block text-base underline decoration-terracotta underline-offset-4"
      >
        Return home
      </Link>
    </main>
  );
}
