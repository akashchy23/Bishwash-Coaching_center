import React, { useState } from "react";
import Aside from "./Aside";
import { Outlet } from "react-router";
import DashNav from "./DashNav";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-slate-50">

      {/* Top Navbar with Sidebar Toggle Action */}
      <DashNav onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      {/* Dashboard Body */}
      <div className="relative flex flex-1 min-h-0 overflow-hidden">

        {/* Mobile Backdrop Overlay */}
        {isSidebarOpen && (
          <div
            onClick={closeSidebar}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity duration-300"
            aria-hidden="true"
          />
        )}

        {/* Responsive Sidebar Container */}
        <aside
          className={`fixed lg:static top-0 left-0 z-50 h-full w-64 sm:w-72 lg:w-64 bg-white border-r border-slate-200/80 transform transition-transform duration-300 ease-in-out lg:transform-none flex-shrink-0 ${
            isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <Aside onCloseMobile={closeSidebar} />
        </aside>

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto bg-slate-100/70 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;