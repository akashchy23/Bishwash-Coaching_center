import React, { useContext, useEffect, useState, useCallback } from "react";
import { Link } from "react-router";
import {
  FiClock,
  FiCalendar,
  FiUserCheck,
  FiAlertCircle,
  FiRefreshCw,
  FiBookOpen,
  FiUsers,
  FiAward,
} from "react-icons/fi";
import useAxiosSecure from "../hook/useAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";

// Modern gradient presets for dynamic card background styling
const CARD_GRADIENTS = [
  "from-emerald-500/10 via-teal-500/5 to-cyan-500/10 border-emerald-200/60 hover:border-emerald-400",
  "from-indigo-500/10 via-purple-500/5 to-pink-500/10 border-indigo-200/60 hover:border-indigo-400",
  "from-blue-500/10 via-cyan-500/5 to-teal-500/10 border-blue-200/60 hover:border-blue-400",
  "from-amber-500/10 via-orange-500/5 to-rose-500/10 border-amber-200/60 hover:border-amber-400",
  "from-violet-500/10 via-fuchsia-500/5 to-pink-500/10 border-violet-200/60 hover:border-violet-400",
  "from-rose-500/10 via-red-500/5 to-amber-500/10 border-rose-200/60 hover:border-rose-400",
];

const Admission = () => {
  const axiosSecure = useAxiosSecure();
  const { loading: authLoading } = useContext(AuthContext);
  const [batches, setBatches] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  // Fetch admission batches
  const fetchBatches = useCallback(async () => {
    setFetching(true);
    setError(null);
    try {
      const res = await axiosSecure("/batches");
      setBatches(res.data || []);
    } catch (err) {
      console.error("Error loading admission batches:", err);
      setError("Failed to fetch available admission slots. Please try again.");
    } finally {
      setFetching(false);
    }
  }, [axiosSecure]);

  useEffect(() => {
    if (!authLoading) {
      fetchBatches();
    }
  }, [authLoading, fetchBatches]);

  // Loading Skeleton State
  if (authLoading || fetching) {
    return <AdmissionSkeleton />;
  }

  // Error State
  if (error) {
    return (
      <div className="relative z-0 max-w-md mx-auto my-20 p-8 bg-white/80 backdrop-blur-xl border border-red-200 rounded-3xl text-center shadow-lg">
        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FiAlertCircle className="text-2xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h3>
        <p className="text-sm text-gray-600 mb-6">{error}</p>
        <button
          onClick={fetchBatches}
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl shadow-md transition-all active:scale-95"
        >
          <FiRefreshCw className="text-base" /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="relative z-0 w-full bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold tracking-wide uppercase shadow-sm">
            <FiAward className="text-emerald-500" />
            Admissions Open
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Student Admission Slots
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Choose an available batch to enroll a student. Monitor real-time seat availability, timetables, and fill levels.
          </p>
        </div>

        {/* Empty State */}
        {batches.length === 0 ? (
          <div className="text-center py-20 bg-white/70 backdrop-blur-md rounded-3xl border border-dashed border-slate-300 max-w-2xl mx-auto">
            <FiBookOpen className="text-4xl text-slate-400 mx-auto mb-3" />
            <p className="text-gray-600 text-base font-semibold">
              No admission slots are currently active.
            </p>
            <p className="text-xs text-gray-400 mt-1">Please check back later for new batch schedules.</p>
          </div>
        ) : (
          /* Cards Grid */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {batches.map((batch, index) => {
              const totalSeat = batch.totalSeat || 20;
              const filled = batch.enrolledCount ?? Math.max(0, totalSeat - (batch.availableSeat || 0));
              const availableSeat = batch.availableSeat ?? Math.max(0, totalSeat - filled);
              const percentage = Math.min(100, Math.round((filled / totalSeat) * 100));
              const isFull = availableSeat <= 0 || filled >= totalSeat;
              const isAlmostFull = !isFull && availableSeat <= 3;

              // Dynamic gradient class selection
              const gradientStyle = CARD_GRADIENTS[index % CARD_GRADIENTS.length];

              return (
                <div
                  key={batch._id || batch.batchNumber}
                  className={`group relative z-0 bg-gradient-to-br ${gradientStyle} bg-white rounded-3xl border shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden transform hover:-translate-y-1`}
                >
                  {/* Background Glow Overlay */}
                  <div className="absolute -right-12 -top-12 w-32 h-32 bg-white/40 rounded-full blur-2xl pointer-events-none z-0" />

                  {/* Top Content */}
                  <div className="p-6 pb-4 relative z-10">
                    {/* Slot Header */}
                    <div className="flex justify-between items-start mb-5">
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Slot #{batch.slot || index + 1}
                        </span>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                          Batch #{batch.batchNumber}
                        </h2>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${
                          isFull
                            ? "bg-rose-100/80 text-rose-700 border-rose-300"
                            : isAlmostFull
                            ? "bg-amber-100/80 text-amber-800 border-amber-300"
                            : "bg-emerald-100/80 text-emerald-800 border-emerald-300"
                        }`}
                      >
                        {isFull ? "Full" : isAlmostFull ? "Almost Full" : "Open"}
                      </span>
                    </div>

                    {/* Schedule Box */}
                    <div className="space-y-2.5 pt-1">
                      <div className="flex items-center text-xs text-slate-700 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-sm">
                        <FiClock className="text-emerald-600 mr-2.5 text-base flex-shrink-0" />
                        <span className="font-semibold truncate">{batch.time || "N/A"}</span>
                      </div>

                      <div className="flex items-center text-xs text-slate-700 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-sm">
                        <FiCalendar className="text-teal-600 mr-2.5 text-base flex-shrink-0" />
                        <span className="font-semibold truncate">{batch.days || "N/A"}</span>
                      </div>
                    </div>

                    {/* Seat Progress Bar */}
                    <div className="mt-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white/60 shadow-sm space-y-2.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="flex items-center gap-1.5 font-medium text-slate-600">
                          <FiUsers className="text-slate-400" />
                          <strong className="text-slate-800 font-bold">{filled}</strong> / {totalSeat} Enrolled
                        </span>
                        <span className="font-extrabold text-emerald-600">{percentage}%</span>
                      </div>

                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isFull
                              ? "bg-rose-500"
                              : isAlmostFull
                              ? "bg-amber-500"
                              : "bg-gradient-to-r from-emerald-500 to-teal-500"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center text-[11px] pt-0.5">
                        <span className="text-slate-400 font-medium">Available Seats</span>
                        <span className={`font-bold ${isFull ? "text-rose-600" : "text-slate-700"}`}>
                          {availableSeat} Seats Left
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="p-6 pt-0 mt-2 relative z-10">
                    {isFull ? (
                      <button
                        disabled
                        className="w-full py-3.5 px-4 bg-slate-200/60 text-slate-400 font-bold text-xs uppercase tracking-wider rounded-2xl cursor-not-allowed border border-slate-200"
                      >
                        Batch Full
                      </button>
                    ) : (
                      <Link
                        to={`/admissionForm?batch=${batch.batchNumber}`}
                        className="block w-full"
                      >
                        <button className="w-full py-3.5 px-4 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md hover:shadow-emerald-500/20 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2">
                          <FiUserCheck className="text-base" />
                          Apply Now
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// Skeleton Loader
const AdmissionSkeleton = () => {
  return (
    <div className="relative z-0 w-full bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto animate-pulse">
          <div className="h-6 w-32 bg-slate-200 rounded-full mx-auto" />
          <div className="h-10 w-3/4 bg-slate-200 rounded-2xl mx-auto" />
          <div className="h-4 w-5/6 bg-slate-200 rounded-xl mx-auto" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 animate-pulse shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="h-3 w-12 bg-slate-200 rounded" />
                  <div className="h-6 w-24 bg-slate-200 rounded-lg" />
                </div>
                <div className="h-6 w-16 bg-slate-200 rounded-full" />
              </div>

              <div className="space-y-3">
                <div className="h-10 bg-slate-100 rounded-2xl" />
                <div className="h-10 bg-slate-100 rounded-2xl" />
              </div>

              <div className="h-20 bg-slate-100 rounded-2xl w-full" />
              <div className="h-12 bg-slate-200 rounded-2xl w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admission;