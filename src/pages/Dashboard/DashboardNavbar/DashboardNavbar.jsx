import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import React, { use, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import KormoBazaarLogo from "../../shared/KormoBazaarLogo/KormoBazaarLogo";
import { ThemeContext } from "../../../contexts/ThemeContext/ThemeContext";


const DashboardNavbar = () => {
  const { user } = useContext(AuthContext);

  const userRole = user?.role || "Worker"; 
  const coins = user?.coins || 0; 

  return (
    <div className="navbar navbar-theme flex justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <KormoBazaarLogo />
        
      </Link>

      {/* Stats */}
      <div className="flex items-center gap-4">
        {/* Coins */}
        <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
          🪙 Coins: <span className="font-bold">{coins.toLocaleString()}</span>
        </div>

        {/* Role */}
        <div className="text-sm text-gray-600 dark:text-gray-300 bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded-md font-semibold">
          Role: {userRole}
        </div>

        {/* User avatar */}
        <Link to="/myProfile" className="flex items-center gap-2">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt={user?.displayName}
            className="w-8 h-8 rounded-full border border-blue-400 dark:border-blue-600 object-cover"
          />
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {user?.displayName || "User"}
          </span>
        </Link>

        {/* Notification */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <FaBell className="text-lg text-gray-600 dark:text-gray-300" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1">
            3
          </span>
        </button>
        {/* <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="p-2 md:p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          {theme === "dark" ? (
            <span className="text-yellow-300 text-lg md:text-xl">☀️</span>
          ) : (
            <span className="text-gray-700 text-lg md:text-xl">🌙</span>
          )}
        </button> */}
      </div>
    </div>
  );
};

export default DashboardNavbar;