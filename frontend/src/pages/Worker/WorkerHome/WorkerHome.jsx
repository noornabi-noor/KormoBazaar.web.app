import React from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";

const WorkerHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();

  // Query for worker stats
  const {
    data: stats = { totalSubmissions: 0, pendingCount: 0, totalEarnings: 0 },
    isLoading: statsLoading,
    error: statsError,
  } = useQuery({
    queryKey: ["workerStats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/worker/stats?email=${user.email}`);
      return res.data;
    },
  });

  // Query for approved submissions
  const {
    data: approvedSubmissions = [],
    isLoading: submissionsLoading,
    error: submissionsError,
  } = useQuery({
    queryKey: ["approvedSubmissions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/worker/approvedSubmissions?email=${user.email}`);
      return res.data;
    },
  });

  // Error handling
  if (statsError || submissionsError) {
    toast.error("❌ Failed to load worker dashboard");
  }

  // Loading state
  if (statsLoading || submissionsLoading) {
    return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="loading loading-spinner text-primary w-12 h-12"></span>
    </div>
  );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-8 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-lg md:rounded-2xl shadow transition-colors duration-300">
      {/* Header */}
      <div className="text-center px-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
          💼 <span className="text-primary-gradient dark:text-blue-300">Worker Dashboard</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
          Track your submissions and earnings
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-6">
        <StatCard label="📋 Total Submissions" value={stats.totalSubmissions} color="blue" />
        <StatCard label="⏳ Pending Submissions" value={stats.pendingCount} color="yellow" />
        <StatCard label="💰 Total Earnings" value={`${stats.totalEarnings} coins`} color="green" />
      </div>

      {/* Approved Submissions */}
      <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg md:rounded-2xl shadow border border-gray-200 dark:border-gray-700 transition">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center">
          ✅ <span className="text-primary-gradient dark:text-blue-300">Approved Submissions</span>
        </h3>

        {approvedSubmissions.length ? (
          <div className="overflow-x-auto">
            {/* Table for larger screens */}
            <div className="hidden sm:block">
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

            {/* Cards for mobile */}
            <div className="sm:hidden space-y-3">
              {approvedSubmissions.map((sub) => (
                <div
                  key={sub._id}
                  className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">
                      {sub.task_title}
                    </h3>
                    <span className="badge badge-success text-xs">
                      Approved
                    </span>
                  </div>
                  <div className="mt-2 text-sm">
                    <p className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Amount:</span> {sub.payable_amount} coins
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Buyer:</span> {sub.buyer_name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">
            No approved submissions found.
          </p>
        )}
      </div>
    </div>
  );
};

// StatCard Component
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
    <div className={`rounded-lg sm:rounded-xl p-3 sm:p-4 shadow text-center ${bg[color]}`}>
      <p className={`text-sm sm:text-md mb-1 font-medium ${text[color]}`}>{label}</p>
      <h3 className={`text-2xl sm:text-3xl font-bold ${text[color]}`}>{value}</h3>
    </div>
  );
};

export default WorkerHome;