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
  FaUserCircle,
} from "react-icons/fa";

const DashboardSidebar = ({ role }) => {
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden h-full bg-white dark:bg-gray-900 overflow-y-auto">
        <div className="flex flex-col items-center py-4 space-y-6 h-full">
          {/* Mobile Back Arrow */}
          <NavLink
            to="/"
            className="text-xl text-gray-700 dark:text-gray-200 hover:text-blue-600 p-2"
          >
            <FaArrowLeft />
          </NavLink>
          <MobileIconLinks role={role} />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block h-full overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-6">
            <NavLink
              to="/"
              className="text-xl text-gray-700 dark:text-gray-200 hover:text-blue-600"
            >
              <FaArrowLeft />
            </NavLink>
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Dashboard
            </span>
          </div>
          <SidebarLinks role={role} />
        </div>
      </div>
    </>
  );
};

// Mobile Icon Links Component
const MobileIconLinks = ({ role }) => {
  const links = [];

  if (role === "admin") {
    links.push(
      { to: "/dashboard/adminHome", icon: <FaHome />, label: "Admin" },
      { to: "/dashboard/manageUsers", icon: <FaUsers />, label: "Users" },
      { to: "/dashboard/manageTasks", icon: <FaTasks />, label: "Tasks" }
    );
  } else if (role === "buyer") {
    links.push(
      { to: "/dashboard/buyerHome", icon: <FaHome />, label: "Home" },
      { to: "/dashboard/myTasks", icon: <FaListAlt />, label: "Tasks" },
      { to: "/dashboard/addTasks", icon: <FaFileUpload />, label: "Add" },
      { to: "/dashboard/purchaseCoins", icon: <FaCoins />, label: "Coins" }
    );
  } else if (role === "worker") {
    links.push(
      { to: "/dashboard/workerHome", icon: <FaHome />, label: "Home" },
      { to: "/dashboard/taskList", icon: <FaTasks />, label: "Tasks" },
      {
        to: "/dashboard/mySubmission",
        icon: <FaClipboardCheck />,
        label: "Submissions",
      }
    );
  }

  return links.map((link) => (
    <NavLink
      key={link.to}
      to={link.to}
      className={({ isActive }) =>
        `flex flex-col items-center p-2 rounded-lg transition-all ${
          isActive
            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
            : "text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300"
        }`
      }
    >
      <span className="text-xl">{link.icon}</span>
      <span className="text-xs mt-1">{link.label}</span>
    </NavLink>
  ));
};

// Desktop Sidebar Links Component
const SidebarLinks = ({ role }) => {
  return (
    <ul className="space-y-2">
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

      <SidebarLink
        to="/dashboard/myProfile"
        icon={<FaUserCircle className="text-gray-600" />}
        label="MyProfile"
      />
    </ul>
  );
};

// Shared Sidebar Link Component
const SidebarLink = ({ to, icon, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
            isActive
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
              : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`
        }
      >
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </NavLink>
    </li>
  );
};

export default DashboardSidebar;
