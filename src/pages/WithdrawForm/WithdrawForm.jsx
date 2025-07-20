import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const WithdrawForm = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const [coinBalance, setCoinBalance] = useState(0);
  const [coinToWithdraw, setCoinToWithdraw] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const navigate = useNavigate();

  const MIN_WITHDRAW_COIN = 200;
  const COIN_TO_DOLLAR = 20;

  useEffect(() => {
    // Fetch current user coin balance
    if (user?.email) {
      axiosSecure
        .get(`/user/${user.email}`)
        .then((res) => setCoinBalance(Number(res.data?.coins || 0)))
        .catch(() => toast.error("❌ Failed to load coin balance"));
    }
  }, [user, axiosSecure]);

  useEffect(() => {
    setWithdrawAmount(coinToWithdraw / COIN_TO_DOLLAR);
  }, [coinToWithdraw]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (coinToWithdraw < MIN_WITHDRAW_COIN) {
      toast.error("⚠️ Must withdraw at least 200 coins");
      return;
    }

    if (coinToWithdraw > coinBalance) {
      toast.error("❌ Withdrawal amount exceeds your coin balance");
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
        withdrawal_amount: coinToWithdraw / COIN_TO_DOLLAR,
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
    <p><strong>Amount:</strong> $${(coinToWithdraw / COIN_TO_DOLLAR).toFixed(
      2
    )}</p>
    <p><strong>Payment Method:</strong> ${paymentSystem}</p>
    <p><strong>Account:</strong> ${accountNumber}</p>
    <p>Status: <strong>Pending</strong></p>
  `,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/dashboard/workerHome"); 
      });

      setCoinToWithdraw(0);
      setPaymentSystem("");
      setAccountNumber("");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "❌ Failed to submit withdrawal"
      );
    }
  };

  const eligible = coinBalance >= MIN_WITHDRAW_COIN;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">🪙 Withdraw Coins</h2>
      <p className="mb-2">
        Current Coin: <strong>{coinBalance}</strong>
      </p>
      <p className="mb-4">
        Withdrawal Value:{" "}
        <strong>${(coinBalance / COIN_TO_DOLLAR).toFixed(2)}</strong>
      </p>

      {!eligible ? (
        <p className="text-red-500">
          ⚠️ Insufficient coin to withdraw (min 200 required)
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Coins to Withdraw</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={coinToWithdraw}
              onChange={(e) => setCoinToWithdraw(Number(e.target.value))}
              min={200}
              step={20}
              max={coinBalance}
              required
            />
          </div>

          <div>
            <label>Withdrawal Amount ($)</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={withdrawAmount}
              readOnly
            />
          </div>

          <div>
            <label>Payment System</label>
            <select
              className="select select-bordered w-full"
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
            <label>Account Number</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
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
