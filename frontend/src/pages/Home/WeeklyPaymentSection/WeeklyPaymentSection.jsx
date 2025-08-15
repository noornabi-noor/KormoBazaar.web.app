import React from "react";
import { motion } from "framer-motion";
import earnMoney from "../../../assets/earnMoney.mp4";

const WeeklyPaymentSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 mt-12 rounded-2xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 gap-12">
        {/* 🖼 Left Video */}
        <motion.video
          src={earnMoney}
          autoPlay
          muted
          loop
          controls
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="rounded-lg shadow-lg w-full max-w-md h-auto mx-auto border border-gray-300 dark:border-gray-700"
        />

        {/* 📝 Right Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 text-gray-800 dark:text-gray-100"
        >
          <h2 className="text-3xl font-bold text-primary-gradient dark:text-indigo-300 mb-4">
            Weekly Payments with Peace of Mind
          </h2>
          <p className="mb-4 text-lg text-gray-700 dark:text-gray-300">
            Turn your time into earnings through micro-tasking. Once your work
            is reviewed and approved, your payout is swift and secure.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>🔐 Trusted payment providers: PayPal, Payoneer & more</li>
            <li>⏳ Predictable weekly payments every cycle</li>
            <li>🧭 Choose when and how you get paid</li>
          </ul>
          <button className="mt-6 btn btn-primary">
            Explore Payment Options
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WeeklyPaymentSection;