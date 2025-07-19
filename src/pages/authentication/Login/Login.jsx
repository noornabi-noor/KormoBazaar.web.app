import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";

import Lottie from "lottie-react";
import loginLottie from "../../../assets/LottiesFile/login.json";

const Login = () => {
  const [error, setError] = useState("");

  const { signIn, signInWithGoogle, passwordReset } = use(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

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
      toast.success(`✅ Logged in as ${user.displayName || user.email}`);

      setTimeout(() => {
        navigate(from);
      }, 2000);
    } catch (err) {
      setError(err.message);
      toast.error(`❌ ${err.message}`);
    }

    form.reset();
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        toast.success(`✅ Signed in as ${user.displayName}`);
        setTimeout(() => {
          navigate(from);
        }, 1000);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
        toast.error(`❌ ${error.message}`);
      });
  };

    const handleResetPassword = async () => {
      const email = prompt('Please enter your email for password reset:');
      if (!email) {
        toast.error('Email is required for password reset');
        return;
      }

      try {
        await passwordReset(email);
        toast.success('📧 Password reset email sent!');
      } catch (error) {
        toast.error(`❌ ${error.message}`);
      }
  };

  return (
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
  );
};

export default Login;
