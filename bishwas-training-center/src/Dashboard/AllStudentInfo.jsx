import React, { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  FaSearch,
  FaFilePdf,
  FaPhoneAlt,
  FaClock,
  FaUserTie,
  FaInbox,
} from "react-icons/fa";
import useAxiosSecure from "../hook/useAxiosSecure";

const AllStudentInfo = () => {
  const axiosSecure = useAxiosSecure();

  const [batchNumber, setBatchNumber] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!batchNumber.trim()) {
      alert("Please enter Batch Number");
      return;
    }

    setLoading(true);
    axiosSecure
      .get(`/students?batch=${batchNumber}`)
      .then((res) => {
        setStudents(res.data || []);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleExportPDF = () => {
    if (students.length === 0) {
      alert("No student data found!");
      return;
    }

    // Explicitly set format to standard A4 (Portrait)
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Header Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Bishwas Mobile Training Institute", 14, 15);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Batch Number: ${batchNumber}`, 14, 22);

    // AutoTable aligned for A4 portrait printing
    autoTable(doc, {
      startY: 28,
      margin: { left: 10, right: 10 },
      head: [
        [
          "#",
          "Student Name",
          "Mobile",
          "Batch",
          "Batch Time",
          "Reference",
          "Paid",
          "Due",
        ],
      ],
      body: students.map((student, index) => [
        index + 1,
        student.studentNameEnglish,
        student.mobileNumber,
        student.batchNumber,
        student.preferredTime,
        student.referenceName || student.reference || "Direct",
        `BDT ${student.paidAmount}`,
        `BDT ${student.duePayment}`,
      ]),
      styles: {
        fontSize: 8.5,
        cellPadding: 2.5,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [37, 99, 235], // Blue header
        textColor: 255,
        halign: "center",
        fontStyle: "bold",
      },
      bodyStyles: {
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 8 }, // #
        1: { cellWidth: 40, halign: "left" }, // Student Name
        2: { cellWidth: 28 }, // Mobile
        3: { cellWidth: 24 }, // Batch
        4: { cellWidth: 28 }, // Batch Time
        5: { cellWidth: 24 }, // Reference
        6: { cellWidth: 20 }, // Paid
        7: { cellWidth: 18 }, // Due
      },
    });

    doc.save(`${batchNumber}-Student-List.pdf`);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-6 lg:p-8 space-y-6">
      {/* Search Header Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Student Information
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Search and view students enrolled by Batch Number
        </p>

        {/* Search Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter Batch Number (e.g. BMTI-001)"
              value={batchNumber}
              onChange={(e) => setBatchNumber(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSearch}
              disabled={loading}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition shadow-xs cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <FaSearch className="text-xs" />
              )}
              Search
            </button>

            <button
              onClick={handleExportPDF}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition shadow-xs cursor-pointer"
            >
              <FaFilePdf className="text-xs" />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-4 sm:p-6">
        {students.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12 px-4">
            <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <FaInbox className="text-xl" />
            </div>
            <h3 className="text-base font-semibold text-gray-800">
              No Student Found
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-sm mx-auto">
              Enter a batch number above to search and fetch student records.
            </p>
          </div>
        ) : (
          <div>
            {/* MOBILE CARD VIEW (< sm) */}
            <div className="block sm:hidden space-y-4">
              {students.map((student, index) => (
                <div
                  key={student._id || index}
                  className="bg-white border border-gray-200 rounded-xl p-4 space-y-3"
                >
                  {/* Top Row: Name & ID */}
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-400">
                        #{index + 1}
                      </span>
                      <h3 className="text-sm font-bold text-gray-900">
                        {student.studentNameEnglish}
                      </h3>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                      #{student.batchNumber}
                    </span>
                  </div>

                  {/* Info Details */}
                  <div className="space-y-1.5 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <FaPhoneAlt className="text-gray-400 shrink-0" />
                      <span>{student.mobileNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-gray-400 shrink-0" />
                      <span>{student.preferredTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUserTie className="text-gray-400 shrink-0" />
                      <span>
                        Ref: {student.referenceName || student.reference || "Direct"}
                      </span>
                    </div>
                  </div>

                  {/* Payment Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                    <div className="bg-gray-50 border border-gray-200/60 rounded-lg p-2">
                      <p className="text-[10px] font-semibold text-gray-500 uppercase">
                        Paid
                      </p>
                      <p className="font-semibold text-gray-900 text-xs mt-0.5">
                        <span className="text-[10px] text-gray-500 font-normal">BDT</span>{" "}
                        {student.paidAmount}
                      </p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200/60 rounded-lg p-2">
                      <p className="text-[10px] font-semibold text-gray-500 uppercase">
                        Due
                      </p>
                      <p className="font-semibold text-gray-900 text-xs mt-0.5">
                        <span className="text-[10px] text-gray-500 font-normal">BDT</span>{" "}
                        {student.duePayment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP/TABLET TABLE VIEW (≥ sm) */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <th className="py-3.5 px-4 text-center whitespace-nowrap">#</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Student Name</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Mobile</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Batch</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Batch Time</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Reference</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Paid</th>
                    <th className="py-3.5 px-4 whitespace-nowrap">Due</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                  {students.map((student, index) => (
                    <tr
                      key={student._id || index}
                      className="hover:bg-gray-50/80 transition-colors"
                    >
                      <td className="py-3.5 px-4 text-center font-medium text-gray-400 whitespace-nowrap">
                        {index + 1}
                      </td>

                      <td className="py-3.5 px-4 font-bold text-gray-900 whitespace-nowrap">
                        {student.studentNameEnglish}
                      </td>

                      <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap font-mono text-xs">
                        {student.mobileNumber}
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-gray-800 whitespace-nowrap">
                        #{student.batchNumber}
                      </td>

                      <td className="py-3.5 px-4 font-medium text-gray-600 whitespace-nowrap">
                        {student.preferredTime}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="bg-gray-100 border border-gray-200 text-gray-700 px-2.5 py-1 rounded-md text-xs font-medium">
                          {student.referenceName || student.reference || "Direct"}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-gray-900 whitespace-nowrap">
                        <span className="text-xs font-normal text-gray-500 mr-1">BDT</span>
                        {student.paidAmount}
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-gray-900 whitespace-nowrap">
                        <span className="text-xs font-normal text-gray-500 mr-1">BDT</span>
                        {student.duePayment}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllStudentInfo;