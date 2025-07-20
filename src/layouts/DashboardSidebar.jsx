import { Link } from "react-router-dom";

const DashboardSidebar = ({ role }) => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul className="space-y-2">
        {role === "admin" && (
          <>
            <li>
              <Link to="/dashboard/adminHome">Admin Home</Link>
            </li>
            <li>
              <Link to="/dashboard/manageUsers">Manage Users</Link>
            </li>
            <li>
              <Link to="/dashboard/reviewWithdrawals">Review Withdrawals</Link>
            </li>
            <li>
              <Link to="/dashboard/manageTasks">Manage Tasks</Link>
            </li>
          </>
        )}
        {role === "buyer" && (
          <>
            <li>
              <Link to="/dashboard/buyerHome">Home</Link>
            </li>
            <li>
              <Link to="/dashboard/myTasks">My Tasks</Link>
            </li>
            <li>
              <Link to="/dashboard/addTasks">Add Tasks</Link>
            </li>
            <li>
              <Link to="/dashboard/purchaseCoins">Purchase Coins</Link>
            </li>
            <li>
              <Link to="/dashboard/paymentHistory">Payment History</Link>
            </li>
          </>
        )}
        {role === "worker" && (
          <>
            <li>
              <Link to="/dashboard/workerHome">Home</Link>
            </li>
            <li>
              <Link to="/dashboard/taskList">Available Tasks</Link>
            </li>
            <li>
              <Link to="/dashboard/mySubmission">My Submissions</Link>
            </li>
            <li>
              <Link to="/dashboard/withdraw">WithDrawals </Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default DashboardSidebar;
