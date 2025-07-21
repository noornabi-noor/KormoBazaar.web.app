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
      axiosSecure
        .get(`/worker/stats?email=${user.email}`)
        .then((res) => setStats(res.data))
        .catch(() => toast.error("❌ Failed to load stats"));

      axiosSecure
        .get(`/worker/approvedSubmissions?email=${user.email}`)
        .then((res) => setApprovedSubmissions(res.data))
        .catch(() => toast.error("❌ Failed to load approved submissions"));
    }
  }, [user, axiosSecure]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow transition-colors duration-300">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">💼 Worker Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Track your submissions and earnings</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <StatCard label="📋 Total Submissions" value={stats.totalSubmissions} color="blue" />
        <StatCard label="⏳ Pending Submissions" value={stats.pendingCount} color="yellow" />
        <StatCard label="💰 Total Earnings" value={`${stats.totalEarnings} coins`} color="green" />
      </div>

      {/* Approved Submissions */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow border border-gray-200 dark:border-gray-700 transition">
        <h3 className="text-xl font-semibold text-primary-gradient dark:text-blue-300 mb-4 text-center">
          ✅ Approved Submissions
        </h3>

        {approvedSubmissions.length ? (
          <div className="overflow-x-auto rounded-lg">
            <table className="table w-full text-sm">
              <thead className="bg-blue-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <tr>
                  <th>Task Title</th>
                  <th>Payable Amount</th>
                  <th>Buyer Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-100">
                {approvedSubmissions.map((sub) => (
                  <tr key={sub._id} className="hover:bg-sky-50 dark:hover:bg-gray-800 transition">
                    <td>{sub.task_title}</td>
                    <td>{sub.payable_amount} coins</td>
                    <td>{sub.buyer_name}</td>
                    <td className="text-green-600 dark:text-green-400 font-semibold">Approved</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">No approved submissions found.</p>
        )}
      </div>
    </div>
  );
};

/* 🔧 StatCard Component */
const StatCard = ({ label, value, color }) => {
  const bg = {
    blue: "bg-blue-100 dark:bg-blue-900",
    yellow: "bg-yellow-100 dark:bg-yellow-900",
    green: "bg-green-100 dark:bg-green-900",
  };
  const text = {
    blue: "text-blue-800 dark:text-blue-300",
    yellow: "text-yellow-800 dark:text-yellow-300",
    green: "text-green-800 dark:text-green-300",
  };

  return (
    <div className={`rounded-xl p-4 shadow text-center ${bg[color]}`}>
      <p className={`text-md mb-1 font-medium ${text[color]}`}>{label}</p>
      <h3 className={`text-3xl font-bold ${text[color]}`}>{value}</h3>
    </div>
  );
};

export default WorkerHome;