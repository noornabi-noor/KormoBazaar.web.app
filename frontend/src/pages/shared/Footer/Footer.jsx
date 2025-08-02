import React from "react";
import KormoBazaarLogo from "../KormoBazaarLogo/KormoBazaarLogo";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { useForm, ValidationError } from "@formspree/react";

const Footer = () => {
  const [state, handleSubmit] = useForm(import.meta.env.VITE_formspree_key);
  return (
    <footer className="bg-gradient-to-tr from-indigo-50 via-blue-100 to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 pt-10 pb-6 mt-12 rounded-2xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & About */}
        <div>
          <KormoBazaarLogo />
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            KormoBazaar helps you find work, hire talent, and manage tasks
            effortlessly. Empowering work since 2020.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300">
            Quick Links
          </h3>
          <ul className="space-y-2 text-base">
            {" "}
            {/* Apply text-base for uniform sizing */}
            <li>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition"
              >
                Explore Jobs
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition"
              >
                Post a Task
              </a>
            </li>
            <div className="flex items-center  gap-4 mb-4 text-base">
              {" "}
              {/* Adjusted from text-2xl */}
              <li className="list-none">
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition"
                >
                  Contact Us
                </a>
              </li>
              <div className="flex gap-4">
                <a
                  href="https://github.com/noornabi-noor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/md-noornabi-bb41442b3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://www.facebook.com/md.noornabi.noor.2024"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition"
                >
                  <FaFacebook />
                </a>
              </div>
            </div>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300">
            Stay Connected
          </h3>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 dark:bg-gray-800 p-2 sm:p-4 rounded-lg md:rounded-xl shadow-md md:shadow-lg space-y-2 sm:space-y-3"
          >
            {state.succeeded && (
              <div className="p-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-md">
                ✅ Message sent successfully! I'll get back to you soon.
              </div>
            )}

            <div>
              <label
                className="block mb-0.5 text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300"
                htmlFor="email"
              >
                Your Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </div>

            <div>
              <label
                className="block mb-0.5 text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300"
                htmlFor="message"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="2"
                required
                placeholder="Write your message..."
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="btn btn-sm btn-primary w-full "
            >
              {state.submitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} KormoBazaar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
