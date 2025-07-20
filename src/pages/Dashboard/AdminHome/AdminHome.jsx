import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({});
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axiosSecure.get("/admin/stats").then((res) => setStats(res.data));
    axiosSecure.get("/admin/pendingWithdrawals").then((res) => setRequests(res.data));
  }, [axiosSecure]);

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
        setRequests(requests.filter(req => req._id !== reqId));
      }
    } catch {
      toast.error("❌ Failed to approve payment");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold">🛡️ Admin Dashboard</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <p className="text-lg">Total Buyers</p>
          <h3 className="text-2xl font-bold">{stats.totalBuyers || 0}</h3>
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <p className="text-lg">Total Workers</p>
          <h3 className="text-2xl font-bold">{stats.totalWorkers || 0}</h3>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow text-center">
          <p className="text-lg">Available Coins</p>
          <h3 className="text-2xl font-bold">{stats.totalCoins || 0}</h3>
        </div>
        <div className="bg-purple-100 p-4 rounded shadow text-center">
          <p className="text-lg">Total Payments ($)</p>
          <h3 className="text-2xl font-bold">{stats.totalPayments || 0}</h3>
        </div>
      </div>

      {/* Withdraw Requests Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">💳 Pending Withdrawals</h3>
        {requests.length === 0 ? (
          <p className="text-gray-500">No pending requests.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
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
              <tbody>
                {requests.map((req, idx) => (
                  <tr key={req._id}>
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

export default AdminHome;