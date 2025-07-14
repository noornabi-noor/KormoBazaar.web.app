import React from "react";
import KormoBazaarLogo from "../KormoBazaarLogo/KormoBazaarLogo";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-indigo-50 via-blue-100 to-sky-50 text-gray-800 pt-10 pb-6 mt-12 rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & About */}
        <div>
          <KormoBazaarLogo />
          <p className="mt-4 text-gray-600">
            KormoBazaar helps you find work, hire talent, and manage tasks effortlessly. Empowering work since 2020.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-indigo-700 transition">Home</a></li>
            <li><a href="#" className="hover:text-indigo-700 transition">Explore Jobs</a></li>
            <li><a href="#" className="hover:text-indigo-700 transition">Post a Task</a></li>
            <li><a href="#" className="hover:text-indigo-700 transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Social & Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
          <div className="flex gap-4 mb-4">
            <a href="#" className="text-gray-600 hover:text-indigo-700 transition">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-..." />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-700 transition">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-..." />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-700 transition">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h..." />
              </svg>
            </a>
          </div>
          <form className="mt-2">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded-l-md bg-white text-gray-700 placeholder-gray-500 border border-gray-300 focus:outline-none"
            />
            <button className="p-2 rounded-r-md bg-indigo-600 text-white hover:bg-indigo-700 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 mt-10 pt-6 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} KormoBazaar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
