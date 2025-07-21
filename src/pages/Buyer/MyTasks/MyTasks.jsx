import React, { useEffect, useState } from "react";
import UseAuth from "../../../hooks/UseAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateTaskForm from "../UpdateTaskForm/UpdateTaskForm";

const MyTasks = () => {
  const { user } = UseAuth();
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  if (!user || !user.email) {
    return <p className="text-center py-6 text-gray-500 dark:text-gray-400">Loading tasks...</p>;
  }

  useEffect(() => {
    fetch(`http://localhost:5000/my-tasks/${user.email}`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Fetch Error:", err));
  }, [user.email]);

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
        setTasks((prev) =>
          prev.map((task) => (task._id === id ? { ...task, ...updatedFields } : task))
        );
      } else {
        toast.error("Update failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  const handleDelete = async (task) => {
    const { _id, required_workers, payable_amount, completion_date } = task;
    const isUnCompleted = new Date(completion_date) > new Date();
    const refillAmount = Number(required_workers) * Number(payable_amount);

    try {
      const res = await fetch(`http://localhost:5000/delete-task/${_id}`, { method: "DELETE" });
      const result = await res.json();

      if (result.success) {
        setTasks((prev) => prev.filter((t) => t._id !== _id));
        toast.success("🗑️ Task deleted");

        if (isUnCompleted) {
          await fetch(`http://localhost:5000/refill-coin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email, coins: refillAmount }),
          });
          toast.info(`💰 ${refillAmount} coins refunded`);
        }
      } else {
        toast.error(result.message || "Delete failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow transition-colors duration-300 space-y-8">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">📝 My Tasks</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and edit your posted tasks</p>
      </div>

      {/* Task Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="table w-full text-sm">
          <thead className="bg-blue-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <tr>
              <th>Title</th>
              <th>Detail</th>
              <th>Submission</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-100">
            {[...tasks]
              .sort((a, b) => new Date(b.completion_date) - new Date(a.completion_date))
              .map((task) => (
                <tr key={task._id} className="hover:bg-sky-50 dark:hover:bg-gray-800 transition">
                  <td>{task.task_title}</td>
                  <td>{task.task_detail}</td>
                  <td>{task.submission_info}</td>
                  <td>{new Date(task.completion_date).toLocaleDateString()}</td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => setEditTask(task)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(task)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Update Task Modal */}
      {editTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg max-w-md w-full text-gray-800 dark:text-gray-100">
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