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

  if (!task) return <p>Loading task...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{task.task_title}</h2>
      <p>
        <strong>Detail:</strong> {task.task_detail}
      </p>
      <p>
        <strong>Pay:</strong> ${task.payable_amount}
      </p>
      <p>
        <strong>Buyer Name:</strong> {task.buyer_name}
      </p>
      <p>
        <strong>Buyer Email:</strong> {task.buyer_email}
      </p>
      <p>
        <strong>Required Workers:</strong> {task.required_workers}
      </p>
      <p>
        <strong>Completion Date:</strong> {task.completion_date}
      </p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-2">
        <textarea
          value={submission}
          onChange={(e) => setSubmission(e.target.value)}
          required
          placeholder="Your submission details..."
          className="textarea textarea-bordered w-full"
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
