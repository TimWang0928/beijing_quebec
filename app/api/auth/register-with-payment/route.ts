import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";

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
    const { name, email, password, tierId, token, phone, wechat } = await request.json();

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

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    // Check founding seat availability before charging
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
      const taken = new Set(takenSeats.map((u) => u.foundingNumber));
      for (let n = 1; n <= FOUNDING_SEAT_LIMIT; n++) {
        if (!taken.has(n)) { foundingNumber = n; break; }
      }
    }

    if (!process.env.CLOVER_PRIVATE_KEY || !process.env.NEXT_PUBLIC_CLOVER_MERCHANT_ID) {
      return NextResponse.json({ error: "Payment service not configured" }, { status: 503 });
    }

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

    const hashedPassword = await hash(password, 10);
    const expiresAt =
      tierId === "FOUNDING"
        ? null
        : (() => { const d = new Date(); d.setFullYear(d.getFullYear() + 1); return d; })();

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          membershipTier: tierId,
          membershipExpiresAt: expiresAt,
          ...(tierId === "FOUNDING" && foundingNumber !== null ? { foundingNumber } : {}),
          ...(phone ? { phone } : {}),
          ...(wechat ? { wechat } : {}),
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
          rawResponse: JSON.parse(JSON.stringify(charge)),
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
