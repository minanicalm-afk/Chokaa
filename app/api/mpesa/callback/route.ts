import { NextResponse } from "next/server";
import { z } from "zod";
import { updateMpesaByCheckout } from "@/lib/records";

const callbackSchema = z.object({
  Body: z.object({
    stkCallback: z.object({
      MerchantRequestID: z.string().optional(),
      CheckoutRequestID: z.string(),
      ResultCode: z.coerce.number(),
      ResultDesc: z.string().optional(),
      CallbackMetadata: z
        .object({
          Item: z
            .array(
              z.object({
                Name: z.string(),
                Value: z.union([z.string(), z.number()]).optional(),
              }),
            )
            .optional(),
        })
        .optional(),
    }),
  }),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ResultCode: 1, ResultDesc: "Invalid payload" }, { status: 400 });
  }

  const parsed = callbackSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ResultCode: 1, ResultDesc: "Invalid payload" }, { status: 400 });
  }

  const callback = parsed.data.Body.stkCallback;
  const receipt = callback.CallbackMetadata?.Item?.find((item) => item.Name === "MpesaReceiptNumber");

  try {
    await updateMpesaByCheckout({
      checkoutRequestId: callback.CheckoutRequestID,
      merchantRequestId: callback.MerchantRequestID,
      status: callback.ResultCode === 0 ? "success" : "failed",
      resultCode: String(callback.ResultCode),
      resultDesc: callback.ResultDesc ?? null,
      mpesaReceipt: receipt?.Value != null ? String(receipt.Value) : null,
    });
  } catch {
    return NextResponse.json({ ResultCode: 1, ResultDesc: "Not recorded" }, { status: 500 });
  }

  return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
}
