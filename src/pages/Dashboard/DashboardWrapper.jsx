import useRole from "../../hooks/useRole";
import DashboardSidebar from "../../layouts/DashboardSidebar";

const DashboardWrapper = () => {
  const [role, loading] = useRole();

  if (loading) return <div className="text-center py-12">Loading dashboard...</div>;

  return <DashboardSidebar role={role} />;
};

export default DashboardWrapper;



// import { useEffect } from "react";
// import useRole from "../../hooks/useRole";
// import { useNavigate } from "react-router-dom";

// const DashboardWrapper = () => {
//   const [role, loading] = useRole();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!loading) {
//       if (role === "buyer") navigate("/dashboard/buyer");
//       else if (role === "worker") navigate("/dashboard/worker");
//       // optionally: navigate("/dashboard/admin");
//     }
//   }, [role, loading, navigate]);

//   return <div className="text-center py-12">Redirecting to your dashboard...</div>;
// };

// export default DashboardWrapper;