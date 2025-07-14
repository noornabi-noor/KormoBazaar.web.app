import React from "react";
import { motion } from "framer-motion";
import { FaTasks, FaCheckCircle, FaCoins, FaClipboardList, FaSearch, FaUserShield } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
        {/* Worker */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500"
        >
          <h3 className="text-xl font-semibold text-blue-600 mb-2">👷 Worker</h3>
          <ul className="space-y-2 text-blue-800">
            <li><FaTasks className="inline-block mr-2" /> Browse Tasks</li>
            <li><FaCheckCircle className="inline-block mr-2" /> Submit Work</li>
            <li><FaCoins className="inline-block mr-2" /> Earn Coins</li>
          </ul>
        </motion.div>

        {/* Buyer */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500"
        >
          <h3 className="text-xl font-semibold text-green-600 mb-2">🧑‍💼 Buyer</h3>
          <ul className="space-y-2 text-green-800">
            <li><FaClipboardList className="inline-block mr-2" /> Create Task</li>
            <li><FaSearch className="inline-block mr-2" /> Review Submissions</li>
            <li><FaCoins className="inline-block mr-2" /> Pay Workers</li>
          </ul>
        </motion.div>

        {/* Admin */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500"
        >
          <h3 className="text-xl font-semibold text-red-600 mb-2">🛡️ Admin</h3>
          <ul className="space-y-2 text-red-800">
            <li><FaUserShield className="inline-block mr-2" /> Monitor Platform</li>
            <li><FaClipboardList className="inline-block mr-2" /> Resolve Reports</li>
            <li><FaCoins className="inline-block mr-2" /> Manage Systems</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;