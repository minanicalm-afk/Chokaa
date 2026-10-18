import { NextResponse } from "next/server";
import { Mpesa } from "pesafy";
import { createId } from "@/lib/ids";
import { insertMpesaTransaction } from "@/lib/records";
import { toMpesaPhone } from "@/lib/utils";
import { fieldErrors, mpesaSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const key = process.env.MPESA_CONSUMER_KEY;
  const secret = process.env.MPESA_CONSUMER_SECRET;
  const passkey = process.env.MPESA_PASSKEY;
  const shortcode = process.env.MPESA_SHORTCODE;
  const callback = process.env.MPESA_CALLBACK_URL;

  if (!key || !secret || !passkey || !shortcode || !callback) {
    return NextResponse.json(
      {
        error:
          "M-Pesa is not switched on yet. Send the quote form, or use WhatsApp, and we will take it from there.",
      },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Check the phone number." }, { status: 400 });
  }

  const parsed = mpesaSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Check the phone number.", fieldErrors: fieldErrors(parsed.error) },
      { status: 400 },
    );
  }

  const phoneNumber = toMpesaPhone(parsed.data.phone);
  const accountReference = (parsed.data.accountReference ?? createId().slice(0, 12)).slice(0, 12);
  const environment = process.env.MPESA_ENVIRONMENT === "production" ? "production" : "sandbox";

  try {
    const mpesa = new Mpesa({
      consumerKey: key,
      consumerSecret: secret,
      environment,
      lipaNaMpesaShortCode: shortcode,
      lipaNaMpesaPassKey: passkey,
    });

    const response = await mpesa.stkPush({
      amount: parsed.data.amount,
      phoneNumber,
      callbackUrl: callback,
      accountReference,
      transactionDesc: "Consult fee",
    });

    await insertMpesaTransaction({
      checkoutRequestId: response.CheckoutRequestID,
      merchantRequestId: response.MerchantRequestID,
      amount: parsed.data.amount,
      phone: phoneNumber,
      accountReference,
      status: "pending",
    });

    return NextResponse.json({
      ok: true,
      message: response.CustomerMessage || "Check the phone for the M-Pesa prompt.",
    });
  } catch {
    return NextResponse.json(
      { error: "Safaricom did not accept the prompt. Try again, or use WhatsApp." },
      { status: 502 },
    );
  }
}
