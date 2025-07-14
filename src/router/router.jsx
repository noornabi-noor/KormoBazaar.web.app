import { createBrowserRouter } from "react-router";
import RootLayouts from './../layouts/RootLayouts';
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
        Component: MyProfile
      },
      {
        path: "addTasks",
        Component: AddTasks
      },
      {
        path: "myTasks",
        Component: MyTasks
      },
      {
        path: "taskList",
        Component: TaskList
      },
      { path: "task/:id", Component: TaskDetails },
      { path: "mySubmission", Component: MySubmissions },
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
