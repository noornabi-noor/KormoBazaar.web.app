import React from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ManageTasks = () => {
  const axiosSecure = useAxiosSecure();

  // 🔄 Fetch tasks using TanStack Query
  const {
    data: tasks = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["adminTasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/tasks");
      return res.data || [];
    },
  });

  // 🔧 Handle delete
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this task?");
    if (!confirm) return;

    try {
      const res = await axiosSecure.delete(`/admin/tasks/${id}`);
      if (res.data?.deletedCount > 0) {
        toast.success("✅ Task deleted");
        refetch(); // Refresh tasks list
      }
    } catch {
      toast.error("❌ Failed to delete task");
    }
  };

  // 🚦 Optional loading/error states
  if (isLoading) {
    return (
      <p className="text-center py-10 text-gray-500 dark:text-gray-400">
        Loading tasks...
      </p>
    );
  }

  if (error) {
    toast.error("❌ Failed to load tasks");
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-gradient-to-br from-gray-200 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow transition-colors duration-300 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold ">🗂️<span className="text-primary-gradient dark:text-blue-300">Manage Tasks</span> </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">View and remove posted tasks</p>
      </div>

      {/* Task Table */}
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No tasks found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <table className="table w-full text-sm">
            <thead className="bg-blue-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Posted By</th>
                <th>Workers</th>
                <th>Pay</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-100">
              {tasks.map((task, idx) => (
                <tr key={task._id} className="hover:bg-sky-50 dark:hover:bg-gray-800 transition">
                  <td>{idx + 1}</td>
                  <td>{task.task_title}</td>
                  <td>{task.buyer_email}</td>
                  <td>{task.required_workers}</td>
                  <td>${task.payable_amount.toFixed(2)}</td>
                  <td>{new Date(task.completion_date).toLocaleDateString()}</td>
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