// import { Link } from "react-router";
// import {
//   FaHome,
//   FaUsers,
//   FaTasks,
//   FaCoins,
//   FaUserCheck,
//   FaUserCog,
//   FaListAlt,
//   FaFileInvoiceDollar,
//   FaFileUpload,
//   FaClipboardCheck,
//   FaArrowLeft,
// } from "react-icons/fa";

// const DashboardSidebar = ({ role }) => {
//   return (
//     <>
// <div className="flex items-center gap-x-2 mb-4 mt-5">
//   <Link
//     to="/"
//     className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
//   >
//     <FaArrowLeft className="text-base" />
//   </Link>
//   <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//     Dashboard
//   </h2>
// </div>
//       <ul className="space-y-2 text-gray-700 dark:text-gray-200">
//         {role === "admin" && (
//           <>
//             <li>
//               <Link
//                 to="/dashboard/adminHome"
//                 className="flex items-center gap-2 hover:text-indigo-600"
//               >
//                 <FaHome /> Admin Home
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard/manageUsers"
//                 className="flex items-center gap-2 hover:text-indigo-600"
//               >
//                 <FaUsers /> Manage Users
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard/manageTasks"
//                 className="flex items-center gap-2 hover:text-indigo-600"
//               >
//                 <FaTasks /> Manage Tasks
//               </Link>
//             </li>
//           </>
//         )}

//         {role === "buyer" && (
//           <>
//             <li>
//               <Link
//                 to="/dashboard/buyerHome"
//                 className="flex items-center gap-2 hover:text-green-600"
//               >
//                 <FaHome /> Home
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard/myTasks"
//                 className="flex items-center gap-2 hover:text-green-600"
//               >
//                 <FaListAlt /> My Tasks
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard/addTasks"
//                 className="flex items-center gap-2 hover:text-green-600"
//               >
//                 <FaFileUpload /> Add Tasks
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard/purchaseCoins"
//                 className="flex items-center gap-2 hover:text-green-600"
//               >
//                 <FaCoins /> Purchase Coins
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard/paymentHistory"
//                 className="flex items-center gap-2 hover:text-green-600"
//               >
//                 <FaFileInvoiceDollar /> Payment History
//               </Link>
//             </li>
//           </>
//         )}

//         {role === "worker" && (
//           <>
//             <li>
//               <Link
//                 to="/dashboard/workerHome"
//                 className="flex items-center gap-2 hover:text-purple-600"
//               >
//                 <FaHome /> Home
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard/taskList"
//                 className="flex items-center gap-2 hover:text-purple-600"
//               >
//                 <FaTasks /> Available Tasks
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard/mySubmission"
//                 className="flex items-center gap-2 hover:text-purple-600"
//               >
//                 <FaClipboardCheck /> My Submissions
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/dashboard/withdraw"
//                 className="flex items-center gap-2 hover:text-purple-600"
//               >
//                 <FaCoins /> Withdrawals
//               </Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </>
//   );
// };

// export default DashboardSidebar;

import { Link, NavLink } from "react-router";
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
  return (
    <div className="text-gray-700 dark:text-gray-200">
      {/* Header: Back Arrow + Title */}
      <div className="flex items-center gap-x-2 mb-4 mt-5 ml-3">
        <Link
          to="/"
          className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <FaArrowLeft className="text-base" />
        </Link>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h2>
      </div>

      {/* Sidebar Links */}
      <ul className="space-y-3">
        {role === "admin" && (
          <>
            <SidebarLink
              to="/dashboard/adminHome"
              icon={<FaHome />}
              label="Admin Home"
              color="indigo"
            />
            <SidebarLink
              to="/dashboard/manageUsers"
              icon={<FaUsers />}
              label="Manage Users"
              color="indigo"
            />
            <SidebarLink
              to="/dashboard/manageTasks"
              icon={<FaTasks />}
              label="Manage Tasks"
              color="indigo"
            />
          </>
        )}

        {role === "buyer" && (
          <>
            <SidebarLink
              to="/dashboard/buyerHome"
              icon={<FaHome />}
              label="Home"
              color="indigo"
            />
            <SidebarLink
              to="/dashboard/myTasks"
              icon={<FaListAlt />}
              label="My Tasks"
              color="indigo"
            />
            <SidebarLink
              to="/dashboard/addTasks"
              icon={<FaFileUpload />}
              label="Add Tasks"
              color="indigo"
            />
            <SidebarLink
              to="/dashboard/purchaseCoins"
              icon={<FaCoins />}
              label="Purchase Coins"
              color="indigo"
            />
            <SidebarLink
              to="/dashboard/paymentHistory"
              icon={<FaFileInvoiceDollar />}
              label="Payment History"
              color="indigo"
            />
          </>
        )}

        {role === "worker" && (
          <>
            <SidebarLink
              to="/dashboard/workerHome"
              icon={<FaHome />}
              label="Home"
              color="indigo"
            />
            <SidebarLink
              to="/dashboard/taskList"
              icon={<FaTasks />}
              label="Available Tasks"
              color="indigo"
            />
            <SidebarLink
              to="/dashboard/mySubmission"
              icon={<FaClipboardCheck />}
              label="My Submissions"
              color="indigo"
            />
            <SidebarLink
              to="/dashboard/withdraw"
              icon={<FaCoins />}
              label="Withdrawals"
              color="indigo"
            />
          </>
        )}
      </ul>
    </div>
  );
};

/* 🔧 Reusable Link Component */
const SidebarLink = ({ to, icon, label, color }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-2 px-2 py-1 rounded transition-all ${
            isActive
              ? `font-bold text-${color}-600 dark:text-${color}-400`
              : `hover:text-${color}-600 dark:hover:text-${color}-400`
          }`
        }
      >
        {icon}
        {label}
      </NavLink>
    </li>
  );
};

export default DashboardSidebar;
