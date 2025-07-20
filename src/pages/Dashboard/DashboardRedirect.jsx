import { useEffect } from "react";
import { useNavigate } from "react-router";
import useRole from "../../hooks/useRole";

const DashboardRedirect = () => {
  const [role, loading] = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (role === "buyer") navigate("/dashboard/buyerHome");
      else if (role === "worker") navigate("/dashboard/workerHome");
      else if (role === "admin") navigate("/dashboard/adminHome");
    }
  }, [role, loading, navigate]);

  return <div className="text-center py-12">Redirecting to your dashboard...</div>;
};

export default DashboardRedirect;