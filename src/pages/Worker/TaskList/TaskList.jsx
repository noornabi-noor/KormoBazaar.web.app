import React from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

const TaskList = () => {
  const navigate = useNavigate();

  // 🔧 Fetch available tasks
  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["availableTasks"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/available-tasks");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      return res.json();
    },
  });

  // ⚠️ Error fallback
  if (error) {
    return (
      <p className="text-center py-10 text-red-500 dark:text-red-400">
        ❌ Failed to load tasks
      </p>
    );
  }

  // ⏳ Loading state
  if (isLoading) {
    return (
      <p className="text-center py-10 text-gray-500 dark:text-gray-400">
        Loading available tasks...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 rounded-2xl shadow space-y-6">
      {/* Heading */}
      <div className="text-center">
        <h2 className="text-3xl font-bold ">📋<span className="text-primary-gradient dark:text-blue-300">Available Tasks</span> </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Browse tasks and start earning
        </p>
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {task.task_title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Buyer:</strong> {task.buyer_name}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Deadline:</strong> {new Date(task.completion_date).toLocaleDateString()}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Pay:</strong> ${task.payable_amount}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Workers Needed:</strong> {task.required_workers}
            </p>

            <button
              onClick={() => navigate(`/dashboard/task/${task._id}`)}
              className="btn btn-primary mt-4 w-full"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;