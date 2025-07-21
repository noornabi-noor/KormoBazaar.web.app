import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TopWorkers = () => {
  const axiosSecure = useAxiosSecure();
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/top-workers")
      .then((res) => setWorkers(res.data || []))
      .catch(() => console.error("Failed to fetch workers"));
  }, [axiosSecure]);

  return (
    <section className="py-12 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 mt-12 rounded-2xl transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700 dark:text-indigo-300">
          🏆 Top Workers
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
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {worker.email}
              </p>
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