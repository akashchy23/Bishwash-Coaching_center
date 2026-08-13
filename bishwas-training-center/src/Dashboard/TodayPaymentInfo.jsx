import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaMoneyBillWave,
  FaUsers,
  FaRotate,
  FaGraduationCap,
  FaLayerGroup,
  FaCalendarDays,
  FaBoxOpen,
  FaReceipt,
  FaChartLine,
  FaPlus,
  FaTrashCan,
  FaHandHoldingDollar,
} from "react-icons/fa6";

const BASE_URL = "https://api.bishwasctg.com";

const TodayPaymentDashboard = () => {
  // State Management
  const [students, setStudents] = useState([]);
  const [duePayments, setDuePayments] = useState([]);
  const [summary, setSummary] = useState({
    admissionPaid: 0,
    duePaid: 0,
    totalCollection: 0,
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    studentName: "",
    batchNumber: "",
    amount: "",
  });

  // Fetch all data in parallel
  const fetchAllData = async () => {
    setRefreshing(true);
    try {
      const [studentsRes, dueRes, summaryRes] = await Promise.all([
        axios.get(`${BASE_URL}/today-admission-students`),
        axios.get(`${BASE_URL}/today-due-payment`),
        axios.get(`${BASE_URL}/today-payment-summary`),
      ]);

      setStudents(studentsRes.data || []);
      setDuePayments(dueRes.data || []);
      setSummary(
        summaryRes.data || { admissionPaid: 0, duePaid: 0, totalCollection: 0 }
      );
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      Swal.fire({
        icon: "error",
        title: "Error Loading Data",
        text: "Could not fetch dashboard analytics. Please check your backend connections.",
        confirmColor: "#4f46e5",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Handle Form Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Due Payment
  const handleAddDuePayment = async (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.batchNumber || !formData.amount) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all required fields.",
        confirmColor: "#10b981",
      });
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${BASE_URL}/today-due-payment`, formData);
      setFormData({ studentName: "", batchNumber: "", amount: "" });
      await fetchAllData();

      Swal.fire({
        icon: "success",
        title: "Payment Saved!",
        text: "Due payment record was successfully recorded.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to record due payment:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Failed to save payment. Please try again.",
        confirmColor: "#ef4444",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Due Payment
  const handleDeleteDuePayment = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this payment record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirmResult.isConfirmed) return;

    setDeletingId(id);
    try {
      await axios.delete(`${BASE_URL}/today-due-payment/${id}`);
      await fetchAllData();

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Payment record has been deleted.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to delete due payment:", error);
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Could not delete payment record. Please try again.",
        confirmColor: "#ef4444",
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center space-y-4">
        <div className="relative w-12 h-12">
          <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-indigo-600 animate-spin"></div>
        </div>
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
              <FaChartLine /> Daily Finance Overview
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Today's Payment & Summary
            </h1>
            <p className="text-xs md:text-sm text-slate-500">
              Real-time monitoring of today's admissions, due collections, and overall revenue.
            </p>
          </div>

          <button
            onClick={fetchAllData}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 rounded-2xl transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <FaRotate className={refreshing ? "animate-spin text-indigo-600" : "text-slate-500"} />
            <span>Refresh Data</span>
          </button>
        </div>

        {/* Financial Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Admissions Count */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Admissions</span>
              <FaGraduationCap className="text-indigo-600 text-lg" />
            </div>
            <div className="text-3xl font-black text-slate-900">{students.length}</div>
            <p className="text-xs text-slate-500">New students registered today</p>
          </div>

          {/* Admission Collection */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Admission Fees</span>
              <FaReceipt className="text-indigo-600 text-lg" />
            </div>
            <div className="text-3xl font-black text-slate-900">
              ৳ {summary.admissionPaid.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500">Collected from admissions</p>
          </div>

          {/* Due Collection */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Due Collections</span>
              <FaHandHoldingDollar className="text-emerald-600 text-lg" />
            </div>
            <div className="text-3xl font-black text-slate-900">
              ৳ {summary.duePaid.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500">Collected from pending dues</p>
          </div>

          {/* Grand Total Revenue */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white p-5 rounded-3xl shadow-lg shadow-emerald-600/10 space-y-2">
            <div className="flex items-center justify-between text-emerald-100">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Collection</span>
              <FaMoneyBillWave className="text-xl" />
            </div>
            <div className="text-3xl font-black">
              ৳ {summary.totalCollection.toLocaleString()}
            </div>
            <p className="text-xs text-emerald-100">Admission + Due Total</p>
          </div>

        </div>

        {/* Due Collection Entry Form */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <FaHandHoldingDollar />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Record Today's Due Payment</h2>
              <p className="text-xs text-slate-500">Add payment received from existing students for pending dues.</p>
            </div>
          </div>

          <form onSubmit={handleAddDuePayment} className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Student Name *</label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                placeholder="e.g. John Doe"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Batch Number *</label>
              <input
                type="text"
                name="batchNumber"
                value={formData.batchNumber}
                onChange={handleInputChange}
                placeholder="e.g. Batch-42"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Amount (BDT) *</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="e.g. 1500"
                min="1"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                required
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all active:scale-95 disabled:opacity-50 cursor-pointer shadow-sm"
              >
                <FaPlus />
                <span>{submitting ? "Saving..." : "Add Payment"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Today's Admission Entries Table */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Today's Admissions</h2>
                <p className="text-xs text-slate-500">New student enrollments recorded today</p>
              </div>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-xl text-xs font-bold">
                {students.length} Records
              </span>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4 w-12 text-center">#</th>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Batch</th>
                    <th className="py-3 px-4 text-right">Paid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {students.length > 0 ? (
                    students.map((student, index) => (
                      <tr key={student._id || index} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 text-center font-mono text-slate-400">
                          {String(index + 1).padStart(2, "0")}
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-800">
                          {student.studentNameEnglish || "N/A"}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 text-[11px]">
                            <FaLayerGroup className="text-slate-400 text-[9px]" />
                            {student.batchNumber}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-emerald-600">
                          ৳ {Number(student.paidAmount || 0).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-slate-400">
                        <FaBoxOpen className="mx-auto text-2xl mb-2" />
                        No admissions logged today.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Today's Due Collections Table */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Today's Due Received</h2>
                <p className="text-xs text-slate-500">Payments collected from previous dues</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-xs font-bold">
                {duePayments.length} Records
              </span>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4 w-12 text-center">#</th>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Batch</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                    <th className="py-3 px-4 w-12 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {duePayments.length > 0 ? (
                    duePayments.map((item, index) => (
                      <tr key={item._id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 text-center font-mono text-slate-400">
                          {String(index + 1).padStart(2, "0")}
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-800">
                          {item.studentName}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 text-[11px]">
                            <FaLayerGroup className="text-slate-400 text-[9px]" />
                            {item.batchNumber}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-emerald-600">
                          ৳ {Number(item.amount || 0).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleDeleteDuePayment(item._id)}
                            disabled={deletingId === item._id}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer disabled:opacity-30"
                            title="Delete Payment"
                          >
                            <FaTrashCan />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400">
                        <FaBoxOpen className="mx-auto text-2xl mb-2" />
                        No due payments logged today.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TodayPaymentDashboard;