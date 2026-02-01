import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import React from "react";

const BillingPage = async () => {
  const user = await auth();

  const userData = await prisma.user.findFirst({
    where: {
      id: user?.user?.id,
    },
    include: {
      payments: true,
    },
  });

  return (
    <div className="p-4 space-y-6">
      {/* Available Credits */}
      <div className="w-full h-30 bg-neutral-800 flex items-center px-6 py-6 rounded-3xl">
        <h1 className="text-3xl text-white">
          Available Credits: {userData?.creadits}
        </h1>
      </div>

      {/* Payment History Table */}
      <div className="w-full bg-neutral-800 px-6 py-6 rounded-3xl">
        <h2 className="text-xl text-white mb-4">Payment History</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-neutral-300">
            <thead className="text-neutral-400 border-b border-neutral-700">
              <tr>
                <th className="py-3">Type</th>
                <th className="py-3">Amount</th>
                <th className="py-3">Credits</th>
                <th className="py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {userData?.payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-neutral-700 last:border-none"
                >
                  <td className="py-3">{payment.type}</td>
                  <td className="py-3">${payment.amount}</td>
                  <td className="py-3">{payment.credits}</td>
                  <td className="py-3">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}

              {userData?.payments.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-neutral-400">
                    No payments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
