import { Outlet } from "react-router";
import DashboardNavbar from "../pages/Dashboard/DashboardNavbar/DashboardNavbar";
import useRole from "../hooks/useRole";
import DashboardSidebar from "./DashboardSidebar";
import Footer from "../pages/shared/Footer/Footer";

const DashboardLayout = () => {
  const [role, loading] = useRole();

  if (loading) {
    return <div className="text-center py-6">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Top Navbar */}
      <div className="sticky top-0 z-50">
        <DashboardNavbar />
      </div>

      {/* Fixed Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-gray-200 via-blue-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl transition-colors duration-300 border-r border-gray-300 dark:border-gray-700 fixed top-16 bottom-0 overflow-y-auto mt-1">
        <DashboardSidebar role={role} />
      </aside>

      {/* Main content + Footer shifted right to avoid sidebar overlap */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        {/* Scrollable Content */}
        <main className="flex-1 bg-gray-50 dark:bg-gray-800 p-6 overflow-y-auto h-[calc(100vh-64px)] ml-0.5 mt-1">
          <Outlet />
        </main>

        {/* Footer aligned with main content */}
        <div className="ml-0.5">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
