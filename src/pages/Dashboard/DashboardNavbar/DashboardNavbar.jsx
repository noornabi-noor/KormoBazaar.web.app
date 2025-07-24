import React, { useContext, useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import { FaBell } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import KormoBazaarLogo from "../../shared/KormoBazaarLogo/KormoBazaarLogo";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";

const DashboardNavbar = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const popupRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [lastSeenTime, setLastSeenTime] = useState(localStorage.getItem("lastSeenNotification"));

  // 🔄 Fetch user stats
  const {
    data: userData = { role: "", coins: 0 },
    isLoading: loadingUser,
  } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    },
  });

  // 🔔 Fetch notifications
  const {
    data: notifications = [],
    refetch: refetchNotifications,
  } = useQuery({
    queryKey: ["notifications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/notifications?email=${user.email}`);
      return [...res.data].sort((a, b) => new Date(b.time) - new Date(a.time));
    },
  });

  // 🧠 Calculate unread notifications when data changes
  useEffect(() => {
    if (notifications.length > 0) {
      const unseen = lastSeenTime
        ? notifications.filter(n => new Date(n.time) > new Date(lastSeenTime))
        : notifications;
      setUnreadCount(unseen.length);
    }
  }, [notifications, lastSeenTime]);

  // 📦 Handle bell click
  const handleBellClick = async () => {
    setShowPopup(true);
    await refetchNotifications();

    if (notifications.length > 0) {
      const latestTime = notifications[0].time;
      localStorage.setItem("lastSeenNotification", latestTime);
      setLastSeenTime(latestTime);
    }

    setUnreadCount(0);
  };

  // ⛔ Click outside to close popup
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    };
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  const role = userData.role || "Worker";
  const coins = userData.coins || 0;

  return (
    <div className="navbar flex justify-between px-6 py-4 navbar-theme border-b border-gray-200 dark:border-gray-700 relative z-10">
      {/* Branding */}
      <Link to="/" className="flex items-center gap-2">
        <KormoBazaarLogo />
      </Link>

      {/* Info + Actions */}
      <div className="flex items-center gap-4 text-sm">
        <div className="text-gray-700 dark:text-gray-300">
          🪙 Coins: <strong>{coins.toLocaleString()}</strong>
        </div>
        <div className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded font-semibold text-blue-800 dark:text-blue-200">
          Role: {role}
        </div>

        <Link to="/myProfile" className="flex items-center gap-2">
          <img
            src={user?.photoURL || "/default-avatar.png"}
            alt="Avatar"
            className="w-8 h-8 rounded-full border border-blue-400 dark:border-blue-600 object-cover"
          />
          <span className="text-gray-800 dark:text-gray-200 font-medium">
            {user?.displayName || "User"}
          </span>
        </Link>

        {/* 🔔 Notification Bell */}
        <button
          onClick={handleBellClick}
          className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <FaBell className="text-lg text-gray-600 dark:text-gray-300" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* 📬 Notification Popup */}
      {showPopup && (
        <div
          ref={popupRef}
          className="absolute top-full right-6 mt-2 bg-white dark:bg-gray-900 w-96 max-h-[60vh] overflow-y-auto p-4 rounded-lg shadow-xl border dark:border-gray-700 space-y-3 z-50"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">🔔 Notifications</h3>
          {notifications.length > 0 ? (
            notifications.map((n, i) => (
              <Link
                key={i}
                to={n.actionRoute}
                className="block p-2 rounded hover:bg-blue-50 dark:hover:bg-gray-800 transition text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700"
              >
                {n.message}
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(n.time).toLocaleString()}
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No notifications yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardNavbar;