"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export function BeforeAfterSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(56);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const measure = () => setWidth(element.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const setFromClientX = useCallback((clientX: number) => {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setValue(Math.min(100, Math.max(0, next)));
  }, []);

  return (
    <figure>
      <div
        ref={frame}
        role="slider"
        tabIndex={0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(value)}
        aria-label="Before and after. Left is before, right is after."
        className="relative aspect-[4/3] cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl border border-limestone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          setFromClientX(event.clientX);
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            setFromClientX(event.clientX);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            setValue((current) => Math.max(0, current - 4));
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            setValue((current) => Math.min(100, current + 4));
          }
        }}
      >
        <Image src={after} alt={afterAlt} fill sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover" />
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${value}%` }}>
          <div className="absolute inset-y-0 left-0 h-full" style={{ width: width || "100%" }}>
            <Image
              src={before}
              alt={beforeAlt}
              fill
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${value}%` }} aria-hidden="true">
          <span className="absolute inset-y-0 w-px -translate-x-1/2 bg-terracotta" />
          <span className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 border border-terracotta bg-ivory" />
        </div>
        <span className="meta pointer-events-none absolute left-3 top-3 bg-ivory px-2 py-1 text-charcoal">
          Before
        </span>
        <span className="meta pointer-events-none absolute right-3 top-3 bg-ivory px-2 py-1 text-charcoal">
          After
        </span>
      </div>
      <figcaption className="mt-3 text-sm text-muted">
        Drag the line, or focus it and use the arrow keys.
      </figcaption>
    </figure>
  );
}
