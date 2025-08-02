import React, { useState } from "react";
import UseAuth from "../../../hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ITEMS_PER_PAGE = 5;

const MySubmissions = () => {
  const { user } = UseAuth();
  const [page, setPage] = useState(1);

  const axiosSecure = useAxiosSecure();

  const {
    data = { submissions: [], totalPages: 1 },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mySubmissions", user?.email, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-submissions/${user.email}?page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  if (error) {
    toast.error("❌ Failed to load submissions");
  }

  const { submissions, totalPages } = data;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-10 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-lg md:rounded-2xl shadow transition-colors duration-300 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="text-center px-2">
        <h2 className="text-2xl sm:text-3xl font-bold">
          📬
          <span className="text-primary-gradient dark:text-blue-300">
            My Submissions
          </span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
          Track your submission status and details
        </p>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm min-h-[300px] mx-2 sm:mx-0">
        {isLoading ? (
          <div className="text-center py-12">
            <span className="loading loading-bars text-primary"></span>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Fetching submissions...
            </p>
          </div>
        ) : submissions.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stacked on mobile, table on larger screens */}
              <div className="hidden sm:block">
                <table className="table w-full text-sm">
                  <thead className="bg-blue-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                    <tr>
                      <th>Task Title</th>
                      <th>Buyer</th>
                      <th>Pay</th>
                      <th>Date</th>
                      <th>Submission</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 dark:text-gray-100">
                    {submissions.map((s) => (
                      <tr
                        key={s._id}
                        className="hover:bg-sky-50 dark:hover:bg-gray-800 transition"
                      >
                        <td>{s.task_title}</td>
                        <td>
                          {s.buyer_name} <br />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {s.buyer_email}
                          </span>
                        </td>
                        <td>${s.payable_amount}</td>
                        <td>{new Date(s.current_date).toLocaleDateString()}</td>
                        <td className="max-w-[200px] truncate">
                          {s.submission_details}
                        </td>
                        <td>
                          <span
                            className={`badge px-3 py-1 text-xs font-semibold ${
                              s.status === "approved"
                                ? "badge-success text-green-700 dark:text-green-300"
                                : s.status === "rejected"
                                ? "badge-error text-red-700 dark:text-red-300"
                                : "badge-warning text-yellow-700 dark:text-yellow-300"
                            }`}
                          >
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="sm:hidden space-y-4 p-3">
                {submissions.map((s) => (
                  <div
                    key={s._id}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">
                        {s.task_title}
                      </h3>
                      <span
                        className={`badge px-2 py-0.5 text-xs ${
                          s.status === "approved"
                            ? "badge-success"
                            : s.status === "rejected"
                            ? "badge-error"
                            : "badge-warning"
                        }`}
                      >
                        {s.status}
                      </span>
                    </div>
                    <div className="mt-2 text-sm">
                      <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Buyer:</span> {s.buyer_name}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Pay:</span> ${s.payable_amount}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Date:</span>{" "}
                        {new Date(s.current_date).toLocaleDateString()}
                      </p>
                      <p className="mt-2">
                        <span className="font-medium">Submission:</span>{" "}
                        <span className="text-gray-600 dark:text-gray-400">
                          {s.submission_details.length > 50
                            ? `${s.submission_details.substring(0, 50)}...`
                            : s.submission_details}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-10">
            No submissions found.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-4 md:mt-6 px-2">
        <button
          disabled={isLoading || page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="btn btn-sm btn-outline w-full sm:w-auto"
        >
          ◀️ Previous
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={isLoading || page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className="btn btn-sm btn-outline w-full sm:w-auto"
        >
          Next ▶️
        </button>
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default MySubmissions;