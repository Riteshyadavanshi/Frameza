import { plans } from "@/lib/subscription";
import { Check } from "lucide-react";
import { PaymentBtn } from "./PaymentBtn";

const SubscriptionPage = () => {
  return (
    <section
      className="
    min-h-screen py-20 px-4 text-white relative overflow-hidden
    "
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span
              className="
            px-4 py-2 rounded-full bg-linear-to-r from-purple-500/10 to-pink-500/10

            border border-pink-500/20 text-purple-300 text-sm font-medium
            "
            >
              flexible Pricing
            </span>
          </div>
          <h2
            className="
           text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent
          "
          >
            AI video Credits Subscription
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose a plan and start generating AI videos instanly. Scale as you
            grow.
          </p>
        </div>

        {/* Plan Grid */}

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <>
              <div
                key={plan.credits}
                className={`relative rounded-3xl p-8 transition-all duration-500 cursor-pointer group ${plan.popular ? "md:scale-105 md:-translate-y-4" : ""} `}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div
                      className="
                    px-4 py-1.5 rounded-full bg-linear-to-r from-purple-500 to-pink-500 text-white text-xs font-bold shadow-lg
                    "
                    >
                      ⭐ MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="relative mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {plan.name}
                  </h3>
                  <div>
                    <span className="text-5xl font-black bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      ${plan.price}
                    </span>
                    <span className="text-pink-300">
                      {" "}
                      /{plan.credits} credits
                    </span>
                  </div>
                </div>

                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-gray-300 group/item"
                    >
                      <div
                        className={`shrink-0 size-5 rounded-full  ${plan.accentColor} flex items-center justify-center mt-0.5`}
                      >
                        <Check size={14} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <PaymentBtn plan={plan} />
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPage;
