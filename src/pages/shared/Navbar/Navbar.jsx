import React, { use } from "react";
import { Link, NavLink, useLocation } from "react-router";
import KormoBazaarLogo from "../KormoBazaarLogo/KormoBazaarLogo";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import MySubmissions from './../../Worker/MySubmissions/MySubmissions';

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const location = useLocation();

    const handleLogout = async () => {
    try {
      await logOut();
      toast.success("✅ Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    }
  };

  const navItems= <>
    <li>
      <NavLink to="/">Home</NavLink>
    </li>
    <li>
      <NavLink to="/addTasks">Add Tasks</NavLink>
    </li>
    <li>
      <NavLink to="/myTasks">My Tasks</NavLink>
    </li>
    <li>
      <NavLink to="/taskList">TaskList</NavLink>
    </li>
    <li>
      <NavLink to="/mySubmission">MySubmissions</NavLink>
    </li>
    <li>
      <NavLink to="/purchaseCoins">PurchaseCoins</NavLink>
    </li>
   
    <li>
      <NavLink to="/about">About Us</NavLink>
    </li>
  </>;

  return (
    <div className="navbar bg-gradient-to-tr from-indigo-50 via-blue-100 to-sky-50 shadow-md rounded-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
          {navItems}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl "><KormoBazaarLogo/></a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        {navItems}
        </ul>
      </div>
      {/* <div className="navbar-end">
        <Link to="/login" className="btn-secondary ">Login</Link>
      </div> */}


            <div className="navbar-end gap-1.5 md:gap-3">
        {user ? (
          <>
            <div className="relative group mr-3 md:mr-5">
              <div className="avatar w-7 md:w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <Link to="/myProfile">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt={user.displayName || "User Avatar"}
                    className="rounded-full cursor-pointer w-10 h-10"
                  />
                </Link>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                {user.displayName || "No Name"}
              </div>
            </div>

            <button onClick={handleLogout} className="btn-primary">
              Logout
            </button>
          </>
        ) : (
          <>
            {location.pathname === "/register" ? (
              <NavLink className="btn-primary" to="/register">
                Register
              </NavLink>
            ) : (
              <NavLink className="btn-primary" to="/login">
                Login
              </NavLink>
            )}
          </>
        )}

        {/* <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="p-2 md:p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          {theme === "dark" ? (
            <span className="text-yellow-300 text-lg md:text-xl">☀️</span>
          ) : (
            <span className="text-gray-700 text-lg md:text-xl">🌙</span>
          )}
        </button> */}
      </div>


    </div>
  );
};

export default Navbar;
