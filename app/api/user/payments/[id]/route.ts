import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const payment = await prisma.payment.findFirst({
    where: { id, userId: session.user.id },
    select: {
      id: true,
      cloverChargeId: true,
      amount: true,
      currency: true,
      tierApplied: true,
      status: true,
      rawResponse: true,
      createdAt: true,
      user: {
        select: { name: true, email: true },
      },
    },
  });

  if (!payment) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(payment);
}
