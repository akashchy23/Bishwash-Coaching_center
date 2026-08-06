import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { LuLogIn, LuLogOut, LuLayoutDashboard, LuMenu, LuX } from 'react-icons/lu';
import bishwasLogo from '../assets/IMG_8754.JPG.svg';
import { AuthContext } from '../Provider/AuthProvider';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToGoHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    logOut();
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Admission', path: '/admission' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-3 py-3.5 sm:px-6">
      <div className="max-w-7xl mx-auto rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-lg shadow-slate-200/50 transition-all duration-300">
        <div className="navbar px-5 py-3 flex justify-between items-center min-h-[72px]">
          
          {/* ================= Brand Logo & Bengali Title ================= */}
          <div className="navbar-start flex items-center gap-3 w-auto">
            {/* Mobile Menu Toggle */}
            <div className="dropdown lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="btn btn-ghost btn-circle text-slate-700 hover:bg-slate-100"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <LuX size={22} /> : <LuMenu size={22} />}
              </button>

              {/* Mobile Dropdown Menu */}
              {mobileMenuOpen && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-4 z-[1] p-3 shadow-2xl bg-white/95 backdrop-blur-xl rounded-2xl w-60 border border-slate-100 space-y-1"
                >
                  {navLinks.map((link) => (
                    <li key={link.path}>
                      <NavLink
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `font-semibold py-2.5 px-4 rounded-xl transition-all ${
                            isActive
                              ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-500/20'
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                  
                  <div className="divider my-1 text-xs text-slate-400">Account</div>
                  
                  {user && (
                    <li>
                      <Link
                        to="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="font-semibold py-2.5 px-4 rounded-xl text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                      >
                        <LuLayoutDashboard size={16} />
                        Dashboard
                      </Link>
                    </li>
                  )}
                </ul>
              )}
            </div>

            {/* Logo (with white background blend removed) + Bengali Title */}
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

          {/* ================= Desktop Navigation Links ================= */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-1.5 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 block ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= Action Buttons ================= */}
          <div className="navbar-end flex items-center gap-2.5 w-auto">
            {user && (
              <Link to="/dashboard" className="hidden sm:inline-flex">
                <button className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300/70 rounded-xl transition-all active:scale-95">
                  <LuLayoutDashboard size={16} className="text-emerald-600" />
                  Dashboard
                </button>
              </Link>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white border border-rose-200/80 rounded-xl shadow-sm transition-all duration-300 active:scale-95"
              >
                <LuLogOut size={16} />
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-xl shadow-md shadow-emerald-500/20 transition-all duration-300 active:scale-95">
                  <LuLogIn size={16} />
                  Login
                </button>
              </Link>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;