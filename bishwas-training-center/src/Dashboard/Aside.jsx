import React, { useContext } from "react";
import { NavLink } from "react-router";
import {
  LuUsers,
  LuUserPlus,
  LuGraduationCap,
  LuCreditCard,
  LuLayers,
  LuChevronRight,
  LuX,
  LuLayoutDashboard,
} from "react-icons/lu";
import { AuthContext } from "../Provider/AuthProvider";

const Aside = ({ onCloseMobile }) => {
  const { role } = useContext(AuthContext);

  const handleLinkClick = () => {
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <div className="w-full h-full bg-white flex flex-col justify-between select-none">

      {/* Upper Section */}
      <div className="flex flex-col flex-1 min-h-0">

        {/* Mobile Header / Close Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 lg:py-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <LuLayoutDashboard size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-800 leading-tight">
                Dashboard
              </h2>
              <span className="text-xs font-semibold text-emerald-600 capitalize">
                {role ? `${role} Panel` : 'Control Panel'}
              </span>
            </div>
          </div>

          {/* Close button for Mobile Screens */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Close Mobile Menu"
            >
              <LuX size={20} />
            </button>
          )}
        </div>

        {/* Navigation Items (Scrollable Body) */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 custom-scrollbar">

          <div>
            <p className="px-3 text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-3">
              Main Menu
            </p>

            <ul className="space-y-1.5">
              {/* Dashboard Users (Admin) */}
              {role === "admin" && (
                <li>
                  <NavLink
                    end
                    to="/dashboard/users"
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `group relative flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-bold transition-all duration-300 ${isActive
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                        : "text-slate-600 hover:bg-emerald-50/80 hover:text-emerald-700"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <LuUsers
                            size={18}
                            className={isActive ? "text-white" : "text-emerald-500"}
                          />
                          <span>Dashboard Users</span>
                        </div>
                        <LuChevronRight
                          size={16}
                          className={`${isActive ? "text-white/80" : "text-slate-400"
                            } group-hover:translate-x-0.5 transition-transform`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              )}

              {/* Student Info (Staff) */}
              {role === "staff" && (
                <li>
                  <NavLink
                    to="/dashboard/studentinfo"
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `group relative flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-bold transition-all duration-300 ${isActive
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                        : "text-slate-600 hover:bg-emerald-50/80 hover:text-emerald-700"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <LuUserPlus
                            size={18}
                            className={isActive ? "text-white" : "text-emerald-500"}
                          />
                          <span>Recent Student Info</span>
                        </div>
                        <LuChevronRight
                          size={16}
                          className={`${isActive ? "text-white/80" : "text-slate-400"
                            } group-hover:translate-x-0.5 transition-transform`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              )}

              {/* All Student Info (Staff) */}
              {role === "staff" && (
                <li>
                  <NavLink
                    to="/dashboard/allstudentinfo"
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `group relative flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-bold transition-all duration-300 ${isActive
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                        : "text-slate-600 hover:bg-emerald-50/80 hover:text-emerald-700"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <LuGraduationCap
                            size={18}
                            className={isActive ? "text-white" : "text-emerald-500"}
                          />
                          <span>All Student Info</span>
                        </div>
                        <LuChevronRight
                          size={16}
                          className={`${isActive ? "text-white/80" : "text-slate-400"
                            } group-hover:translate-x-0.5 transition-transform`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              )}

              {/* Update Student Info (Admin) */}
              {role === "admin" && (
                <li>
                  <NavLink
                    to="/dashboard/updateallstinfo"
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `group relative flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-bold transition-all duration-300 ${isActive
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                        : "text-slate-600 hover:bg-emerald-50/80 hover:text-emerald-700"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <LuGraduationCap
                            size={18}
                            className={isActive ? "text-white" : "text-emerald-500"}
                          />
                          <span>Update Student Info</span>
                        </div>
                        <LuChevronRight
                          size={16}
                          className={`${isActive ? "text-white/80" : "text-slate-400"
                            } group-hover:translate-x-0.5 transition-transform`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              )}

              {/* Total Payment Info (Admin) */}
              {role === "admin" && (
                <li>
                  <NavLink
                    to="/dashboard/totalpaymentinfo"
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `group relative flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-bold transition-all duration-300 ${isActive
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                        : "text-slate-600 hover:bg-emerald-50/80 hover:text-emerald-700"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <LuCreditCard
                            size={18}
                            className={isActive ? "text-white" : "text-emerald-500"}
                          />
                          <span>Total Payment Info</span>
                        </div>
                        <LuChevronRight
                          size={16}
                          className={`${isActive ? "text-white/80" : "text-slate-400"
                            } group-hover:translate-x-0.5 transition-transform`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              )}

              {/* New Batch Release (Admin) */}
              {role === "admin" && (
                <li>
                  <NavLink
                    to="/dashboard/batchrelease"
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `group relative flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-bold transition-all duration-300 ${isActive
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                        : "text-slate-600 hover:bg-emerald-50/80 hover:text-emerald-700"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <LuLayers
                            size={18}
                            className={isActive ? "text-white" : "text-emerald-500"}
                          />
                          <span>New Batch Release</span>
                        </div>
                        <LuChevronRight
                          size={16}
                          className={`${isActive ? "text-white/80" : "text-slate-400"
                            } group-hover:translate-x-0.5 transition-transform`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              )}

              {
                role === "admin" && (
                  <li>
                    <NavLink
                      to="/dashboard/today-payment"
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `group relative flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-bold transition-all duration-300 ${isActive
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                          : "text-slate-600 hover:bg-emerald-50/80 hover:text-emerald-700"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-3">
                            <LuLayers
                              size={18}
                              className={isActive ? "text-white" : "text-emerald-500"}
                            />
                            <span>Todays Payment Info</span>
                          </div>
                          <LuChevronRight
                            size={16}
                            className={`${isActive ? "text-white/80" : "text-slate-400"
                              } group-hover:translate-x-0.5 transition-transform`}
                          />
                        </>
                      )}
                    </NavLink>
                  </li>
                )
              }
            </ul>
          </div>

        </div>
      </div>



    </div>
  );
};

export default Aside;