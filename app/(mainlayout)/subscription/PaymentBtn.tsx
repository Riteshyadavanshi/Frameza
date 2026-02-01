"use client";
import { Button } from "@/components/ui/button";
import { plans } from "@/lib/subscription";
import axios from "axios";
import { Orders } from "razorpay/dist/types/orders";

interface PaymentBtnPropps {
  plan: (typeof plans)[0];
}
export const PaymentBtn = ({ plan }: PaymentBtnPropps) => {
  const handlePayment = async () => {
    try {
      const res = await axios.post("/api/payment/order", {
        amount: plan.price,
        type: plan.name,
        credits: plan.credits,
      });

      const order: Orders.RazorpayOrder = res.data;

      const options = {
        key: "rzp_test_SAbFmC7lysG6sQ",
        name: "Subscripton",
        currency: order.currency,
        order_id: order.id,
        description: "payment for subscription",
      };

      const razorpay = new (
        window as unknown as {
          Razorpay: new (options: object) => { open: () => void };
        }
      ).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      className={`
                group/btn relative ${plan.popular ? "bg-linear-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg" : ""}
                `}
      onClick={handlePayment}
    >
      <span className="relative z-10">{plan.cta}</span>
      {plan.popular && (
        <div className="absolute inset-0 bg-linear-to-r from-pink-500 to-purple-500 opacity-0 group-hover/btn:opacity-100"></div>
      )}
    </Button>
  );
};
