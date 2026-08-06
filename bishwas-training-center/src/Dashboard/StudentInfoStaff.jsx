import React, { useContext, useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaPhoneAlt,
  FaMoneyBillWave,
  FaClock,
  FaUserTie,
  FaCalendarAlt,
  FaRedo,
  FaHashtag,
  FaExclamationCircle,
  FaInbox,
} from "react-icons/fa";
import useAxiosSecure from "../hook/useAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";

const StudentInfoStaff = () => {
  const axiosSecure = useAxiosSecure();
  const { loading: authLoading } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(false);

  const fetchRecentStudents = () => {
    setFetching(true);
    setError(false);
    axiosSecure
      .get("/students/recent")
      .then((res) => {
        setStudents(res.data || []);
        setFetching(false);
      })
      .catch((err) => {
        console.error("Error fetching recent students:", err);
        setError(true);
        setFetching(false);
      });
  };

  useEffect(() => {
    if (!authLoading) {
      fetchRecentStudents();
    }
  }, [authLoading, axiosSecure]);

  // Loading State
  if (authLoading || fetching) {
    return (
      <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-12 transition-all min-h-[400px] flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-20 h-20 rounded-full bg-blue-100/60 animate-ping opacity-75"></div>
          <div className="w-16 h-16 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin"></div>
          <div className="absolute flex items-center justify-center">
            <FaUserGraduate className="text-xl text-blue-600 animate-bounce" />
          </div>
        </div>

        <div className="mt-6 text-center space-y-2">
          <h3 className="text-base font-bold text-gray-800 tracking-wide">
            Fetching Recent Admissions...
          </h3>
          <p className="text-xs text-gray-500">
            Hold tight, retrieving the latest student records.
          </p>

          <div className="w-48 h-1.5 bg-gray-100 rounded-full mx-auto overflow-hidden mt-3">
            <div className="h-full bg-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center my-4">
        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
          <FaExclamationCircle className="text-xl" />
        </div>
        <p className="text-sm text-gray-700 font-semibold">
          Failed to load recent student data.
        </p>
        <button
          onClick={fetchRecentStudents}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <FaRedo className="text-xs" /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Recent Students
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Showing latest {students.length} admitted students
          </p>
        </div>
      </div>

      {/* Students List */}
      <div className="space-y-4">
        {students.map((student) => (
          <div
            key={student._id}
            className="group bg-white border border-gray-200 hover:border-gray-300 rounded-xl p-4 sm:p-5 shadow-xs transition-all duration-200"
          >
            <div className="flex flex-col gap-4">
              {/* Top Row: Student Profile Info */}
              <div className="flex items-center gap-3.5 pb-3 border-b border-gray-100">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
                  <FaUserGraduate className="text-base sm:text-lg text-gray-700" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                    {student.studentNameEnglish}
                  </h3>

                  <p className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mt-0.5">
                    <FaPhoneAlt className="text-xs text-gray-400 shrink-0" />
                    <span className="font-medium tracking-wide">
                      {student.mobileNumber}
                    </span>
                  </p>
                </div>
              </div>

              {/* Bottom Row: Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {/* Batch */}
                <div className="bg-gray-50/80 border border-gray-200/60 rounded-lg p-2.5 flex flex-col justify-center">
                  <p className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <FaHashtag className="text-[10px] text-gray-400" />
                    Batch
                  </p>
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm mt-0.5 truncate">
                    #{student.batchNumber}
                  </p>
                </div>

                {/* Duration */}
                <div className="bg-gray-50/80 border border-gray-200/60 rounded-lg p-2.5 flex flex-col justify-center">
                  <p className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <FaCalendarAlt className="text-[10px] text-gray-400" />
                    Duration
                  </p>
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm mt-0.5 truncate">
                    {student.courseDuration || student.duration || "N/A"}
                  </p>
                </div>

                {/* Preferred Time */}
                <div className="bg-gray-50/80 border border-gray-200/60 rounded-lg p-2.5 flex flex-col justify-center">
                  <p className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <FaClock className="text-[10px] text-gray-400" />
                    Time
                  </p>
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm mt-0.5 truncate">
                    {student.preferredTime}
                  </p>
                </div>

                {/* Reference Name */}
                <div className="bg-gray-50/80 border border-gray-200/60 rounded-lg p-2.5 flex flex-col justify-center">
                  <p className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <FaUserTie className="text-[10px] text-gray-400" />
                    Reference
                  </p>
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm mt-0.5 truncate">
                    {student.referenceName || student.reference || "Direct"}
                  </p>
                </div>

                {/* Paid Amount */}
                <div className="bg-gray-50/80 border border-gray-200/60 rounded-lg p-2.5 flex flex-col justify-center">
                  <p className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <FaMoneyBillWave className="text-[10px] text-gray-400" />
                    Paid
                  </p>
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm mt-0.5 truncate">
                    <span className="text-xs text-gray-500 font-normal">BDT</span>{" "}
                    {student.paidAmount}
                  </p>
                </div>

                {/* Due Amount */}
                <div className="bg-gray-50/80 border border-gray-200/60 rounded-lg p-2.5 flex flex-col justify-center">
                  <p className="text-[10px] sm:text-[11px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <FaMoneyBillWave className="text-[10px] text-gray-400" />
                    Due
                  </p>
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm mt-0.5 truncate">
                    <span className="text-xs text-gray-500 font-normal">BDT</span>{" "}
                    {student.duePayment}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {students.length === 0 && (
        <div className="text-center py-12 px-4 rounded-xl bg-gray-50 border border-dashed border-gray-300">
          <div className="w-12 h-12 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaInbox className="text-xl" />
          </div>
          <h3 className="text-base font-semibold text-gray-800">
            No Recent Students Found
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-sm mx-auto">
            Recently admitted students will automatically appear here once added.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentInfoStaff;