import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const FOUNDING_SEAT_LIMIT = 50;

export async function GET() {
  const taken = await prisma.user.count({ where: { membershipTier: "FOUNDING" } });
  return NextResponse.json({ seatsLeft: FOUNDING_SEAT_LIMIT - taken, total: FOUNDING_SEAT_LIMIT });
}
