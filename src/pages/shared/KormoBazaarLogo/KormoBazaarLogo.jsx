import React from "react";
import logo from "../../../assets/icon/handshakeMoneyIcon.png";
import { Link } from "react-router";

const KormoBazaarLogo = () => {
  return (
    <Link to="/">
      <div className="flex items-center gap-2">
        <img
          className="w-12 h-12 rounded-lg shadow-md border border-gray-200"
          src={logo}
          alt="KormoBazaar Logo"
        />
        <div className="text-left">
          <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">
            Kormo
            <span className="text-indigo-800">Bazaar</span>
          </p>
          <p className="text-sm text-gray-500 -mt-1 font-medium tracking-wide">
            Empowering Work
          </p>
        </div>
      </div>
    </Link>
  );
};

export default KormoBazaarLogo;
