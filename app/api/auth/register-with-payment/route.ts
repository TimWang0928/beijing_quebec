import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";

const TIER_PRICES: Record<string, number> = {
  REGULAR: 100,
};

const CLOVER_API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://scl.clover.com"
    : "https://scl-sandbox.dev.clover.com";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, tierId, token } = await request.json();

    // Validate required fields
    if (!name || !email || !password || !tierId || !token) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const amount = TIER_PRICES[tierId];
    if (amount === undefined) {
      return NextResponse.json({ error: "Invalid membership tier" }, { status: 400 });
    }

    // Check email not already taken
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    if (!process.env.CLOVER_PRIVATE_KEY || !process.env.NEXT_PUBLIC_CLOVER_MERCHANT_ID) {
      return NextResponse.json({ error: "Payment service not configured" }, { status: 503 });
    }

    // Charge Clover
    const currency = process.env.CLOVER_CURRENCY ?? "usd";
    const idempotencyKey = randomUUID();
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "127.0.0.1";

    console.log(`[register-with-payment] Charging ${amount} ${currency} for ${email} (tier: ${tierId})`);

    const chargeRes = await fetch(`${CLOVER_API_BASE}/v1/charges`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLOVER_PRIVATE_KEY}`,
        "idempotency-key": idempotencyKey,
        "x-forwarded-for": clientIp,
      },
      body: JSON.stringify({
        amount,
        currency,
        source: token,
        ecomind: "ecom",
        description: `Beijing Association — ${tierId} Membership (New Registration)`,
      }),
    });

    const chargeText = await chargeRes.text();
    console.log(`[register-with-payment] Clover response ${chargeRes.status}: ${chargeText.slice(0, 300)}`);

    let charge: Record<string, unknown>;
    try {
      charge = JSON.parse(chargeText);
    } catch {
      return NextResponse.json({ error: "Invalid response from payment service" }, { status: 502 });
    }

    if (!chargeRes.ok || charge.status !== "succeeded") {
      const errObj = charge.error as Record<string, unknown> | undefined;
      const message = (errObj?.message as string) ?? (charge.message as string) ?? "Payment was declined";
      return NextResponse.json({ error: message }, { status: 402 });
    }

    // Payment succeeded — create user + payment record atomically
    const hashedPassword = await hash(password, 10);
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          membershipTier: tierId,
          membershipExpiresAt: expiresAt,
        },
      });

      await tx.payment.create({
        data: {
          userId: user.id,
          cloverChargeId: charge.id as string,
          amount,
          currency,
          tierApplied: tierId,
          status: "succeeded",
          idempotencyKey,
          rawResponse: charge,
        },
      });
    });

    console.log(`[register-with-payment] User ${email} created with tier ${tierId} (charge: ${charge.id})`);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[register-with-payment] Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
