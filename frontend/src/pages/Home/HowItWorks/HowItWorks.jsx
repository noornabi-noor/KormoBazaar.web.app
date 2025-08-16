import React from "react";
import { motion } from "framer-motion";
import {
  FaTasks,
  FaCheckCircle,
  FaCoins,
  FaClipboardList,
  FaSearch,
  FaUserShield,
} from "react-icons/fa";

const HowItWorks = () => {
  return (
    <section className=" py-20 bg-gradient-to-br from-gray-200 via-white to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl mt-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary-gradient dark:text-indigo-300">
        ⚙️ How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        {/* Worker */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border-t-4 border-blue-500 transition-colors"
        >
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
            👷 Worker
          </h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-300">
            <li>
              <FaTasks className="inline-block mr-2" /> Browse Tasks
            </li>
            <li>
              <FaCheckCircle className="inline-block mr-2" /> Submit Work
            </li>
            <li>
              <FaCoins className="inline-block mr-2" /> Earn Coins
            </li>
          </ul>
        </motion.div>

        {/* Buyer */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border-t-4 border-green-500 transition-colors"
        >
          <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">
            🧑‍💼 Buyer
          </h3>
          <ul className="space-y-2 text-green-800 dark:text-green-300">
            <li>
              <FaClipboardList className="inline-block mr-2" /> Create Task
            </li>
            <li>
              <FaSearch className="inline-block mr-2" /> Review Submissions
            </li>
            <li>
              <FaCoins className="inline-block mr-2" /> Pay Workers
            </li>
          </ul>
        </motion.div>

        {/* Admin */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border-t-4 border-red-500 transition-colors"
        >
          <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
            🛡️ Admin
          </h3>
          <ul className="space-y-2 text-red-800 dark:text-red-300">
            <li>
              <FaUserShield className="inline-block mr-2" /> Monitor Platform
            </li>
            <li>
              <FaClipboardList className="inline-block mr-2" /> Resolve Reports
            </li>
            <li>
              <FaCoins className="inline-block mr-2" /> Manage Systems
            </li>
          </ul>
        </motion.div>
      </div>
      </div>
    </section>
  );
};

export default HowItWorks;