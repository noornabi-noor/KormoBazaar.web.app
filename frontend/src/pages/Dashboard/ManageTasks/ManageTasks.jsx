import React from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ManageTasks = () => {
  const axiosSecure = useAxiosSecure();

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

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this task?");
    if (!confirm) return;

    try {
      const res = await axiosSecure.delete(`/admin/tasks/${id}`);
      if (res.data?.deletedCount > 0) {
        toast.success("✅ Task deleted");
        refetch();
      }
    } catch {
      toast.error("❌ Failed to delete task");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (error) {
    toast.error("❌ Failed to load tasks");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-10 bg-gradient-to-br from-gray-200 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-lg md:rounded-2xl shadow transition-colors duration-300 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="text-center px-2">
        <h2 className="text-2xl sm:text-3xl font-bold">
          🗂️<span className="text-primary-gradient dark:text-blue-300">Manage Tasks</span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
          View and remove posted tasks
        </p>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          No tasks found.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          {/* Desktop Table */}
          <div className="hidden sm:block">
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
                    <td className="max-w-[150px] truncate">{task.task_title}</td>
                    <td className="break-all">{task.buyer_email}</td>
                    <td>{task.required_workers}</td>
                    <td>${task.payable_amount.toFixed(2)}</td>
                    <td>{new Date(task.completion_date).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-xs sm:btn-sm btn-error"
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

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-3 p-3">
            {tasks.map((task, idx) => (
              <div
                key={task._id}
                className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">
                      {idx + 1}. {task.task_title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 break-all mt-1">
                      Posted by: {task.buyer_email}
                    </p>
                  </div>
                  <span className="badge badge-sm">
                    ${task.payable_amount.toFixed(2)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div>
                    <span className="font-medium">Workers:</span> {task.required_workers}
                  </div>
                  <div>
                    <span className="font-medium">Deadline:</span>{" "}
                    {new Date(task.completion_date).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    className="btn btn-xs btn-error w-full"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTasks;