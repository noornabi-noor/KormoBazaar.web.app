import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AvailableTasks = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const tasksPerPage = 6;

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["availableTasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/available-tasks");
      return res.data;
    },
  });

  if (isLoading)
    return <span className="loading loading-spinner text-primary"></span>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500 dark:text-red-400">
        ❌ Failed to load tasks
      </p>
    );

  // 🔍 Search Filtering
  const filteredTasks = tasks.filter((task) => {
    const lowerSearch = searchText.toLowerCase();
    return (
      task.task_title.toLowerCase().includes(lowerSearch) ||
      task.buyer_name.toLowerCase().includes(lowerSearch) ||
      new Date(task.completion_date)
        .toISOString()
        .slice(0, 10)
        .includes(lowerSearch)
    );
  });

  // 📌 Pagination
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const currentTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  return (
    <div className="mt-12 px-6 py-10 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow space-y-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold">
            📋{" "}
            <span className="text-primary-gradient dark:text-blue-300">
              Available Tasks
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Browse tasks and start earning
          </p>
        </div>

        {/* Task Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6">
          {currentTasks.length === 0 ? (
            <p className="text-center col-span-2 text-gray-600 dark:text-gray-400">
              No tasks found 🔎
            </p>
          ) : (
            currentTasks.map((task) => (
              <div
                key={task._id}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700 hover:shadow-lg transition"
              >
                {task.task_image && (
                  <div className="mb-4 rounded overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                    <img
                      src={task.task_image}
                      alt={task.task_title}
                      className="w-full h-40 object-contain bg-white dark:bg-gray-800"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 truncate">
                  {task.task_title}
                </h3>

                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Buyer:</strong> {task.buyer_name}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Deadline:</strong>{" "}
                  {new Date(task.completion_date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Pay:</strong> ${task.payable_amount}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Workers Needed:</strong> {task.required_workers}
                </p>

                <button
                  onClick={() => navigate(`/task/${task._id}`)}
                  className="btn btn-primary mt-4 w-full"
                >
                  View Details
                </button>
              </div>
            ))
          )}
        </div>

        <div className="items-center text-center">
          <button
            onClick={() => navigate(`/alltasks`)}
            className="btn btn-primary mt-4 "
          >
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailableTasks;
