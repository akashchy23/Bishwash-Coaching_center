import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate, NavLink } from "react-router";
import {
  LuArrowLeft,
  LuLogOut,
  LuHouse,
  LuMenu,
  LuX,
  LuUsers,
  LuUserPlus,
  LuGraduationCap,
  LuCreditCard,
  LuLayers,
  LuChevronRight,
} from "react-icons/lu";
import bishwasLogo from "../assets/IMG_8754.JPG.svg";
import { AuthContext } from "../Provider/AuthProvider";

const DashNav = () => {
  const navigate = useNavigate();
  const { role, logOut } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToGoHome = () => {
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    logOut();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full px-3 py-3.5 sm:px-6">
      <div className="max-w-7xl mx-auto rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-lg shadow-slate-200/50 transition-all duration-300">
        <div className="navbar px-4 sm:px-5 py-3 flex justify-between items-center min-h-[72px] relative">
          
          {/* ================= Brand Logo & Bengali Title ================= */}
          <div className="navbar-start flex items-center gap-3 w-auto">
            <div
              onClick={handleToGoHome}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="relative overflow-hidden rounded-xl bg-transparent p-0.5 group-hover:scale-105 transition-transform duration-300">
                <img
                  className="h-10 w-10 sm:h-12 sm:w-12 object-contain mix-blend-multiply"
                  src={bishwasLogo}
                  alt="বিশ্বাসের লোগো"
                />
              </div>
              <h1 className="hind-siliguri-regular font-bold text-slate-800 text-base sm:text-lg leading-none tracking-tight group-hover:text-emerald-600 transition-colors">
                বিশ্বাস মোবাইল ট্রেনিং ইন্সটিটিউট
              </h1>
            </div>
          </div>

          {/* ================= Center Area (Desktop) ================= */}
          <div className="navbar-center hidden md:flex">
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 bg-slate-100/80 px-3.5 py-1.5 rounded-full border border-slate-200/60">
              Dashboard Panel
            </span>
          </div>

          {/* ================= Action Buttons & Mobile Dropdown Anchor ================= */}
          <div className="navbar-end flex items-center gap-2.5 w-auto relative" ref={dropdownRef}>
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300/70 rounded-xl transition-all active:scale-95"
            >
              <LuArrowLeft size={16} className="text-slate-600" />
              <span>Back</span>
            </button>

            {/* Home Link Button (Desktop only) */}
            <button
              onClick={handleToGoHome}
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300/70 rounded-xl transition-all active:scale-95"
            >
              <LuHouse size={16} className="text-emerald-600" />
              <span>Home</span>
            </button>

            {/* Logout Button (Desktop only) */}
            <button
              onClick={handleLogout}
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white border border-rose-200/80 rounded-xl shadow-sm transition-all duration-300 active:scale-95"
            >
              <LuLogOut size={16} />
              <span>Logout</span>
            </button>

            {/* Hamburger Toggle Button (Mobile & Tablet) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300/70 rounded-xl transition-all active:scale-95"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <LuX size={20} /> : <LuMenu size={20} />}
            </button>

            {/* ================= Mobile Dropdown Menu ================= */}
            {isMobileMenuOpen && (
              <div className="absolute top-full right-0 mt-3 w-64 bg-white border border-slate-200/80 rounded-2xl shadow-xl p-3 z-50 lg:hidden flex flex-col space-y-3 animate-in fade-in zoom-in-95 duration-150">
                
                {/* Menu Title */}
                <div className="px-3 pt-1 pb-1 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
                    Navigation Menu
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 capitalize bg-emerald-50 px-2 py-0.5 rounded-md">
                    {role || 'Panel'}
                  </span>
                </div>

                {/* Nav Links */}
                <ul className="space-y-1">
                  {/* Dashboard Users (Admin) */}
                  {role === "admin" && (
                    <li>
                      <NavLink
                        end
                        to="/dashboard/users"
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                          `flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                            isActive
                              ? "bg-slate-900 text-white"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          }`
                        }
                      >
                        <div className="flex items-center gap-2.5">
                          <LuUsers size={16} className="text-emerald-500" />
                          <span>Dashboard Users</span>
                        </div>
                        <LuChevronRight size={14} className="text-slate-400" />
                      </NavLink>
                    </li>
                  )}

                  {/* Student Info (Staff) */}
                  {role === "staff" && (
                    <li>
                      <NavLink
                        to="/dashboard/studentinfo"
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                          `flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                            isActive
                              ? "bg-slate-900 text-white"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          }`
                        }
                      >
                        <div className="flex items-center gap-2.5">
                          <LuUserPlus size={16} className="text-emerald-500" />
                          <span>Add Student Info</span>
                        </div>
                        <LuChevronRight size={14} className="text-slate-400" />
                      </NavLink>
                    </li>
                  )}

                  {/* All Student Info (Staff) */}
                  {role === "staff" && (
                    <li>
                      <NavLink
                        to="/dashboard/allstudentinfo"
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                          `flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                            isActive
                              ? "bg-slate-900 text-white"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          }`
                        }
                      >
                        <div className="flex items-center gap-2.5">
                          <LuGraduationCap size={16} className="text-emerald-500" />
                          <span>All Student Info</span>
                        </div>
                        <LuChevronRight size={14} className="text-slate-400" />
                      </NavLink>
                    </li>
                  )}

                  {/* Update Student Info (Admin) */}
                  {role === "admin" && (
                    <li>
                      <NavLink
                        to="/dashboard/updateallstinfo"
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                          `flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                            isActive
                              ? "bg-slate-900 text-white"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          }`
                        }
                      >
                        <div className="flex items-center gap-2.5">
                          <LuGraduationCap size={16} className="text-emerald-500" />
                          <span>Update Student Info</span>
                        </div>
                        <LuChevronRight size={14} className="text-slate-400" />
                      </NavLink>
                    </li>
                  )}

                  {/* Total Payment Info (Admin) */}
                  {role === "admin" && (
                    <li>
                      <NavLink
                        to="/dashboard/totalpaymentinfo"
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                          `flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                            isActive
                              ? "bg-slate-900 text-white"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          }`
                        }
                      >
                        <div className="flex items-center gap-2.5">
                          <LuCreditCard size={16} className="text-emerald-500" />
                          <span>Total Payment Info</span>
                        </div>
                        <LuChevronRight size={14} className="text-slate-400" />
                      </NavLink>
                    </li>
                  )}

                  {/* New Batch Release (Admin) */}
                  {role === "admin" && (
                    <li>
                      <NavLink
                        to="/dashboard/batchrelease"
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                          `flex items-center justify-between rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                            isActive
                              ? "bg-slate-900 text-white"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          }`
                        }
                      >
                        <div className="flex items-center gap-2.5">
                          <LuLayers size={16} className="text-emerald-500" />
                          <span>New Batch Release</span>
                        </div>
                        <LuChevronRight size={14} className="text-slate-400" />
                      </NavLink>
                    </li>
                  )}
                </ul>

                {/* Dropdown Action Buttons (Home & Logout) */}
                <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5">
                  <button
                    onClick={handleToGoHome}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <LuHouse size={15} className="text-emerald-600" />
                    <span>Home</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white rounded-lg transition-colors"
                  >
                    <LuLogOut size={15} />
                    <span>Logout</span>
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default DashNav;