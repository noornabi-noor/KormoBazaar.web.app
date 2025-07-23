import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const [searchParams] = useSearchParams();
  const coins = searchParams.get("coins");
  const amount = parseFloat(searchParams.get("price"));
  const amountInCents = Math.round(amount * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");

      const res = await axiosSecure.post("/create-payment-intent", { amountInCents });
      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          const transactionId = result.paymentIntent.id;
          const paymentData = {
            email: user.email,
            amount,
            coins: parseInt(coins),
            transactionId,
            paymentMethod: result.paymentIntent.payment_method_types,
          };

          const paymentRes = await axiosSecure.post("/payments", paymentData);

          if (paymentRes.data.insertedId) {
            await Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              html: `<strong>Transaction Id:</strong> <code>${transactionId}</code><br/><strong>Coins Purchased:</strong> ${coins}`,
              confirmButtonText: "Go to Payment History",
            }).then(() => navigate("/dashboard/paymentHistory"));
          }
        }
      }
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-8 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow transition-colors duration-300 mt-12">
      <h2 className="text-2xl font-bold  text-center mb-6">💳<span className="text-primary-gradient dark:text-blue-300">Complete Your Payment</span> </h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-900 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700 transition">
        <CardElement className="p-3 border rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100" />
        <button
          type="submit"
          disabled={!stripe}
          className="btn btn-primary w-full mt-4"
        >
          Pay ${amount}
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-center mt-2">{error}</p>
      )}
    </div>
  );
};

export default PaymentForm;