import { NextResponse } from "next/server";
import { insertLead } from "@/lib/records";
import { fieldErrors, procurementSchema } from "@/lib/validation";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try WhatsApp instead." },
      { status: 400 },
    );
  }

  const parsed = procurementSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  const note = [
    `Organisation: ${parsed.data.organisation}`,
    `Tender reference: ${parsed.data.tenderReference}`,
    parsed.data.message?.trim() ? parsed.data.message.trim() : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await insertLead({
      type: "procurement",
      name: parsed.data.name,
      phone: parsed.data.phone || null,
      email: parsed.data.email,
      projectType: parsed.data.tenderReference,
      location: parsed.data.organisation,
      message: note,
      sourcePage: parsed.data.sourcePage,
      status: "new",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try WhatsApp instead." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
