import React, { use, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";

import Lottie from "lottie-react";
import loginLottie from "../../../assets/LottiesFile/login.json";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Login = () => {
  const [error, setError] = useState("");

  const { signIn, signInWithGoogle, passwordReset } = use(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const axiosSecure = useAxiosSecure();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      setError("Both fields are required");
      toast.error("Both fields are required");
      return;
    }

    try {
      const result = await signIn(email, password);
      const user = result.user;

      // 🛡️ Get token for secured request
      const token = await user.getIdToken();

      // 🔍 Use axiosSecure to fetch role
      const roleRes = await axiosSecure.get(`/users/role/${user.email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const role = roleRes.data.role;

      toast.success(`✅ Logged in as ${role}`);
      form.reset();

      // 🔀 Redirect based on role
      let redirectTo = "/";
      if (role === "worker") redirectTo = "/dashboard/workerHome";
      else if (role === "buyer") redirectTo = "/dashboard/buyerHome";
      else if (role === "admin") redirectTo = "/dashboard/adminHome";

      setTimeout(() => {
        navigate(redirectTo);
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
      toast.error(`❌ ${err.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      const token = await user.getIdToken();

      // ✅ 1. Try to insert user if not exists
      await axiosSecure
        .post(
          "/register",
          {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            role: "buyer", // Default role or detect based on email logic
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .catch((err) => {
          if (err.response?.status !== 409) {
            throw err; // Only ignore "already exists"
          }
        });

      // ✅ 2. Get role
      const roleRes = await axiosSecure.get(`/users/role/${user.email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const role = roleRes.data.role;

      // ✅ 3. Redirect
      toast.success(`✅ Signed in as ${role}`);

      let redirectTo = "/";
      if (role === "worker") redirectTo = "/dashboard/workerHome";
      else if (role === "buyer") redirectTo = "/dashboard/buyerHome";
      else if (role === "admin") redirectTo = "/dashboard/adminHome";

      setTimeout(() => {
        navigate(redirectTo);
      }, 1500);

      setError("");
    } catch (error) {
      setError(error.message);
      toast.error(`❌ ${error.message}`);
    }
  };

  const handleResetPassword = async () => {
    const email = prompt("Please enter your email for password reset:");
    if (!email) {
      toast.error("Email is required for password reset");
      return;
    }

    try {
      await passwordReset(email);
      toast.success("📧 Password reset email sent!");
    } catch (error) {
      toast.error(`❌ ${error.message}`);
    }
  };

  return (
    <div>
      <div className="work-sans-text min-h-screen bg-gray-100 flex flex-col-reverse lg:flex-row items-center justify-center p-4 gap-8">
        <div className="w-full max-w-md bg-base-300 p-8 rounded-xl shadow-lg">
          <h2 className="text-primary-gradient text-center text-4xl mb-12">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />

            <p className="text-sm text-right">
              <button
                type="button"
                onClick={handleResetPassword}
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </button>
            </p>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="btn-secondary relative z-10 text-sm rounded-full w-full"
            >
              Login
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
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register here
            </Link>
          </p>
        </div>

        <div className="w-full max-w-md flex justify-center items-center">
          <Lottie animationData={loginLottie} loop={true} />
        </div>

        <ToastContainer position="top-right" autoClose={2000} />
      </div>

      <div className="items-center text-center">
        <button
          className="btn btn-sm btn-primary"
          onClick={() => navigate(`/`)}
        >
          Back To Homepage
        </button>
      </div>
    </div>
  );
};

export default Login;
