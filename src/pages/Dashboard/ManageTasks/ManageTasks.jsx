import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageTasks = () => {
  const axiosSecure = useAxiosSecure();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/admin/tasks")
      .then((res) => setTasks(res.data || []))
      .catch(() => toast.error("❌ Failed to load tasks"));
  }, [axiosSecure]);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirm) return;

    try {
      const res = await axiosSecure.delete(`/admin/tasks/${id}`);
      if (res.data?.deletedCount > 0) {
        toast.success("✅ Task deleted");
        setTasks(tasks.filter((task) => task._id !== id));
      }
    } catch {
      toast.error("❌ Failed to delete task");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">🗂️ Manage Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Posted By</th>
                <th>Workers Required</th>
                <th>Pay Per Workers</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, idx) => (
                <tr key={task._id}>
                  <td>{idx + 1}</td>
                  <td>{task.task_title}</td>
                  <td>{task.buyer_email}</td>
                  <td>{task.required_workers}</td>
                  <td>{task.payable_amount}</td>
                  <td>{task.completion_date}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageTasks;
