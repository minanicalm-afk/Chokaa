"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { fieldErrors, mpesaSchema } from "@/lib/validation";

export function MpesaPayButton({
  amount,
  shortcode,
}: {
  amount: number;
  shortcode?: string;
}) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setMessage("");
    const parsed = mpesaSchema.safeParse({ phone, amount });
    if (!parsed.success) {
      setError(fieldErrors(parsed.error).phone ?? "Check the phone number.");
      return;
    }
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) {
        setError(body.error ?? "The payment could not be started. Please try WhatsApp.");
        return;
      }
      setMessage(body.message ?? "Check the phone for the M-Pesa prompt.");
    } catch {
      setError("The payment could not be started. Please try WhatsApp.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="border border-limestone p-6" noValidate>
      <p className="meta text-muted">Consultation and small works</p>
      <h3 className="mt-3 font-display text-3xl tracking-tight">Pay the consultation fee</h3>
      <p className="mt-3 text-base leading-relaxed">
        KSh {amount.toLocaleString("en-KE")} to our official business shortcode
        {shortcode ? ` ${shortcode}` : ""}. We never request payment to a personal number.
      </p>
      <label className="mt-6 block">
        <span className="meta text-muted">M-Pesa phone</span>
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          inputMode="tel"
          autoComplete="tel"
          className={`mt-2 w-full border bg-transparent px-3 py-3 outline-none ${error ? "border-terracotta" : "border-limestone"}`}
        />
      </label>
      {error ? <p className="mt-2 text-sm text-charcoal">{error}</p> : null}
      {message ? <p className="mt-2 text-sm text-charcoal">{message}</p> : null}
      <button type="submit" disabled={pending} className="mt-6 bg-charcoal px-5 py-3 text-sm text-ivory disabled:opacity-60">
        {pending ? "Sending the prompt…" : "Pay consultation fee"}
      </button>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Payments go to the official business shortcode of {site.name} only. We never request payment to a personal number.
      </p>
    </form>
  );
}
