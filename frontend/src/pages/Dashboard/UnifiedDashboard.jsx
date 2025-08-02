import useRole from "../../hooks/useRole";
import DashboardSidebar from "../../layouts/DashboardSidebar";
import { Outlet } from "react-router";

const UnifiedDashboard = () => {
  const [role, loading] = useRole();

  if (loading) return <span className="loading loading-spinner text-primary"></span>;

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