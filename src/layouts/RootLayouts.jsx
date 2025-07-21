import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/shared/Navbar/Navbar";
import Footer from "../pages/shared/Footer/Footer";
import { ThemeProvider } from "../contexts/ThemeContext/ThemeContext";

const RootLayouts = () => {
  return (
    <div>
      <ThemeProvider>
        <Navbar />
      </ThemeProvider>
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayouts;
