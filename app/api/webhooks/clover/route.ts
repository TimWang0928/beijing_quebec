import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Clover sends this header on every webhook call.
// Value comes from Developer Dashboard → App Settings → Webhooks → Clover Auth Code.
const EXPECTED_AUTH_CODE = process.env.CLOVER_WEBHOOK_AUTH_CODE;

const CLOVER_API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://scl.clover.com"
    : "https://scl-sandbox.dev.clover.com";

// ---------------------------------------------------------------------------
// Fetch a single charge from Clover to get its current status
// ---------------------------------------------------------------------------
async function fetchCharge(merchantId: string, chargeId: string) {
  const res = await fetch(
    `${CLOVER_API_BASE}/v1/charges/${chargeId}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.CLOVER_PRIVATE_KEY}`,
      },
    }
  );
  if (!res.ok) return null;
  return res.json() as Promise<{ id: string; status: string; amount: number; refunded?: boolean }>;
}

// ---------------------------------------------------------------------------
// POST /api/webhooks/clover
//
// Two kinds of requests arrive here:
//   1. Verification handshake — body: { "verificationCode": "..." }
//      Clover just needs a 200; the developer copies the code from this POST
//      and pastes it in the dashboard.
//
//   2. Event notification — body:
//      {
//        "appId": "...",
//        "merchants": {
//          "<merchantId>": [
//            { "objectId": "P:<chargeId>", "type": "CREATE|UPDATE|DELETE", "ts": 123 }
//          ]
//        }
//      }
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  // Always return 200 — Clover marks the endpoint as failed if it gets anything else.
  try {
    const body = await request.json();

    // --- Verification handshake ---
    if (body.verificationCode) {
      console.log("[Clover webhook] Verification code received:", body.verificationCode);
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // --- Authenticate real events ---
    const authCode = request.headers.get("x-clover-auth");
    if (EXPECTED_AUTH_CODE && authCode !== EXPECTED_AUTH_CODE) {
      // Log and silently return 200 so Clover doesn't retry, but take no action
      console.warn("[Clover webhook] Invalid auth code, ignoring event");
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // --- Process events ---
    const merchants = body.merchants as Record<
      string,
      Array<{ objectId: string; type: "CREATE" | "UPDATE" | "DELETE"; ts: number }>
    >;

    for (const [merchantId, events] of Object.entries(merchants ?? {})) {
      for (const event of events) {
        const { objectId, type } = event;

        // We only care about Payment events (objectId starts with "P:")
        if (!objectId.startsWith("P:")) continue;

        const chargeId = objectId.slice(2); // strip the "P:" prefix
        console.log(`[Clover webhook] Payment event merchant=${merchantId} chargeId=${chargeId} type=${type}`);

        await handlePaymentEvent(merchantId, chargeId, type);
      }
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    // Still return 200 — never let Clover see a 5xx or it will keep retrying
    console.error("[Clover webhook] Unhandled error:", err);
    return NextResponse.json({ ok: true }, { status: 200 });
  }
}

// ---------------------------------------------------------------------------
// Handle a single payment event
// ---------------------------------------------------------------------------
async function handlePaymentEvent(
  merchantId: string,
  chargeId: string,
  type: "CREATE" | "UPDATE" | "DELETE"
) {
  // For CREATE we already wrote the record during /api/payment/charge.
  // For UPDATE / DELETE we re-fetch from Clover to get the latest status.
  if (type === "CREATE") return;

  const charge = await fetchCharge(merchantId, chargeId);
  if (!charge) {
    console.warn(`[Clover webhook] Could not fetch charge ${chargeId}`);
    return;
  }

  // Find our local Payment record
  const payment = await prisma.payment.findUnique({
    where: { cloverChargeId: chargeId },
  });

  if (!payment) {
    console.warn(`[Clover webhook] No local payment record for chargeId=${chargeId}`);
    return;
  }

  // Determine new status
  const newStatus =
    charge.refunded || type === "DELETE" ? "refunded" : charge.status;

  // Update Payment record
  await prisma.payment.update({
    where: { id: payment.id },
    data: {
      status: newStatus,
      rawResponse: charge as object,
    },
  });

  console.log(`[Clover webhook] Payment ${payment.id} status → ${newStatus}`);

  // If refunded/deleted, revert the membership if it was granted by this payment
  if (newStatus === "refunded") {
    // Only revert if the user's current tier still matches what this payment granted
    const user = await prisma.user.findUnique({ where: { id: payment.userId } });
    if (user?.membershipTier === payment.tierApplied) {
      await prisma.user.update({
        where: { id: payment.userId },
        data: {
          membershipTier: "NONE",
          membershipExpiresAt: null,
        },
      });
      console.log(`[Clover webhook] Membership reverted for user ${payment.userId}`);
    }
  }
}
