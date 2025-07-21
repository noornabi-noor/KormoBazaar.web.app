import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaTasks, FaMoneyBillWave } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const LiveStats = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({});

  useEffect(() => {
    axiosSecure.get("/platform-stats").then((res) => setStats(res.data));
  }, [axiosSecure]);

  const {
    users = 0,
    tasksToday = 0,
    totalCoins = 0,
  } = stats;

  return (
    <section className="py-20 bg-gradient-to-r from-purple-100 to-pink-100 mt-12 rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-8">📈 Platform Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          whileInView={{ y: [-20, 0], opacity: [0, 1] }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <FaUsers className="text-4xl text-purple-600 mx-auto mb-2" />
          <h3 className="text-xl font-semibold">🌍 Total Users</h3>
          <p className="text-3xl font-bold">{users.toLocaleString()}</p>
        </motion.div>

        <motion.div
          whileInView={{ y: [-20, 0], opacity: [0, 1] }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <FaTasks className="text-4xl text-blue-600 mx-auto mb-2" />
          <h3 className="text-xl font-semibold">✔️ Tasks Completed Today</h3>
          <p className="text-3xl font-bold">{tasksToday.toLocaleString()}</p>
        </motion.div>

        <motion.div
          whileInView={{ y: [-20, 0], opacity: [0, 1] }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <FaMoneyBillWave className="text-4xl text-green-600 mx-auto mb-2" />
          <h3 className="text-xl font-semibold">💰 Coins Paid Out</h3>
          <p className="text-3xl font-bold">{totalCoins.toLocaleString()}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveStats;