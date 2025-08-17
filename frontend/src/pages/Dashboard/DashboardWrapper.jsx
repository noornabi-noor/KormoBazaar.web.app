import useRole from "../../hooks/useRole";
import DashboardSidebar from "../../layouts/DashboardSidebar";

const DashboardWrapper = () => {
  const [role, loading] = useRole();

  // if (loading) return <span className="loading loading-spinner text-primary"></span>;

  if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-spinner text-primary"></span>
    </div>
  );
}


  return <DashboardSidebar role={role} />;
};

export default DashboardWrapper;