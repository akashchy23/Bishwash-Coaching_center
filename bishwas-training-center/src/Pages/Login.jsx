import React, { useContext, useRef, useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

import bishwsLogo from "../assets/IMG_8754.JPG.svg";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
  const location = useLocation()
  const emailRef = useRef()
  const navigate = useNavigate()
  const { loginWithEmailAndPass, forgetPasswordReset, setUser } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please enter your email and password.",
        confirmButtonColor: "#16a34a",
      });
    }

    loginWithEmailAndPass(email, password)
      .then((result) => {
        console.log(result);

        setUser(result.user);

        Swal.fire({
          icon: "success",
          title: "Welcome Back!",
          text: "Login Successful.",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate(location.state ? location.state : '/');
        form.reset();
      })
      .catch((error) => {
        let message = "";

        if (error.code === "auth/user-not-found") {
          message = "No account found with this email.";
        } else if (error.code === "auth/wrong-password") {
          message = "Incorrect password.";
        } else if (error.code === "auth/invalid-credential") {
          message = "Invalid email or password.";
        } else if (error.code === "auth/invalid-email") {
          message = "Please enter a valid email.";
        } else if (error.code === "auth/network-request-failed") {
          message = "Please check your internet connection.";
        } else {
          message = error.message;
        }

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: message,
          confirmButtonColor: "#dc2626",
        });
      });
  };

  const handleforgetPass = () => {
    const email = emailRef.current.value
    if (!email) {
      return Swal.fire({
        icon: "warning",
        title: "Enter Email",
        text: "Please enter your email address first.",
      });
    }

    forgetPasswordReset(email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Email Sent",
          text: "A password reset link has been sent to your email.",
        }).then(() => {
          window.open("https://mail.google.com", "_blank");
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: error.message,
        });
      });
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-5 py-10">
      <div className="max-w-6xl w-full bg-white rounded-[35px] shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* Left Side */}
        <div className="hidden lg:flex items-center justify-center relative bg-gradient-to-br from-indigo-50 to-blue-100 p-10">

          <div className="absolute top-16 left-16 h-5 w-5 rounded-full border-4 border-cyan-400"></div>

          <div className="absolute bottom-24 left-20 rotate-45 h-6 w-6 border-4 border-green-400"></div>

          <div className="absolute top-28 right-20 h-0 w-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[28px] border-b-green-400 rotate-90"></div>

          <div className="absolute bottom-20 right-24 h-4 w-4 rounded-full border-4 border-sky-400"></div>

          <div className="w-[400px] h-[400px] rounded-full bg-white shadow-xl flex items-center justify-center">
            <img
              className="rounded-full"
              src={bishwsLogo}
              alt="Institute Logo"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-8 md:p-14">

          <form onSubmit={handleLogin} className="w-full max-w-md">

            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Log In to Your Account
            </h2>

            <p className="text-gray-500 mb-8">
              Welcome back! Please login to continue.
            </p>

            {/* Email */}
            <div className="relative mb-5">
              <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

              <input
                type="email"
                ref={emailRef}
                name="email"
                placeholder="Email Address"
                className="w-full h-14 rounded-full bg-gray-100 pl-14 pr-5 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div className="relative mb-5">
              <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full h-14 rounded-full bg-gray-100 pl-14 pr-14 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Remember */}
            <div className="flex justify-between items-center text-sm mb-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-sm"
                />
                Remember Me
              </label>

              <button onClick={handleforgetPass}
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-semibold hover:scale-[1.02] duration-300 shadow-lg"
            >
              Login
            </button>

          

          

            {/* Register */}
            <p className="text-center text-gray-500 mt-8">
              Don't have an account?

              <Link
                to="/register"
                className="text-blue-600 font-semibold ml-2 hover:underline"
              >
                Register
              </Link>
            </p>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Login;