import React from "react";
import { motion } from "framer-motion";
import community from "../../../assets/community.jpg";
import { Link } from "react-router";

const CommunitySection = () => {
  return (
    <section className="py-25 sm:py-30 lg:py-36 bg-gradient-to-br from-gray-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 mt-12 rounded-2xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 gap-10">
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-gray-800 dark:text-gray-100"
        >
          <h2 className="text-3xl font-bold text-primary-gradient dark:text-blue-300 mb-4">
            A great community is made even better by you
          </h2>
          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">You are important to us.</p>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            In our community, everyone is an important part and makes their
            individual contribution. For this reason, we are able to offer
            diverse and good jobs.
          </p>
          <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
            Be part of a great community
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Work with us and shape the future. <br />
            We can’t do it without you. We need you!
          </p>
        </motion.div>

        {/* Right Image and Floating Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 relative w-full"
        >
          <img
            src={community}
            alt="Community"
            className="w-full max-w-md h-auto rounded-lg shadow-lg mb-4 mx-auto"
          />
          <motion.div
            className="absolute -bottom-24 -left-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-100 p-5 rounded-lg shadow-md border-l-4 border-blue-500 dark:border-blue-400 max-w-sm"
            initial={{ opacity: 100 }}
            animate={{ x: [0, 10, 0], opacity: 1 }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <h4 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">
              Great Community
            </h4>
            <p>
              Become a part of KormoBazaar’s great community today and
              experience the collaborative, supportive, and fulfilling work
              environment our members enjoy.{" "}
              <Link to="/register">
                <span className="text-blue-600 dark:text-blue-400 font-semibold underline cursor-pointer">
                  Sign-up here!
                </span>
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;