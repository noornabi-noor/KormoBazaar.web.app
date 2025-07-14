import { createBrowserRouter } from "react-router";
import RootLayouts from './../layouts/RootLayouts';
import Home from "../pages/Home/Home/Home";
import Login from "../pages/authentication/Login/Login";
import Register from "../pages/authentication/Register/Register";
import AuthLayouts from "../layouts/AuthLayouts";
import MyProfile from "../pages/MyProfile/MyProfile";


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
