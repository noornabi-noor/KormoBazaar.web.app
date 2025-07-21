import React, { useState } from "react";
import UseAuth from "../../../hooks/UseAuth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTasks = () => {
  const { user } = UseAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    task_title: "",
    task_detail: "",
    required_workers: "",
    payable_amount: "",
    completion_date: "",
    submission_info: "",
    task_image: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalPay = Number(formData.required_workers) * Number(formData.payable_amount);

    try {
      const res = await fetch(`http://localhost:5000/user/${user.email}`);
      const userData = await res.json();

      if (userData.coins < totalPay) {
        alert("Not enough coins. Please purchase more.");
        navigate("/purchase-coin");
        return;
      }

      const taskRes = await fetch("http://localhost:5000/add-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyer_email: user.email,
          ...formData,
          required_workers: Number(formData.required_workers),
          payable_amount: Number(formData.payable_amount),
        }),
      });

      const result = await taskRes.json();

      if (result.success) {
        toast.success("✅ Task added successfully!");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        toast.error("❌ " + result.message || "Failed to add task");
      }
    } catch {
      toast.error("❌ Server error while submitting task");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow transition-colors duration-300 space-y-8">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">📋 Add New Task</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Fill out the form to post a task</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="task_title"
          type="text"
          required
          placeholder="Task Title"
          onChange={handleChange}
          className="input input-bordered w-full bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-gray-200"
        />

        <textarea
          name="task_detail"
          required
          placeholder="Task Detail"
          onChange={handleChange}
          className="textarea textarea-bordered w-full bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-gray-200"
        />

        <input
          name="required_workers"
          type="number"
          required
          placeholder="Required Workers"
          onChange={handleChange}
          className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        />

        <input
          name="payable_amount"
          type="number"
          required
          placeholder="Pay Per Worker"
          onChange={handleChange}
          className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        />

        <input
          name="completion_date"
          type="date"
          required
          onChange={handleChange}
          className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        />

        <input
          name="submission_info"
          type="text"
          required
          placeholder="Submission Info (e.g., Screenshot)"
          onChange={handleChange}
          className="input input-bordered w-full bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-gray-200"
        />

        <input
          type="url"
          name="task_image"
          required
          placeholder="https://example.com/image.jpg"
          onChange={handleChange}
          className="input input-bordered w-full bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-800 dark:text-gray-200"
        />

        <button type="submit" className="btn btn-primary w-full">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTasks;