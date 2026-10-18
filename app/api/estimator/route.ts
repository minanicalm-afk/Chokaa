import { NextResponse } from "next/server";
import { estimate } from "@/lib/estimator";
import { insertEstimatorLead } from "@/lib/records";
import { estimatorSchema, fieldErrors } from "@/lib/validation";

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

  const parsed = estimatorSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Check the quantity and project type.", fieldErrors: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  const result = estimate(parsed.data.projectType, parsed.data.quantity);

  try {
    await insertEstimatorLead({
      projectType: parsed.data.projectType,
      quantity: parsed.data.quantity,
      unit: result.unit,
      estimatedRange: result.range,
      name: parsed.data.name || null,
      phone: parsed.data.phone || null,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try WhatsApp instead." },
      { status: 500 },
    );
  }

  return NextResponse.json(result);
}
