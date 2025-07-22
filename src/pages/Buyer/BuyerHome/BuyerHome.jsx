import React, { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UseAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BuyerHome = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [viewSubmission, setViewSubmission] = useState(null);

  // 🔍 Fetch buyer stats
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

  // 🔍 Fetch pending submissions
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

  // ✅ Approve submission
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

  // ❌ Reject submission
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
      <p className="text-center py-10 text-gray-500 dark:text-gray-400">
        Loading buyer dashboard...
      </p>
    );
  }

  if (errorStats || errorSubmissions) {
    toast.error("❌ Failed to load dashboard data");
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow transition-colors duration-300">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary-gradient dark:text-blue-300">👨‍💼 Buyer Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Your task overview and submissions to review
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <StatCard label="📝 Total Tasks" value={stats.totalTasks} color="blue" />
        <StatCard label="👥 Pending Workers" value={stats.pendingWorkers} color="yellow" />
        <StatCard label="💰 Total Paid" value={`$${stats.totalPaid}`} color="green" />
      </div>

      {/* Pending Submissions */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow transition-all border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
          🕵️‍♂️ Tasks to Review
        </h3>

        {pendingSubmissions.length ? (
          <div className="overflow-x-auto rounded-lg">
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
                    <td>{submission.task_title}</td>
                    <td>{submission.payable_amount} coins</td>
                    <td className="space-x-2">
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => setViewSubmission(submission)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-sm btn-success"
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
                        className="btn btn-sm btn-error"
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
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No submissions awaiting review.
          </p>
        )}
      </div>

      {/* Modal */}
      {viewSubmission && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <form
            method="dialog"
            className="modal-box bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
          >
            <h3 className="font-bold text-lg mb-2">📄 Submission Detail</h3>
            <p><strong>Worker:</strong> {viewSubmission.worker_name}</p>
            <p><strong>Task:</strong> {viewSubmission.task_title}</p>
            <p><strong>Details:</strong> {viewSubmission.submission_details}</p>
            <div className="modal-action">
              <button className="btn btn-outline" onClick={() => setViewSubmission(null)}>
                Close
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

/* 🔧 Stat Card Component */
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

export default BuyerHome;