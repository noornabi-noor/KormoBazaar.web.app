import { Navigate } from "react-router";
import useRole from "../hooks/useRole";

const AdminProtected = ({ children }) => {
  const [role, loading] = useRole();
  if (loading) return <div>Loading...</div>;
  return role === "admin" ? children : <Navigate to="/" />;
};

export default AdminProtected;