import React, { use, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { updateProfile } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from "../../contexts/AuthContext/AuthContext"; 
import 'react-toastify/dist/ReactToastify.css';

const MyProfile = () => {
  const { user, logoutUser } = use(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setPhotoURL(user.photoURL || '');
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success('✅ Logged out successfully');
      navigate('/login');
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      toast.success('✅ Profile updated successfully');
      setEditMode(false);
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-indigo-50 via-blue-100 to-sky-50 mt-12 rounded-2xl  work-sans-text min-h-screen flex items-center justify-center  p-4" >
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-primary-gradient mb-4">My Profile</h2>

        {user ? (
          <>
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-24 h-24 mx-auto rounded-full mb-4 border border-gray-300"
              />
            ) : (
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            {editMode ? (
              <div className="space-y-3">
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded dark:text-gray-900"
                  placeholder="Enter new name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded dark:text-gray-900"
                  placeholder="Enter new photo URL"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                />
                <button
                  onClick={handleProfileUpdate}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 "
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="text-sm text-gray-500 mt-1 ml-2"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <p className="text-lg dark:text-gray-900">
                  <strong>Name:</strong> {user.displayName || 'No display name'}
                </p>
                <p className="text-lg dark:text-gray-900">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  <strong>Last Login:</strong> {user.metadata.lastSignInTime}
                </p>
              </>
            )}

            <div className='flex justify-between'>
              <button
                onClick={() => setEditMode(true)}
                className="btn-secondary relative z-10 text-sm rounded-full"
              >
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="btn text-sm rounded-full bg-red-500 hover:bg-red-600 mt-2"
              >
                Logout
              </button>
            </div>



            <div className='flex justify-between'>
               <Link to="/myArtifacts"> 
                    <button
                        onClick={() => setEditMode(true)}
                        className="btn-secondary relative z-10 text-sm rounded-full"
                    >
                        My Artifacts
                    </button>
                </Link>


                <Link to="/likedArtifacts">
                    <button
                        className="btn text-sm rounded-full bg-red-500 hover:bg-red-600 mt-2"
                    >
                        My Favourite Artifacts
                    </button>
                </Link>
                
            </div>
          </>
        ) : (
          <span className="loading loading-spinner text-primary"></span>
        )}

        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </div>
  );
};

export default MyProfile;
