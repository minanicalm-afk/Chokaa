"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Building2,
  ClipboardList,
  Hammer,
  LayoutGrid,
  Menu,
  X,
} from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const navIcons = {
  "/work": LayoutGrid,
  "/services": Hammer,
  "/about": Building2,
  "/insights": BookOpen,
  "/procurement": ClipboardList,
} as const;

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
        root?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
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
    <header ref={headerRef} className="sticky top-0 z-50">
      <div className="relative z-50 border-b border-limestone bg-white/90 backdrop-blur-md">
        <div className="shell flex h-16 items-center justify-between gap-4">
          <Link href="/" className="font-display text-lg font-semibold tracking-tight" aria-label={site.name}>
            {site.name}
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {site.nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                    active ? "bg-[#F3F3F3] text-charcoal" : "text-muted hover:bg-[#F7F7F7] hover:text-charcoal",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/contact" className="btn-primary hidden sm:inline-flex">
              Request a quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-limestone text-charcoal lg:hidden"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
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
          className="fixed inset-0 z-40 overflow-y-auto bg-white lg:hidden"
        >
          <div className="shell flex min-h-full flex-col pb-10 pt-24">
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {site.nav.map((item) => {
                  const active = isActive(pathname, item.href);
                  const Icon = navIcons[item.href as keyof typeof navIcons];
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl px-3 py-3.5 text-lg font-medium",
                          active ? "bg-[#F3F3F3]" : "hover:bg-[#F7F7F7]",
                        )}
                      >
                        <Icon className="h-5 w-5 text-muted" aria-hidden="true" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <Link href="/contact" className="btn-primary mt-8 w-full">
              Request a quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
