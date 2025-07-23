import React from "react";
import KormoBazaarLogo from "../KormoBazaarLogo/KormoBazaarLogo";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-indigo-50 via-blue-100 to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 pt-10 pb-6 mt-12 rounded-2xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & About */}
        <div>
          <KormoBazaarLogo />
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            KormoBazaar helps you find work, hire talent, and manage tasks effortlessly.
            Empowering work since 2020.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition">Home</a></li>
            <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition">Explore Jobs</a></li>
            <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition">Post a Task</a></li>
            <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400 transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300">Stay Connected</h3>
          <div className="flex gap-4 mb-4 text-2xl">
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

          <form className="mt-2 flex">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded-l-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:outline-none w-full"
            />
            <button className="p-2 rounded-r-md bg-indigo-600 hover:bg-indigo-700 text-white transition">
              Subscribe
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
