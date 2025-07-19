import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);

useEffect(() => {
  if (user?.email) {
    console.log("Fetching payments for:", user.email); // ✅ Log email

    axiosSecure.get(`/payments?email=${user.email}`).then((res) => {
      console.log("Fetched payments:", res.data); // ✅ Log response
      setPayments(res.data);
    }).catch(err => {
      console.error("Error fetching payments:", err); // ✅ Log any errors
    });
  }
}, [user, axiosSecure]);


  return (
    <div className="max-w-4xl mx-auto mt-6 p-4">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      {payments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Transaction ID</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Coins</th>
                <th className="px-4 py-2">Method</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.transactionId} className="border-t">
                  <td className="px-4 py-2">{payment.transactionId}</td>
                  <td className="px-4 py-2">${payment.amount.toFixed(2)}</td>
                  <td className="px-4 py-2">{payment.coins}</td>
                  <td className="px-4 py-2">
                    {payment.paymentMethod?.join(", ")}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(payment.paid_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No payment history found.</p>
      )}
    </div>
  );
};

export default PaymentHistory;
