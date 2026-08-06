import React, { useEffect, useState } from "react";
import useAxios from "../hook/useAxios";
import {
  GraduationCap,
  Phone,
  Hash,
} from "lucide-react";

const TotalPymentInfo = () => {
  const axiosInstance = useAxios();

  const [summary, setSummary] = useState({});
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const summaryRes = await axiosInstance.get("/payment-summary");
      const studentRes = await axiosInstance.get("/payment-info");

      setSummary(summaryRes.data || {});
      setStudents(studentRes.data || []);
    } catch (err) {
      console.error("Error loading payment data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-6 lg:p-8">
      {/* Top Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
        {/* Total Amount */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Amount
            </p>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-blue-600 mt-1.5 sm:mt-2">
              ৳ {summary.totalAmount || 0}
            </h3>
          </div>
          
        </div>

        {/* Paid Amount */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Paid Amount
            </p>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-emerald-600 mt-1.5 sm:mt-2">
              ৳ {summary.totalPaid || 0}
            </h3>
          </div>
         
        </div>

        {/* Due Amount */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs flex items-center justify-between sm:col-span-2 md:col-span-1">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Due Amount
            </p>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-rose-600 mt-1.5 sm:mt-2">
              ৳ {summary.totalDue || 0}
            </h3>
          </div>
          
        </div>
      </div>

      {/* Main Data Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Student Payment Information
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Detailed payment breakdown across all registered students
            </p>
          </div>
          <span className="self-start sm:self-center bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200">
            Total Records: {students.length}
          </span>
        </div>

        {/* --- MOBILE CARD VIEW (< sm) --- */}
        <div className="block sm:hidden divide-y divide-slate-100">
          {isLoading ? (
            <div className="text-center py-12 px-4">
              <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Loading payment data...</span>
              </div>
            </div>
          ) : students.length > 0 ? (
            students.map((student, index) => (
              <div key={student._id || index} className="py-4 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 border border-blue-100/60">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm">
                        {student.studentNameEnglish}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-slate-500 font-mono mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{student.mobileNumber}</span>
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs font-semibold px-2 py-0.5 rounded-md border border-slate-200 shrink-0">
                    <Hash className="w-3 h-3 text-slate-400" />
                    {student.batchNumber}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-50 text-xs bg-slate-50/50 p-2.5 rounded-xl">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Total</span>
                    <span className="font-semibold text-blue-600">
                      ৳ {student.totalPayment}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Paid</span>
                    <span className="font-semibold text-emerald-600">
                      ৳ {student.paidAmount}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Due</span>
                    <span className="font-semibold text-rose-600">
                      ৳ {student.duePayment}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-800">
                No Payment Records Found
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Student payment history will appear here once loaded.
              </p>
            </div>
          )}
        </div>

        {/* --- DESKTOP/TABLET TABLE VIEW (≥ sm) --- */}
        <div className="hidden sm:block overflow-x-auto w-full rounded-xl border border-slate-200/80">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200/80 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4 text-center whitespace-nowrap w-12">#</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Student Name</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Mobile Number</th>
                <th className="py-3.5 px-4 whitespace-nowrap text-center">Batch Number</th>
                <th className="py-3.5 px-4 text-right whitespace-nowrap">Total Payment</th>
                <th className="py-3.5 px-4 text-right whitespace-nowrap">Paid</th>
                <th className="py-3.5 px-4 text-right whitespace-nowrap">Due</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 px-4">
                    <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                      <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading payment data...</span>
                    </div>
                  </td>
                </tr>
              ) : students.length > 0 ? (
                students.map((student, index) => (
                  <tr
                    key={student._id || index}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3.5 px-4 text-center font-medium text-slate-400 whitespace-nowrap">
                      {index + 1}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 border border-blue-100/60">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <span>{student.studentNameEnglish}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{student.mobileNumber}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200">
                        <Hash className="w-3 h-3 text-slate-400" />
                        {student.batchNumber}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-semibold text-blue-600 whitespace-nowrap">
                      <span className="text-xs font-medium text-blue-500 mr-1">৳</span>
                      {student.totalPayment}
                    </td>

                    <td className="py-3.5 px-4 text-right font-semibold text-emerald-600 whitespace-nowrap">
                      <span className="text-xs font-medium text-emerald-500 mr-1">৳</span>
                      {student.paidAmount}
                    </td>

                    <td className="py-3.5 px-4 text-right font-semibold text-rose-600 whitespace-nowrap">
                      <span className="text-xs font-medium text-rose-500 mr-1">৳</span>
                      {student.duePayment}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-12 px-4">
                    <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-800">
                      No Payment Records Found
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Student payment history will appear here once loaded.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TotalPymentInfo;