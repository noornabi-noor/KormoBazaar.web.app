import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import "sweetalert2/dist/sweetalert2.min.css";
import Swal from "sweetalert2";


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
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("Payment method ", paymentMethod);

      //step2: create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
      });

      const clientSecret = res.data.clientSecret;

      // step3: payment confirmation
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment success!");
          const transactionId = result.paymentIntent.id;

          //step4: mark parcel paid also create payment history
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
              html: `<strong>Transaction Id: </strong> <code>${transactionId}</code><br/><strong>Coins Purchased:</strong> ${coins}`,
              confirmButtonText: "Go to Home",
            }).then(() => {
              navigate("/");
            });
          }


        }
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p- border rounded"></CardElement>
        <button
          type="submit"
          disabled={!stripe}
          className="btn btn-primary w-full mt-2 text-black"
        >
          Pay ${amount}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default PaymentForm;
