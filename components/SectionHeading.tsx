export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="eyebrow text-muted">{eyebrow}</p> : null}
      <h2 className="mt-3 font-display text-3xl tracking-tight text-charcoal md:text-4xl">
        {title}
      </h2>
      {children ? (
        <div className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {children}
        </div>
      ) : null}
    </div>
  );
}
