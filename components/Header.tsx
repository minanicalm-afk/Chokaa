"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const root = headerRef.current;
    const focusable = () =>
      Array.from(
        root?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ) ?? [],
      ).filter((element) => element.getClientRects().length > 0);

    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    function onChange() {
      if (media.matches) setOpen(false);
    }
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-ivory">
      <div className="relative z-50 border-b border-limestone bg-ivory">
        <div className="shell flex items-center justify-between gap-6 py-4">
          <Link href="/" className="min-w-0" aria-label={site.name}>
            <span className="block font-display text-xl leading-none tracking-tight">
              {site.name}
            </span>
            <span className="meta mt-1.5 hidden text-muted sm:block">
              {site.address.city} · Est. {site.established}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {site.nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "text-sm text-charcoal underline decoration-terracotta decoration-1 underline-offset-[10px]",
                    active ? "underline" : "no-underline hover:underline",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-5">
            <Link
              href="/contact"
              className="hidden text-sm text-charcoal underline decoration-terracotta decoration-1 underline-offset-4 sm:inline"
            >
              Request a quote
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              className="text-sm text-charcoal lg:hidden"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-40 overflow-y-auto bg-ivory lg:hidden"
        >
          <div className="shell pb-16 pt-28">
            <p className="meta text-muted">Index</p>
            <nav aria-label="Mobile" className="mt-6">
              <ol>
                {site.nav.map((item, index) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href} className="border-t border-limestone">
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className="flex items-baseline gap-4 py-4"
                      >
                        <span className="meta w-8 text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-4xl tracking-tight">
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
                <li className="border-t border-limestone">
                  <Link
                    href="/contact"
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span className="meta w-8 text-muted">
                      {String(site.nav.length + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-4xl tracking-tight">
                      Request a quote
                    </span>
                  </Link>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
