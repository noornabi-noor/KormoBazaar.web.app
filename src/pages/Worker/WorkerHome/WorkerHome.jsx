import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";

const WorkerHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();

  const [stats, setStats] = useState({
    totalSubmissions: 0,
    pendingCount: 0,
    totalEarnings: 0,
  });
  const [approvedSubmissions, setApprovedSubmissions] = useState([]);

  useEffect(() => {
    if (user?.email) {
      // 🧾 Fetch stats
      axiosSecure
        .get(`/worker/stats?email=${user.email}`)
        .then((res) => setStats(res.data))
        .catch(() => toast.error("❌ Failed to load stats"));

      // 📜 Fetch approved submissions
      axiosSecure
        .get(`/worker/approvedSubmissions?email=${user.email}`)
        .then((res) => setApprovedSubmissions(res.data))
        .catch(() => toast.error("❌ Failed to load approved submissions"));
    }
  }, [user, axiosSecure]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-blue-100 p-4 rounded shadow">
          <h3 className="font-semibold text-lg">📋 Total Submissions</h3>
          <p className="text-2xl mt-2">{stats.totalSubmissions}</p>
        </div>
        <div className="card bg-yellow-100 p-4 rounded shadow">
          <h3 className="font-semibold text-lg">⏳ Pending Submissions</h3>
          <p className="text-2xl mt-2">{stats.pendingCount}</p>
        </div>
        <div className="card bg-green-100 p-4 rounded shadow">
          <h3 className="font-semibold text-lg">💰 Total Earnings</h3>
          <p className="text-2xl mt-2">{stats.totalEarnings} coins</p>
        </div>
      </div>

      {/* Approved Submissions Table */}
      <div>
        <h2 className="text-xl font-bold mb-4">✅ Approved Submissions</h2>
        {approvedSubmissions.length ? (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Payable Amount</th>
                  <th>Buyer Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {approvedSubmissions.map((sub) => (
                  <tr key={sub._id}>
                    <td>{sub.task_title}</td>
                    <td>{sub.payable_amount} coins</td>
                    <td>{sub.buyer_name}</td>
                    <td className="text-green-600 font-semibold">Approved</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No approved submissions found.</p>
        )}
      </div>
    </div>
  );
};

export default WorkerHome;