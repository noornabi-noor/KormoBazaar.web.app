import useRole from "../../hooks/useRole";
import DashboardSidebar from "../../layouts/DashboardSidebar";

const DashboardWrapper = () => {
  const [role, loading] = useRole();

  if (loading) return <span className="loading loading-spinner text-primary"></span>;

  return <DashboardSidebar role={role} />;
};

export default DashboardWrapper;