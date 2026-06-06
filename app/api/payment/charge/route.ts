import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

// Server-authoritative price table — never trust the client for the amount
const TIER_PRICES: Record<string, number> = {
  TEST:     1,      // $0.01 CAD — test only
  REGULAR:  3600,   // $36.00 CAD/year
  FAMILY:   6600,   // $66.00 CAD/year
  FOUNDING: 36500,  // $365.00 CAD one-time
};

const FOUNDING_SEAT_LIMIT = 50;

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

    // Check founding member seat availability before charging
    let foundingNumber: number | null = null;
    if (tierId === "FOUNDING") {
      const takenSeats = await prisma.user.findMany({
        where: { membershipTier: "FOUNDING" },
        select: { foundingNumber: true },
        orderBy: { foundingNumber: "asc" },
      });

      if (takenSeats.length >= FOUNDING_SEAT_LIMIT) {
        return NextResponse.json(
          { error: "Founding member seats are sold out (50/50)" },
          { status: 409 }
        );
      }

      // Find the lowest available number 1–50
      const taken = new Set(takenSeats.map((u) => u.foundingNumber));
      for (let n = 1; n <= FOUNDING_SEAT_LIMIT; n++) {
        if (!taken.has(n)) { foundingNumber = n; break; }
      }
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

    // FOUNDING: permanent (no expiry). Others: 1 year.
    const expiresAt =
      tierId === "FOUNDING"
        ? null
        : (() => { const d = new Date(); d.setFullYear(d.getFullYear() + 1); return d; })();

    await prisma.$transaction([
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          membershipTier: tierId,
          membershipExpiresAt: expiresAt,
          ...(tierId === "FOUNDING" && foundingNumber !== null
            ? { foundingNumber }
            : {}),
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
      expiresAt: expiresAt?.toISOString() ?? null,
      ...(foundingNumber !== null ? { foundingNumber } : {}),
    });
  } catch (err) {
    console.error("Payment error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
