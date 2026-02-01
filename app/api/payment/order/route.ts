import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "../razorpay.config";
import { OrderBody } from "@/lib/utils";
import { auth } from "@/auth";

export const POST = async (req: NextRequest) => {
  const session = await auth();
  if (!session?.user) {
    throw new Error("user is unauthorize");
  }
  try {
    const body: OrderBody = await req.json();

    if (!body) {
      throw new Error("Something went wrong");
    }

    const option = {
      amount: body.amount * 100,
      currency: "USD",
      payment_capture: 1,
      notes: {
        paymentFor: "Ai credit subscription",
        userId: session?.user?.id || "",
        credits: body.credits,
        subscriptionType: body.type,
        amount: body.amount,
      },
    };
    console.log(option.amount);

    const order = await razorpay.orders.create(option);
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
};
