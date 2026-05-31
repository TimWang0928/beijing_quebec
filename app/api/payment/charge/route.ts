import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

// Server-authoritative price table — never trust the client for the amount
const TIER_PRICES: Record<string, number> = {
  REGULAR:    100,   // $1.00 CAD (test)
  FAMILY:     200,   // $2.00 CAD (test)
  YOUTH:      300,   // $3.00 CAD (test)
  HONORARY:   400,   // $4.00 CAD (test)
  SUPPORTING: 500,   // $5.00 CAD (test)
};

const CLOVER_API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://scl.clover.com"
    : "https://scl-sandbox.dev.clover.com";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { token, tierId } = body as { token?: string; tierId?: string };

    if (!token || !tierId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const amount = TIER_PRICES[tierId];
    if (!amount) {
      return NextResponse.json({ error: "Invalid membership tier" }, { status: 400 });
    }

    if (!process.env.CLOVER_PRIVATE_KEY) {
      console.error("CLOVER_PRIVATE_KEY is not configured");
      return NextResponse.json({ error: "Payment service not configured" }, { status: 503 });
    }

    if (!process.env.NEXT_PUBLIC_CLOVER_MERCHANT_ID) {
      console.error("NEXT_PUBLIC_CLOVER_MERCHANT_ID is not configured");
      return NextResponse.json({ error: "Payment service not configured" }, { status: 503 });
    }

    const idempotencyKey = randomUUID();
    // Forward the real client IP so Clover can apply fraud checks
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "127.0.0.1";

    const currency = process.env.CLOVER_CURRENCY ?? "usd";

    const payload = {
      amount,
      currency,
      source: token,
      ecomind: "ecom",
      description: `Beijing Association — ${tierId} Membership`,
    };

    console.log("[Clover charge] Sending request", {
      amount,
      currency,
      tierId,
      source: token.slice(0, 10) + "..." + token.slice(-5),
      merchantId: process.env.NEXT_PUBLIC_CLOVER_MERCHANT_ID?.slice(-6),
      privateKeyEnvSet: !!process.env.CLOVER_PRIVATE_KEY,
    });

    const chargeUrl = `${CLOVER_API_BASE}/v1/charges`;
    console.log("[Clover charge] POST", chargeUrl, JSON.stringify(payload));

    const chargeRes = await fetch(chargeUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLOVER_PRIVATE_KEY}`,
        "idempotency-key": idempotencyKey,
        "x-forwarded-for": clientIp,
      },
      body: JSON.stringify(payload),
    });

    const chargeText = await chargeRes.text();
    let charge;
    try {
      charge = JSON.parse(chargeText);
    } catch {
      console.error("[Clover charge] Invalid JSON response:", chargeText);
      return NextResponse.json(
        { error: "Invalid response from payment service" },
        { status: 502 }
      );
    }

    console.log("[Clover charge] Full response", {
      status: chargeRes.status,
      statusText: chargeRes.status,
      body: charge,
    });

    if (!chargeRes.ok || charge.status !== "succeeded") {
      const message =
        charge.message ?? charge.decline_code ?? "Payment was declined";
      console.error("[Clover charge] Payment failed:", message);
      return NextResponse.json({ error: message }, { status: 402 });
    }

    // Activate membership for 1 year + record the payment — in a transaction
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          membershipTier: tierId,
          membershipExpiresAt: expiresAt,
        },
      }),
      prisma.payment.create({
        data: {
          userId: session.user.id,
          cloverChargeId: charge.id as string,
          amount,
          currency,
          tierApplied: tierId,
          status: "succeeded",
          idempotencyKey,
          rawResponse: charge as object,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      chargeId: charge.id as string,
      membershipTier: tierId,
      expiresAt: expiresAt.toISOString(),
    });
  } catch (err) {
    console.error("Payment error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
