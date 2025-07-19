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
import PaymentHistory from "../pages/Buyer/PaymentHistory/PaymentHistory";

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
      {
        path: "addTasks",
        Component: AddTasks,
      },
      {
        path: "myTasks",
        Component: MyTasks,
      },
      {
        path: "taskList",
        Component: TaskList,
      },
      { path: "task/:id", Component: TaskDetails },
      { path: "mySubmission", Component: MySubmissions },
      {
        path: "/purchaseCoins",
        Component: PurchaseCoins,
      },
      {
        path: "/payment",
        Component: Payment,
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory,
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
]);
