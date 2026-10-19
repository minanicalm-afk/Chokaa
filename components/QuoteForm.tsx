"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { budgetBands, projectTypes, timelines } from "@/content/catalog";
import { site, whatsappHref } from "@/content/site";
import { fieldErrors, quoteSchema, type QuoteInput } from "@/lib/validation";

const initial: QuoteInput = {
  name: "",
  phone: "",
  email: "",
  projectType: "",
  location: "",
  budgetRange: "",
  timeline: "",
  message: "",
  sourcePage: "",
};

export function QuoteForm({ sourcePage }: { sourcePage: string }) {
  const [values, setValues] = useState<QuoteInput>({ ...initial, sourcePage });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  function update(key: keyof QuoteInput, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError("");
    const parsed = quoteSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setPending(true);
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await response.json()) as { error?: string };
      if (!response.ok) {
        setFormError(body.error ?? "Something went wrong. Please try WhatsApp instead.");
        return;
      }
      setDone(true);
    } catch {
      setFormError("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-limestone p-6">
        <p className="font-display text-3xl tracking-tight">Asante. We’ll respond within one business day.</p>
        <p className="mt-4 text-muted">If the matter is urgent, WhatsApp is the faster desk.</p>
        <a href={whatsappHref()} className="mt-6 inline-block text-sm underline decoration-terracotta underline-offset-4">
          Message {site.name} on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <input type="hidden" name="sourcePage" value={sourcePage} />
      <Field label="Name" error={errors.name}>
        <input value={values.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" className={inputClass(errors.name)} />
      </Field>
      <Field label="Phone" error={errors.phone}>
        <input value={values.phone} onChange={(event) => update("phone", event.target.value)} autoComplete="tel" inputMode="tel" className={inputClass(errors.phone)} />
      </Field>
      <Field label="Email" hint="Optional" error={errors.email}>
        <input value={values.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" inputMode="email" className={inputClass(errors.email)} />
      </Field>
      <Field label="Project type" error={errors.projectType}>
        <select value={values.projectType} onChange={(event) => update("projectType", event.target.value)} className={inputClass(errors.projectType)}>
          <option value="">Select</option>
          {projectTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </Field>
      <Field label="Location" error={errors.location}>
        <input value={values.location} onChange={(event) => update("location", event.target.value)} className={inputClass(errors.location)} placeholder="Kiambu, Karen, Nyali…" />
      </Field>
      <Field label="Budget band" error={errors.budgetRange}>
        <select value={values.budgetRange} onChange={(event) => update("budgetRange", event.target.value)} className={inputClass(errors.budgetRange)}>
          <option value="">Select</option>
          {budgetBands.map((band) => (
            <option key={band}>{band}</option>
          ))}
        </select>
      </Field>
      <Field label="Timeline" error={errors.timeline}>
        <select value={values.timeline} onChange={(event) => update("timeline", event.target.value)} className={inputClass(errors.timeline)}>
          <option value="">Select</option>
          {timelines.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </Field>
      <Field label="Notes" hint="Optional" error={errors.message}>
        <textarea value={values.message} onChange={(event) => update("message", event.target.value)} rows={5} className={inputClass(errors.message)} />
      </Field>
      {formError ? <p className="text-sm text-charcoal">{formError}</p> : null}
      <button type="submit" disabled={pending} className="btn-primary">
        {pending ? "Sending…" : "Request a quote"}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3">
        <span className="meta text-muted">{label}</span>
        {hint ? <span className="text-xs text-muted">{hint}</span> : null}
      </span>
      <span className="mt-2 block">{children}</span>
      {error ? <span className="mt-1 block text-sm text-charcoal">{error}</span> : null}
    </label>
  );
}

function inputClass(error?: string) {
  return `field ${error ? "border-terracotta" : ""}`;
}
