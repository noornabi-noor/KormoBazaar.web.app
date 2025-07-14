import React from "react";
import { motion } from "framer-motion";
import earnMoney from "../../../assets/earnMoney.mp4";

const WeeklyPaymentSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-100 mt-12 rounded-2xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center px-6 gap-12">
        {/* 🖼 Left Image */}
        <motion.video
          src={earnMoney} // Make sure this path points to your video in public folder
          autoPlay
          muted
          loop
          controls
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="rounded-lg shadow-lg w-full max-w-md h-auto mx-auto"
        />


        {/* 📝 Right Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 text-gray-800"
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">
            Weekly Payments with Peace of Mind
          </h2>
          <p className="mb-4 text-lg">
            Turn your time into earnings through micro-tasking. Once your work
            is reviewed and approved, your payout is swift and secure.
          </p>
          <ul className="list-disc list-inside space-y-2 text-indigo-600">
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
