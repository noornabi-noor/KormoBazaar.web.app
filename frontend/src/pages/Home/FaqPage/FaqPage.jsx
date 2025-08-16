import React from "react";
import { motion } from "framer-motion";
import { FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    question: "What is KormoBazaar?",
    answer:
      "KormoBazaar is a micro-task marketplace where buyers post tasks and workers complete them to earn coins.",
  },
  {
    question: "How can I become a worker?",
    answer:
      "Simply register as a worker, browse available tasks from the dashboard, and submit your work once done.",
  },
  {
    question: "What kind of tasks can I post?",
    answer:
      "Buyers can post social engagement tasks like upvotes, comments, shares, and many more—based on their campaign needs.",
  },
  {
    question: "How are coins paid and withdrawn?",
    answer:
      "Buyers purchase coins to create tasks. Workers earn coins by completing approved tasks, which they can withdraw via the Withdrawals page.",
  },
  {
    question: "Are submissions verified?",
    answer:
      "Yes. Each submission is manually or automatically reviewed before coins are credited to the worker.",
  },
];

const FaqPage = () => {
  return (
    <section className=" px-4 py-16 mt-12 bg-gradient-to-r from-blue-100 to-green-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary-gradient dark:text-indigo-300"
        >
          <FaQuestionCircle className="inline-block mr-2 text-blue-600 dark:text-blue-400" />
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.details
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <summary className="cursor-pointer text-lg font-semibold text-gray-800 dark:text-white">
                {faq.question}
              </summary>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                {faq.answer}
              </p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqPage;
