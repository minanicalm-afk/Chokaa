function Wall() {
  return (
    <svg viewBox="0 0 160 120" fill="none" aria-hidden="true" className="h-full w-full">
      <path d="M12 96 H148" stroke="currentColor" strokeWidth="1" />
      <path d="M28 96 V42 H118 V96" stroke="currentColor" strokeWidth="1" />
      <path d="M22 96 V78 H38 V96 M108 96 V70 H132 V96" stroke="currentColor" strokeWidth="1" />
      <path d="M28 42 H118" stroke="currentColor" strokeWidth="2" />
      <path d="M46 96 V58 H64 V96 M72 96 V58 H100 V96" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function Paving() {
  return (
    <svg viewBox="0 0 160 120" fill="none" aria-hidden="true" className="h-full w-full">
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 7 }).map((__, col) => (
          <rect
            key={`${row}-${col}`}
            x={16 + col * 18}
            y={18 + row * 16}
            width="16"
            height="14"
            stroke="currentColor"
            strokeWidth="1"
          />
        )),
      )}
    </svg>
  );
}

function Truss() {
  return (
    <svg viewBox="0 0 160 120" fill="none" aria-hidden="true" className="h-full w-full">
      <path d="M16 88 L80 28 L144 88 Z" stroke="currentColor" strokeWidth="1" />
      <path d="M40 88 L80 48 L120 88" stroke="currentColor" strokeWidth="1" />
      <path d="M58 88 V62 M102 88 V62 M80 88 V48" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function WindowWall() {
  return (
    <svg viewBox="0 0 160 120" fill="none" aria-hidden="true" className="h-full w-full">
      <path d="M24 100 V24 H136 V100" stroke="currentColor" strokeWidth="1" />
      <rect x="58" y="40" width="44" height="36" stroke="currentColor" strokeWidth="1" />
      <path d="M80 40 V76 M58 58 H102" stroke="currentColor" strokeWidth="1" />
      <path d="M24 100 H136" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function Road() {
  return (
    <svg viewBox="0 0 160 120" fill="none" aria-hidden="true" className="h-full w-full">
      <path d="M12 78 H148" stroke="currentColor" strokeWidth="1" />
      <path d="M12 92 H148" stroke="currentColor" strokeWidth="1" />
      <path d="M28 78 V92 M52 78 V92 M76 78 V92 M100 78 V92 M124 78 V92" stroke="currentColor" strokeWidth="1" />
      <path d="M18 70 H46 L52 78" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

const drawings = {
  wall: Wall,
  paving: Paving,
  truss: Truss,
  window: WindowWall,
  road: Road,
} as const;

export function BlueprintHover({
  kind,
}: {
  kind: keyof typeof drawings;
}) {
  const Drawing = drawings[kind];
  return (
    <div className="pointer-events-none absolute -left-2 top-0 hidden h-36 w-44 text-ochre opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-40 lg:block">
      <Drawing />
    </div>
  );
}

export function blueprintForSlug(slug: string): keyof typeof drawings {
  if (slug.includes("cabro")) return "paving";
  if (slug.includes("renovation")) return "window";
  if (slug.includes("fitout") || slug.includes("fit-out")) return "truss";
  if (slug.includes("civil")) return "road";
  return "wall";
}
