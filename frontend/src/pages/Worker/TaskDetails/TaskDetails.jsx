import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import UseAuth from "../../../hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TaskDetails = () => {
  const { id } = useParams();
  const { user } = UseAuth();
  const [submission, setSubmission] = useState("");
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();

  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["taskDetails", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/task/${id}`);
      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      task_id: id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      worker_email: user.email,
      worker_name: user.name,
      buyer_name: task.buyer_name,
      buyer_email: task.buyer_email,
      task_image: task.task_image,
      submission_details: submission,
      current_date: new Date().toISOString(),
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/submit-task", submissionData);
      const result = res.data;

      if (result.success) {
        toast.success("✅ Submission successful!");
        setSubmission("");
        setTimeout(() => {
          navigate("/dashboard/mySubmission");
        }, 1000);
      } else {
        toast.error("❌ " + (result.message || "Submission failed"));
      }
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("❌ Could not reach the server");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (error || !task) {
    return (
      <p className="text-center py-6 text-red-500 dark:text-red-400">
        Failed to load task. Please try again later.
      </p>
    );
  }

  return (
    <div className=" px-4 sm:px-6 py-6 md:py-10 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-lg md:rounded-2xl shadow transition-colors duration-300 space-y-6 mt-7">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center px-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-300">
            📋 {task.task_title}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
            Read the task and submit your work below
          </p>
        </div>

        {/* Task Info */}
        <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg md:rounded-xl shadow border border-gray-200 dark:border-gray-700 space-y-4 sm:space-y-6 text-gray-800 dark:text-gray-100">
          {/* Hero Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm overflow-hidden rounded-lg border shadow">
              <img
                src={task.task_image}
                alt="Task"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Main Info */}
          <div className="space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              <strong className="text-blue-500 dark:text-blue-400">
                📝 Detail:
              </strong>{" "}
              {task.task_detail}
            </p>
          </div>

          {/* Pay & Requirement */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
            <p>
              <strong>💰 Pay:</strong> ${task.payable_amount}
            </p>
            <p>
              <strong>👥 Required Workers:</strong> {task.required_workers}
            </p>
            <p>
              <strong>📅 Deadline:</strong>{" "}
              {new Date(task.completion_date).toLocaleDateString()}
            </p>
          </div>

          {/* Buyer Info */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-3 sm:pt-4 text-xs sm:text-sm space-y-1">
            <p>
              <strong>👤 Buyer Name:</strong> {task.buyer_name}
            </p>
            <p>
              <strong>📧 Buyer Email:</strong> {task.buyer_email}
            </p>
          </div>
        </div>
        {user ? (
          <form
            onSubmit={handleSubmit}
            className="space-y-3 sm:space-y-4 px-2 sm:px-0"
          >
            <label
              htmlFor="submission"
              className="block text-base sm:text-lg font-medium text-gray-800 dark:text-white mt-5"
            >
              Submit Your Task
            </label>
            <textarea
              value={submission}
              onChange={(e) => setSubmission(e.target.value)}
              required
              placeholder="Your submission details..."
              className="textarea textarea-bordered w-full h-32 sm:h-40 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button
              type="submit"
              className="btn btn-primary w-full text-sm sm:text-base"
            >
              Submit Task
            </button>
          </form>
        ) : (
          <div className="text-center space-y-3">
            <p className="text-red-500 font-medium">
              ⚠️ Please log in first to submit the task.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="btn btn-outline btn-primary w-full text-sm sm:text-base"
            >
              Login to Continue
            </button>
          </div>
        )}

        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default TaskDetails;
