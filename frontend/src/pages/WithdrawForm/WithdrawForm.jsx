import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

const WithdrawForm = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [coinToWithdraw, setCoinToWithdraw] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const MIN_WITHDRAW_COIN = 200;
  const COIN_TO_DOLLAR = 20;

  // 🔧 Fetch coin balance with TanStack Query
  const {
    data: coinBalance = 0,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userCoinBalance", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return Number(res.data?.coins || 0);
    },
  });

  useEffect(() => {
    setWithdrawAmount(coinToWithdraw / COIN_TO_DOLLAR);
  }, [coinToWithdraw]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (coinToWithdraw < MIN_WITHDRAW_COIN) {
      toast.error("⚠️ Minimum withdrawal is 200 coins");
      return;
    }

    if (coinToWithdraw > coinBalance) {
      toast.error("❌ You don't have enough coins");
      return;
    }

    if (coinToWithdraw % 20 !== 0) {
      toast.error("⚠️ Withdrawal must be divisible by 20");
      return;
    }

    try {
      const withdrawalData = {
        worker_email: user.email,
        worker_name: user.displayName,
        withdrawal_coin: coinToWithdraw,
        withdrawal_amount: withdrawAmount,
        payment_system: paymentSystem,
        account_number: accountNumber,
        status: "pending",
        withdraw_date: new Date(),
      };

      await axiosSecure.post("/withdrawals", withdrawalData);

      Swal.fire({
        title: "Withdrawal Request Submitted ✅",
        html: `
          <p><strong>Coins:</strong> ${coinToWithdraw}</p>
          <p><strong>Amount:</strong> $${withdrawAmount.toFixed(2)}</p>
          <p><strong>Payment Method:</strong> ${paymentSystem}</p>
          <p><strong>Account:</strong> ${accountNumber}</p>
          <p>Status: <strong>Pending</strong></p>
        `,
        icon: "success",
        confirmButtonText: "Back to Dashboard",
      }).then(() => navigate("/dashboard/workerHome"));

      setCoinToWithdraw(0);
      setPaymentSystem("");
      setAccountNumber("");
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Failed to submit withdrawal");
    }
  };

  const eligible = coinBalance >= MIN_WITHDRAW_COIN;

  if (isLoading) {
    return (
      <span className="loading loading-spinner text-primary"></span>
    );
  }

  if (error) {
    toast.error("❌ Failed to load coin balance");
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-10 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow transition-colors duration-300 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
        🪙 <span className="text-2xl font-bold text-primary-gradient dark:text-blue-300">Withdraw Coins</span>
      </h2>

      <div className="text-center text-gray-700 dark:text-gray-300">
        <p>Current Balance: <strong>{coinBalance} coins</strong></p>
        <p>Equivalent: <strong>${(coinBalance / COIN_TO_DOLLAR).toFixed(2)}</strong></p>
      </div>

      {!eligible ? (
        <p className="text-center text-red-500 dark:text-red-400 font-medium">
          ⚠️ You need at least {MIN_WITHDRAW_COIN} coins to request withdrawal.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-800 dark:text-gray-100">
          <div>
            <label className="block mb-1">Coins to Withdraw</label>
            <input
              type="number"
              className="input input-bordered w-full bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400"
              value={coinToWithdraw}
              onChange={(e) => setCoinToWithdraw(Number(e.target.value))}
              min={200}
              step={20}
              max={coinBalance}
              required
              placeholder="e.g. 200, 300..."
            />
          </div>

          <div>
            <label className="block mb-1">Amount ($)</label>
            <input
              type="number"
              readOnly
              className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              value={withdrawAmount}
            />
          </div>

          <div>
            <label className="block mb-1">Payment System</label>
            <select
              className="select select-bordered w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              value={paymentSystem}
              onChange={(e) => setPaymentSystem(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Bkash">Bkash</option>
              <option value="Rocket">Rocket</option>
              <option value="Nagad">Nagad</option>
              <option value="Bank">Bank Transfer</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Account Number</label>
            <input
              type="text"
              className="input input-bordered w-full bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
              placeholder="Enter your Bkash/Rocket/etc account"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Request Withdrawal
          </button>
        </form>
      )}
    </div>
  );
};

export default WithdrawForm;