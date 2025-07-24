import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaTasks,
  FaCoins,
  FaListAlt,
  FaFileInvoiceDollar,
  FaFileUpload,
  FaClipboardCheck,
  FaArrowLeft,
} from "react-icons/fa";

const DashboardSidebar = ({ role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* ☰ Toggle Button for Small Screens */}
      <button
        className="md:hidden px-4 py-2 text-gray-600 dark:text-gray-300"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <FaTasks className="text-xl" />
      </button>

      {/* 📦 Sidebar Container */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen z-40 bg-base-200 dark:bg-gray-900 shadow-lg overflow-y-auto transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } w-20 md:w-64 p-3`}
      >
        {/* 🔝 Top Bar with Back Arrow Icon and Title */}
        <div className="flex items-center gap-2 mb-6 px-2 md:px-0">
          <NavLink
            to="/"
            className="text-xl text-gray-700 dark:text-gray-200 hover:text-blue-600"
          >
            <FaArrowLeft />
          </NavLink>
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-100 hidden md:inline">
            Dashboard
          </span>
        </div>

        {/* 📋 Sidebar Links */}
        <ul className="space-y-6 text-sm text-gray-700 dark:text-gray-200 mt-2">
          {/* 🔐 Admin Links */}
          {role === "admin" && (
            <>
              <SidebarLink
                to="/dashboard/adminHome"
                icon={<FaHome />}
                label="Admin Home"
              />
              <SidebarLink
                to="/dashboard/manageUsers"
                icon={<FaUsers />}
                label="Manage Users"
              />
              <SidebarLink
                to="/dashboard/manageTasks"
                icon={<FaTasks />}
                label="Manage Tasks"
              />
            </>
          )}

          {/* 👤 Buyer Links */}
          {role === "buyer" && (
            <>
              <SidebarLink
                to="/dashboard/buyerHome"
                icon={<FaHome />}
                label="Home"
              />
              <SidebarLink
                to="/dashboard/myTasks"
                icon={<FaListAlt />}
                label="My Tasks"
              />
              <SidebarLink
                to="/dashboard/addTasks"
                icon={<FaFileUpload />}
                label="Add Tasks"
              />
              <SidebarLink
                to="/dashboard/purchaseCoins"
                icon={<FaCoins />}
                label="Purchase Coins"
              />
              <SidebarLink
                to="/dashboard/paymentHistory"
                icon={<FaFileInvoiceDollar />}
                label="Payment History"
              />
            </>
          )}

          {/* 🧑‍🔧 Worker Links */}
          {role === "worker" && (
            <>
              <SidebarLink
                to="/dashboard/workerHome"
                icon={<FaHome />}
                label="Home"
              />
              <SidebarLink
                to="/dashboard/taskList"
                icon={<FaTasks />}
                label="Available Tasks"
              />
              <SidebarLink
                to="/dashboard/mySubmission"
                icon={<FaClipboardCheck />}
                label="My Submissions"
              />
              <SidebarLink
                to="/dashboard/withdraw"
                icon={<FaCoins />}
                label="Withdrawals"
              />
            </>
          )}
        </ul>
      </aside>
    </>
  );
};

/* 🧩 Sidebar Link Component — Icon Only on Mobile */
const SidebarLink = ({ to, icon, label }) => {
  return (
    <li className="group">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center justify-center md:justify-start gap-3 px-2 py-2 rounded transition-all ${
            isActive
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
              : "hover:bg-blue-50 dark:hover:bg-gray-800"
          }`
        }
      >
        <span className="text-xl">{icon}</span>
        <span className="hidden md:inline">{label}</span>
      </NavLink>
    </li>
  );
};

export default DashboardSidebar;
