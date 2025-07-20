import { createBrowserRouter } from "react-router";
import RootLayouts from "./../layouts/RootLayouts";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/authentication/Login/Login";
import Register from "../pages/authentication/Register/Register";
import AuthLayouts from "../layouts/AuthLayouts";
import MyProfile from "../pages/MyProfile/MyProfile";
import AddTasks from "../pages/Buyer/AddTasks/AddTasks";
import MyTasks from "../pages/Buyer/MyTasks/MyTasks";
import TaskList from "../pages/Worker/TaskList/TaskList";
import TaskDetails from "../pages/Worker/TaskDetails/TaskDetails";
import MySubmissions from "../pages/Worker/MySubmissions/MySubmissions";
import Payment from "../pages/Worker/Payment/Payment";
import PurchaseCoins from "../pages/Worker/PurchaseCoins/PurchaseCoins";
import PrivateRoutes from "../routes/PrivateRoutes";
import PaymentHistory from "../pages/Buyer/PaymentHistory/PaymentHistory";
import DashboardWrapper from "../pages/Dashboard/DashboardWrapper";
import BuyerHome from "../pages/Buyer/BuyerHome/BuyerHome";
import WorkerHome from "../pages/Worker/WorkerHome/WorkerHome";
import DashboardRedirect from "../pages/Dashboard/DashboardRedirect";
import UnifiedDashboard from "../pages/Dashboard/UnifiedDashboard";
import WithdrawForm from "../pages/WithdrawForm/WithdrawForm";
import AboutUs from "../pages/AboutUs/AboutUs";
import AdminProtected from "../routes/AdminProtected";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "myProfile",
        Component: MyProfile,
      },
      { path: "task/:id", Component: TaskDetails },
      {
        path: "/payment",
        Component: Payment,
      },
      {
        path: "about",
        Component: AboutUs,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayouts,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <UnifiedDashboard />
      </PrivateRoutes>
    ),
    children: [
      { index: true, element: <DashboardRedirect /> }, 
      { path: "/dashboard/manageUsers", element: <AdminProtected><ManageUsers /></AdminProtected> },

      // Buyer
      { path: "buyerHome", element: <BuyerHome /> },
      { path: "addTasks", element: <AddTasks /> },
      { path: "myTasks", element: <MyTasks /> },
      { path: "paymentHistory", element: <PaymentHistory /> },
      { path: "purchaseCoins", element: <PurchaseCoins /> },

      // Worker
      { path: "workerHome", element: <WorkerHome /> },
      { path: "taskList", element: <TaskList /> },
      { path: "mySubmission", element: <MySubmissions /> },
      { path: "withdraw", element: <WithdrawForm /> },
    ],
  },
]);
