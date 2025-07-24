import React, { useState } from "react";
import UseAuth from "../../../hooks/UseAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateTaskForm from "../UpdateTaskForm/UpdateTaskForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyTasks = () => {
  const { user } = UseAuth();
  const queryClient = useQueryClient();
  const [editTask, setEditTask] = useState(null);
  const axiosSecure = useAxiosSecure();

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myTasks", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-tasks/${user.email}`);
      return res.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedFields }) => {
      const res = await axiosSecure.patch(`/update-task/${id}`, updatedFields);
      return res.data;
    },
    onSuccess: (result, variables) => {
      if (result.success) {
        toast.success("✅ Task updated!");
        queryClient.setQueryData(["myTasks", user.email], (prev) =>
          prev.map((task) =>
            task._id === variables.id
              ? { ...task, ...variables.updatedFields }
              : task
          )
        );
      } else {
        toast.error("Update failed");
      }
    },
    onError: () => toast.error("Server error"),
  });

  const deleteMutation = useMutation({
    mutationFn: async ({ task, refill }) => {
      const { _id } = task;

      const res = await axiosSecure.delete(`/delete-task/${_id}`);
      const result = res.data;

      if (!result.success) throw new Error(result.message || "Delete failed");
      if (refill) {
        await axiosSecure.post(`/refill-coin`, {
          email: user.email,
          coins: refill,
        });
      }

      return { success: true, refill };
    },
    onSuccess: ({ refill }) => {
      toast.success("🗑️ Task deleted");
      if (refill) toast.info(`💰 ${refill} coins refunded`);
      queryClient.invalidateQueries(["myTasks", user.email]);
    },
    onError: () => toast.error("Server error"),
  });

  const handleUpdate = (id, updatedFields) => {
    updateMutation.mutate({ id, updatedFields });
  };

  const handleDelete = (task) => {
    const isUnCompleted = new Date(task.completion_date) > new Date();
    const refillAmount = isUnCompleted
      ? Number(task.required_workers) * Number(task.payable_amount)
      : 0;
    deleteMutation.mutate({ task, refill: refillAmount });
  };

  if (!user?.email || isLoading) {
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-10 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-lg md:rounded-2xl shadow transition-colors duration-300 space-y-6 md:space-y-8">
      {/* Heading */}
      <div className="text-center px-2">
        <h2 className="text-2xl sm:text-3xl font-bold">
          📝{" "}
          <span className="text-primary-gradient dark:text-blue-300">
            My Tasks
          </span>
        </h2>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
          Manage and edit your posted tasks
        </p>
      </div>

      {/* Task List */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        {/* Desktop Table */}
        <div className="hidden sm:block">
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
                .sort(
                  (a, b) =>
                    new Date(b.completion_date) - new Date(a.completion_date)
                )
                .map((task) => (
                  <tr
                    key={task._id}
                    className="hover:bg-sky-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="max-w-[150px] truncate">{task.task_title}</td>
                    <td className="max-w-[200px] truncate">{task.task_detail}</td>
                    <td className="max-w-[150px] truncate">{task.submission_info}</td>
                    <td>{new Date(task.completion_date).toLocaleDateString()}</td>
                    <td className="space-x-2">
                      <button
                        className="btn btn-xs sm:btn-sm btn-outline"
                        onClick={() => setEditTask(task)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-xs sm:btn-sm btn-error"
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

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3 p-3">
          {[...tasks]
            .sort(
              (a, b) =>
                new Date(b.completion_date) - new Date(a.completion_date)
            )
            .map((task) => (
              <div
                key={task._id}
                className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">
                      {task.task_title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Due: {new Date(task.completion_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => setEditTask(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(task)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-xs">
                  <p className="text-gray-600 dark:text-gray-400 truncate">
                    <span className="font-medium">Details:</span> {task.task_detail}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 truncate">
                    <span className="font-medium">Submission:</span> {task.submission_info}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Update Task Modal */}
      {editTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg sm:rounded-2xl shadow-lg max-w-md w-full text-gray-800 dark:text-gray-100">
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