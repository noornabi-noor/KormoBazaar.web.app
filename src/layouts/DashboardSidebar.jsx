import { Link } from "react-router";
import {
  FaHome,
  FaUsers,
  FaTasks,
  FaCoins,
  FaUserCheck,
  FaUserCog,
  FaListAlt,
  FaFileInvoiceDollar,
  FaFileUpload,
  FaClipboardCheck
} from "react-icons/fa";

const DashboardSidebar = ({ role }) => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul className="space-y-2 text-gray-700 dark:text-gray-200">
        {role === "admin" && (
          <>
            <li>
              <Link to="/dashboard/adminHome" className="flex items-center gap-2 hover:text-indigo-600">
                <FaHome /> Admin Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manageUsers" className="flex items-center gap-2 hover:text-indigo-600">
                <FaUsers /> Manage Users
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manageTasks" className="flex items-center gap-2 hover:text-indigo-600">
                <FaTasks /> Manage Tasks
              </Link>
            </li>
          </>
        )}

        {role === "buyer" && (
          <>
            <li>
              <Link to="/dashboard/buyerHome" className="flex items-center gap-2 hover:text-green-600">
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard/myTasks" className="flex items-center gap-2 hover:text-green-600">
                <FaListAlt /> My Tasks
              </Link>
            </li>
            <li>
              <Link to="/dashboard/addTasks" className="flex items-center gap-2 hover:text-green-600">
                <FaFileUpload /> Add Tasks
              </Link>
            </li>
            <li>
              <Link to="/dashboard/purchaseCoins" className="flex items-center gap-2 hover:text-green-600">
                <FaCoins /> Purchase Coins
              </Link>
            </li>
            <li>
              <Link to="/dashboard/paymentHistory" className="flex items-center gap-2 hover:text-green-600">
                <FaFileInvoiceDollar /> Payment History
              </Link>
            </li>
          </>
        )}

        {role === "worker" && (
          <>
            <li>
              <Link to="/dashboard/workerHome" className="flex items-center gap-2 hover:text-purple-600">
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard/taskList" className="flex items-center gap-2 hover:text-purple-600">
                <FaTasks /> Available Tasks
              </Link>
            </li>
            <li>
              <Link to="/dashboard/mySubmission" className="flex items-center gap-2 hover:text-purple-600">
                <FaClipboardCheck /> My Submissions
              </Link>
            </li>
            <li>
              <Link to="/dashboard/withdraw" className="flex items-center gap-2 hover:text-purple-600">
                <FaCoins /> Withdrawals
              </Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default DashboardSidebar;