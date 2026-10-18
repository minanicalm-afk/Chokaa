"use client";

import { useState } from "react";
import { site, whatsappHref } from "@/content/site";
import { fieldErrors, procurementSchema } from "@/lib/validation";

export function ProcurementForm() {
  const [values, setValues] = useState({
    name: "",
    organisation: "",
    email: "",
    phone: "",
    tenderReference: "",
    message: "",
    sourcePage: "/procurement",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const parsed = procurementSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setPending(true);
    setFormError("");
    try {
      const response = await fetch("/api/procurement", {
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
      <div className="border border-limestone p-6">
        <p className="font-display text-3xl tracking-tight">Asante. The bid pack will go out within one business day.</p>
        <a href={whatsappHref()} className="mt-6 inline-block text-sm underline decoration-terracotta underline-offset-4">
          Or message {site.name}
        </a>
      </div>
    );
  }

  const field = (key: keyof typeof values, label: string, type = "text") => (
    <label className="block" key={key}>
      <span className="meta text-muted">{label}</span>
      <input
        type={type}
        value={values[key]}
        onChange={(event) => setValues((current) => ({ ...current, [key]: event.target.value }))}
        className={`mt-2 w-full border bg-transparent px-3 py-3 text-base outline-none ${errors[key] ? "border-terracotta" : "border-limestone"}`}
      />
      {errors[key] ? <span className="mt-1 block text-sm text-charcoal">{errors[key]}</span> : null}
    </label>
  );

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      {field("name", "Name")}
      {field("organisation", "Organisation")}
      {field("email", "Email", "email")}
      {field("phone", "Phone", "tel")}
      {field("tenderReference", "Tender reference")}
      <label className="block">
        <span className="meta text-muted">Note</span>
        <textarea
          rows={4}
          value={values.message}
          onChange={(event) => setValues((current) => ({ ...current, message: event.target.value }))}
          className="mt-2 w-full border border-limestone bg-transparent px-3 py-3 text-base outline-none"
        />
      </label>
      {formError ? <p className="text-sm text-charcoal">{formError}</p> : null}
      <button type="submit" disabled={pending} className="bg-charcoal px-5 py-3 text-sm text-ivory disabled:opacity-60">
        {pending ? "Sending…" : "Request the bid pack"}
      </button>
    </form>
  );
}
