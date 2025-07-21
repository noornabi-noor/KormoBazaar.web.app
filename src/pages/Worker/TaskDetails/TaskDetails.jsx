import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import UseAuth from "../../../hooks/UseAuth";

const TaskDetails = () => {
  const { id } = useParams();
  const { user } = UseAuth();
  const [task, setTask] = useState(null);
  const [submission, setSubmission] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/task/${id}`)
      .then((res) => res.json())
      .then((data) => setTask(data))
      .catch((err) => console.error("Task fetch error:", err));
  }, [id]);

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
      } else {
        toast.error("❌ " + result.message || "Submission failed");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("❌ Could not reach the server");
    }
  };

  if (!task)
    return <p className="text-center py-6 text-gray-500 dark:text-gray-400">Loading task...</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow transition-colors duration-300 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary-gradient dark:text-blue-300">{task.task_title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Read the task and submit your work below</p>
      </div>

      {/* Task Info */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700 space-y-2 text-gray-800 dark:text-gray-100">
        <p><strong>Detail:</strong> {task.task_detail}</p>
        <p><strong>Pay:</strong> ${task.payable_amount}</p>
        <p><strong>Buyer Name:</strong> {task.buyer_name}</p>
        <p><strong>Buyer Email:</strong> {task.buyer_email}</p>
        <p><strong>Required Workers:</strong> {task.required_workers}</p>
        <p><strong>Deadline:</strong> {new Date(task.completion_date).toLocaleDateString()}</p>
      </div>

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="submission" className="block text-lg font-medium text-gray-800 dark:text-white">
          Your Submission
        </label>
        <textarea
          value={submission}
          onChange={(e) => setSubmission(e.target.value)}
          required
          placeholder="Your submission details..."
          className="textarea textarea-bordered w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
        ></textarea>
        <button type="submit" className="btn btn-success w-full">
          Submit Task
        </button>
      </form>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default TaskDetails;