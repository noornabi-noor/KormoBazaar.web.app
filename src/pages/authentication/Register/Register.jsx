import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Lottie from "lottie-react";
import registerLottie from "../../../assets/LottiesFile/register.json";
import { FcGoogle } from "react-icons/fc";

import UseAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
  const [error, setError] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();

  const { createUser, signInWithGoogle, updateUserProfile } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const imageUploadKey = import.meta.env.VITE_image_upload_key;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 🖼️ Image Upload Handler
  const handleImageUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${imageUploadKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const imgData = await response.json();
      if (!imgData.success) throw new Error("Image upload failed");
      return imgData.data.url;
    } catch (err) {
      toast.error("❌ Failed to upload image");
      console.error("ImgBB error:", err.message);
      return "";
    }
  };

  const onSubmit = async (data) => {
    const { name, email, password, photo, role } = data;
    const photoFile = photo[0];

    // 🔐 Validate password
    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    ) {
      const msg =
        "Password must be at least 6 characters and include uppercase and lowercase letters";
      setError(msg);
      toast.error(msg);
      return;
    }

    // 🖼️ Upload image first
    const uploadedUrl = await handleImageUpload(photoFile);
    if (!uploadedUrl) return;
    setProfilePic(uploadedUrl);

    try {
      // 👤 Create Firebase user
      const result = await createUser(email, password);

      // 🔄 Update Firebase profile
      await updateUserProfile({
        displayName: name,
        photoURL: uploadedUrl,
      });

      // 💾 Save to backend
      await axiosSecure.post("/register", {
        name,
        email,
        photoURL: uploadedUrl,
        role,
      });

      toast.success(`✅ Registered as ${name}`);
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError(err.message);
      toast.error(`❌ ${err.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      // Extract name and photo
      const name = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const role = "buyer"; // or prompt the user to select role if needed

      // 💾 Save to backend
      await axiosSecure.post("/register", {
        name,
        email,
        photoURL,
        role,
      });

      toast.success(`✅ Signed in as ${name}`);
      setError("");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      setError(error.message);
      toast.error(`❌ ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col-reverse lg:flex-row items-center justify-center p-4 gap-8">
      <div className="w-full max-w-md bg-base-300 p-8 rounded-xl shadow-lg">
        <h2 className="text-primary-gradient text-center text-4xl mb-12">
          Register
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            placeholder="Full Name"
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Email"
            className="input input-bordered w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            type="file"
            accept="image/*"
            {...register("photo", { required: "Profile image is required" })}
            className="input input-bordered w-full"
          />
          {errors.photo && (
            <p className="text-red-500 text-sm">{errors.photo.message}</p>
          )}

          <select
            {...register("role", { required: "Please select a role" })}
            className="select select-bordered w-full"
          >
            <option value="">Select Role</option>
            <option value="worker">Worker</option>
            <option value="buyer">Buyer</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}

          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Password"
            className="input input-bordered w-full"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="btn-secondary rounded-full w-full">
            Register
          </button>
        </form>

        <div className="divider my-4">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="btn w-full flex items-center justify-center gap-2 border border-gray-300"
        >
          <FcGoogle className="text-xl" />
          <span>Continue with Google</span>
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>

      <div className="w-full max-w-md flex justify-center items-center">
        <Lottie animationData={registerLottie} loop />
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Register;
