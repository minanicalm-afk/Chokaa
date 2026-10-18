import { NextResponse } from "next/server";
import { insertLead } from "@/lib/records";
import { fieldErrors, quoteSchema } from "@/lib/validation";

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

  const parsed = quoteSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  try {
    await insertLead({
      type: "quote",
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      projectType: parsed.data.projectType,
      location: parsed.data.location,
      budgetRange: parsed.data.budgetRange,
      timeline: parsed.data.timeline,
      message: parsed.data.message || null,
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
