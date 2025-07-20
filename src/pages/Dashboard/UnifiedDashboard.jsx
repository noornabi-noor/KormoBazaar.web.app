// import { Outlet } from "react-router";

// const UnifiedDashboard = () => {
//   return (
//     <div className="flex">
//       <div className="w-64 bg-gray-200 min-h-screen p-4">
//         <h2 className="text-xl font-bold">Sidebar</h2>
//         {/* Add role-based sidebar here */}
//       </div>
//       <div className="flex-1 p-4">
//         <Outlet /> {/* Renders the children routes */}
//       </div>
//     </div>
//   );
// };

// export default UnifiedDashboard;




import useRole from "../../hooks/useRole";
import DashboardSidebar from "../../layouts/DashboardSidebar";
import { Outlet } from "react-router";

const UnifiedDashboard = () => {
  const [role, loading] = useRole();

  if (loading) return <div className="text-center py-6">Loading dashboard...</div>;

  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-gray-200 p-4">
        <DashboardSidebar role={role} />
      </div>
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default UnifiedDashboard;