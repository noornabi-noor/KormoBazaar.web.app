import React, { useEffect, useState } from "react";
import UseAuth from "../../../hooks/UseAuth";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateTaskForm from "../UpdateTaskForm/UpdateTaskForm";

const MyTasks = () => {
  const { user } = UseAuth();
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

// ✅ Safeguard: Wait for user data before rendering
  if (!user || !user.email) {
    return <p>Loading tasks...</p>; // Or show a spinner
  }

  // 🔄 Fetch tasks on mount
  useEffect(() => {
    fetch(`http://localhost:5000/my-tasks/${user.email}`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Fetch Error:", err));
  }, [user.email]);

  // 🧾 Update logic
  const handleUpdate = async (id, updatedFields) => {
    try {
      const res = await fetch(`http://localhost:5000/update-task/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("✅ Task updated!");
        setTasks(prev =>
          prev.map(task =>
            task._id === id ? { ...task, ...updatedFields } : task
          )
        );
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      console.error("Update Error:", err);
      toast.error("Server error");
    }
  };

  // 🗑️ Delete logic
  const handleDelete = async (task) => {
    const { _id, required_workers, payable_amount, completion_date } = task;
    const isUnCompleted = new Date(completion_date) > new Date();
    const refillAmount = Number(required_workers) * Number(payable_amount);

    try {
      const res = await fetch(`http://localhost:5000/delete-task/${_id}`, {
        method: "DELETE"
      });
      const result = await res.json();

      if (result.success) {
        setTasks(prev => prev.filter(t => t._id !== _id));
        toast.success("🗑️ Task deleted");

        if (isUnCompleted) {
          await fetch(`http://localhost:5000/refill-coin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email, coins: refillAmount })
          });
          toast.info(`💰 ${refillAmount} coins refunded`);
        }
      } else {
        toast.error(result.message || "Delete failed");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Server error");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📝 My Tasks</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Detail</th>
              <th>Submission</th>
              <th>Completion Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...tasks]
              .sort((a, b) => new Date(b.completion_date) - new Date(a.completion_date))
              .map(task => (
                <tr key={task._id}>
                  <td>{task.task_title}</td>
                  <td>{task.task_detail}</td>
                  <td>{task.submission_info}</td>
                  <td>{task.completion_date}</td>
                  <td className="flex gap-2">
                    <button className="btn btn-sm" onClick={() => setEditTask(task)}>Update</button>
                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(task)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {editTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <UpdateTaskForm
              task={editTask}
              onUpdate={handleUpdate}
              onClose={() => setEditTask(null)}
            />
          </div>
        </div>
      )}

      <ToastContainer position="top-center" />
    </div>
  );
};

export default MyTasks;