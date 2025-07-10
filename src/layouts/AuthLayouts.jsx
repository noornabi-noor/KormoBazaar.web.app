import React from "react";
import { Outlet } from "react-router";
// import authImg from "../assets/authImage.png";
// import ProfastLogo from "../pages/shared/ProfastLogo/ProfastLogo";

const AuthLayouts = () => {
  return (
    <div className="p-12 bg-base-200 ">
      <div>
        {/* <ProfastLogo /> */}
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div>
          {/* <img src={authImg} className="max-w-sm rounded-lg shadow-2xl" /> */}
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayouts;
