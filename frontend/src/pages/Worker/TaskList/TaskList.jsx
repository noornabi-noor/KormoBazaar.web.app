import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TaskList = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

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

  // 🔄 Sorting
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.task_title.localeCompare(b.task_title);
    } else {
      return b.task_title.localeCompare(a.task_title);
    }
  });

  // 📌 Pagination
  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);
  const currentTasks = sortedTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  // 🖱️ Sort Button Toggle
  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-gradient-to-br from-sky-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow space-y-6 transition-colors duration-300">
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

      {/* 🔍 Search Input */}
      <div className="text-center mt-5 flex flex-col md:flex-row gap-4 justify-center items-center">
        <input
          type="text"
          placeholder="Search by title, buyer or date..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1); // Reset to page 1
          }}
          className="input input-bordered w-full md:w-1/2"
        />

        <button
          type="button"
          onClick={handleSortToggle}
          className="btn btn-primary"
        >
          Sort ({sortOrder === "asc" ? "A → Z" : "Z → A"})
        </button>
      </div>

      {/* Task Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
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
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
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
                onClick={() => navigate(`/dashboard/task/${task._id}`)}
                className="btn btn-primary mt-4 w-full"
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`btn ${
                currentPage === index + 1 ? "btn-primary" : "btn-outline"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
