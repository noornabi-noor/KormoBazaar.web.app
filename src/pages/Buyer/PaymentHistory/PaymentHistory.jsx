import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/payments?email=${user.email}`)
        .then((res) => setPayments(res.data))
        .catch(() => console.error("Error fetching payments"));
    }
  }, [user, axiosSecure]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow transition-colors duration-300">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">💳 Payment History</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Review your past coin purchase records
        </p>
      </div>

      {/* Payment Table */}
      {payments.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
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
                  <td>{payment.transactionId}</td>
                  <td>${payment.amount.toFixed(2)}</td>
                  <td>{payment.coins}</td>
                  <td>{payment.paymentMethod?.join(", ")}</td>
                  <td>{new Date(payment.paid_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">No payment history found.</p>
      )}
    </div>
  );
};

export default PaymentHistory;