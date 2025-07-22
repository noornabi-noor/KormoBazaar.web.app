// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { FaUsers, FaTasks, FaMoneyBillWave } from "react-icons/fa";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const LiveStats = () => {
//   const axiosSecure = useAxiosSecure();
//   const [stats, setStats] = useState({});

//   useEffect(() => {
//     axiosSecure.get("/platform-stats").then((res) => setStats(res.data));
//   }, [axiosSecure]);

//   const {
//     users = 0,
//     tasksToday = 0,
//     totalCoins = 0,
//   } = stats;

//   return (
//     <section className="py-20 bg-gradient-to-r from-blue-100 to-pink-100 dark:from-gray-900 dark:to-gray-800 mt-12 rounded-2xl transition-colors duration-300">
//       <h2 className="text-3xl font-bold text-center mb-8 text-primary-gradient dark:text-indigo-300">
//         📈 Platform Stats
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6 text-center">
//         <motion.div
//           whileInView={{ y: [-20, 0], opacity: [0, 1] }}
//           transition={{ duration: 0.6 }}
//           className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300"
//         >
//           <FaUsers className="text-4xl text-purple-600 dark:text-purple-400 mx-auto mb-2" />
//           <h3 className="text-xl font-semibold text-gray-900 dark:text-white">🌍 Total Users</h3>
//           <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{users.toLocaleString()}</p>
//         </motion.div>

//         <motion.div
//           whileInView={{ y: [-20, 0], opacity: [0, 1] }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300"
//         >
//           <FaTasks className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-2" />
//           <h3 className="text-xl font-semibold text-gray-900 dark:text-white">✔️ Tasks Completed Today</h3>
//           <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{tasksToday.toLocaleString()}</p>
//         </motion.div>

//         <motion.div
//           whileInView={{ y: [-20, 0], opacity: [0, 1] }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300"
//         >
//           <FaMoneyBillWave className="text-4xl text-green-600 dark:text-green-400 mx-auto mb-2" />
//           <h3 className="text-xl font-semibold text-gray-900 dark:text-white">💰 Coins Paid Out</h3>
//           <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{totalCoins.toLocaleString()}</p>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default LiveStats;





import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaTasks, FaMoneyBillWave } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const LiveStats = () => {
  const axiosSecure = useAxiosSecure();

  // 🔄 Use TanStack Query to fetch stats
  const {
    data: stats = { users: 0, tasksToday: 0, totalCoins: 0 },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["platformStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/platform-stats");
      return res.data;
    },
  });

  // ⚠️ Optional error fallback (can add toast too)
  if (error) {
    return (
      <p className="text-center text-red-500 dark:text-red-400 py-10">
        ❌ Failed to load platform stats
      </p>
    );
  }

  // ⏳ Loading fallback
  if (isLoading) {
    return (
      <span className="loading loading-spinner text-primary"></span>
    );
  }

  const { users, tasksToday, totalCoins } = stats;

  return (
    <section className="py-20 bg-gradient-to-r from-blue-100 to-pink-100 dark:from-gray-900 dark:to-gray-800 mt-12 rounded-2xl transition-colors duration-300">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary-gradient dark:text-indigo-300">
        📈 Platform Stats
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          whileInView={{ y: [-20, 0], opacity: [0, 1] }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300"
        >
          <FaUsers className="text-4xl text-purple-600 dark:text-purple-400 mx-auto mb-2" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">🌍 Total Users</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            {users.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          whileInView={{ y: [-20, 0], opacity: [0, 1] }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300"
        >
          <FaTasks className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-2" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">✔️ Tasks Completed Today</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            {tasksToday.toLocaleString()}
          </p>
        </motion.div>

        <motion.div
          whileInView={{ y: [-20, 0], opacity: [0, 1] }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300"
        >
          <FaMoneyBillWave className="text-4xl text-green-600 dark:text-green-400 mx-auto mb-2" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">💰 Coins Paid Out</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            {totalCoins.toLocaleString()}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveStats;