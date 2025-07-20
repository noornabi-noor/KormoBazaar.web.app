import { Link, Outlet } from 'react-router-dom'; // ✅ make sure it's 'react-router-dom'

const DashboardSidebar = ({ role }) => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          {role === 'buyer' && (
            <>
              <li><Link to="/dashboard/myTasks">My Tasks</Link></li>
              <li><Link to="/dashboard/addTasks">Add Tasks</Link></li>
              <li><Link to="/dashboard/purchaseCoins">Purchase Coins</Link></li>
              <li><Link to="/dashboard/paymentHistory">Payment History</Link></li>
            </>
          )}
          {role === 'worker' && (
            <>
              <li><Link to="/dashboard/taskList">Available Tasks</Link></li>
              <li><Link to="/dashboard/mySubmission">My Submissions</Link></li>
              
            </>
          )}
          {/* {role === 'admin' && (
            <>
              <li><Link to="/dashboard/manageUsers">Manage Users</Link></li>
              <li><Link to="/dashboard/allPayments">All Payments</Link></li>
            </>
          )} */}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Outlet /> {/* ✅ This is what renders the child routes */}
      </div>
    </div>
  );
};

export default DashboardSidebar;
