import React, { use, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const MyProfile = () => {
  const { user, logOut } = use(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    } else {
      navigate("/");
    }
  }, [user, navigate]);

const handleLogout = async () => {
  try {
    await logOut(); 
    toast.success("✅ Logged out successfully");
    setTimeout(() => {
      window.location.href = "/"; 
    }, 1500);
  } catch (err) {
    toast.error(`❌ ${err.message}`);
  }
};

  const handleProfileUpdate = async () => {
    try {
      await updateProfile(user, { displayName: name, photoURL });
      toast.success("✅ Profile updated successfully");
      setEditMode(false);
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10 bg-gradient-to-br from-indigo-50 via-blue-100 to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 max-w-md w-full space-y-6 text-center text-gray-800 dark:text-gray-100">
        <h2 className="text-3xl font-bold">
          👤{" "}
          <span className="text-primary-gradient dark:text-blue-300">
            My Profile
          </span>{" "}
        </h2>

        {user ? (
          <>
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-24 h-24 mx-auto rounded-full border-2 border-gray-300 dark:border-gray-700 shadow-sm"
              />
            ) : (
              <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
                No Image
              </div>
            )}

            {editMode ? (
              <div className="space-y-4">
                <input
                  type="text"
                  className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  placeholder="Enter new name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  placeholder="Enter photo URL"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleProfileUpdate}
                    className="btn btn-primary"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {user.displayName || "No display name"}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <strong>Last Login:</strong> {user.metadata.lastSignInTime}
                </p>
                <div className="flex justify-center gap-4 pt-4">
                  <button
                    onClick={() => setEditMode(true)}
                    className="btn btn-sm btn-primary"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <span className="loading loading-spinner text-primary mx-auto"></span>
        )}
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </div>
  );
};

export default MyProfile;
