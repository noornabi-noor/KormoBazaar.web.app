import React, { useState } from "react";
import { toast } from "react-toastify";
import UseAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BuyerHome = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [viewSubmission, setViewSubmission] = useState(null);

  const {
    data: stats = { totalTasks: 0, pendingWorkers: 0, totalPaid: 0 },
    isLoading: loadingStats,
    error: errorStats,
  } = useQuery({
    queryKey: ["buyerStats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/buyer/stats?email=${user.email}`);
      return res.data;
    },
  });

  const {
    data: pendingSubmissions = [],
    isLoading: loadingSubmissions,
    error: errorSubmissions,
  } = useQuery({
    queryKey: ["pendingSubmissions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/buyer/pendingSubmissions?email=${user.email}`);
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async ({ submissionId, workerEmail, payable, taskTitle }) => {
      return await axiosSecure.patch(`/buyer/approveSubmission/${submissionId}`, {
        workerEmail,
        coins: payable,
        buyerName: user.displayName || "Buyer",
        taskTitle,
      });
    },
    onSuccess: () => {
      toast.success("✅ Approved!");
      queryClient.invalidateQueries(["pendingSubmissions", user.email]);
    },
    onError: () => toast.error("❌ Failed to approve submission"),
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ submissionId, taskId, workerEmail, buyerName, taskTitle }) => {
      return await axiosSecure.patch(`/buyer/rejectSubmission/${submissionId}`, {
        taskId,
        workerEmail,
        buyerName,
        taskTitle,
      });
    },
    onSuccess: () => {
      toast.success("🚫 Rejected and worker notified");
      queryClient.invalidateQueries(["pendingSubmissions", user.email]);
    },
    onError: () => toast.error("❌ Failed to reject submission"),
  });

  const handleApprove = (submissionId, workerEmail, payable, taskTitle) => {
    approveMutation.mutate({ submissionId, workerEmail, payable, taskTitle });
  };

  const handleReject = (submissionId, taskId, workerEmail, buyerName, taskTitle) => {
    rejectMutation.mutate({ submissionId, taskId, workerEmail, buyerName, taskTitle });
  };

  if (loadingStats || loadingSubmissions) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (errorStats || errorSubmissions) {
    toast.error("❌ Failed to load dashboard data");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-6 md:space-y-10 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-lg md:rounded-2xl shadow transition-colors duration-300">
      {/* Header */}
      <div className="text-center px-2">
        <h2 className="text-2xl sm:text-3xl font-bold">
          👨‍💼<span className="text-primary-gradient dark:text-blue-300">Buyer Dashboard</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
          Your task overview and submissions to review
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
        <StatCard label="📝 Total Tasks" value={stats.totalTasks} color="blue" />
        <StatCard label="👥 Pending Workers" value={stats.pendingWorkers} color="yellow" />
        <StatCard label="💰 Total Paid" value={`$${stats.totalPaid}`} color="green" />
      </div>

      {/* Pending Submissions */}
      <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg md:rounded-2xl shadow border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4 text-center">
          🕵️‍♂️ Tasks to Review
        </h3>

        {pendingSubmissions.length ? (
          <div className="overflow-x-auto rounded-lg">
            {/* Desktop Table */}
            <div className="hidden sm:block">
              <table className="table w-full text-sm">
                <thead className="bg-blue-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                  <tr>
                    <th>Worker Name</th>
                    <th>Task Title</th>
                    <th>Payable</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-100">
                  {pendingSubmissions.map((submission) => (
                    <tr key={submission._id} className="hover:bg-sky-50 dark:hover:bg-gray-800">
                      <td>{submission.worker_name}</td>
                      <td className="max-w-[150px] truncate">{submission.task_title}</td>
                      <td>{submission.payable_amount} coins</td>
                      <td className="space-x-2">
                        <button
                          className="btn btn-xs sm:btn-sm btn-info"
                          onClick={() => setViewSubmission(submission)}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-xs sm:btn-sm btn-success"
                          onClick={() =>
                            handleApprove(
                              submission._id,
                              submission.worker_email,
                              submission.payable_amount,
                              submission.task_title
                            )
                          }
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-xs sm:btn-sm btn-error"
                          onClick={() =>
                            handleReject(
                              submission._id,
                              submission.task_id,
                              submission.worker_email,
                              user.displayName || "Buyer",
                              submission.task_title
                            )
                          }
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden space-y-3">
              {pendingSubmissions.map((submission) => (
                <div
                  key={submission._id}
                  className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">
                        {submission.worker_name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {submission.task_title}
                      </p>
                    </div>
                    <span className="badge badge-sm">
                      {submission.payable_amount} coins
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      className="btn btn-xs btn-info flex-1"
                      onClick={() => setViewSubmission(submission)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-xs btn-success flex-1"
                      onClick={() =>
                        handleApprove(
                          submission._id,
                          submission.worker_email,
                          submission.payable_amount,
                          submission.task_title
                        )
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-xs btn-error flex-1"
                      onClick={() =>
                        handleReject(
                          submission._id,
                          submission.task_id,
                          submission.worker_email,
                          user.displayName || "Buyer",
                          submission.task_title
                        )
                      }
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">
            No submissions awaiting review.
          </p>
        )}
      </div>

      {/* Modal */}
      {viewSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg md:rounded-2xl shadow-lg max-w-md w-full">
            <h3 className="font-bold text-lg mb-2">📄 Submission Detail</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Worker:</strong> {viewSubmission.worker_name}</p>
              <p><strong>Task:</strong> {viewSubmission.task_title}</p>
              <p><strong>Details:</strong> {viewSubmission.submission_details}</p>
            </div>
            <div className="modal-action mt-4">
              <button 
                className="btn btn-sm btn-outline w-full sm:w-auto" 
                onClick={() => setViewSubmission(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
      <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold ${text[color]}`}>{value}</h3>
    </div>
  );
};

export default BuyerHome;