import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const payment = body.payload.payment.entity;

  const headers = await req.headers;
  const signature = headers.get("x-razorpay-signature");

  try {
    const expectedSignature = crypto
      .createHmac("sha256", "12345")
      .update(JSON.stringify(body))
      .digest("hex");
    console.log("webhook called");
    if (signature === expectedSignature) {
      console.log("signature matched");
      if (payment.status === "captured") {
        let credits = 0;
        const user = await prisma.user.findFirst({
          where: {
            id: payment.notes.userId,
          },
        });

        if (user?.creadits) {
          credits += user.creadits;
        }
        console.log(payment.notes);
        const isUpdated = await prisma.user.update({
          where: {
            id: payment.notes.userId,
          },
          data: {
            creadits: credits + payment.notes.credits,
          },
        });
        console.log(isUpdated);
        await prisma.paymentHistory.create({
          data: {
            userId: payment.notes.userId,
            credits: payment.notes.credits,
            type: payment.notes.subscriptionType,
            amount: payment.notes.amount,
          },
        });

        return NextResponse.json(
          { message: "Webhook called" },
          { status: 200 },
        );
      }
    } else {
      return NextResponse.json(null, { status: 400 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 400 });
  }
};
