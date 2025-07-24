import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center py-10 text-red-500 dark:text-red-400">
        ❌ Failed to fetch payment history
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-6 md:space-y-8 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-lg md:rounded-2xl shadow transition-colors duration-300">
      {/* Heading */}
      <div className="text-center px-2">
        <h2 className="text-2xl sm:text-3xl font-bold">
          💳 <span className="text-primary-gradient dark:text-blue-300">Payment History</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
          Review your past coin purchase records
        </p>
      </div>

      {/* Payment List */}
      {payments.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          {/* Desktop Table */}
          <div className="hidden sm:block">
            <table className="table w-full text-sm">
              <thead className="bg-blue-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <tr>
                  <th>Transaction ID</th>
                  <th>Amount</th>
                  <th>Coins</th>
                  <th>Method</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-100">
                {payments.map((payment) => (
                  <tr key={payment.transactionId} className="hover:bg-sky-50 dark:hover:bg-gray-800 transition">
                    <td className="break-all max-w-[120px] truncate">{payment.transactionId}</td>
                    <td>${payment.amount.toFixed(2)}</td>
                    <td>{payment.coins}</td>
                    <td>{payment.paymentMethod?.join(", ")}</td>
                    <td>{new Date(payment.paid_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-3 p-3">
            {payments.map((payment) => (
              <div
                key={payment.transactionId}
                className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">
                      ${payment.amount.toFixed(2)}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {payment.coins} coins
                    </p>
                  </div>
                  <span className="badge badge-sm">
                    {payment.paymentMethod?.join(", ")}
                  </span>
                </div>
                <div className="mt-2 text-xs">
                  <p className="text-gray-600 dark:text-gray-400 break-all">
                    <span className="font-medium">ID:</span> {payment.transactionId}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Date:</span> {new Date(payment.paid_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          No payment history found.
        </p>
      )}
    </div>
  );
};

export default PaymentHistory;