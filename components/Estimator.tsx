"use client";

import { useState } from "react";
import { estimatorChoices, type EstimatorType } from "@/lib/estimator";
import { fieldErrors, estimatorSchema } from "@/lib/validation";

export function Estimator() {
  const [projectType, setProjectType] = useState<EstimatorType | "">("");
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ range: string; disclaimer: string } | null>(null);

  const choice = estimatorChoices.find((item) => item.value === projectType);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setFormError("");
    const parsed = estimatorSchema.safeParse({
      projectType,
      quantity,
      name,
      phone,
    });
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setPending(true);
    try {
      const response = await fetch("/api/estimator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await response.json()) as {
        error?: string;
        range?: string;
        disclaimer?: string;
      };
      if (!response.ok || !body.range || !body.disclaimer) {
        setFormError(body.error ?? "Something went wrong. Please try WhatsApp instead.");
        return;
      }
      setResult({ range: body.range, disclaimer: body.disclaimer });
    } catch {
      setFormError("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="border border-limestone p-6 md:p-8" noValidate>
      <p className="meta text-muted">Rough cost estimator</p>
      <h3 className="mt-3 font-display text-3xl tracking-tight">An indicative band, not a tender.</h3>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {estimatorChoices.map((item) => (
          <button
            key={item.value}
            type="button"
            aria-pressed={projectType === item.value}
            onClick={() => {
              setProjectType(item.value);
              setResult(null);
            }}
            className={`border px-4 py-4 text-left text-sm ${
              projectType === item.value
                ? "border-terracotta bg-charcoal text-ivory"
                : "border-limestone"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {errors.projectType ? <p className="mt-2 text-sm text-charcoal">{errors.projectType}</p> : null}

      <label className="mt-8 block">
        <span className="meta text-muted">
          {choice ? `${choice.quantityLabel} (${choice.unit})` : "Quantity"}
        </span>
        <input
          inputMode="numeric"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          className={`mt-2 w-full border bg-transparent px-3 py-3 text-base outline-none ${errors.quantity ? "border-terracotta" : "border-limestone"}`}
        />
        {errors.quantity ? <span className="mt-1 block text-sm text-charcoal">{errors.quantity}</span> : null}
      </label>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="meta text-muted">Name, if you want us to keep it</span>
          <input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full border border-limestone bg-transparent px-3 py-3 outline-none" />
        </label>
        <label className="block">
          <span className="meta text-muted">Phone, optional</span>
          <input value={phone} onChange={(event) => setPhone(event.target.value)} className={`mt-2 w-full border bg-transparent px-3 py-3 outline-none ${errors.phone ? "border-terracotta" : "border-limestone"}`} />
          {errors.phone ? <span className="mt-1 block text-sm text-charcoal">{errors.phone}</span> : null}
        </label>
      </div>

      {formError ? <p className="mt-4 text-sm text-charcoal">{formError}</p> : null}

      <button type="submit" disabled={pending} className="mt-8 bg-charcoal px-5 py-3 text-sm text-ivory disabled:opacity-60">
        {pending ? "Calculating…" : "Show the band"}
      </button>

      {result ? (
        <div className="mt-8 border-t border-limestone pt-6">
          <p className="meta text-muted">Indicative range</p>
          <p className="mt-2 font-display text-4xl tracking-tight">{result.range}</p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{result.disclaimer}</p>
        </div>
      ) : (
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
          Indicative only. Final costs depend on site conditions.
        </p>
      )}
    </form>
  );
}
