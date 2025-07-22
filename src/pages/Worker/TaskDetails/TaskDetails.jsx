import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import UseAuth from "../../../hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";

const TaskDetails = () => {
  const { id } = useParams();
  const { user } = UseAuth();
  const [submission, setSubmission] = useState("");
  const navigate = useNavigate();

  // 🔧 Fetch task data by ID
  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["taskDetails", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/task/${id}`);
      if (!res.ok) throw new Error("Failed to fetch task");
      return res.json();
    },
  });

  // 🔔 Submission handler
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
      const res = await fetch("http://localhost:5000/submit-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const result = await res.json();
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

  // ⏳ Loading state
  if (isLoading) {
    return (
      <p className="text-center py-6 text-gray-500 dark:text-gray-400">
        Loading task...
      </p>
    );
  }

  // ❌ Error state
  if (error || !task) {
    return (
      <p className="text-center py-6 text-red-500 dark:text-red-400">
        Failed to load task. Please try again later.
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow transition-colors duration-300 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-300">
          📋 {task.task_title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Read the task and submit your work below
        </p>
      </div>

      {/* Task Info */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-6 text-gray-800 dark:text-gray-100 max-w-4xl mx-auto">

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-6 text-gray-800 dark:text-gray-100 max-w-4xl mx-auto">
          {/* ✅ Hero Image */}
          <div className="flex justify-center">
            <div className="aspect-square w-full max-w-sm overflow-hidden rounded-lg border shadow">
              <img
                src={task.task_image}
                alt="Task"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* ✅ Main Info */}
        <div className="space-y-2">
          <p className="text-gray-700 dark:text-gray-300">
            <strong className="text-blue-500 dark:text-blue-400">
              📝 Detail:
            </strong>{" "}
            {task.task_detail}
          </p>
        </div>

        {/* ✅ Pay & Requirement */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
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

        {/* ✅ Buyer Info */}
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4 text-sm space-y-1">
          <p>
            <strong>👤 Buyer Name:</strong> {task.buyer_name}
          </p>
          <p>
            <strong>📧 Buyer Email:</strong> {task.buyer_email}
          </p>
        </div>
      </div>

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label
          htmlFor="submission"
          className="block text-lg font-medium text-gray-800 dark:text-white"
        >
          Your Submission
        </label>
        <textarea
          value={submission}
          onChange={(e) => setSubmission(e.target.value)}
          required
          placeholder="Your submission details..."
          className="textarea textarea-bordered w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
        />
        <button type="submit" className="btn btn-success w-full">
          Submit Task
        </button>
      </form>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default TaskDetails;
