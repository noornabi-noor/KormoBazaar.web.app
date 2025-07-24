// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   FaHome,
//   FaUsers,
//   FaTasks,
//   FaCoins,
//   FaListAlt,
//   FaFileInvoiceDollar,
//   FaFileUpload,
//   FaClipboardCheck,
//   FaArrowLeft,
// } from "react-icons/fa";

// const DashboardSidebar = ({ role }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <>
//       {/* ☰ Toggle Button for Small Screens */}
//       <button
//         className="md:hidden px-4 py-2 text-gray-600 dark:text-gray-300"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         <FaTasks className="text-xl" />
//       </button>

//       {/* 📦 Sidebar Container */}
//       <aside
//         className={`fixed md:static top-0 left-0 h-screen z-40 bg-base-200 dark:bg-gray-900 shadow-lg overflow-y-auto transition-transform duration-300 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//         } w-20 md:w-60 p-3`}
//       >
//         {/* 🔝 Top Bar with Back Arrow Icon and Title */}
//         <div className="flex items-center gap-2 mb-6 px-2 md:px-0">
//           <NavLink
//             to="/"
//             className="text-xl text-gray-700 dark:text-gray-200 hover:text-blue-600"
//           >
//             <FaArrowLeft />
//           </NavLink>
//           <span className="text-lg font-semibold text-gray-800 dark:text-gray-100 hidden md:inline">
//             Dashboard
//           </span>
//         </div>

//         {/* 📋 Sidebar Links */}
//         <ul className="space-y-6 text-sm text-gray-700 dark:text-gray-200 mt-2">
//           {/* 🔐 Admin Links */}
//           {role === "admin" && (
//             <>
//               <SidebarLink
//                 to="/dashboard/adminHome"
//                 icon={<FaHome />}
//                 label="Admin Home"
//               />
//               <SidebarLink
//                 to="/dashboard/manageUsers"
//                 icon={<FaUsers />}
//                 label="Manage Users"
//               />
//               <SidebarLink
//                 to="/dashboard/manageTasks"
//                 icon={<FaTasks />}
//                 label="Manage Tasks"
//               />
//             </>
//           )}

//           {/* 👤 Buyer Links */}
//           {role === "buyer" && (
//             <>
//               <SidebarLink
//                 to="/dashboard/buyerHome"
//                 icon={<FaHome />}
//                 label="Home"
//               />
//               <SidebarLink
//                 to="/dashboard/myTasks"
//                 icon={<FaListAlt />}
//                 label="My Tasks"
//               />
//               <SidebarLink
//                 to="/dashboard/addTasks"
//                 icon={<FaFileUpload />}
//                 label="Add Tasks"
//               />
//               <SidebarLink
//                 to="/dashboard/purchaseCoins"
//                 icon={<FaCoins />}
//                 label="Purchase Coins"
//               />
//               <SidebarLink
//                 to="/dashboard/paymentHistory"
//                 icon={<FaFileInvoiceDollar />}
//                 label="Payment History"
//               />
//             </>
//           )}

//           {/* 🧑‍🔧 Worker Links */}
//           {role === "worker" && (
//             <>
//               <SidebarLink
//                 to="/dashboard/workerHome"
//                 icon={<FaHome />}
//                 label="Home"
//               />
//               <SidebarLink
//                 to="/dashboard/taskList"
//                 icon={<FaTasks />}
//                 label="Available Tasks"
//               />
//               <SidebarLink
//                 to="/dashboard/mySubmission"
//                 icon={<FaClipboardCheck />}
//                 label="My Submissions"
//               />
//               <SidebarLink
//                 to="/dashboard/withdraw"
//                 icon={<FaCoins />}
//                 label="Withdrawals"
//               />
//             </>
//           )}
//         </ul>
//       </aside>
//     </>
//   );
// };

// /* 🧩 Sidebar Link Component — Icon Only on Mobile */
// const SidebarLink = ({ to, icon, label }) => {
//   return (
//     <li className="group">
//       <NavLink
//         to={to}
//         className={({ isActive }) =>
//           `flex items-center justify-center md:justify-start gap-3 px-2 py-2 rounded transition-all ${
//             isActive
//               ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
//               : "hover:bg-blue-50 dark:hover:bg-gray-800"
//           }`
//         }
//       >
//         <span className="text-xl">{icon}</span>
//         <span className="hidden md:inline">{label}</span>
//       </NavLink>
//     </li>
//   );
// };

// export default DashboardSidebar;








// import { NavLink } from "react-router-dom";
// import {
//   FaHome,
//   FaUsers,
//   FaTasks,
//   FaCoins,
//   FaListAlt,
//   FaFileInvoiceDollar,
//   FaFileUpload,
//   FaClipboardCheck,
//   FaArrowLeft,
// } from "react-icons/fa";

// const DashboardSidebar = ({ role }) => {
//   return (
//     <>
//       {/* Mobile Sidebar - Fixed left side, icon-only */}
//       <aside className="md:hidden fixed left-0 top-0 h-screen z-40 bg-base-200 dark:bg-gray-900 shadow-lg w-16 py-4 overflow-y-auto">
//         <div className="flex flex-col items-center space-y-8">
//           <MobileIconLinks role={role} />
//         </div>
//       </aside>

//       {/* Desktop Sidebar - Normal sidebar with text */}
//       <aside className="hidden md:block w-60 p-3 mt-5 h-[calc(100vh-5rem)] sticky top-5 overflow-y-auto bg-base-200 dark:bg-gray-900">
//         <div className="flex items-center gap-2 mb-6">
//           <NavLink
//             to="/"
//             className="text-xl text-gray-700 dark:text-gray-200 hover:text-blue-600"
//           >
//             <FaArrowLeft />
//           </NavLink>
//           <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//             Dashboard
//           </span>
//         </div>
//         <SidebarLinks role={role} />
//       </aside>
//     </>
//   );
// };

// // Mobile icon links (vertical left sidebar)
// const MobileIconLinks = ({ role }) => {
//   const links = [];
  
//   if (role === "admin") {
//     links.push(
//       { to: "/dashboard/adminHome", icon: <FaHome />, label: "Admin Home" },
//       { to: "/dashboard/manageUsers", icon: <FaUsers />, label: "Users" },
//       { to: "/dashboard/manageTasks", icon: <FaTasks />, label: "Tasks" }
//     );
//   } else if (role === "buyer") {
//     links.push(
//       { to: "/dashboard/buyerHome", icon: <FaHome />, label: "Home" },
//       { to: "/dashboard/myTasks", icon: <FaListAlt />, label: "Tasks" },
//       { to: "/dashboard/addTasks", icon: <FaFileUpload />, label: "Add" },
//       { to: "/dashboard/purchaseCoins", icon: <FaCoins />, label: "Coins" },
//       { to: "/dashboard/paymentHistory", icon: <FaFileInvoiceDollar />, label: "Payments" }
//     );
//   } else if (role === "worker") {
//     links.push(
//       { to: "/dashboard/workerHome", icon: <FaHome />, label: "Home" },
//       { to: "/dashboard/taskList", icon: <FaTasks />, label: "Tasks" },
//       { to: "/dashboard/mySubmission", icon: <FaClipboardCheck />, label: "Submissions" },
//       { to: "/dashboard/withdraw", icon: <FaCoins />, label: "Withdraw" }
//     );
//   }

//   return links.map((link) => (
//     <NavLink
//       key={link.to}
//       to={link.to}
//       className={({ isActive }) =>
//         `flex flex-col items-center p-2 rounded-lg transition-all ${
//           isActive
//             ? "text-blue-600 dark:text-blue-400"
//             : "text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300"
//         }`
//       }
//     >
//       <span className="text-xl">{link.icon}</span>
//       <span className="text-xs mt-1 text-center">{link.label}</span>
//     </NavLink>
//   ));
// };

// // Desktop sidebar links
// const SidebarLinks = ({ role }) => {
//   return (
//     <ul className="space-y-6 text-sm text-gray-700 dark:text-gray-200">
//       {role === "admin" && (
//         <>
//           <SidebarLink to="/dashboard/adminHome" icon={<FaHome />} label="Admin Home" />
//           <SidebarLink to="/dashboard/manageUsers" icon={<FaUsers />} label="Manage Users" />
//           <SidebarLink to="/dashboard/manageTasks" icon={<FaTasks />} label="Manage Tasks" />
//         </>
//       )}
//       {role === "buyer" && (
//         <>
//           <SidebarLink to="/dashboard/buyerHome" icon={<FaHome />} label="Home" />
//           <SidebarLink to="/dashboard/myTasks" icon={<FaListAlt />} label="My Tasks" />
//           <SidebarLink to="/dashboard/addTasks" icon={<FaFileUpload />} label="Add Tasks" />
//           <SidebarLink to="/dashboard/purchaseCoins" icon={<FaCoins />} label="Purchase Coins" />
//           <SidebarLink to="/dashboard/paymentHistory" icon={<FaFileInvoiceDollar />} label="Payment History" />
//         </>
//       )}
//       {role === "worker" && (
//         <>
//           <SidebarLink to="/dashboard/workerHome" icon={<FaHome />} label="Home" />
//           <SidebarLink to="/dashboard/taskList" icon={<FaTasks />} label="Available Tasks" />
//           <SidebarLink to="/dashboard/mySubmission" icon={<FaClipboardCheck />} label="My Submissions" />
//           <SidebarLink to="/dashboard/withdraw" icon={<FaCoins />} label="Withdrawals" />
//         </>
//       )}
//     </ul>
//   );
// };

// const SidebarLink = ({ to, icon, label }) => {
//   return (
//     <li className="group">
//       <NavLink
//         to={to}
//         className={({ isActive }) =>
//           `flex items-center justify-start gap-3 px-2 py-2 rounded transition-all ${
//             isActive
//               ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
//               : "hover:bg-blue-50 dark:hover:bg-gray-800"
//           }`
//         }
//       >
//         <span className="text-xl">{icon}</span>
//         <span>{label}</span>
//       </NavLink>
//     </li>
//   );
// };

// export default DashboardSidebar;





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
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden h-full bg-white dark:bg-gray-900 overflow-y-auto">
        <div className="flex flex-col items-center py-4 space-y-6 h-full">
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
      { to: "/dashboard/mySubmission", icon: <FaClipboardCheck />, label: "Submissions" }
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
          <SidebarLink to="/dashboard/adminHome" icon={<FaHome />} label="Admin Home" />
          <SidebarLink to="/dashboard/manageUsers" icon={<FaUsers />} label="Manage Users" />
          <SidebarLink to="/dashboard/manageTasks" icon={<FaTasks />} label="Manage Tasks" />
        </>
      )}
      {role === "buyer" && (
        <>
          <SidebarLink to="/dashboard/buyerHome" icon={<FaHome />} label="Home" />
          <SidebarLink to="/dashboard/myTasks" icon={<FaListAlt />} label="My Tasks" />
          <SidebarLink to="/dashboard/addTasks" icon={<FaFileUpload />} label="Add Tasks" />
          <SidebarLink to="/dashboard/purchaseCoins" icon={<FaCoins />} label="Purchase Coins" />
          <SidebarLink to="/dashboard/paymentHistory" icon={<FaFileInvoiceDollar />} label="Payment History" />
        </>
      )}
      {role === "worker" && (
        <>
          <SidebarLink to="/dashboard/workerHome" icon={<FaHome />} label="Home" />
          <SidebarLink to="/dashboard/taskList" icon={<FaTasks />} label="Available Tasks" />
          <SidebarLink to="/dashboard/mySubmission" icon={<FaClipboardCheck />} label="My Submissions" />
          <SidebarLink to="/dashboard/withdraw" icon={<FaCoins />} label="Withdrawals" />
        </>
      )}
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