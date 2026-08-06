import { useEffect, useState, useMemo, useContext, useCallback } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../hook/useAxiosSecure";
import { 
  FiUsers, 
  FiShield, 
  FiUserCheck, 
  FiRefreshCw, 
  FiMail, 
  FiUser, 
  FiAlertCircle 
} from "react-icons/fi";

const Dashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { loading: authLoading, user } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setDataLoading(true);
    setError(null);
    try {
      const res = await axiosSecure.get("/user");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load user management data. Please try again later.");
    } finally {
      setDataLoading(false);
    }
  }, [axiosSecure]);

  useEffect(() => {
    if (!authLoading && user) {
      fetchUsers();
    }
  }, [authLoading, user, fetchUsers]);

  // Loading State
  if (authLoading || (dataLoading && !error)) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin"></div>
        </div>
        <p className="text-slate-500 font-semibold text-sm animate-pulse tracking-wide">
          Loading User Management Panel...
        </p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white border border-rose-100 rounded-2xl shadow-xl shadow-rose-500/5 text-center">
        <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <FiAlertCircle size={24} />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">Error Loading Data</h3>
        <p className="text-slate-500 text-sm mb-6">{error}</p>
        <button
          onClick={fetchUsers}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-600/20 active:scale-95"
        >
          <FiRefreshCw size={14} />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  return <DashboardContent users={users} onRefresh={fetchUsers} />;
};

// Sub-component for main Dashboard View
const DashboardContent = ({ users, onRefresh }) => {
  const admins = useMemo(() => users.filter((u) => u.role === "admin"), [users]);
  const staffs = useMemo(() => users.filter((u) => u.role === "staff"), [users]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
              User Management
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live System
            </span>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm">
            Overview and access control for system administrators and staff personnel.
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="self-start sm:self-center inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
        >
          <FiRefreshCw size={14} className="text-emerald-600" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Top Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<FiUsers size={22} className="text-slate-600" />}
          label="Total System Users"
          value={users.length}
          bgIcon="bg-slate-100"
        />
        <StatCard
          icon={<FiShield size={22} className="text-rose-600" />}
          label="Administrators"
          value={admins.length}
          bgIcon="bg-rose-50"
        />
        <StatCard
          icon={<FiUserCheck size={22} className="text-emerald-600" />}
          label="Staff Members"
          value={staffs.length}
          bgIcon="bg-emerald-50"
        />
      </div>

      {/* User Tables Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        <UserTableCard
          title="Admin List"
          subtitle="System Administrators"
          count={admins.length}
          users={admins}
          badgeStyle="bg-rose-50 text-rose-700 border-rose-200/80"
          accentBg="bg-rose-600"
          avatarBg="bg-rose-100 text-rose-700"
          emptyMessage="No administrators found"
        />

        <UserTableCard
          title="Staff List"
          subtitle="Support & Management Staff"
          count={staffs.length}
          users={staffs}
          badgeStyle="bg-emerald-50 text-emerald-700 border-emerald-200/80"
          accentBg="bg-emerald-600"
          avatarBg="bg-emerald-100 text-emerald-700"
          emptyMessage="No staff members found"
        />
      </div>

    </div>
  );
};

// Summary Metric Card
const StatCard = ({ icon, label, value, bgIcon }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between transition-all hover:border-slate-300">
      <div className="space-y-0.5">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="text-2xl font-black text-slate-800">{value}</p>
      </div>
      <div className={`p-3 rounded-2xl ${bgIcon}`}>
        {icon}
      </div>
    </div>
  );
};

// Table Card Sub-component
const UserTableCard = ({
  title,
  subtitle,
  count,
  users,
  badgeStyle,
  accentBg,
  avatarBg,
  emptyMessage,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden flex flex-col justify-between transition-all hover:shadow-md">
      <div>
        {/* Table Header Bar */}
        <div className="p-5 sm:p-6 pb-4 flex items-center justify-between border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-800">{title}</h2>
            <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${badgeStyle}`}>
            {count} {count === 1 ? "Member" : "Members"}
          </span>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-400 border-b border-slate-100 text-[11px] font-extrabold uppercase tracking-wider">
                <th className="py-3 px-4 text-center w-12">#</th>
                <th className="py-3 px-4">User Details</th>
                <th className="py-3 px-4">Email Address</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs sm:text-sm font-semibold">
              {users.map((user, index) => (
                <tr
                  key={user._id || user.id || index}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  {/* Row Number */}
                  <td className="py-3.5 px-4 text-center font-bold text-slate-400 group-hover:text-slate-600">
                    {index + 1}
                  </td>

                  {/* Name & Avatar */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs uppercase shrink-0 ${avatarBg}`}
                      >
                        {user.name ? user.name.charAt(0) : <FiUser size={14} />}
                      </div>
                      <span className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                        {user.name || "N/A"}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="py-3.5 px-4 text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                      <FiMail size={14} className="text-slate-400 shrink-0" />
                      <span className="truncate max-w-[180px] sm:max-w-xs">{user.email}</span>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty State */}
              {users.length === 0 && (
                <tr>
                  <td colSpan="3" className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="p-3 bg-slate-50 rounded-2xl text-slate-300">
                        <FiUsers size={28} />
                      </div>
                      <p className="font-bold text-xs text-slate-500">{emptyMessage}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Decorative Card Footer Border */}
      <div className={`h-1.5 w-full ${accentBg}`} />
    </div>
  );
};

export default Dashboard;