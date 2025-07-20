import useRole from "../../hooks/useRole";
import DashboardSidebar from "../../layouts/DashboardSidebar";

const DashboardWrapper = () => {
  const [role, loading] = useRole();

  if (loading) return <div className="text-center py-12">Loading dashboard...</div>;

  return <DashboardSidebar role={role} />;
};

export default DashboardWrapper;