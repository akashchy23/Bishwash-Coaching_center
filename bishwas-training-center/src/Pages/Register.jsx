import React, { useContext, useState } from "react";
import {
    FaEnvelope,
    FaLock,
    FaUser,
    FaGoogle,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import bishwsLogo from "../assets/IMG_8754.JPG.svg";
import { AuthContext } from "../Provider/AuthProvider";
import useAxios from "../hook/useAxios";

const Register = () => {
    const navigate = useNavigate()
    const axiosInstance = useAxios()
    const { registerWithEmailandPass, setUser } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSignup = (e) => {
        e.preventDefault();

        const form = e.target;

        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;

        if (password !== confirmPassword) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Passwords do not match!",
                confirmButtonColor: "#16a34a",
            });
        }

        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;

        if (password.length < 6) {
            return Swal.fire({
                icon: "warning",
                title: "Password must be at least 6 characters.",
                confirmButtonColor: "#16a34a",
            });
        }

        if (!uppercase.test(password)) {
            return Swal.fire({
                icon: "warning",
                title: "Password must contain at least one uppercase letter.",
                confirmButtonColor: "#16a34a",
            });
        }

        if (!lowercase.test(password)) {
            return Swal.fire({
                icon: "warning",
                title: "Password must contain at least one lowercase letter.",
                confirmButtonColor: "#16a34a",
            });
        }

        const formData = {
            name,
            email
        }
        registerWithEmailandPass(email, password)
            .then((result) => {
                console.log(result);

                setUser(result.user);
                axiosInstance.post('/user', formData)
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Success!",
                            text: "Account created successfully.",
                            confirmButtonColor: "#16a34a",
                            timer: 2000,
                            showConfirmButton: false,
                        });
                        navigate('/');
                        form.reset();
                    })


            })
            .catch((error) => {
                let errorMessage = "";

                if (error.code === "auth/email-already-in-use") {
                    errorMessage = "This email is already registered.";
                } else if (error.code === "auth/invalid-email") {
                    errorMessage = "Please enter a valid email address.";
                } else if (error.code === "auth/weak-password") {
                    errorMessage = "Password should be at least 6 characters.";
                } else if (error.code === "auth/network-request-failed") {
                    errorMessage = "Please check your internet connection.";
                } else {
                    errorMessage = error.message;
                }

                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: errorMessage,
                    confirmButtonColor: "#dc2626",
                });
            });
    };

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

                    <form
                        onSubmit={handleSignup}
                        className="w-full max-w-md"
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-2">
                            Create Your Account
                        </h2>

                        <p className="text-gray-500 mb-8">
                            Join us and start managing your inventory efficiently.
                        </p>

                        {/* Name */}
                        <div className="relative mb-5">
                            <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className="w-full h-14 rounded-full bg-gray-100 pl-14 pr-5 outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="relative mb-5">
                            <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

                            <input
                                type="email"
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
                        {/* Confirm Password */}
                        <div className="relative mb-8">
                            <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                className="w-full h-14 rounded-full bg-gray-100 pl-14 pr-14 outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        {/* Signup Button */}
                        <button
                            type="submit"
                            className="w-full h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-semibold hover:scale-[1.02] duration-300 shadow-lg"
                        >
                            Create Account
                        </button>

                      

                        {/* Login Link */}
                        <p className="text-center text-gray-500 mt-8">
                            Already have an account?

                            <Link
                                to="/login"
                                className="text-blue-600 font-semibold ml-2 hover:underline"
                            >
                                Login
                            </Link>
                        </p>

                    </form>

                </div>

            </div>
        </div>
    );
};

export default Register;