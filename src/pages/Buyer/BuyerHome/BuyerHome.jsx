import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UseAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BuyerHome = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({ totalTasks: 0, pendingWorkers: 0, totalPaid: 0 });
  const [pendingSubmissions, setPendingSubmissions] = useState([]);
  const [viewSubmission, setViewSubmission] = useState(null);

  useEffect(() => {
    if (user?.email) {
      // ✅ Fetch stats
      axiosSecure
        .get(`/buyer/stats?email=${user.email}`)
        .then((res) => setStats(res.data))
        .catch(() => toast.error("❌ Failed to load stats"));

      // ✅ Fetch pending submissions
      axiosSecure
        .get(`/buyer/pendingSubmissions?email=${user.email}`)
        .then((res) => setPendingSubmissions(res.data))
        .catch(() => toast.error("❌ Failed to load submissions"));
    }
  }, [user, axiosSecure]);

  const handleApprove = async (submissionId, workerEmail, payable) => {
    try {
      await axiosSecure.patch(`/buyer/approveSubmission/${submissionId}`, {
        workerEmail,
        coins: payable,
      });

      toast.success("✅ Approved!");
      // Refresh list
      setPendingSubmissions((prev) => prev.filter((s) => s._id !== submissionId));
    } catch (err) {
      toast.error("❌ Failed to approve submission");
    }
  };

  const handleReject = async (submissionId, taskId) => {
    try {
      await axiosSecure.patch(`/buyer/rejectSubmission/${submissionId}`, {
        taskId,
      });

      toast.success("🚫 Rejected");
      // Refresh list
      setPendingSubmissions((prev) => prev.filter((s) => s._id !== submissionId));
    } catch (err) {
      toast.error("❌ Failed to reject submission");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-blue-100 p-4 rounded shadow">
          <h3 className="font-semibold text-lg">📝 Total Tasks</h3>
          <p className="text-2xl mt-2">{stats.totalTasks}</p>
        </div>
        <div className="card bg-yellow-100 p-4 rounded shadow">
          <h3 className="font-semibold text-lg">👥 Pending Workers</h3>
          <p className="text-2xl mt-2">{stats.pendingWorkers}</p>
        </div>
        <div className="card bg-green-100 p-4 rounded shadow">
          <h3 className="font-semibold text-lg">💰 Total Paid</h3>
          <p className="text-2xl mt-2">${stats.totalPaid}</p>
        </div>
      </div>

      {/* Pending Submissions */}
      <div>
        <h2 className="text-xl font-bold mb-4">🕵️‍♂️ Tasks to Review</h2>
        {pendingSubmissions.length ? (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Worker Name</th>
                  <th>Task Title</th>
                  <th>Payable Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingSubmissions.map((submission) => (
                  <tr key={submission._id}>
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
                            submission.payable_amount
                          )
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() =>
                          handleReject(submission._id, submission.task_id)
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
          <p>No submissions awaiting review.</p>
        )}
      </div>

      {/* Modal */}
      {viewSubmission && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg mb-2">Submission Detail</h3>
            <p>
              <strong>Worker:</strong> {viewSubmission.worker_name}
            </p>
            <p>
              <strong>Task:</strong> {viewSubmission.task_title}
            </p>
            <p>
              <strong>Submitted Info:</strong> {viewSubmission.submission_detail}
            </p>
            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setViewSubmission(null)}
              >
                Close
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default BuyerHome;