import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  // 🔍 Fetch platform stats
  const {
    data: stats = {
      totalBuyers: 0,
      totalWorkers: 0,
      totalCoins: 0,
      totalPayments: 0,
    },
    isLoading: loadingStats,
    error: statsError,
  } = useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  // 🔍 Fetch pending withdrawals
  const {
    data: requests = [],
    isLoading: loadingWithdrawals,
    error: withdrawError,
    refetch,
  } = useQuery({
    queryKey: ["pendingWithdrawals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/pendingWithdrawals");
      return res.data;
    },
  });

  // ✅ Handle approval
  const handleApprove = async (reqId, workerEmail, coinAmount) => {
    const confirm = window.confirm("Confirm payment success?");
    if (!confirm) return;

    try {
      const res = await axiosSecure.patch(`/admin/approveWithdrawal/${reqId}`, {
        email: workerEmail,
        coins: coinAmount,
      });

      if (res.data.success) {
        toast.success("✅ Payment marked as approved");
        refetch(); // refresh pending list
      }
    } catch {
      toast.error("❌ Failed to approve payment");
    }
  };

  if (loadingStats || loadingWithdrawals) {
    return (
      <p className="text-center py-10 text-gray-500 dark:text-gray-400">
        Loading admin dashboard...
      </p>
    );
  }

  if (statsError || withdrawError) {
    toast.error("❌ Failed to load admin data");
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10 bg-gradient-to-r from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 rounded-2xl">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold ">
          🛡️<span className="text-primary-gradient dark:text-blue-300">Admin Dashboard</span> 
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage stats and review withdrawal requests
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard label="Total Buyers" value={stats.totalBuyers} color="blue" />
        <StatCard label="Total Workers" value={stats.totalWorkers} color="green" />
        <StatCard label="Available Coins" value={stats.totalCoins} color="yellow" />
        <StatCard label="Total Payments ($)" value={stats.totalPayments} color="purple" />
      </div>

      {/* Withdraw Requests Section */}
      <div className="bg-gradient-to-tr from-sky-100 to-blue-200 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl shadow transition-colors duration-300">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
          💳 Pending Withdrawals
        </h3>
        {requests.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">No pending requests.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
            <table className="table w-full text-sm">
              <thead className="bg-sky-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <tr>
                  <th>#</th>
                  <th>Worker</th>
                  <th>Coins</th>
                  <th>Amount ($)</th>
                  <th>Method</th>
                  <th>Account</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-100">
                {requests.map((req, idx) => (
                  <tr key={req._id} className="hover:bg-sky-100 dark:hover:bg-gray-800">
                    <td>{idx + 1}</td>
                    <td>{req.worker_email}</td>
                    <td>{req.withdrawal_coin}</td>
                    <td>${req.withdrawal_amount.toFixed(2)}</td>
                    <td>{req.payment_system}</td>
                    <td>{req.account_number}</td>
                    <td>{new Date(req.withdraw_date).toLocaleDateString()}</td>
                    <td>{req.status}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          handleApprove(req._id, req.worker_email, req.withdrawal_coin)
                        }
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// 🔧 StatCard Component
const StatCard = ({ label, value = 0, color }) => {
  const bg = {
    blue: "bg-blue-100 dark:bg-blue-900",
    green: "bg-green-100 dark:bg-green-900",
    yellow: "bg-yellow-100 dark:bg-yellow-900",
    purple: "bg-purple-100 dark:bg-purple-900",
  };

  const text = {
    blue: "text-blue-800 dark:text-blue-300",
    green: "text-green-800 dark:text-green-300",
    yellow: "text-yellow-800 dark:text-yellow-300",
    purple: "text-purple-800 dark:text-purple-300",
  };

  return (
    <div className={`rounded-xl p-4 shadow text-center ${bg[color]}`}>
      <p className={`text-md mb-1 font-medium ${text[color]}`}>{label}</p>
      <h3 className={`text-3xl font-bold ${text[color]}`}>{value}</h3>
    </div>
  );
};

export default AdminHome;