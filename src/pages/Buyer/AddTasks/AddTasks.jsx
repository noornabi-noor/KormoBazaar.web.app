import React, { useState } from "react";
import UseAuth from "../../../hooks/UseAuth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const imageUploadKey = import.meta.env.VITE_image_upload_key;

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
    task_image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleImageUpload = async (file) => {
    if (!file || !(file instanceof File)) {
      toast.error("❌ Invalid image file");
      return "";
    }

    // ✅ Check the file type — must start with image/
    if (!file.type.startsWith("image/")) {
      toast.error("❌ Unsupported file format");
      return "";
    }

    const formData = new FormData();
    formData.append("image", file); // no conversion needed

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imageUploadKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error?.message || "Upload failed");
      }

      return data.data.url;
    } catch (error) {
      toast.error("❌ ImgBB upload error: " + error.message);
      console.error("ImgBB error:", error.message);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalPay =
      Number(formData.required_workers) * Number(formData.payable_amount);

    try {
      const res = await fetch(`http://localhost:5000/user/${user.email}`);
      const userData = await res.json();

      if (userData.coins < totalPay) {
        alert("Not enough coins. Please purchase more.");
        navigate("/purchase-coin");
        return;
      }

      if (!formData.task_image) {
        toast.error("❌ Task image is required");
        return;
      }

      const imageUrl = await handleImageUpload(formData.task_image);
      if (!imageUrl) return;

      const taskRes = await fetch("http://localhost:5000/add-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyer_email: user.email,
          task_title: formData.task_title,
          task_detail: formData.task_detail,
          required_workers: Number(formData.required_workers),
          payable_amount: Number(formData.payable_amount),
          completion_date: formData.completion_date,
          submission_info: formData.submission_info,
          task_image: imageUrl,
        }),
      });

      const result = await taskRes.json();

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Task Added 🎉",
          text: "Your task was successfully posted!",
          confirmButtonText: "Go to My Tasks",
        }).then(() => {
          navigate("/dashboard/myTasks");
        });
      } else {
        toast.error("❌ " + (result.message || "Failed to add task"));
      }
    } catch (error) {
      console.error("Add task error:", error);
      toast.error("❌ Server error while submitting task");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold">
          📋{" "}
          <span className="text-primary-gradient dark:text-blue-300">
            Add New Task
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Fill out the form to post a task
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="task_title"
          type="text"
          required
          placeholder="Task Title"
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <textarea
          name="task_detail"
          required
          placeholder="Task Detail"
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />
        <input
          name="required_workers"
          type="number"
          required
          placeholder="Required Workers"
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          name="payable_amount"
          type="number"
          required
          placeholder="Pay Per Worker"
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          name="completion_date"
          type="date"
          required
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          name="submission_info"
          type="text"
          required
          placeholder="Submission Info (e.g., Screenshot)"
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="file"
          name="task_image"
          accept="image/*"
          required
          onChange={handleChange}
          className="file-input file-input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary w-full">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTasks;
