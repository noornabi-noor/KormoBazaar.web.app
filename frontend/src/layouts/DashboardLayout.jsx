import { Outlet } from "react-router-dom";
import DashboardNavbar from "../pages/Dashboard/DashboardNavbar/DashboardNavbar";
import useRole from "../hooks/useRole";
import DashboardSidebar from "./DashboardSidebar";
import Footer from "../pages/shared/Footer/Footer";

const DashboardLayout = () => {
  const [role, loading] = useRole();

  if (loading) {
    return <span className="loading loading-spinner text-primary"></span>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* 🔝 Fixed Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16">
        <DashboardNavbar />
      </header>

      {/* 💻 Sidebar + Main Content */}
      <div className="flex pt-15 min-h-screen">
        {/* 📱 Mobile Sidebar */}
        <aside className="md:hidden mt-2 fixed left-0 top-16 bottom-0 z-40 w-16 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <DashboardSidebar role={role} />
        </aside>

        {/* 💻 Desktop Sidebar */}
        <aside className="hidden rounded-2xl mt-2 md:block w-64 bg-gradient-to-br from-gray-200 via-blue-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-r border-gray-300 dark:border-gray-700 fixed top-16 bottom-0 z-40">
          <DashboardSidebar role={role} />
        </aside>

        {/* 🧩 Main Content Area with Footer */}
        <main className="flex-1 ml-16 md:ml-64 overflow-y-auto flex flex-col justify-between">
          {/* 🔄 Routed Page Content */}
          <div className="flex-grow p-2 md:p-6">
            <Outlet />
          </div>

          {/* ⚓ Footer Always Anchored at Bottom */}
          <footer className="px-4 md:px-6 ">
            <Footer />
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;