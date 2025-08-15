import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const TopWorkers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: workers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["topWorkers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/top-workers");
      return res.data || [];
    },
  });

  if (isLoading) {
    return (
      <span className="loading loading-spinner text-primary"></span>
    );
  }

  if (error) {
    return (
      <p className="text-center py-10 text-red-500 dark:text-red-400">
        ❌ Failed to load top workers
      </p>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 mt-12 rounded-2xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 ">
          🏆<span className="text-primary-gradient dark:text-indigo-300"></span> Top Workers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {workers.map((worker) => (
            <div
              key={worker.email}
              className="bg-white dark:bg-gray-900 shadow-md border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center transition-all duration-300"
            >
              <img
                src={worker.photoURL || "https://i.postimg.cc/PrmWq0st/default-avatar.png"}
                alt={worker.name || "User Avatar"}
                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-2 border-blue-400 dark:border-blue-600 shadow-sm"
              />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {worker.name || "Unnamed"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{worker.email}</p>
              <p className="mt-2 text-blue-600 dark:text-blue-400 font-bold">
                🪙 {worker.coins} Coins
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopWorkers;