import React, { useState } from "react";
import UseAuth from "../../../hooks/UseAuth";
import { useNavigate } from "react-router";

import { toast, ToastContainer } from "react-toastify";
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

    const {
      task_title,
      task_detail,
      required_workers,
      payable_amount,
      completion_date,
      submission_info,
      task_image,
    } = formData;

    const totalPay = Number(required_workers) * Number(payable_amount);

    try {
      const userRes = await fetch(`http://localhost:5000/user/${user.email}`);
      const userData = await userRes.json();

      if (userData.coins < totalPay) {
        alert("Not enough coin. Please purchase more.");
        navigate("/purchase-coin");
        return;
      }

      const taskResponse = await fetch("http://localhost:5000/add-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyer_email: user.email,
          task_title,
          task_detail,
          required_workers: Number(required_workers),
          payable_amount: Number(payable_amount),
          completion_date,
          submission_info,
          task_image,
        }),
      });

      const taskData = await taskResponse.json();

      if (taskData.success) {
        toast.success("✅ Task added successfully!");
        setTimeout(() => {
          navigate("/"); // or "/dashboard/buyer"
        }, 1500); // delay for 1.5 seconds
      } else {
        toast.error("❌ " + taskData.message || "Failed to add task");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("❌ Server error while submitting task");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-xl mx-auto p-4"
    >
      <input
        name="task_title"
        type="text"
        onChange={handleChange}
        required
        placeholder="Task Title"
        className="input input-bordered w-full"
      />
      <textarea
        name="task_detail"
        onChange={handleChange}
        required
        placeholder="Task Detail"
        className="textarea textarea-bordered w-full"
      ></textarea>
      <input
        name="required_workers"
        type="number"
        onChange={handleChange}
        required
        placeholder="Required Workers"
        className="input input-bordered w-full"
      />
      <input
        name="payable_amount"
        type="number"
        onChange={handleChange}
        required
        placeholder="Payable Amount Per Worker"
        className="input input-bordered w-full"
      />
      <input
        name="completion_date"
        type="date"
        onChange={handleChange}
        required
        className="input input-bordered w-full"
      />
      <input
        name="submission_info"
        type="text"
        onChange={handleChange}
        required
        placeholder="Submission Info (e.g., Screenshot)"
        className="input input-bordered w-full"
      />
      <input
        type="url"
        name="task_image"
        onChange={handleChange}
        className="input input-bordered w-full"
        required
        placeholder="https://example.com/image.jpg"
      />
      <button type="submit" className="btn btn-primary w-full">
        Add Task
      </button>
    </form>
  );
};

export default AddTasks;
